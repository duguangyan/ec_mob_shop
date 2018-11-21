import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-explain',
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.css']
})
export class ExplainComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }

  //返回
  goback() {
    window.history.go(-1);
  }

}
