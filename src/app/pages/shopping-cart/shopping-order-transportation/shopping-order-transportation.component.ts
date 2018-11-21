import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-order-transportation',
  templateUrl: './shopping-order-transportation.component.html',
  styleUrls: ['./shopping-order-transportation.component.css']
})
export class ShoppingOrderTransportationComponent implements OnInit {
  public title:any = '物流详情';
  constructor() { }

  ngOnInit() {
  }
  // 返回上一级
  goBack(){
    window.history.go(-1);
  }
}
