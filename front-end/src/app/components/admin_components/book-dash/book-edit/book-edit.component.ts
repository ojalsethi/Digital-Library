import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../../../services/books.service';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { NgFlashMessageService } from 'ng-flash-messages';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  public _editBookForm: FormGroup;

  //ImageFile from input
  imageFile: object;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  //This is the proper imageURL we should receive
  image: string = null;

  //object downloadURL
  downloadURL: Observable<string>;
  uploadPercent: string = '0.00';
  
  constructor(private dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private _bookService: BooksService,    
    private ngFlashMessageService: NgFlashMessageService,
    private afStorage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {      
    this._editBookForm = this._formBuilder.group({
      _id: [],
      Title: [this.data.bookTitle , [Validators.required]],
      Author: [this.data.bookAuthor, [Validators.required]],      
      Category: [this.data.bookCategory, [Validators.required]]
    });
  }

  changeImage(event){
    //Assigns the attached image to class scope variable
    this.imageFile = event.target.files[0];         
  }

  onSubmitEdit() {
     //Firebase Image upload should be here 
    
    this.uploadImage();
    

    //Wait until there is a value for this.image
    while(this.image != null){            
      return true;          
    }   
  }

  commit(){
    
    const editedBook = {
      title: this._editBookForm.value.Title,
      author: this._editBookForm.value.Author,            
      category: (this._editBookForm.value.Category),
      image: this.image      
    }

    //Edit Book - you can't edit the availability through this though
    this._bookService.editBook(this.data.editId, editedBook).subscribe(data=>{
      console.log('On Edit Data received: ', data);
      if (data.success) {
        this.dialogRef.close();
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Book updated successfully"],         
          dismissible: true,           
          timeout: 3000,          
          type: 'info'
        });
      }else{
        this.dialogRef.close();
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Book Failed to update"],           
          dismissible: true,           
          timeout: 3000,          
          type: 'danger'
        });
      }      
    })
  }

  uploadImage(){
    //Firebase Image Upload
    const file = this.imageFile;

    const filePath = `test/${new Date().getTime()}_${file}`;
      
    const fileRef = this.afStorage.ref(filePath);   
    
    const task = this.afStorage.upload(filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe((value) => {
      this.uploadPercent = value.toFixed(2);
      
    });

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(
        () => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => (this.image = url));                    
        }
      )
    )
    .subscribe()
    
  }  

  allSetToGo(){
    var flag = false;
    while (this.image != null) {
      // while an imageURL is returned check if all fields are not empty
      if (this._editBookForm.value.Title != '' && this._editBookForm.value.Author != '') {
        flag = true;
      }
      break;
    }
    return flag;
  }

  imageAvailable(){
    var flag = false;
    while (this.imageFile != undefined) {
      //checks if image upload button is clicked
      flag = true
      break;
    }
    return flag;
  }

}
