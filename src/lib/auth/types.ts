export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  totpEnabled: boolean;
  createdAt: string;
};

export type BookmarkRow = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  subtitle: string;
  href: string;
  region: string;
  created_at: string;
};
