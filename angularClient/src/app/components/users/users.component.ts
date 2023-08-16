import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from 'src/app/common/GlobalContant';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  singleUser: any;
  updateForm: any;
  selectedId: any;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
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
    return this.updateForm.get('firstname');
  }

  get email(): any {
    return this.updateForm.get('email');
  }

  get gender(): any {
    return this.updateForm.get('gender');
  }

  get password(): any {
    return this.updateForm.get('password');
  }

  get mobile(): any {
    return this.updateForm.get('mobile');
  }

  onSubmit() {
    console.log(this.updateForm);
    console.log(this.updateForm.value);
    this.updateUserCall(this.updateForm.value);
  }

  ngOnInit() {
    GlobalConstants.userDetail = history.state;
    this.userListing();
  }

  userListing() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  viewUser(id: string) {
    this.userService.getSingleUser(id).subscribe((response) => {
      console.log('response', response);
      this.singleUser = response;
    });
  }

  updateUserCall(data: any) {
    this.userService
      .updateUser(data, this.selectedId)
      .subscribe((data: any) => {
        console.log('updated response', data);
      });
    this.updateForm.reset();
    this.closeModal('editModal');
  }

  editUser(id: any) {
    console.log('userID', id);
    this.selectedId = id;
    this.viewUser(this.selectedId);
  }

  closeModal(val: any) {
    let elem: HTMLElement | null = document.getElementById(val);
    if (typeof elem !== null && elem !== undefined) {
      elem?.click();
    }
  }

  deleteUser(id: any) {
    this.selectedId = id;
  }

  removedUser() {
    this.userService.deleteUser(this.selectedId).subscribe((data: any) => {
      console.log('delete response', data);
    });

    this.closeModal('deleteModal');
    this.userListing();
  }
}
