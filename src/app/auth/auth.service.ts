import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserInf } from '../models/interfaces';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserInf): Observable<User>{
    return this.http.post<User>('http://ds-test-api.herokuapp.com/api/login', user)
  }

}
