import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { generateTOTPSecret, getTOTPUri, generateQRCodeDataUrl } from '@/lib/totp';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const secret = generateTOTPSecret();
    const otpauthUri = getTOTPUri(secret, user.email, 'NOB TECHNOLOGIES');
    const qrCodeDataUrl = await generateQRCodeDataUrl(otpauthUri);

    return NextResponse.json({
      success: true,
      secret,
      otpauthUri,
      qrCodeDataUrl,
      email: user.email,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
