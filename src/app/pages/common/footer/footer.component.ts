import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../../../service/http.service';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() select;
  public shoppingCartNumber: any ='';
  constructor(public router: Router,public httpService:HttpService) { }

  ngOnInit() {
    // 获取购物车数量
    if(Cookie.load('member_token') !=null){
      this.getShoppingCartNumber();
    }
  }
  ngAfterContentInit(){
    setTimeout(()=>{
      this.select = this.select - 1;
      $(".footer a").eq(this.select).addClass('main-active');
    },1)
  }

  // 获取购物车数量
  getShoppingCartNumber(){
    this.httpService.get('/ec/cart/count?v=1',{},(res:any)=>{
      if(res.code>=0){
        this.shoppingCartNumber = res.data;
        if(this.shoppingCartNumber>=100){
          this.shoppingCartNumber = '99+';
        }
      }
    })
  }
}
