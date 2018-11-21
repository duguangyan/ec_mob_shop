import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title;
  @Input() edit;
  @Output() parentGoBack = new EventEmitter<any>();
  @Output() parentDoEdit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  //返回上一页
  goBack() {
    this.parentGoBack.emit();
  }
  //编辑
  doEdit(){
    this.parentDoEdit.emit();
  }
}
