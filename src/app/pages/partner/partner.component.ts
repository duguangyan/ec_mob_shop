import { Component, OnInit } from '@angular/core';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  public isCheck:any = true;
  public company:any ='';
  public name:any ='';
  public city:any ='';
  public describe:any ='';
  constructor(public totastService:TotastService,public httpService:HttpService) { }

  ngOnInit() {
  }

  doCheck(){
    this.isCheck = !this.isCheck;
  }

  submit(){
    if(this.company ==''){
      this.totastService.waring('请填写公司名称')
      return false;
    }
    if(this.name ==''){
      this.totastService.waring('请填写联系人')
      return false;
    }
    if(this.city ==''){
      this.totastService.waring('请填写城市名称')
      return false;
    }
    if(this.describe ==''){
      this.totastService.waring('请填写描述')
      return false;
    }
    let params = {
      name:this.company,
      type:this.isCheck?1:2,
      contacts:this.name,
      city:this.city,
      description:this.describe
    }
    this.httpService.post('/find/city_partner/store',params,(res:any)=>{
        if(res.code>=0){
          this.totastService.success('添加成功');
        }else{
          this.totastService.waring('添加失败');
        }
    })

  }
}
