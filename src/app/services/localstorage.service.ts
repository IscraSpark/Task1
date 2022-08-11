import { Injectable } from '@angular/core';
import { IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setUser(user: IUser){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserRole(){
    return JSON.parse(localStorage.getItem('user') as string).role;
  }

  removeUser(){
    localStorage.removeItem('user');
  }

}


