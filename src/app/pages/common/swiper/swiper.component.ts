import {Component, Input, OnInit} from '@angular/core';
declare var Swiper:any;

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent implements OnInit {
  public mySwiper: any;
  @Input() imgs;
  constructor() { }

  ngOnInit() {
    //轮播图
    setTimeout(()=>{
      this.swiper();
    },500)

  }
  //轮播图
  swiper(){
    //首页轮播
    this.mySwiper = new Swiper('.swiper-container', {
      /*autoplay:true,*/
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });
  }
}
