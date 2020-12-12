import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';


@Component({
  selector: 'admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  apptitle: String = 'Manage Books';  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) 
              {
                if (this.router.url === '/admin-books') {
                  this.apptitle = 'Manage Books';
                } else if(this.router.url === '/admin-users') {
                  this.apptitle = 'Manage Users';
                } else if(this.router.url === '/admin-fines') {
                  this.apptitle = 'Manage Fines';   
                } else if(this.router.url === '/admin-notices'){
                  this.apptitle = 'Notifications';
                }
               }

  onLogoutClick() {
    console.log('You clicked Logout for admin');
    this.authService.adminLogout();
    this.flashMessage.show('You have logged out as an admin', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/admin-login']);
    return false;
  }

  switchToManageBooks(){
    this.apptitle = 'Manage Books';        
    this.router.navigate(['/admin-books']);
  }

  switchToManageUsers(){
    this.apptitle = 'Manage Users';
    this.router.navigate(['/admin-users']);
  }

  switchToManageFines(){
    this.apptitle = 'Manage Fines';      
  }

  swithToNotifications(){
    this.apptitle = 'Notifications';
    this.router.navigate(['/admin-notices']);
  }

}


