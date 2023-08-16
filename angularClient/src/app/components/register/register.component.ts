import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }

  get firstname(): any {
    return this.registerForm.get('firstname');
  }

  get email(): any {
    return this.registerForm.get('email');
  }

  get gender(): any {
    return this.registerForm.get('gender');
  }

  get password(): any {
    return this.registerForm.get('password');
  }

  get mobile(): any {
    return this.registerForm.get('mobile');
  }

  onSubmit() {
    console.log(this.registerForm);
    console.log(this.registerForm.value);
    this.registerCall(this.registerForm.value);
  }

  registerCall(data: any) {
    this.userService.register(data).subscribe((data: any) => {
      console.log('register response', data);
      this.router.navigate(['/login']);
    });
  }
}
