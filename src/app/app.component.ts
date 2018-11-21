import {Component, OnInit} from '@angular/core';
import {Router,NavigationEnd } from '@angular/router';
import {routeAnimation} from './pages/common/animate/router-anima';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
/*  animations: [routeAnimation]*/
})

export class AppComponent implements OnInit{
  public username: string;
  // router跳转动画所需参数
  /*routerState:boolean = true;
  routerStateCode:string = 'active';*/
  constructor(
    public router: Router
  ) {
    /*全局路由动画*/
    /*this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 每次路由跳转改变状态
        this.routerState = !this.routerState;
        this.routerStateCode = this.routerState ? 'active' : 'inactive';
      }
    });*/
  }
  ngOnInit() {
    // this.router.navigate(['home']);
  }
  public onDeactivate() {
    window.scrollTo(0, 0);
  }


}
