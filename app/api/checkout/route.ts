import { NextResponse } from "next/server";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY env var");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, paymentMethod, referredBy, orderDetails, proofFileName, proofFileBase64 } = body;

    const attachments = proofFileBase64
      ? [{ filename: proofFileName || "payment-proof.png", content: proofFileBase64 }]
      : [];

    const customerEmail = resend.emails.send({
      from: "AOS Tradelines <noreply@aostradelines.com>",
      to: email,
      subject: `Payment Confirmation – ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FAF8F3;">
          <div style="background: #1A1A1A; padding: 32px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">AOS Tradelines</h1>
          </div>
          <div style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(201,168,76,0.2);">
            <h2 style="color: #1A1A1A; margin: 0 0 16px; font-size: 20px;">Hi ${fullName},</h2>
            <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
              Thank you for your order. Please allow up to <strong>48 to 72 hours</strong> for processing and confirmation.
            </p>
            <p style="color: #4A4A4A; font-size: 14px; line-height: 1.6; margin: 0;">
              If you have any questions, reach out to us at
              <a href="mailto:tradelines@aosimpactsolutions.com" style="color: #C9A84C;">tradelines@aosimpactsolutions.com</a>.
            </p>
          </div>
          <p style="color: #4A4A4A; opacity: 0.4; font-size: 12px; text-align: center; margin-top: 24px;">
            © AOS Tradelines · All rights reserved
          </p>
        </div>
      `,
    });

    const internalEmail = resend.emails.send({
      from: "AOS Tradelines <noreply@aostradelines.com>",
      to: ["tradelines@aosimpactsolutions.com", "mdigital1196@gmail.com"],
      subject: `New Tradelines Order – ${fullName}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #1A1A1A; margin: 0 0 24px;">${fullName} just placed a tradeline order</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; table-layout: fixed;">
            <colgroup>
              <col style="width: 130px;" />
              <col />
            </colgroup>
            <tr style="background: #FAF8F3;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #eee;">Full Name</td>
              <td style="padding: 10px 14px; border: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #eee;">Email</td>
              <td style="padding: 10px 14px; border: 1px solid #eee;">${email}</td>
            </tr>
            <tr style="background: #FAF8F3;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #eee;">Phone</td>
              <td style="padding: 10px 14px; border: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #eee;">Payment Method</td>
              <td style="padding: 10px 14px; border: 1px solid #eee;">${paymentMethod}</td>
            </tr>
            <tr style="background: #FAF8F3;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #eee;">Referred By</td>
              <td style="padding: 10px 14px; border: 1px solid #eee;">${referredBy || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #eee; vertical-align: top;">Order Details</td>
              <td style="padding: 10px 14px; border: 1px solid #eee; white-space: pre-line;">${orderDetails}</td>
            </tr>
          </table>
          ${proofFileBase64
            ? `<p style="margin-top: 16px; font-size: 13px; color: #4A4A4A;">Payment proof attached as <strong>${proofFileName}</strong>.</p>`
            : `<p style="margin-top: 16px; font-size: 13px; color: #999;">No payment proof uploaded.</p>`
          }
        </div>
      `,
    });

    // Send both in parallel
    const results = await Promise.allSettled([customerEmail, internalEmail]);
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Email ${i === 0 ? "customer" : "internal"} failed:`, result.reason);
      } else {
        console.log(`Email ${i === 0 ? "customer" : "internal"} sent:`, result.value);
      }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Checkout email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
