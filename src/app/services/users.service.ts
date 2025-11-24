import { Injectable } from '@angular/core';
import { MOCK_USERS, MOCK_ADMINS } from '../models/mock-data';

export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  status: 'active' | 'inactive' | 'pending';
  role?: 'admin' | 'organizer' | 'attendee';
  isFirstLogin?: boolean;
  isActive?: boolean;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
  organizationName?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: StoredUser[] = [];

  constructor() {
    this.seedFromMocks();
  }

  private seedFromMocks() {
    const seeded: StoredUser[] = [];

    for (const u of MOCK_USERS) {
      seeded.push({
        id: u.userId,
        fullName: u.fullName,
        email: u.email,
        passwordHash: u.passwordHash,
        status: 'active',
        role: u.role,
        isFirstLogin: u.isFirstLogin ?? false,
        isActive: true,
        lastLogin: null,
        createdAt: (u.createdAt instanceof Date) ? u.createdAt.toISOString() : String(u.createdAt),
        updatedAt: (u.updatedAt instanceof Date) ? u.updatedAt.toISOString() : String(u.updatedAt),
        organizationName: (u as any).organizationName
      });
    }

    for (const a of MOCK_ADMINS) {
      seeded.push({
        id: a.adminId,
        fullName: a.fullName,
        email: a.email,
        passwordHash: a.passwordHash,
        status: a.isActive ? 'active' : 'inactive',
        role: a.role,
        isFirstLogin: false,
        isActive: a.isActive,
        lastLogin: a.lastLogin ? a.lastLogin.toISOString() : null,
        createdAt: a.createdAt.toISOString(),
        updatedAt: a.updatedAt.toISOString()
      });
    }

    this.users = seeded;
  }

  findByEmail(email: string) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getAll(): StoredUser[] {
    return this.users;
  }

  getById(id: string): StoredUser | undefined {
    return this.users.find(u => u.id === id);
  }

  async updateUser(id: string, payload: { fullName?: string; email?: string; organizationName?: string; isActive?: boolean; }): Promise<StoredUser> {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    const now = new Date().toISOString();
    this.users[idx] = {
      ...this.users[idx],
      fullName: payload.fullName ?? this.users[idx].fullName,
      email: payload.email ?? this.users[idx].email,
      organizationName: payload.organizationName ?? this.users[idx].organizationName ?? '',
      isActive: payload.isActive ?? this.users[idx].isActive,
      updatedAt: now
    } as StoredUser;
    return this.users[idx];
  }

  deleteUser(id: string): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  async register(payload: { fullName: string; email: string; passwordHash: string; role?: 'admin' | 'organizer' | 'attendee' }): Promise<StoredUser> {
    const exists = this.users.some(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const now = new Date().toISOString();
    const user: StoredUser = {
      id: String(Date.now()),
      fullName: payload.fullName,
      email: payload.email,
      passwordHash: payload.passwordHash,
      status: 'active',
      role: payload.role ?? 'attendee',
      createdAt: now,
      updatedAt: now
    } as StoredUser;
    this.users.push(user);
    return user;
  }

  async createOrganizer(payload: { fullName: string; email: string; organizationName?: string; passwordHash?: string; }): Promise<StoredUser> {
    const exists = this.users.some(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const now = new Date().toISOString();
    const defaultPlain = 'org123';
    const defaultHash = await this.hashPassword(defaultPlain);
    const organizer: StoredUser = {
      id: 'org-' + Date.now(),
      fullName: payload.fullName,
      email: payload.email,
      passwordHash: defaultHash,
      status: 'active',
      role: 'organizer',
      isFirstLogin: true,
      isActive: true,
      lastLogin: null,
      createdAt: now,
      updatedAt: now,
      organizationName: payload.organizationName || ''
    } as StoredUser;
    this.users.push(organizer);
    return organizer;
  }

  private async hashPassword(plain: string): Promise<string> {
    const enc = new TextEncoder();
    const data = enc.encode(plain);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  async updatePasswordForUser(userId: string, newPlainPassword: string): Promise<StoredUser> {
    const idx = this.users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error('User not found');
    const newHash = await this.hashPassword(newPlainPassword);
    this.users[idx].passwordHash = newHash;
    this.users[idx].isFirstLogin = false;
    this.users[idx].updatedAt = new Date().toISOString();
    return this.users[idx];
  }
}
