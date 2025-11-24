import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';

export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  passwordHash?: string;
  status?: 'active' | 'inactive' | 'pending';
  createdAt?: string;
  updatedAt?: string;
  role?: 'admin' | 'organizer' | 'attendee';
  isFirstLogin?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private usersService: UsersService) {}

  private async hashPassword(password: string): Promise<string> {
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  login(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      if (!email || !password) return reject(new Error('Invalid credentials'));
      // Try to find registered user
      const stored = this.usersService.findByEmail(email);
      if (!stored) return reject(new Error('User not found'));

      const passwordHash = await this.hashPassword(password);
      // Allow plaintext-seeded passwords during development: accept if stored value equals plaintext
      const isPlaintextSeed = stored.passwordHash === password;
      if (!isPlaintextSeed && passwordHash !== stored.passwordHash) return reject(new Error('Invalid credentials'));

      const user: User = {
        id: stored.id,
        fullName: stored.fullName,
        email: stored.email,
        status: stored.status,
        createdAt: stored.createdAt,
        updatedAt: stored.updatedAt,
        role: stored.role ?? 'attendee',
        isFirstLogin: (stored as any).isFirstLogin ?? false
      };

      this.currentUserSubject.next(user);
      resolve(user);
    });
  }

  setUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}