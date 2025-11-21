export interface User {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'organizer' | 'attendee';
  organizationName?: string;
  passwordHash: string;
  isFirstLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
}