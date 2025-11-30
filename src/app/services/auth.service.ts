import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toUser, UsersService } from './users.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private usersService: UsersService) {}

  // login user function
  login(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      // if email or password is empty
      if (!email || !password) return reject(new Error('Invalid credentials'));
      // Try to find registered user
      const stored = this.usersService.findByEmail(email);
      if (!stored) return reject(new Error('User not found'));

      // Allow plaintext-seeded passwords during development: accept if stored value equals plaintext
      const isPlaintextSeed = stored.password === password;
      if (!isPlaintextSeed && password !== stored.password)
        return reject(new Error('Invalid credentials'));

      try {
        const user = toUser(stored);
        this.currentUserSubject.next(user);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  // setter function for user
  setUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  // remove user
  logout(): void {
    this.currentUserSubject.next(null);
  }

  // get current user object
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  // update status of user to logged in 
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}