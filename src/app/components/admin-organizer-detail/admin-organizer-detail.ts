import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-organizer-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-organizer-detail.html',
  styleUrl: './admin-organizer-detail.css'
})
export class AdminOrganizerDetailComponent {
  organizer: any = null;
  editMode = false;
  form: any;
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private users: UsersService, private fb: FormBuilder, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.organizer = this.users.getById(id) || null;
    }
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      organizationName: ['']
    });
  }

  enableEdit() {
    if (!this.organizer) return;
    this.editMode = true;
    this.form.patchValue({
      fullName: this.organizer.fullName || '',
      email: this.organizer.email || '',
      phone: this.organizer.phone || '',
      organizationName: (this.organizer as any).organizationName || ''
    });
  }

  async save() {
    this.message = '';
    this.error = '';
    if (this.form.invalid) { this.error = 'Please fix the form'; return; }
    try {
      const vals = this.form.value;
      const updated = await this.users.updateUser(this.organizer.id, {
        fullName: vals.fullName || '',
        email: vals.email || '',
        phone: vals.phone || '',
        organizationName: vals.organizationName || ''
      });
      this.organizer = updated;
      this.editMode = false;
      this.message = 'Organizer updated';
    } catch (err: any) {
      this.error = err.message || 'Update failed';
    }
  }

  confirmDelete() {
    if (!this.organizer) return;
    const ok = confirm('Delete organizer "' + this.organizer.fullName + '"? This cannot be undone.');
    if (!ok) return;
    try {
      this.users.deleteUser(this.organizer.id);
      this.router.navigateByUrl('/admin/organizers');
    } catch (err: any) {
      this.error = err.message || 'Delete failed';
    }
  }
}
