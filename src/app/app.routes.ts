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
import { AdminHomeComponent } from './components/admin-home/admin-home';
import { AdminManageOrganizersComponent } from './components/admin-manage-organizers/admin-manage-organizers';
import { SetPasswordComponent } from './components/set-password/set-password';
import { AdminOrganizerDetailComponent } from './components/admin-organizer-detail/admin-organizer-detail';
import { AdminReportsComponent } from './components/admin-reports/admin-reports';
import { MyEventsComponent } from './components/my-events/my-events';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard';
import { OrganizerCreateEventComponent } from './components/organizer-create-event/organizer-create-event';
import { OrganizerSetupTicketsComponent } from './components/organizer-setup-tickets/organizer-setup-tickets';
import { OrganizerViewReportsComponent } from './components/organizer-view-reports/organizer-view-reports';
import { ViewEventsComponent } from './components/view-events/view-events';
import { ScanQrComponent } from './components/scan-qr/scan-qr';
import { OrganizerGuard } from './services/organizer.guard';
import { OrganizerEditTicketTypeComponent } from './components/organizer-edit-ticket-type/organizer-edit-ticket-type'; 






export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'browse-events', component: BrowseEventsComponent },
  { path: 'select-seats', component: SelectSeatsComponent ,canActivate: [AuthGuard, /*AttendeeGuard*/]},
  { path: 'promo-code', component: PromoCodeComponent, canActivate: [AuthGuard, AttendeeGuard]},
  { path: 'review-booking', component: ReviewBookingComponent, canActivate: [AuthGuard, AttendeeGuard] },
  { path: 'payment-process', component: PaymentProcessComponent, canActivate: [AuthGuard, AttendeeGuard] },
  { path: 'ticket-confirmation', component: TicketConfirmationComponent, canActivate: [AuthGuard, AttendeeGuard] }
  ,{ path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'admin/organizers', component: AdminManageOrganizersComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'admin/organizers/:id', component: AdminOrganizerDetailComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'set-password', component: SetPasswordComponent, canActivate: [AuthGuard] }
  ,{ path: 'admin/reports', component: AdminReportsComponent, canActivate: [AuthGuard, AdminGuard] }
  ,{ path: 'my-events', component: MyEventsComponent, canActivate: [AuthGuard, AttendeeGuard] },
  {path: 'organizer', component: OrganizerDashboardComponent, canActivate: [AuthGuard, OrganizerGuard]},
  {path: 'organizer/create-event', component: OrganizerCreateEventComponent, canActivate: [AuthGuard, OrganizerGuard]},
  {path: 'organizer/setup-tickets', component: OrganizerSetupTicketsComponent, canActivate: [AuthGuard, OrganizerGuard]},
  {path: 'organizer/view-reports', component: OrganizerViewReportsComponent, canActivate: [AuthGuard, OrganizerGuard]},
  {path: 'view-events', component: ViewEventsComponent, canActivate: [AuthGuard]},
  {path: 'scan-qr', component: ScanQrComponent},
  {path: 'organizer/edit-ticket-type', component: OrganizerEditTicketTypeComponent, canActivate: [AuthGuard, OrganizerGuard]}

  
  
  
 
];
