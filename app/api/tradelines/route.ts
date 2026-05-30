import { NextResponse } from 'next/server';

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();

export async function GET(request: Request) {
  const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
  if (!GOOGLE_SHEET_ID) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  // Simple rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = 100;
  const record = RATE_LIMIT_MAP.get(ip);
  if (record) {
    if (now < record.resetTime) {
      if (record.count >= max) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
      record.count++;
    } else {
      RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + windowMs });
    }
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + windowMs });
  }

  try {
    const sheetsUrl = `https://opensheet.elk.sh/${GOOGLE_SHEET_ID}/Tradelines`;
    const response = await fetch(sheetsUrl, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`Sheets fetch failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 502 });
    }
    const expectedKeys = ['ID','Bank Name','Bank Subtext','Card Type','Credit Limit','Age (Years)','Purchase Deadline','Reporting Date','Statement Date','Price','Spots Available','Status'];
    const sanitized = data.map((item: any) => {
      const out: any = {};
      expectedKeys.forEach(k => {
        if (item[k] !== undefined) {
          const v = item[k];
          out[k] = typeof v === 'string' ? v.replace(/[<>]/g, '') : v;
        }
      });
      return out;
    });
    return NextResponse.json(sanitized);
  } catch (e: any) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
