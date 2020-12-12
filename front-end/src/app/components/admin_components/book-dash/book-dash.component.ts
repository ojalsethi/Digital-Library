import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BooksService } from '../../../services/books.service';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { BookTableComponent } from './book-table/book-table.component';

@Component({
  selector: 'book-dash',
  templateUrl: './book-dash.component.html',
  styleUrls: ['./book-dash.component.css']
})
export class BookDashComponent {

  @ViewChild(BookTableComponent) tablecomp: BookTableComponent

  innerWidth: number

  constructor(private dialog?: MatDialog,
              private bookService?: BooksService,
              ){}

  cards = [
    { title: '', cols: 2, rows: 2 }
  ];

  isMobileDashboard() {
    // Return false for web view.

    if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
      return false;
    }
    return true;
  }

  addBook(){    
    console.log('Adding a book');
    // code here
    const dialogRef = this.dialog.open(BookDialogComponent, {
      height: '575px',
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Add-Book-Dialog was closed');
      this.tablecomp.refreshAPIData();
    });
    
  }
}
