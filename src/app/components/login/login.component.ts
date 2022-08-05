import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import { UserInf, User } from '../../interfaces';
import { loginUser } from '../../reducers/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private route: Router,
    private store: Store
      ) {}
  userdata!: UserInf;
  user!: User;
  sub: Subscription[] = [];
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
        // this.sub.push(
        //   this.auth
        //     .login(this.userdata)
        //     .pipe(catchError((err) => err))
        //     .subscribe((user) => {
        //       this.user = user as User;
        //       localStorage.setItem('user', JSON.stringify(this.user)); // save user data
        //       this.route.navigateByUrl('/dashboard');
        //     })
        // );
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach((el) => el.unsubscribe());
  }
}
