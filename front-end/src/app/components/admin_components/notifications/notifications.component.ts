import { Component } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  constructor(private notificationService: NotificationsService,
              private ngFlashMessageService: NgFlashMessageService){
    this.getNotifications();
  }
  
  messages = [];

  isMobileDashboard() {
    // Return false for web view.

    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

  getNotifications(){
    this.notificationService.getAllNotifications().subscribe(data => {
      console.log(data);
      
      data.forEach(element => {
        this.messages.push(
          { message: element.message, id: element._id }
        )
      })       
    })
  }

  deleteNotification(notiId){
    this.notificationService.deleteNotificationById(notiId).subscribe(res => {
      if (res.success) {
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Notification Deleted"],           
          dismissible: true,           
          timeout: 3000,          
          type: 'info'
        });
        this.refreshNotifications();
      } else {
        
      }
    })
  }

  refreshNotifications(){
    //empty the messages array
    this.messages.length = 0

    this.getNotifications();
  }
}
