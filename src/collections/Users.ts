import type { CollectionConfig } from 'payload';

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return user?.role === 'super_admin';
};

const isAdminOrSelf = ({ req: { user } }: { req: { user: any } }) => {
  if (!user) return false;
  if (user?.role === 'super_admin') return true;
  return { id: { equals: user?.id } };
};

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  admin: {
    group: 'Systeme & Acces',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'avatar', 'role', 'updatedAt'],
  },
  auth: {
    tokenExpiration: 60 * 60 * 2, // session JWT : 2 h (renouvelée tant que l'utilisateur est actif)
    maxLoginAttempts: 5, // verrouillage anti brute-force
    lockTime: 10 * 60 * 1000, // 10 min
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  access: {
    read: isAdminOrSelf, 
    create: async ({ req }) => {
      if (req.user?.role === 'super_admin') return true;
      try {
        const { totalDocs } = await req.payload.count({ collection: 'users' });
        return totalDocs === 0;
      } catch {
        return false;
      }
    },
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user), // Tous les utilisateurs créés peuvent se connecter au back-office
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === 'create') {
          try {
            const { totalDocs } = await req.payload.count({ collection: 'users' });
            if (totalDocs === 0) {
              data.role = 'super_admin';
            }
          } catch {
            data.role = 'editor';
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom Complet',
      required: false,
      admin: {
        placeholder: 'ex: Ozias Nzongo',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo de profil / Avatar',
      admin: {
        description: 'Téléversez ou choisissez une image pour votre avatar dans l’en-tête et le profil.',
      },
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rôle & Permissions',
      options: [
        { label: 'Super Administrateur (Accès Total)', value: 'super_admin' },
        { label: 'Éditeur de Contenu (Accès Modules)', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        update: isAdmin,
      },
      admin: {
        description: 'Seul un Super Administrateur peut modifier les rôles et permissions.',
      },
    },
    {
      name: 'mfaEnabled',
      type: 'checkbox',
      label: 'Double Authentification Active (MFA / 2FA)',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'État d’activation du compte avec Google Authenticator.',
      },
    },
    {
      name: 'mfaSecret',
      type: 'text',
      hidden: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'mfaSetupUI',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/MfaSettingsField#MfaSettingsField',
        },
      },
    },
  ],
};
