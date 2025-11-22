import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { BrowseEventsComponent } from './components/browse-events/browse-events';
import { SelectSeatsComponent } from './components/select-seats/select-seats';
import { PromoCodeComponent } from './components/promo-code/promo-code';
import { ReviewBookingComponent } from './components/review-booking/review-booking';
import { PaymentProcessComponent } from './components/payment-process/payment-process';
import { TicketConfirmationComponent } from './components/ticket-confirmation/ticket-confirmation';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
import { AttendeeGuard } from './services/attendee.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { AdminManageOrganizersComponent } from './components/admin-manage-organizers/admin-manage-organizers';
import { SetPasswordComponent } from './components/set-password/set-password';
import { AdminOrganizerDetailComponent } from './components/admin-organizer-detail/admin-organizer-detail';
import { AdminReportsComponent } from './components/admin-reports/admin-reports';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection';
import{ SelectingseatComponent } from './components/selectingseat/selectingseat';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'browse-events', component: BrowseEventsComponent },
  { path: 'select-seats', component: SelectSeatsComponent ,canActivate: [/*AuthGuard, AttendeeGuard*/]},
  { path: 'promo-code', component: PromoCodeComponent },
  { path: 'review-booking', component: ReviewBookingComponent, canActivate: [AuthGuard, AttendeeGuard] },
  { path: 'payment-process', component: PaymentProcessComponent, canActivate: [AuthGuard, AttendeeGuard] },
  { path: 'ticket-confirmation', component: TicketConfirmationComponent, canActivate: [AuthGuard, AttendeeGuard] }
  ,{ path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'admin/organizers', component: AdminManageOrganizersComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'admin/organizers/:id', component: AdminOrganizerDetailComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'set-password', component: SetPasswordComponent, canActivate: [AuthGuard] }
  ,{ path: 'admin/reports', component: AdminReportsComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'seat-selection', component: SeatSelectionComponent  }
  ,{ path: 'selectingseat', component: SelectingseatComponent  }
 
];
