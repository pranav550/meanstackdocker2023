import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/GlobalContant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm;
  errorMsg: any = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log(this.loginForm);
    console.log(this.loginForm.value);
    this.loginCall(this.loginForm.value);
  }

  loginCall(data: any) {
    this.userService.login(data).subscribe(
      (data1: any) => {
        console.log('response', data1.data.token);
        if (data1.data['token']) {
          console.log('response111', data);
          GlobalConstants.isAuthenticated = true;
          localStorage.setItem('userDetail', JSON.stringify(data.data));
          localStorage.setItem('token', data1.data['token']);
          this.userService.userDetail(data1.data);
          this.router.navigateByUrl('/users', { state: data1.data });
        }
      },
      (err) => {
        console.log('xxxxxxxxxxxxxxxxx2', err);
        this.errorMsg = err;
        document.getElementById('hdeModal')?.click();
      }
    );
  }
}
