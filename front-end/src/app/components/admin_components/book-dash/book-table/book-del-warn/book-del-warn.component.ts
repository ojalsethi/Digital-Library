import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgFlashMessageService } from 'ng-flash-messages';
import { BooksService } from '../../../../../services/books.service';


@Component({
  selector: 'app-book-del-warn',
  templateUrl: './book-del-warn.component.html',
  styleUrls: ['./book-del-warn.component.css']
})
export class BookDelWarnComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,              
              private _bookService: BooksService,              
              private ngFlashMessageService: NgFlashMessageService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit() {
    
  }

  confirmDelete(){
    //Code here to delete after warn

    console.log('This will be removed: ', this.data.deleteID);

    this._bookService.deleteBook(this.data.deleteID).subscribe(Rdata => {
      console.log('delete status ', Rdata);
      if (Rdata.success) {
        this.dialogRef.close();
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Deleted Successfully"],         
          dismissible: true,           
          timeout: 8000,          
          type: 'info'
        });        
      } else {
        this.dialogRef.close();
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Failed to delete"],           
          dismissible: true,           
          timeout: 8000,          
          type: 'danger'
        });
      }
    })
    
  }

}
