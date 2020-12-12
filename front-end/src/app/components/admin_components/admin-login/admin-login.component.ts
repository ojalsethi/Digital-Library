import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username: String
  password: String

  constructor(private authService: AuthService,
              private router: Router,              
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    if (this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin-books']);
    }
  }

  loginAdmin(){
    const admin = {
      username: this.username,
      password: this.password
    }
    console.log('trying to authenticate with api');    
    this.authService.authenticateUser(admin).subscribe(data => {
      if (data.success && data.user.role === "Admin") {        
        this.authService.storeAdminData(data.token, data.user);                
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["You have succefully logged in"],         
          dismissible: true,           
          timeout: 4000,          
          type: 'info'
        }); 
        this.router.navigate(['/admin-books']);
      } else {
        this.ngFlashMessageService.showFlashMessage({          
          messages: [data.msg],           
          dismissible: true,           
          timeout: 4000,          
          type: 'danger'
        });
        this.router.navigate(['/admin/login']);
        this.username = null
        this.password = null
      }
    })   
  }
}
