import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminAuthToken: any;
  authToken: any;
  user: any;
  admin: any;


  constructor(private http: Http,
              private jwtHelper: JwtHelperService,
              ) { }

  

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/register', user, { headers: headers })
      .pipe(map((res) => res.json()));

  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/authenticate', user, { headers: headers })
      .pipe(map((res) => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/user/profile', { headers: headers })
      .pipe(map((res) => res.json()));
  }

  getAdminProfile() {
    let adminheaders = new Headers();
    this.loadAdminToken();
    adminheaders.append('Authorization', this.adminAuthToken);
    adminheaders.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/user/profile', { headers: adminheaders })
      .pipe(map((res) => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  storeAdminData(admintoken, admin){
    localStorage.setItem('admin_id_token', admintoken);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.adminAuthToken = admintoken;
    this.admin = admin;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadAdminToken(){
    const token = localStorage.getItem('admin_id_token');
    this.adminAuthToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  adminLogout() {
    this.adminAuthToken = null;
    this.admin = null;
    localStorage.clear();
  }

  isLoggedIn() {
    const token: string = localStorage.getItem('id_token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  isAdminLoggedIn(){            
    const adminToken: string = localStorage.getItem('admin_id_token');    
    return adminToken != null && !this.jwtHelper.isTokenExpired(adminToken);
  }
}
