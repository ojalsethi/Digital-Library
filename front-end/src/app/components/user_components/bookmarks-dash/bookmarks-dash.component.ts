import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'bookmarks-dash',
  templateUrl: './bookmarks-dash.component.html',
  styleUrls: ['./bookmarks-dash.component.css']
})
export class BookmarksDashComponent {
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

  constructor(private _userService: UserService){
    this.getUserBookmarksData();
  }


  getUserBookmarksData(){
    //current logged in user
    var loggedUserId = JSON.parse(localStorage.getItem("user")).id.toString();

    this._userService.getBookData(loggedUserId).subscribe(data=>{
      if (data.success) {
        data.user.bookmarks.forEach(element => {
          //You need to remove the duplicates still though
          //if element.category === 'category' push to '#categorybook'
          if (element.category === "Education") {
            this.EducationBooks.push(element)
          } else if (element.category === "Arts-and-Music") {
            this.AMBooks.push(element)
          } else if (element.category === "Computers-and-Tech") {
            this.CTBooks.push(element)
          } else if (element.category === "History") {
            this.HistoryBooks.push(element)
          } else if (element.category === "Biographies") {
            this.BioraphyBooks.push(element)
          } else if (element.category === "Business") {
            this.BusinessBooks.push(element)
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

  borrowBook(book){
    console.log('Borrowing :', book);    
  }

  unFlagBook(book){
    console.log('Unflagging :', book);

    //code here to unflag
    
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
}
