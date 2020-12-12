import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { BooksService } from '../../../../services/books.service';
import { BookDelWarnComponent } from './book-del-warn/book-del-warn.component';
import { BookDashComponent } from '../book-dash.component';
import { BookEditComponent } from '../book-edit/book-edit.component';

import { Book } from '../../../../models/Book';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  bookdata: any

  displayedColumns = ['title', 'author', 'category', 'image', 'available', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private bookService: BooksService,
              private userService: UserService,
              private dialog?: MatDialog) {              
              
  }

  ngOnInit() {
    this.refreshAPIData();
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBook(bookID, titleVal, authorVal, availVal, catVal){
    
    console.log('Editing Book: ',bookID);  

    // code here to edit book
    const dialogRef = this.dialog.open(BookEditComponent,{
      height: '560px',
      width: '600px',
      data: {editId:bookID, 
             bookTitle:titleVal , 
             bookAuthor:authorVal , 
             bookAvailability:availVal,
             bookCategory:catVal
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit-dialog was closed'); 
      this.refreshAPIData();
    });

  }

  refreshAPIData(){
    //Dynamic Data check bro this was the only way
    return this.bookService.getBooks().subscribe((dataBooks: Book[]) => {
      this.dataSource.data = dataBooks;
    });
  }

  deleteBook(bookID){
    
    console.log('Deleting Book ID: ', bookID);

    // code here to delete book

    const dialogRef = this.dialog.open(BookDelWarnComponent, {      
      data: {deleteID: bookID}
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete-dialog was closed'); 
      this.refreshAPIData();
    });
    
  }

  makeBookAvailable(bookID){
    console.log('trying to make', bookID, 'available');

    //For patching the book with available true
    var update = {
      available: true
    }
    var borrowBook = {
      bookId: bookID
    }

    this.bookService.makeAvailable(bookID, update).subscribe(data=>{
      console.log('book datas id: ', data.borrowedUser._id);    
      //Remove the BookObject from the user.borrows
      if (data.success) {
        this.userService.removeBorrows(borrowBook, data.borrowedUser._id).subscribe(subData=>{
          console.log('Book made available and removed from user.borrows');                    
        })
      }      
      this.refreshAPIData();      
    })


    
  }
}




