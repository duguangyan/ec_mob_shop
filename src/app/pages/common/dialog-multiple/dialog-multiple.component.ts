import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut } from '../../common/animate/sim-anim';
@Component({
  selector: 'app-dialog-multiple',
  templateUrl: './dialog-multiple.component.html',
  styleUrls: ['./dialog-multiple.component.css'],
  animations: [fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut]
})
export class DialogMultipleComponent implements OnInit {
  @Input() multipleList:any;
  @Output() parentMultiple = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  multiple(msg){
    if(msg == this.multipleList[0]){
      return false;
    }
    this.parentMultiple.emit(msg);
  }
}
