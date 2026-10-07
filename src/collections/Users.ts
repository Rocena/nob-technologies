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
  auth: true, 
  access: {
    read: isAdminOrSelf, 
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user), // Tous les utilisateurs créés peuvent se connecter au back-office
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
  ],
};
