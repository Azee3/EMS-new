import { User } from './user.model';



export const MOCK_USERS: User[] = [
  {
    userId: 'user-organizer-01',
    fullName: 'organizer 1',
    email: 'org@email.com',
    role: 'organizer',
    organizationName: 'Good EO',
    password: 'org123',
    isFirstLogin: true,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    userId: 'user-organizer-02',
    fullName: 'organizer 2',
    email: 'org2@email.com',
    role: 'organizer',
    organizationName: 'Best EO',
    password: 'org123',
    isFirstLogin: false,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    userId: 'user-attendee-01',
    fullName: 'Attendee',
    email: 'attendee@email.com',
    role: 'attendee',
    password: 'att123',
    isFirstLogin: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20'),
  },

  {
    userId: 'user-admin-01',
    fullName: 'Primary Administrator',
    email: 'admin@help.com',
    role: 'admin',
    password: 'admin123',
    isFirstLogin: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-03-15'),
  },
];




