import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  constructor(private  httpClient:  HttpClient,
              private http: Http) { }

  API_URL = "http://localhost:3000/api/books";

  getBooks(){
    return this.httpClient.get(this.API_URL);
  }

  getBookById(bookId){
    return this.http.get('http://localhost:3000/api/books/' + bookId)
      .pipe(map((res)=>res.json()));
  }

  registerBook(book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.API_URL, book, { headers: headers })
      .pipe(map((res) => res.json()));
  }

  editBook(bookId, book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/books/' + bookId, book, { headers: headers })
      .pipe(map((res)=>res.json()));
  }

  deleteBook(bookId){
    return this.http.delete('http://localhost:3000/api/books/' + bookId)
    .pipe(map((res) => res.json()));
  }

  borrowBook(bookId, update){
    //patch to make availability false in conf-borrow
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:3000/api/books/' + bookId, update, { headers: headers })
      .pipe(map((res)=>res.json()));
  }

  makeAvailable(bookId, update){
    //Make availability true and pop the borrower in books
    console.log('bookid is :', bookId);
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:3000/api/book/' + bookId, update, { headers: headers })
      .pipe(map((res)=>res.json()));
  }
}

