import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: Http) { }

  sendNotification(message){
    let headers = new Headers();      
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notification', message, { headers: headers })
      .pipe(map((res) => res.json()));
  }

  getAllNotifications(){
    return this.http.get('http://localhost:3000/notification')
      .pipe(map((res) => res.json()));
  }

  deleteNotificationById(notiId){
    return this.http.delete('http://localhost:3000/notification/' + notiId)
      .pipe(map((res) => res.json()));
  }
  
}
