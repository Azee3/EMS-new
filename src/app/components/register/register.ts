import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  error = '';
  loading = false;

  constructor(private users: UsersService, private auth: AuthService, private router: Router) {}

  private async hashPassword(password: string): Promise<string> {
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  async onSubmit() {
    this.error = '';
    if (this.registerForm.invalid) return;

    this.loading = true;
    try {
      const { fullName, email, password } = this.registerForm.value as any;
      const passwordHash = await this.hashPassword(password);
      const user = await this.users.register({ fullName, email, passwordHash, role: 'attendee' });
      // Log in the new user to ensure session is fully initialized
      await this.auth.login(email, password);
      // Redirect to browse events for booking
      this.router.navigateByUrl('/browse-events');
    } catch (err: any) {
      this.error = err?.message || 'Registration failed';
    } finally {
      this.loading = false;
    }
  }
}
