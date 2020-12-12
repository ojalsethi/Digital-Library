import { Component } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { Book } from '../../../models/Book';
import { UserService } from '../../../services/user.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { MatDialog } from '@angular/material';

import { ConfBorrComponent } from './conf-borr/conf-borr.component'

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent {
  innerWidth: number
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

  constructor(private _bookService: BooksService,
              private _userSevice: UserService,
              private ngFlashMessageService: NgFlashMessageService,
              private dialog?: MatDialog) {
              
                //get book data when page starts
              this.getBooks();
              console.log('cards: ', this.cards);
  }

  isMobileDashboard() {
    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

  getBooks() {

    this._bookService.getBooks().subscribe((dataBooks: Book[]) => {
      this.apiBooks = dataBooks,
      console.log('APIBooks:',this.apiBooks)
      
        dataBooks.forEach(element => {
          console.log('databook elements: ', element.title, ',', element.available);
          
          //if element.category === 'category' && element.available push to '#categorybook'
          //then from each #categorybook create objects and push to cards

          if (element.category === "Education" && element.available) {
            this.EducationBooks.push(element)
          } else if (element.category === "Arts-and-Music" && element.available) {
            this.AMBooks.push(element)
          } else if (element.category === "Computers-and-Tech" && element.available) {
            this.CTBooks.push(element)
          } else if (element.category === "History" && element.available) {
            this.HistoryBooks.push(element)
          } else if (element.category === "Biographies" && element.available) {
            this.BioraphyBooks.push(element)
          } else if (element.category === "Business" && element.available) {
            this.BusinessBooks.push(element)
          }
        }),
        this.addBooksToCards()

    })
  }

  addToBookmarks(book) {
    //current logged in user
    var loggedUserId = JSON.parse(localStorage.getItem("user")).id.toString();

    const bmBook = {
      bookId: book._id
    }
    console.log('adding bookid', bmBook, 'to user of id', loggedUserId);
    //Adding to Bookmarks of user
    this._userSevice.addToBookmark(bmBook, loggedUserId).subscribe(data => {
      console.log('On adding to Bookmark', data);
    })
    this.ngFlashMessageService.showFlashMessage({
      messages: [book.title + " was added to your bookmarks"],
      dismissible: true,
      timeout: 4000,
      type: 'info'
    });

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

  borrowBook(book) {    
    const dialogRef = this.dialog.open(ConfBorrComponent, {
      data: {borBook: book},
      width: '350px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.refreshCardsData();
    })       
  }

  refreshCardsData() {

    //empty all the #category books cards also cards

    this.cards.length = 0

    this.EducationBooks.length = 0
    this.AMBooks.length = 0
    this.CTBooks.length = 0
    this.HistoryBooks.length = 0
    this.BioraphyBooks.length = 0
    this.BusinessBooks.length = 0

    //Then add to cards 
    this.getBooks();
    this.addBooksToCards();
  }

}
