import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AttendeeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const user = this.auth.getUser();
    if (user && user.role === 'attendee') return true;
    // Not an attendee -> redirect to appropriate dashboard
    if (user && user.role === 'admin') {
      return this.router.createUrlTree(['/admin']);
    }
    // otherwise go to home or login
    return this.router.createUrlTree(['/']);
  }
}
