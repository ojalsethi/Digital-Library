import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  addToBookmark(bookId, userId){
    let headers = new Headers();      
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/bookmark/' + userId, bookId, { headers: headers })
      .pipe(map((res)=>res.json()));
  }

  getUserDatabyId(userId){        
    return this.http.get('http://localhost:3000/user/'+userId)
      .pipe(map((res) => res.json()));
  }

  addToBorrows(bookId, userId){
    let headers = new Headers();      
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/borrow/'+ userId, bookId, { headers: headers })
      .pipe(map((res)=>res.json()));
  }

  removeBorrows(bookId, userId){
    let headers = new Headers();      
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/drop/' + userId, bookId, { headers: headers })
      .pipe(map((res)=>res.json()));
  }

  getBookData(userId){
    return this.http.get('http://localhost:3000/user/'+userId)
      .pipe(map((res)=>res.json()));
  }

  getAllUsers(){
    //get all users data
    return this.http.get('http://localhost:3000/user/')
      .pipe(map((res)=>res.json()));
  }
}
