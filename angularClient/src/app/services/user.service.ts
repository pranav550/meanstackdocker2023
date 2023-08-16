import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/GlobalContant';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = GlobalConstants.apiURL;
  public userSubject = new BehaviorSubject({});
  //public userSubject = new Subject<{}>();

  constructor(private http: HttpClient) {}

  getUsers() {
    Headers;
    return this.http.get(this.url + '/users');
  }

  getSingleUser(id: string) {
    return this.http.get(this.url + '/user/' + id);
  }

  login(data: any) {
    return this.http.post(this.url + '/login', data);
  }

  register(data: any) {
    return this.http.post(this.url + '/register', data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetail');
    GlobalConstants.isAuthenticated = false;
  }

  userDetail(data: any) {
    this.userSubject.next(data);
  }

  updateUser(data: any, id: any) {
    return this.http.put(this.url + '/user/' + id, data);
  }

  deleteUser(id: any) {
    return this.http.delete(this.url + '/user/' + id);
  }
}
