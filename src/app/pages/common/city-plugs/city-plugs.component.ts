import {Component, EventEmitter, OnInit, Output} from '@angular/core';
declare var LArea:any;
declare var LAreaData:any;
declare var $:any;
@Component({
  selector: 'app-city-plugs',
  templateUrl: './city-plugs.component.html',
  styleUrls: ['./city-plugs.component.css']
})
export class CityPlugsComponent implements OnInit {
  @Output() parentGetValue = new EventEmitter<any>();

  public inputValue:any = '广东省,广州市,花都区';
  constructor() { }

  ngOnInit() {
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
    var area1 = new LArea();
    area1.init({
      'trigger': '#cityCheck', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
      'valueTo': '#cityValue', //选择完毕后id属性输出到该位置
      'keys': {
        id: 'id',
        name: 'name'
      }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
      'type': 1, //数据源类型
      'data': LAreaData //数据源
    });
    area1.value=[1,23,6];//控制初始位置，注意：该方法并不会影响到input的value
  }

  //获取数据
  getValue(){
    this.parentGetValue.emit(this.inputValue);
  }
}
