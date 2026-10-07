import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient();
    const { totalDocs } = await payload.count({
      collection: 'users',
    });

    if (totalDocs > 0) {
      return NextResponse.json(
        { errors: [{ message: 'Un compte administrateur a déjà été configuré. Veuillez vous connecter.' }] },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { errors: [{ message: 'Email et mot de passe requis.' }] },
        { status: 400 }
      );
    }

    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'super_admin',
        name: 'Super Admin',
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    console.error('Error in first-register:', error);
    return NextResponse.json(
      { errors: [{ message: error?.message || 'Erreur lors de la création du compte administrateur.' }] },
      { status: 500 }
    );
  }
}
