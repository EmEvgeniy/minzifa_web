export interface IMediaData {
  id: number;
  file: string | null;
  alt_text: string | null;
}

enum ManagerRoleEnum {
  CEO = 'CEO',
  MARKETING = 'marketing',
  HEAD = 'head',
  SALES = 'sales',
  FINANCES = 'finance',
  OPERATIONS = 'operations',
}

export interface IManager {
  id: number;
  name: string | null | undefined;
  email: string;
  role: ManagerRoleEnum;
  avatar: IMediaData | null;
  settings: {
    enable_notification?: boolean;
  };
}
