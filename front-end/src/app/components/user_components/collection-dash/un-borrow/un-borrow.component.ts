import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../../../services/books.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { UserService } from '../../../../services/user.service';
import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-un-borrow',
  templateUrl: './un-borrow.component.html',
  styleUrls: ['./un-borrow.component.css']
})
export class UnBorrowComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,
              private _notificationService: NotificationsService,              
              private _userService: UserService,
              private ngFlashMessageService: NgFlashMessageService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit() {
  }

  confirmUnBorrow(){
    //current logged in user
    var loggedUserId = JSON.parse(localStorage.getItem("user")).id.toString();

    //Get the user data first to send a notification
    this._userService.getUserDatabyId(loggedUserId).subscribe(userdata => {
      if (userdata.success) {
        var username = userdata.user.username
        
        var message = {
          message: username + ' wants to hand-over ' + this.data.unBorrow.title
        }

        //Send the message to mongocollection
        this._notificationService.sendNotification(message).subscribe(ndata => {
          if (ndata.success) {
            this.dialogRef.close();
            this.ngFlashMessageService.showFlashMessage({          
              messages: ["Admin has been notified to withdraw book"],           
              dismissible: true,           
              timeout: 3000,          
              type: 'info'
            });
          } else {
            this.dialogRef.close();
            this.ngFlashMessageService.showFlashMessage({          
              messages: ["Failed to Notify the Admin"],           
              dismissible: true,           
              timeout: 3000,          
              type: 'danger'
            });            
          }       
        })
      } 
    })
    
    

    

  }
  
}
