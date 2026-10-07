import { Access } from 'payload';

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'super_admin' || user?.role === 'admin');
};

export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  return Boolean(user);
};

export const isPublicAndPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return {
    _status: { equals: 'published' }
  };
};

export const isPublic: Access = () => true;
