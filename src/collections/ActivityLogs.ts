import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access';

export const ActivityLogs: CollectionConfig = {
  slug: 'activity-logs',
  labels: {
    singular: 'ActivityLogs',
    plural: 'ActivityLogs',
  },
  admin: {
    
    
    group: 'Système & Accès',
    useAsTitle: 'action',
    defaultColumns: ['action', 'user', 'createdAt'],
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'action',
      type: 'text',
      label: 'Action effectuée',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Utilisateur',
    },
    {
      name: 'details',
      type: 'textarea',
      label: 'Détails',
    },
  ],
};
