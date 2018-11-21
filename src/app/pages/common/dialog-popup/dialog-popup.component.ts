import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut } from '../../common/animate/sim-anim';
@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.css'],
  animations: [fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut]
})
export class DialogPopupComponent implements OnInit {
  @Input() msg:any;
  @Output() parentClose = new EventEmitter<any>();
  @Output() parentDoOK = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  close(){
    this.parentClose.emit();
  }
  doOK(){
    this.parentDoOK.emit();
  }
}
