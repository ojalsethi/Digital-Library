import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router
              ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAdminLoggedIn()) {
      return true;
    } else {
      this.flashMessage.show('Log as an admin first', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
