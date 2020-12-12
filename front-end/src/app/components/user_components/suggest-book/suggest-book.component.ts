import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { UserService } from '../../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'suggest-book',
  templateUrl: './suggest-book.component.html',
  styleUrls: ['./suggest-book.component.css']
})
export class SuggestBookComponent implements OnInit {

  public _suggestForm: FormGroup
  
  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService,
              private _notificationService: NotificationsService,
              private ngFlashMessageService: NgFlashMessageService){}

  ngOnInit(){
    this._suggestForm = this._formBuilder.group({
      Title: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      Category: ['Arts-and-Music', [Validators.required]],
    })
    
  }

  isMobileDashboard() {
    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

  onSubmit(){
    //Create a Notification to mongocollection notification
    //current logged in user
    var loggedUserId = JSON.parse(localStorage.getItem("user")).id.toString();

    //get the user data first before comitting to collection
    this._userService.getUserDatabyId(loggedUserId).subscribe(userdata => {
      if (userdata.success) {
        var username = userdata.user.username

        var message = {
          message: username + ' suggests to add ' + this._suggestForm.value.Title + ' by ' + this._suggestForm.value.Author + 'to the library'
        }

        //Send the message to mongocollection
        this._notificationService.sendNotification(message).subscribe(ndata => {
          if (ndata.success) {
            this.ngFlashMessageService.showFlashMessage({          
              messages: ["Admin has been notified to add the book"],           
              dismissible: true,           
              timeout: 3000,          
              type: 'info'
            });
          }else {
            this.ngFlashMessageService.showFlashMessage({          
              messages: ["Failed to Notify the Admin"],           
              dismissible: true,           
              timeout: 3000,          
              type: 'danger'
            }); 
          }
        })

        console.log(message);
        
      } else {
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Failed to Notify the Admin"],           
          dismissible: true,           
          timeout: 3000,          
          type: 'danger'
        }); 
      }
    })

  }
}
