import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut } from '../../common/animate/sim-anim';
@Component({
  selector: 'app-payment-choice',
  templateUrl: './payment-choice.component.html',
  styleUrls: ['./payment-choice.component.css'],
  animations: [fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut]
})
export class PaymentChoiceComponent implements OnInit {
  //public checkIndex :any = 2;
  @Input() checkIndex ;
  @Output() parentDoOk = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  //选择支付方式
  doCheckIndex(i){
    this.checkIndex = i;
  }

  //确定
  doOk(){
    this.parentDoOk.emit(this.checkIndex);
  }
}
