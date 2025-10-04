// Типы для аутентификации и пользователей

export interface ITourist {
  id: number;
  name: string | null;
  email: string | null;
  email_verified_at: string;
  phone: string | null;
  avatar: import('./common').IMediaData | null;
}
