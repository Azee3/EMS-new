import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './set-password.html',
  styleUrl: './set-password.css'
})
export class SetPasswordComponent {
  form: any;
  error = '';
  message = '';

  private returnUrl = '/';

  constructor(private fb: FormBuilder, private auth: AuthService, private users: UsersService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get currentUser() {
    return this.auth.getUser();
  }

  async submit() {
    this.error = '';
    this.message = '';
    if (this.form.invalid) { this.error = 'Please provide a valid password (min 6 chars)'; return; }
    const p = this.form.value.password;
    const c = this.form.value.confirm;
    if (p !== c) { this.error = 'Passwords do not match'; return; }
    const user = this.currentUser;
    if (!user) { this.error = 'Not authenticated'; return; }
    try {
      await this.users.updatePasswordForUser(user.id, p);
      this.message = 'Password updated. Redirecting...';
      // refresh auth storage
      const refreshed = { ...user, isFirstLogin: false };
      this.auth.setUser(refreshed);
      setTimeout(() => this.router.navigateByUrl(this.returnUrl), 800);
    } catch (err: any) {
      this.error = err.message || 'Failed to update password';
    }
  }
}
