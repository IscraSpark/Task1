import { Injectable } from '@angular/core';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserRole(){
    return JSON.parse(localStorage.getItem('user') as string).role;
  }

  removeUser(){
    localStorage.removeItem('user');
  }

}


