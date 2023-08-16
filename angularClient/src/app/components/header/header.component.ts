import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/GlobalContant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private route: Router) {}
  isAuthenticate: boolean = false;
  userDetail: any;
  logout() {
    this.userService.logout();
    this.isAuthenticate = false;
    this.route.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userService.userSubject.subscribe((data) => {
      console.log('userDetail', data);
      console.log('zz', Object.keys(data).length);
      if (Object.keys(data).length > 0) {
        console.log('userDetail2', this.userDetail);
        this.userDetail = data;
      } else {
        this.userDetail = localStorage.getItem('userDetail');
        console.log('userDetail1', this.userDetail);
        this.userDetail = JSON.parse(this.userDetail);
      }

      this.isAuthenticate = localStorage.getItem('token') ? true : false;
    });

    if (!this.isAuthenticate) {
      this.route.navigate(['/login']);
    }
  }

  navigateUser() {
    if (Object.keys(this.userDetail).length > 0) {
      this.route.navigate(['/users']);
    } else {
      this.route.navigate(['/login']);
    }
  }
}
