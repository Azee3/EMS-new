import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class OrganizerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const user = this.auth.getUser();
    if (user && user.role === 'organizer') return true;
    // not authorized -> redirect to login or home
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
  }
}
