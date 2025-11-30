import { Injectable } from '@angular/core';
import { MOCK_USERS } from '../models/mock-data';
import { User } from '../models/user.model';

export function toUser(stored: StoredUser): User {
  if (!stored.role) {
    throw new Error('Stored user has no role');
  }
  return {
    userId: stored.id,
    fullName: stored.fullName,
    email: stored.email,
    password: stored.password,
    role: stored.role,
    isFirstLogin: stored.isFirstLogin ?? false,
    createdAt: new Date(stored.createdAt),
    updatedAt: new Date(stored.updatedAt),
    organizationName: stored.organizationName,
  };
}

export function toUserOrNull(stored: StoredUser | undefined): User | null {
  return stored ? toUser(stored) : null;
}

export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
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
        password: u.password,
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

  async register(payload: { fullName: string; email: string; password: string; role?: 'admin' | 'organizer' | 'attendee' }): Promise<StoredUser> {
    const exists = this.users.some(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const now = new Date().toISOString();
    const user: StoredUser = {
      id: String(Date.now()),
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      status: 'active',
      role: payload.role ?? 'attendee',
      createdAt: now,
      updatedAt: now
    } as StoredUser;
    this.users.push(user);
    return user;
  }

  async createOrganizer(payload: { fullName: string; email: string; organizationName?: string; password?: string; }): Promise<StoredUser> {
    const exists = this.users.some(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const now = new Date().toISOString();
    const defaultPlain = 'org123';
    const defaultHash = await this.hashPassword(defaultPlain);
    const organizer: StoredUser = {
      id: 'org-' + Date.now(),
      fullName: payload.fullName,
      email: payload.email,
      password: defaultHash,
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
    this.users[idx].password = newHash;
    this.users[idx].isFirstLogin = false;
    this.users[idx].updatedAt = new Date().toISOString();
    return this.users[idx];
  }
}
