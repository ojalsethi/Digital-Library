import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
// Must import to use Forms functionality  
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms'; 

import { FlashMessagesService } from 'angular2-flash-messages';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regiForm: FormGroup;  
  name:string='';    
  username:string='';
  email:string='';
  password:string='';
  IsAccepted:number=0;

  constructor(        
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private fb: FormBuilder) {

      // To initialize FormGroup  
    this.regiForm = fb.group({  
      'name' : [null, Validators.required],  
      'username' : [null, Validators.required],              
      'email':[null, Validators.compose([Validators.required,Validators.email])],  
      'password': [null, Validators.required],
      'IsAccepted':[null]  
    }); 

     }

  ngOnInit() {
  }

  // On Change event of Toggle Button  
  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  } 


  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    console.log(user);
    
    //Register User
    this.authService.registerUser(user).subscribe(data=>{
      if (data.success) {
        console.log('login success', data);                
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/login']);
      }else{
        console.log('login failed' ,data);        
        
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/']);
      }
    })
    
  } 
}
