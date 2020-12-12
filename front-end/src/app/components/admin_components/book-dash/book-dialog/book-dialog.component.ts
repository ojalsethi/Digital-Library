import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../../../services/books.service';
import { Validators } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']  
})
export class BookDialogComponent implements OnInit {

  public _bookForm: FormGroup;

  //ImageFile from input
  imageFile: object;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  //This is the proper imageURL we should receive
  image: string = null;
  
  //object downloadURL
  downloadURL: Observable<string>;
  uploadPercent: string = '0.00';

  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<any>,
              private _bookService: BooksService,              
              private ngFlashMessageService: NgFlashMessageService,
              private afStorage: AngularFireStorage,              
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit() {
    this._bookForm = this._formBuilder.group({
      _id: [],
      Title: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      Category: ['Arts-and-Music', [Validators.required]],
      Available: ['', [Validators.required]],          
    })
  }

  ngDoCheck(){       
        
  }

  onSubmit(){

    //Firebase Image upload should be here 
    
    this.uploadImage();
    

    //Wait until there is a value for this.image
    while(this.image != null){            
      return true;          
    }
       
  }

  commit(){
    const book = {
      title: this._bookForm.value.Title,
      author: this._bookForm.value.Author,
      category: this._bookForm.value.Category,
      image: this.image,
      available: (this._bookForm.value.Available === 'true')
    }
    console.log('Before Registering the book: ', book);
    //Register a book
    this._bookService.registerBook(book).subscribe(data=>{
      console.log('data received: ',data);
      if (data.success) {
        this.dialogRef.close();
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Book Registered Successfully"],         
          dismissible: true,           
          timeout: 3000,          
          type: 'info'
        }); 
      }else{
        this.dialogRef.close();
        this.ngFlashMessageService.showFlashMessage({          
          messages: ["Book Failed to Register"],           
          dismissible: true,           
          timeout: 3000,          
          type: 'danger'
        });
      }
    });  
  }

  changeImage(event){
    //Assigns the attached image to class scope variable
    this.imageFile = event.target.files[0];         
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
      if (this._bookForm.value.Title != '' && this._bookForm.value.Author != '') {
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
