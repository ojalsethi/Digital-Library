import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {
  apptitle: String = 'Browse Books';
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) {

                console.log('isLoggedIn: ', this.authService.isLoggedIn());
                if (this.router.url === '/') {
                  this.apptitle = 'Browse Books';
                }else if(this.router.url === '/collection'){
                  this.apptitle = 'My Collections';
                }else if(this.router.url === '/bookmarks'){
                  this.apptitle = 'Flagged Books';
                }else if(this.router.url === '/dues'){
                  this.apptitle = 'My Dues';
                }else if(this.router.url === '/suggest-book'){
                  this.apptitle = 'Suggest A Book';
                }
              }
  

  onLogoutClick(){
    console.log('You clicked Logout');
    this.authService.logout();
    this.flashMessage.show('You have logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

  switchToBrowseBooks(){
    this.apptitle = 'Browse Books';
    this.router.navigate(['/']);
  }

  switchToMyCollections(){
    this.apptitle = 'My Collections';
    this.router.navigate(['/collection']);    
  }

  switchToBookMarks(){
    this.apptitle = 'Flagged Books';
    this.router.navigate(['/bookmarks']);
  }
  
  switchToMyDues(){
    this.apptitle = 'My Dues';
    this.router.navigate(['/dues']);
  }
  
  switchToSuggestBook(){
    this.apptitle = 'Suggest A Book';
    this.router.navigate(['/suggest-book']);
  }
  
  switchToNewReleases(){
    this.apptitle = 'New Releases';
    console.log('You are in', this.apptitle);
  }
  
  }
