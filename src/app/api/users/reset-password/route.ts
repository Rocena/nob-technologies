import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getPayloadClient } from '@/lib/payload';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    const now = Date.now();
    const clientData = rateLimitMap.get(clientIp) || { count: 0, lastReset: now };

    if (now - clientData.lastReset > RATE_LIMIT_WINDOW_MS) {
      clientData.count = 1;
      clientData.lastReset = now;
    } else {
      clientData.count++;
      if (clientData.count > MAX_REQUESTS) {
        return NextResponse.json(
          {
            error:
              'Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.',
          },
          { status: 429 }
        );
      }
    }
    rateLimitMap.set(clientIp, clientData);

    const body = await req.json().catch(() => ({}));
    const { token, password } = body;

    if (!token || typeof token !== 'string' || !token.trim()) {
      return NextResponse.json(
        { error: 'Jeton de réinitialisation manquant ou invalide.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Le nouveau mot de passe doit comporter au moins 8 caractères.' },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    try {
      await payload.resetPassword({
        collection: 'users',
        data: {
          token: token.trim(),
          password,
        },
        overrideAccess: true,
      });

      return NextResponse.json({
        success: true,
        message: 'Votre mot de passe a été réinitialisé avec succès.',
      });
    } catch (resetErr: any) {
      console.warn('Password reset failed:', resetErr?.message);
      return NextResponse.json(
        {
          error:
            'Le lien de réinitialisation est invalide ou a expiré. Veuillez refaire une nouvelle demande.',
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error('Password reset handler error:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la réinitialisation du mot de passe.' },
      { status: 500 }
    );
  }
}
