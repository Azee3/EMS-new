export interface Admin {
  adminId: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin';
  passwordHash: string;
  isActive: boolean;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
