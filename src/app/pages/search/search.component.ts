import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {TotastService} from '../../service/totast.service';
declare var $:any;
declare var layer:any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public seVal1: any;
  public selectVals1:any;
  public seVal2: any;
  public selectVals2: any;
  public seVal3: any;
  public selectVals3: any;
  public chooseBtnVal: string[];
  public isBtnShow: any;
  public imageUrl1: any = '../../../assets/imgs/kbg.png';
  public imageUrl2: any = '../../../assets/imgs/kbg.png';
  public imageUrl3: any = '../../../assets/imgs/kbg.png';
  public img1: any;
  public imgId1: any;
  public isImgUpload: boolean;
  public loading1: boolean = false;
  public loading2: boolean = false;
  public loading3: boolean = false;
  public img2: any;
  public imgId2: any;
  public userId: string;
  public img3: any;
  public imgId3: any;
  public minPrice: any;
  public maxPrice: any;
  public fieldDesc: any;
  public selectNumber: any;
  public params: any;
  public selectNumberOne: number;
  public samplingLinkman: string;
  public samplingNumber: string;
  public samplingAddress: any = '';
  public isLogin: boolean = false;
  public price: any;
  public materialName: any;
  public member_token: string;
  constructor(public httpService: HttpService,
              public sanitizer: DomSanitizer,
              public cd: ChangeDetectorRef,
              public router: Router,
              public totastService: TotastService,
              public titleService: Title) {
    if(!Cookie.load('userName')){
      this.isLogin = true;
    }else{
      this.member_token = Cookie.load('member_token');
    }
  }

  ngOnInit() {
    // 设置头部信息
    this.titleService.setTitle('小鹿快找');
    this.isImgUpload = false;
    this.imageUrl1 = '../../assets/imgs/kbg.png';
    this.imageUrl2 = '../../assets/imgs/kbg.png';
    this.imageUrl3 = '../../assets/imgs/kbg.png';
    this.selectVals1 = ['现货','定制'];
    this.seVal1 = this.selectVals1[0];
    this.chooseBtnVal= ['图片找料','上门取样','寄送样品'];
    this.isBtnShow = 0;
    //this.getSelectVals2(0); // 获取select2数据


    $.fn.extend({

      autoHeight: function(){

        return this.each(function(){

          var $this = $(this);

          if( !$this.attr('_initAdjustHeight') ){

            $this.attr('_initAdjustHeight', $this.outerHeight());

          }

          _adjustH(this).on('input', function(){

            _adjustH(this);

          });

        });

        /**

         * 重置高度

         * @param {Object} elem

         */

        function _adjustH(elem){

          var $obj = $(elem);

          return $obj.css({height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden'})

            .height( elem.scrollHeight );

        }

      }

    });

    // 使用

    $(function(){

      $('textarea').autoHeight();

    });




  }
  //第一个下拉框
  // 第一个 select
  select1Change() {
    if(this.seVal1 ==='现货'){
      this.selectNumberOne =1;
    }else{
      this.selectNumberOne =2;
    }
    console.log(this.seVal1);
  }
  // 切换找料方式
  activeBtn(i){
    this.isBtnShow = i;
  }


  // 获取图片
  onChangeSelectFile(event,index){
    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
    if(index===1){
      const file1 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file1.type)){
        layer.msg('请确保文件为图像类型', {icon: 2,time: 1500});
        // this.totastService.waring("请确保文件为图像类型!");
        return false;
      }
      // 图片验证
      /*var strRegexImg = "(.jpg|.png|.bmp|.tga|.psd|.tif)$";
      var reImg = new RegExp(strRegexImg);
      if (reImg.test(file1.toLowerCase()) == false) {
        this.totastService.waring("请确保文件为图像类型");
        return false;
      }
*/
      const reader1 = new FileReader();
      reader1.readAsDataURL(file1);
      reader1.onload = (e:any)=>{
        this.loading1 = true;
        //就是base64
        this.img1 = e.target.result;
        this.httpService.post('/find/image/upload',{member_token:this.member_token,image:this.img1},(res:any)=>{
          if(res.code>=0){
            event.target.value='';
            this.imageUrl1 = res.data.image_url;
            this.imgId1 = res.data.image_id;
            this.isImgUpload = false;
            this.imgLoad(this.imgId1);
            $(".search-del-btn").eq(index-1).css('display','block');
            console.log(this.imgId1);
            console.log(this.imageUrl1);
          }else{
            this.totastService.waring("图片上传失败!");
          }

        })
      }
      //this.imageUrl1 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file1));
    }else if(index===2){

      const file2 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file2.type)){
        layer.msg('请确保文件为图像类型', {icon: 2,time: 1500});
        // this.totastService.waring("请确保文件为图像类型!");
        return false;
      }
      this.loading2 = true;
      const reader2 = new FileReader();
      reader2.readAsDataURL(file2);

      reader2.onload = (e:any)=>{
        this.loading2 = true;
        // 就是base64
        this.img2 = e.target.result;

        this.httpService.post('/find/image/upload',{member_token:this.member_token,image:this.img2},(res:any)=>{
          if(res.code>=0){
            event.target.value='';
            this.imageUrl2 = res.data.image_url;
            this.imgId2 = res.data.image_id;
            this.isImgUpload = false;
            this.imgLoad(this.imageUrl2);
            $(".search-del-btn").eq(index-1).css('display','block');
            console.log(this.imgId2);
            console.log(this.imageUrl2);
          }else{
            this.totastService.waring("图片上传失败!");
          }
        })
      }
      //this.imageUrl2 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file2));
    }else if(index===3){

      const file3 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file3.type)){
        layer.msg('请确保文件为图像类型', {icon: 2,time: 1500});
        // this.totastService.waring("请确保文件为图像类型!");
        return false;
      }
      this.loading3 = true;
      const reader3 = new FileReader();
      reader3.readAsDataURL(file3);

      reader3.onload = (e:any)=>{
        // 就是base64
        this.img3 = e.target.result;
        this.httpService.post('/find/image/upload',{member_token:this.member_token,image:this.img3},(res:any)=>{
          if(res.code>=0){
            event.target.value='';
            this.imageUrl3 = res.data.image_url;
            this.imgId3 = res.data.image_id;
            this.isImgUpload = false;
            this.imgLoad(this.imageUrl3);
            $(".search-del-btn").eq(index-1).css('display','block');
            console.log(this.imgId3);
            console.log(this.imageUrl3);
          }else{
            this.totastService.waring("图片上传失败!");
          }

        })

      }
      //this.imageUrl3 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file3));
    }
    console.log(this.isImgUpload);
    this.cd.markForCheck();
    this.cd.detectChanges();

  }

  // 获取selectVals2的数据
  /*getSelectVals2(id) {
    this.getSelectVal(id).subscribe((res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.selectVals2 = res.data;
        this.seVal2 = res.data[0].name;
        // 获取selectVals3的数据
        this.getSelectVal(this.selectVals2[0].id).subscribe(( ress:any)=>{
          if(ress.code>=0){
            this.selectVals3 = ress.data;
            this.seVal3 = ress.data[0].name;
            this.selectNumberTodo();
          }
        })
      }
      this.cd.markForCheck();
      this.cd.detectChanges();

    })

  }*/
  /*getSelectVal(id) {
    return this.httpService.get('/item/category/get?parent_cid='+id,{});
  }*/

  // 获取选项号码
  selectNumberTodo(){
    for(let i=0;this.selectVals3.length>i;i++){
      if(this.seVal3 === this.selectVals3[i].name){
        this.selectNumber = this.selectVals3[i].id;
        // alert(this.selectNumber);
      }
    }
  }

  // 第二个 select
  /*select2Change(seVal2) {
    for(let i=0;this.selectVals2.length>i;i++){
      if(seVal2 === this.selectVals2[i].name){
        const index = this.selectVals2[i].id;
        console.log(this.selectVals2);

        this.getSelectVal(index).subscribe((res:any)=>{
          if(res.code>=0){
            this.selectVals3 = res.data;
            this.seVal3 = res.data[0].name;
            this.selectNumberTodo();
          }else{
            this.totastService.error('网络慢，请稍后再试!');
          }
        })
      }
    }
    this.cd.markForCheck();
    this.cd.detectChanges();
  }*/
  // 第三个 select
  select3Change() {
    //console.log(seVal3);
    this.selectNumberTodo();
  }

  //去支付页面
  goPayment(selectIndex) {
    /*if(!(/^\d+(?:\.\d{1,4})?$/.test(this.minPrice))){
      this.totastService.waring('请输入正确的价格');
      return false;
    }else if(!(/^\d+(?:\.\d{1,4})?$/.test(this.maxPrice))){
      this.totastService.waring('请输入正确的价格');
      return false;
    }else if(parseFloat(this.maxPrice) < parseFloat(this.minPrice)){
      this.totastService.waring('价格范围输入不正确');
      return false;
    }else */
    if(this.fieldDesc === '' || this.fieldDesc === undefined){
      this.totastService.waring('请填写描述');
      return false;
    }
    this.params = {
      price_range:this.price,
      u_cname:this.materialName,
      field_desc:this.fieldDesc,
      sampling_type:selectIndex
      /*cid:this.selectNumber,
      sampling_type:selectIndex,
      min_price:this.minPrice,
      max_price:this.maxPrice,
      field_desc:this.fieldDesc,
      source_type:this.selectNumberOne,
      cname:this.seVal2 +' '+this.seVal3*/
    }
    if(selectIndex ===1){
      if(!this.isImgUpload){
        this.totastService.waring('请等待上传图片');
        return false;
      }
      console.log(this.imgId1);
      console.log(this.imgId2);
      console.log(this.imgId3);
      this.params.img1 = this.imgId1;
      this.params.img2 = this.imgId2;
      this.params.img3 = this.imgId3;

      this.httpService.post('/find/demand/add',this.params,(res:any)=>{
        if(res.code>=0){
          this.router.navigate(['payment'],{ queryParams : res.data });
        }else{
          this.totastService.waring('找料添加失败!');
        }
      })


    }else if(selectIndex ===2){
      if(this.samplingLinkman === ''){
        this.totastService.waring('请填写联系人');
        return false;
      }else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.samplingNumber))){
        this.totastService.waring('请填写联系电话');
        return false;
      }else if(this.samplingAddress === '' || this.samplingAddress === null ){
        this.totastService.waring('请填写取样地址');
        return false;
      }
      this.params.sampling_linkman = this.samplingLinkman;
      this.params.sampling_number = this.samplingNumber;
      this.params.sampling_address = this.samplingAddress;

      this.httpService.post('/find/demand/add',this.params,(res:any)=>{
        if(res.code>=0){
          this.router.navigate(['payment'],{ queryParams : res.data });
        }else{
          this.totastService.waring('找料需求添加失败!');
        }

      })
    }else if(selectIndex ===3){

      this.httpService.post('/find/demand/add',this.params,(res:any)=>{
        if(res.code>=0){
          this.router.navigate(['payment'],{ queryParams : res.data });
        }else{
          this.totastService.waring('找料需求添加失败!');
        }
      })
    }
  }

  //是否登录
  toLogin(){
    this.isLogin = false;
    this.router.navigate(['login']);
  }

  // 判断图片是否加载完毕
  imgLoad(img){
    var qim=new Image();//新建一个图片；
    qim.src=img;//图片地址是你准备要加载的地址；
    var timer = setInterval(()=>{
      if(qim.complete){
        //alert(1);
        clearInterval(timer);
        this.isImgUpload = true;
      }
    },500)
  }

  // 删除图片
  delImg(index){
    if(index === 1){
      this.imageUrl1 = '../../../assets/imgs/kbg.png';
      this.loading1 = false;
      this.imgId1 = null;
      $(".search-del-btn").eq(index-1).css('display','none');
    }else if(index ===2){
      this.imageUrl2 = '../../../assets/imgs/kbg.png';
      this.loading2 = false;
      this.imgId2 = null;
      $(".search-del-btn").eq(index-1).css('display','none');
    }else if(index ===3){
      this.imageUrl3 = '../../../assets/imgs/kbg.png';
      this.loading3 = false;
      this.imgId3 = null;
      $(".search-del-btn").eq(index-1).css('display','none');
    }
  }



}
