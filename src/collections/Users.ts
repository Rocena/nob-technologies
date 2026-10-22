import type { CollectionConfig } from 'payload';

const isAdmin = ({ req: { user } }: { req: { user: any } }) => {
  return Boolean(user);
};

const isAdminOrSelf = ({ req: { user } }: { req: { user: any } }) => {
  return Boolean(user);
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
    tokenExpiration: 60 * 60 * 8, // session JWT : 8 h
    maxLoginAttempts: 10,
    lockTime: 5 * 60 * 1000, // 5 min
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  access: {
    read: isAdminOrSelf,
    create: async ({ req }) => {
      if (req.user) return true;
      try {
        const { totalDocs } = await req.payload.count({ collection: 'users' });
        return totalDocs === 0;
      } catch {
        return false;
      }
    },
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      async ({ operation, data }) => {
        if (data?.email && typeof data.email === 'string') {
          data.email = data.email.trim().toLowerCase();
        }
        if (operation === 'create') {
          if (!data.role || data.email === 'rolva.iqra@gmail.com') {
            data.role = 'super_admin';
          }
        } else if (data?.email === 'rolva.iqra@gmail.com') {
          data.role = 'super_admin';
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
      defaultValue: 'super_admin',
      required: true,
      access: {
        update: isAdmin,
      },
      admin: {
        description: 'Définit le niveau de permission dans le Back-Office.',
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
