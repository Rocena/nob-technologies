import { NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(req: Request) {
  const body = await req.text();
  fs.writeFileSync('C:/Users/PC/Documents/Nobtech/nobtech-app/select_dom_dump.txt', body);
  return NextResponse.json({ success: true });
}
