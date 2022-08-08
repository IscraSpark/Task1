import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserInf, User } from '../../models/interfaces';
import { loginUser } from '../../app-store/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private store: Store
      ) {}
  userdata!: UserInf;
  user!: User;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  getErrorMessage() {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePass() {
    if (this.form.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('password')?.hasError('password')
      ? 'Need to be filled'
      : 'minimum 4';
  }

  submit() {
    const [email, password] = [
      this.form.controls['email'],
      this.form.controls['password'],
    ];
    if (!email.value) {
      //error for no input
      email.markAsTouched();
    } else {
      if (!password.value) {
        password.markAsTouched();
      } else {
        let userdata: UserInf = { email: email.value, password: password.value };

        this.store.dispatch(loginUser({userdata}));
      }
    }
  }

}
