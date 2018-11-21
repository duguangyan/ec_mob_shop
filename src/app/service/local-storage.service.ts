import { Injectable } from '@angular/core';
import {TotastService} from './totast.service';

@Injectable()
export class LocalStorageService {

  constructor() { }

  setItemJson(key,jsonObj){
    let val =JSON.stringify(jsonObj);
    return localStorage.setItem(key,val);
  }
  getItemJson(key){
    return JSON.parse(localStorage.getItem(key));
  }
  //设置数组
  setItemArray(key,val){
    //判断接受数据是否为空
    if(val === undefined ||  val ===''){
      return false;
    }
    if(localStorage.getItem(key)!==undefined && localStorage.getItem(key)!==null){
      if(this.getItemArray(key)[0] === val){
        return false;
      }
      let value = (localStorage.getItem(key)+","+val);
      localStorage.setItem(key,value);
    }else{
      localStorage.setItem(key,val);
    }
  }
  getItemArray(key){
    if(localStorage.getItem(key)!==null){
      return localStorage.getItem(key).split(',').reverse().slice(0,4);;
    }
  }
}
