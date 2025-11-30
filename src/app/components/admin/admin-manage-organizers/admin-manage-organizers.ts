import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
// RouterLink not required in this component

@Component({
  selector: 'app-admin-manage-organizers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-manage-organizers.html',
  styleUrl: './admin-manage-organizers.css'
})
export class AdminManageOrganizersComponent {
  form: any;

  message = '';
  error = '';

  constructor(private fb: FormBuilder, private users: UsersService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      organizationName: ['']
    });
  }

  get organizers() {
    return this.users.getAll().filter(u => u.role === 'organizer');
  }

  async submit() {
    this.message = '';
    this.error = '';
    if (this.form.invalid) {
      this.error = 'Please fill required fields';
      return;
    }
    try {
      const vals = this.form.value;
      const created = await this.users.createOrganizer({
        fullName: vals.fullName || '',
        email: vals.email || '',
        organizationName: vals.organizationName || '',
        // leave password blank – organizer will set on first login
      });
      // redirect admin immediately to the new organizer detail
      this.form.reset();
      this.router.navigate(['/admin/organizers', created.id]);
    } catch (err: any) {
      this.error = err.message || 'Failed to create organizer';
    }
  }

  deleteOrganizer(id: string) {
    this.message = '';
    this.error = '';
    const ok = confirm('Delete this organizer? This cannot be undone.');
    if (!ok) return;
    try {
      this.users.deleteUser(id);
      this.message = 'Organizer deleted';
    } catch (err: any) {
      this.error = err.message || 'Failed to delete organizer';
    }
  }
}
