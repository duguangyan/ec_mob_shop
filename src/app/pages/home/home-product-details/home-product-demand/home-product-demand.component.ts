import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-product-demand',
  templateUrl: './home-product-demand.component.html',
  styleUrls: ['./home-product-demand.component.css']
})
export class HomeProductDemandComponent implements OnInit {
  public title:any = '索样';
  constructor() { }

  ngOnInit() {
  }
  //返回上一级
  goBack(){
    window.history.go(-1);
  }
}
