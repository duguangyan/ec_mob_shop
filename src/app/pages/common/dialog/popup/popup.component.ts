import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Output() toLogin = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  //去登录
  login() {
    this.toLogin.emit();
  }

}
