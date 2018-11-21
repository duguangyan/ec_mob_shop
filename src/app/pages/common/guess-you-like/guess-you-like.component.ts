import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guess-you-like',
  templateUrl: './guess-you-like.component.html',
  styleUrls: ['./guess-you-like.component.css']
})
export class GuessYouLikeComponent implements OnInit {
  public guessYouLikeData: any;

  constructor(public httpService: HttpService,
              public router:Router) { }

  ngOnInit() {
    this.getGuessYouLikeData();
  }

  // 获取找你喜欢数据
  getGuessYouLikeData(){
    this.httpService.get('/item/product/recommend?num=10',{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.guessYouLikeData = res.data;
      }
    })
  }

  // 去详情页面
  goDetail(id){
    this.router.navigate(['home-product-details'],{queryParams:{id}});
  }

}
