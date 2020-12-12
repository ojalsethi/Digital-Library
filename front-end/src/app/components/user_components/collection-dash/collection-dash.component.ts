import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BooksService } from '../../../services/books.service';
import { MatDialog } from '@angular/material';

import { UnBorrowComponent } from './un-borrow/un-borrow.component';

@Component({
  selector: 'collection-dash',
  templateUrl: './collection-dash.component.html',
  styleUrls: ['./collection-dash.component.css']
})
export class CollectionDashComponent {
  apiBooks: any;

  //Categories of books
  EducationBooks = []
  AMBooks = []
  CTBooks = []
  HistoryBooks = []
  BioraphyBooks = []
  BusinessBooks = []

  cards = [];

  //Pagination Data
  p: { [id: string]: number } = {};
  x: number = 1;

  constructor(private _userService: UserService,
              private _bookService: BooksService,
              private dialog?: MatDialog){
    this.getUserBorrowData();
  }

  

  getUserBorrowData(){
    //current logged in user
    var loggedUserId = JSON.parse(localStorage.getItem("user")).id.toString();

    this._userService.getBookData(loggedUserId).subscribe(data=>{
      if (data.success) {                
        data.user.borrows.forEach(element => {
          //if element._id.category === 'category' push to '#categorybook'
          if (element._id.category === "Education") {
            this.EducationBooks.push(element._id)
          } else if (element._id.category === "Arts-and-Music") {
            this.AMBooks.push(element._id)
          } else if (element._id.category === "Computers-and-Tech") {
            this.CTBooks.push(element._id)
          } else if (element._id.category === "History") {
            this.HistoryBooks.push(element._id)
          } else if (element._id.category === "Biographies") {
            this.BioraphyBooks.push(element._id)
          } else if (element._id.category === "Business") {
            this.BusinessBooks.push(element._id)
          }
        }),
        this.addBooksToCards()
      }
      
      
    })
  }

  isMobileDashboard() {
    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

  addBooksToCards() {

    if (this.AMBooks.length > 0) {
      this.cards.push(
        { title: 'Arts & Music', cols: 1, rows: 2, books: this.AMBooks }
      )
    }

    if (this.CTBooks.length > 0) {
      this.cards.push(
        { title: 'Computer & Tech', cols: 1, rows: 2, books: this.CTBooks }
      )
    }

    if (this.EducationBooks.length > 0) {
      this.cards.push(
        { title: 'Education', cols: 1, rows: 2, books: this.EducationBooks }
      )
    }

    if (this.HistoryBooks.length > 0) {
      this.cards.push(
        { title: 'History', cols: 1, rows: 2, books: this.HistoryBooks }
      )
    }

    if (this.BioraphyBooks.length > 0) {
      this.cards.push(
        { title: 'Biographies', cols: 1, rows: 2, books: this.BioraphyBooks }
      )
    }

    if (this.BusinessBooks.length > 0) {
      this.cards.push(
        { title: 'Business', cols: 1, rows: 2, books: this.BusinessBooks }
      )
    }

  }

  unBorrowBook(book){    
    //code here to unborrow
    const dialogRef = this.dialog.open(UnBorrowComponent, {
      data: {unBorrow: book}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.refreshCardsData();
    })
  }

  refreshCardsData(){
    //empty all the #category books cards also cards

    this.cards.length = 0

    this.EducationBooks.length = 0
    this.AMBooks.length = 0
    this.CTBooks.length = 0
    this.HistoryBooks.length = 0
    this.BioraphyBooks.length = 0
    this.BusinessBooks.length = 0

    //Then add the data to cards again
    this.getUserBorrowData();
    this.addBooksToCards();
  }
}
