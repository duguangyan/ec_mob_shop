import { Injectable } from '@angular/core';

declare var layer: any;

@Injectable()
export class TotastService {

  constructor() { }

  success(msg){
    layer.msg(msg || '请求成功', {icon: 1,time: 1000});
  }

  error(msg){
    layer.msg(msg || '请求失败', {icon: 3,time: 1000});
  }

  waring(msg){
    layer.msg(msg || '请求失败', {icon: 2,time: 1000});
  }

  confirm(msg,fun){
    layer.open({
      title: [
        msg,
        'background-color:#8DCE16; color:#fff;'
      ]
      ,anim: 'up'
      ,content: '展现的是全部结构'
      ,btn: ['确认', '取消']
      ,yes:(index) => {
        layer.close(index);
        fun();
      }
    });
  }

  open(msg,fun){
    layer.open({
      title: [
        '',
        'background-color:#8DCE16; color:#fff; display:none'
      ]
      ,anim: 'up'
      ,content: msg
      ,btn: ['确认']
      ,yes:(index)=>{
        layer.close(index);
        fun();
      }
    });
  }
}
