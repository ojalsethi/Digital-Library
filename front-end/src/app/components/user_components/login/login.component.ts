import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { NgFlashMessageService } from 'ng-flash-messages';

import './flash.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String
  password: String

  constructor(private authService: AuthService,
    private router: Router,    
    private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {  
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }      
  }

  loginUser(){      
    const user = {
      username: this.username,
      password: this.password
    }
    console.log('trying to authenticate with api');
    console.log(user);
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success && data.user.role === "User" ) {
        this.authService.storeUserData(data.token, data.user);        
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["You have succefully logged in"],         
          dismissible: true,           
          timeout: 4000,          
          type: 'info'
        }); 
        this.router.navigate(['/']);        
      }else {
        this.ngFlashMessageService.showFlashMessage({          
          messages: [data.msg],           
          dismissible: true,           
          timeout: 4000,          
          type: 'danger'
        });
        this.router.navigate(['/login']);
        this.username = null
        this.password = null
      }
    })
  }
}
