import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css'],
})
export class GlobalErrorComponent implements OnInit {
  ngOnInit(): void {}
  showModal() {
    console.log('show');
    document.getElementById('hdeModal')?.click();
  }

  hideModal() {
    console.log('hide');
  }
}
