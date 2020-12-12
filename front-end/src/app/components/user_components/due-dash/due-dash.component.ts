import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'due-dash',
  templateUrl: './due-dash.component.html',
  styleUrls: ['./due-dash.component.css']
})
export class DueDashComponent {

  constructor(private _userService: UserService){
    this.getUserBorrowData();
  }

  cards = [    
    //{ title: 'Card 4', cols: 1, rows: 1 }
  ];

  isMobileDashboard() {
    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

  getUserBorrowData(){
    //current userid
    var loggedUserId = JSON.parse(localStorage.getItem("user")).id.toString();

    this._userService.getUserDatabyId(loggedUserId).subscribe(data => {
      //borrowdates
      console.log(data.user.borrows);
      
      data.user.borrows.forEach(element => {
        console.log(element.borrowdate);        
        var charge = 0

        var today = new Date();      
        var borrowdate = new Date(element.borrowdate)      
        var timediff = Math.abs(today.getTime() - borrowdate.getTime())
        //difference of days
        var diffDays = Math.ceil(timediff / (1000 * 3600 * 24)); 
        console.log('difference : ', diffDays);

        if (diffDays > 10) {
          charge = (diffDays - 10) * 15
        }

        //target day to return book
        var targetDate = (borrowdate.getDate() + 10);
        
        //Date has to be fixed here 
        var mm = borrowdate.getMonth();

        var targetDay = targetDate + '/' + mm
        
        
        
        this.cards.push(          
            {title:element._id.title, author:element._id.author, image:element._id.image, charge: charge, targetDate: targetDay, cols: 1, rows: 1}          
        )
                
      });
      
    })
  }
}
