<template>
  <div class="csgo">

       <div class="bg">
            <img  src="../assets/ROLL/1.jpg" alt="">
        </div>
        <!-- <div class="ROLLfuli">
            个人中心
        </div> -->
        <div class="diceng" v-show="knowimg">
          <img class="diceng_bg" src="../assets/ROLL/8.png" alt="">
          <div class="dicent_text">微信、云闪付通道维护中~暂时关闭，请关注其他方式</div>
          <div class="know" v-cursor @click="know">知道了</div>
          <!-- <img src="../assets/ROLL/9.png" class="know" @click="know" alt=""> -->
        </div>
          <div class="box_left_box">
          <!-- <div class="box_left"> -->
              <!-- <publicBoxLeft class="public_box" v-for="(item,index) in list" :key="index"></publicBoxLeft> -->
          <!-- </div> -->
           <div class="box_right">
               <!-- 个人信息 -->
                <div class="message_box">
                        <img class="img" src="../assets/myCenter/2.png" alt="">
                        <div class="message_box_left">
                            <div class="header_box">
                                <img src="../assets/myCenter/3.png" alt="">
                            </div>
                            <div class="header_right_box">
                                <p>个人信息</p>
                                <p>{{message.nickName}}</p>
<!--                                <img src="../assets/myCenter/4.png" alt="">-->
                            </div>
                        </div>
                        <div class="message_box_center">
                                 <p>账户余额</p>
                                <p>${{message.money}}</p>
                                <div class="chognzhi_box">
                                    <div class="div" @click="topUp" v-cursor>
                                        <div class="xie"></div>
                                        充值
                                    </div>
                                    <!-- <div class="youhuaxie_box">
                                        <div class="youhuaxie"></div>
                                         我的优惠券
                                        </div> -->
                                </div>
                        </div>
                        <div class="message_box_right">
                                <p>当前积分</p>
                                <p>敬请期待</p>
                                <div class="chognzhi_box1">
                                    <div class="div1">
                                        <div class="xie1"></div>
                                        我要积分
                                    </div>
                                </div>
                        </div>
                </div>

            <!-- steam交易链接 -->
            <!-- <div class="steam_box">
                <img class="steam_img_bg" src="../assets/myCenter/5.png" alt="">
                <div class="steam_box_sizing">
                    <div class="p">
                        <p>steam交易链接</p>
                        <p class="p11">{{transactionUrl}}</p>
                    </div>
                    <img class="steam_img_lianjie" src="../assets/myCenter/6.png" alt="" @click="changeSteamLink">
                    <img src="../assets/myCenter/7.png" alt="">
                </div>
               
            </div> -->
               <!--更换交易链接弹窗-->
               <div class="steam_box_tip" v-show="tipState">
                    <img src="../assets/myCenter/change.png">
                    <img src="../assets/myCenter/changeBtn.png">
                    <input type="text" v-on:keyup.enter = "changeSteamLink" ref="steamLink" placeholder="请更换交易链接"/>
                    <button @click="changeSteamLink">更换</button>
               </div>


               <div class="hengxian_box">
                    <div class="right_top_heng">
                        <img src="../assets/csgo/1.png" alt="">
                        <p>我的背包</p>
                        <img class="hengxian" src="../assets/myCenter/8.png" alt="">
                        <div class="all_button" @click="selectChangeAll" v-cursor>
                            <div class="ling"></div>
                            <div class="all">{{itemall}}</div>
                            <div class="disnone"  v-show="disnone">
                                <div v-for="(item,index) in changeAll" @click="handleItemall(index)" :key='item'>{{item}}</div>
                            </div>
                        </div>
                         <!-- <div class="all_button">
                            <div class="ling"></div>
                            <div class="all">CSGO</div>
                        </div> -->
                         <div class="all_button" @click="selectChange" v-cursor>
                            <div class="ling"></div>
                            <div class="all" >{{changeitem}}</div>
                            <div class="disnone1" v-show="disnone1">
                                <div v-for="(item,index) in change" :key='item' @click="handleDsnone(index,item)">{{item}}</div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="Double_box">
                       <publicDobleColor
                       class="doblebox" 
                       v-for="(item,index) in list" 
                       :key="index"
                       :name="item.type"
                       :nametype='item.name'
                       :img1="item.image"
                       :img_state_show='item.state'
                       :price="item.price"
                       @getGood='getGoods(item.id,index)'
                       @sellGood='sellGoods(item.id,index)'
                       :borde_color='item.kev'
                       ></publicDobleColor>
                    </div>
               </div>

               <!-- 分页 -->
                <fenye :total="total" :currentPage='current'  :pageLength="pageLength" @pagechange="pagechange"></fenye>
          </div>
      </div>

      <div class="recharge" v-show="recharge">
          <recharge @next="handleClickNext" @changeExit="handleBack_bg"></recharge>
      </div>
      <div v-show="Jutiprice">
            <rechargeMoney
            @goback='handleCkickGoback'
            @qrPage="handleClickNextQr"
            @changeExit="handleBack_bg"
            :price="price"
            :payment="payment"
            ></rechargeMoney>
      </div>
      <div v-if="qrCode">
          <reQRCode
              @goback='handleCodeGoback'
              @changeExit="handleBack_bg"
              :price="price"
              :payment="payment"
          ></reQRCode>
      </div>

      <div v-show="back_bg" @click="handleBack_bg" class="black_bg"></div>
  </div>
</template>

<script>
import Bus from '../axios/Bus'

import {ChangeSteamLink,PersonalBag} from "../axios/PersonalApi";
const publicBoxLeft  = ()=> import ("../components/publicBoxLeft");  //异步加载组件
const publicDobleColor = ()=>import ('../components/publicDobleColor');
const linxingBox =()=>import('../components/lingxingBox')
import {
    GetPeople,
    GetProplePrice,
    postGetGood,
    postSellGood,
    PostPayalipy,
    getFirexchangeMall
} from '../axios/Apilogin';

import recharge from './recharge'
import rechargeMoney from './rechargeMoney'
import fenye from '../components/fenye'
// import reQRCode from './reQRCode'
const reQRCode =()=>import('./reQRCode')
import { Message } from 'element-ui';
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
  name: '',
  components: {
    publicBoxLeft,
    publicDobleColor,
    linxingBox,
    recharge,
    rechargeMoney,
    reQRCode,
    fenye
  },
  data() {
    return {
        knowimg:true,
        total: 1,     //记录总条数
        pageLength: 24,//每页显示条数
        current: 1,   //当前的页数
        pageNum:1,
        itemall:'全部',
        changeitem:'请选择',
        change:[
            
            '印花及武器箱',
            '铭牌',
            '贴纸',
            '刀',
            '音乐盒',
            '手枪',
            '步枪',
            '散弹枪',
            '冲锋枪',
            '机枪',
            '手套',
            '探员',
        ],
        changeAll:[
            '全部',
            '等待发货',
            '已发货',
            '已售出',
        ],
        disnone:false,
        disnone1:false,
        goodsName:null,
        price:0,
        payment:0,
        Jutiprice:false,  //具体金额按钮
        back_bg:false,  //背景按钮
        qrCode:false,//二维码显示
        recharge:false,  //选择金额按钮
        transactionUrlTrue:'',  //储存正确的交易链接
        transactionUrl:'',  //储存交易链接
        header:require('../assets/myCenter/3.png'),
        tipState:false,
        box:[
          {

          },
          {

          },
           {

          },
          {

          },
           {

          },
          {

          },
           {

          },
          {

          },

        ],
        message:'',
        list:[]
    }
  },
  created(){
      var that=this;
      Bus.$on('fourceMycenter',data=>{   //事件总线，为了刷新当前页面
          if(data===1){ 
            that.MycenterGetProplePrice();  //获取钱包
             const params={
                'pageNum':this.pageNum,
                'pageSize':this.pageLength
            }
            that.MycenterGetPeople(params);
            
          }
      })
      Bus.$on('shuaxin',data=>{   //事件总线，为了刷新当前页面
          if(data===1){
              Object.assign(that.$data, that.$options.data())   //合并对象
          }
      })
  },
  beforeDestroy(){
      Bus.$delete('fourceMycenter');
  },
  mounted(){
      const params={
          'pageNum':this.pageNum,
          'pageSize':this.pageLength
      }
     this.MycenterGetPeople(params);
     this.MycenterGetProplePrice();

  },
  methods:{
      know(){
          this.knowimg=false
      },
      pagechange:function(currentPage){//根据当前页数请求渲染数据
        // this.fenyeList = this.list.slice((currentPage-1)*pageLength,currentPage*pageLength)
        const params={
              'pageNum':currentPage,
              "pageSize":this.pageLength,
          }
          GetPeople(params).then((res)=>{
              if(res!=undefined){
                var dataList = res.data;
                var datafunList = this.dataList(dataList)
                this.list=datafunList;
              }
          })
      },
      //封装添加图片颜色函数
     dataList(data){
        data.forEach((item,i) => {
       
                switch(item.level){
                case '普通级':
                item.kev = "rgb(176, 195, 217)";
                break;
                case '受限':
                item.kev = "rgb(136, 71, 255)";
                break;
                case '保密':
                item.kev = "rgb(211, 44, 230)";
                break;
                case '军规级':
                item.kev = "rgb(75, 105, 255)";
                break;
                case '工业级':
                item.kev = "rgb(94, 152, 217)";
                break;
                case '消费级':
                item.kev = "rgb(176, 195, 217)";
                break;
                case '违禁':
                item.kev = " rgb(228, 174, 57)";
                break;
                case '隐秘':
                item.kev = " rgb(235, 75, 75)";
                break;
                case '非凡':
                item.kev = "rgb(235, 75, 75)";
                break;
            
            }
            });
         return data;
     },

      //请选择按钮
      handleDsnone(e,name){
          this.changeitem=this.change[e];
          this.goodsName = name;
          var that=this;
          
          var params={
              "pageNum":1,
              "pageSize":this.pageLength,
              "item":name
          }
          GetPeople(params).then((res)=>{   //根据中文名获取展示数据
            if(res!=undefined){
                console.log(res)
                that.list = res.data;
            }
          })

      },
      //全部按钮选择
      handleItemall(e){
          this.itemall=this.changeAll[e];
          const params={
              'pageNum':this.pageNum,
              'pageSize':this.pageLength,
              'goodsState':e,
          }
          this.MycenterGetPeople(params);
      },
      //全部按钮
      selectChangeAll(){
          this.disnone=!this.disnone;
      },

      //请选择按钮
      selectChange(){
          this.disnone1=!this.disnone1;
      },

       /***滑动限制***/
      stop(){
        var mo=function(e){e.preventDefault();};  //e.preventDefault是取消事件的默认动作
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动   //监听touchmove 鼠标滚动事件，
      },
      /***取消滑动限制***/
      move(){
        var mo=function(e){e.preventDefault();};  
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      },


    handleBack_bg(){
        this.recharge=false;
        this.back_bg=false;
        this.Jutiprice=false;
        this.qrCode = false;
        this.tipState = false;
        this.move(); 
    },
      //充值按钮
      topUp(){
        this.recharge=true;
        this.back_bg=true;
        this.stop();
      },

     //选中好了金额，跳转下一步
    handleClickNext(data){  
        this.recharge=false;
        this.Jutiprice=true;
        this.qrCode = false;
        this.price=data;
        this.payment=data;
    },
      //选好金额，确认提交，出现二维码
      handleClickNextQr(data){
          this.recharge=false;
          this.Jutiprice=false;
         this.qrCode = true;
          this.price=data;
          this.payment=data;
      },

       //点击返回上一步
    handleCkickGoback(){
        this.recharge=true;
        this.Jutiprice=false;
        this.qrCode = false;
    },
      //二维码页面返回上一步
      handleCodeGoback(){
          this.recharge=false;
          this.Jutiprice=true;
          this.qrCode = false;
      },
      //获取账户余额
      MycenterGetProplePrice(){
        GetProplePrice().then((res)=>{
                if(res!=undefined){
                    this.message=res.data;
                    if(res.data.transactionUrl==null){
                            this.transactionUrl='请更换交易链接'
                    }else{
                        this.transactionUrl=res.data.transactionUrl
                        this.transactionUrlTrue=res.data.transactionUrl
                    }
                }
            })
      },
      //获取背包东西
     MycenterGetPeople(params){
        GetPeople(params).then((res)=>{
            if(res!=undefined){
                var dataList=res.data;
                var datafunList = this.dataList(dataList)
                this.list=datafunList;
                this.total=res.total;
            }
        })
     },

    //取回商品
    getGoods(id,index){
        const data={
            'id':id
        }
        postGetGood(data).then((res)=>{
            if(res!=undefined){
                Message({
                    message:res.msg,
                    type:'success'
                })
                this.list[index].state=1;
            }
        })

    },
    //出售商品
    sellGoods(id,index){
          const params={
            'id':id
        }
        postSellGood(params).then((res)=>{
            if(res!=undefined){
                Message({
                    message:"出售成功",
                    type:'success'
                })
                this.list[index].state=3;
                this.message.money = parseFloat(this.message.money)+parseFloat(this.list[index].price.toFixed(2));
                localStorage.setItem('message',this.message.money);
                Bus.$emit("moneySell",1);//金额变化

            }
        })
    },
 

      mouseent(e){
        //   console.log(e)
      },
      mouseleave(e){
        //   console.log(e)
      },
      //更换交易链接弹窗
      changeSteamLink(){
          if(this.tipState == false){
              this.tipState = true;
              this.back_bg=true;
              this.stop();
          }else {
              this.tipState = false;
              this.back_bg=false;
              this.transactionUrl = this.$refs.steamLink.value;
              this.move();
              //更改交易链接接口
              const params = {
                  "transactionUrl":this.transactionUrl
              }
              ChangeSteamLink(params).then((res)=>{
                  if(res!=undefined){
                    if(res.msg=="交易链接不正确"){
                        if(this.transactionUrl){
                            this.transactionUrl=this.transactionUrlTrue;
                            Message({
                                message:"交易链接格式错误，请重新填写！",
                                type:'error'
                            })
                        }else{
                            if(this.transactionUrlTrue){
                                this.transactionUrl=this.transactionUrlTrue;
                            }else{
                                this.transactionUrl="请更换交易链接"
                            }
                            
                        }

                    }else {
                        // console.log("更改交易链接接口请求成功");
                    }
                  }
              })

          }

      },
      getLoginState(){
          GetProplePrice().then((res)=>{
              if(res!=undefined){
                  this.message = "";
              }
          })
      }
  },
    watch:{
      "$route":"getLoginState"
    }
}
</script>

<style scoped>
.csgo{
    width: 1280px;
    padding-bottom: 20px;
    /* background-color: #0d0c0e; */
    margin:0 auto;
    position: absolute;
}
.bg{
  /* position: absolute;
  left: 0;
  top: 0; */
}
.ROLLfuli{
  position: absolute;
  width: 100%;
  height: 280px;
  text-align: center;
  line-height: 300px;
  font-size: 46px;
   background-image:-webkit-linear-gradient(left,#c400ab,#f756a6);
    background-image:-moz-linear-gradient(left,#c400ab,#f756a6);
    background-image:-ms-linear-gradient(left,#c400ab,#f756a6);
    background-image:-o-linear-gradient(left,#c400ab,#f756a6);
    background-image:linear-gradient(left,#c400ab,#f756a6);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    text-fill-color:transparent;
  font-weight: 900;
  font-style: italic;
  padding-right: 20px;
}
.box_left_box{
  width: 1000px;
  position: absolute;
  display: flex;
  right: 0px;
  top: 229px;
}
.box_left{
  width: 288px;  

}
.public_box{
  margin-bottom: 23px;
  }
.box_right{
  width: 992px;
    position: relative;
}
.all_button{
  /*width: 60px;*/
  height: 24px;
  position: relative;
  text-align: center;
  line-height: 23px;
  color: #fff;
  /* font-style: italic; */
  margin-right: 10px;
    z-index: 10000;
   /* position: relative; */
}
.ling{
  position:absolute;
  top:0;
  left: 0;
  background: #631936;
  /*width: 60px;*/
  height: 24px;
  transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
}
.all{
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    background: #631936;
    /* transform: skewX(-15deg); */

    /* -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg); */
}
.Double_box{
  display: flex;
  flex-wrap: wrap;
    /* margin-left: -10px; */
  padding-top: 20px;

}
.hengxian_box{
    margin-bottom: 20px;
}
.doube_box{
  margin-right: 13px;
  margin-bottom: 13px;
}
.right_top_heng{
    display: flex;
    align-items: center;
    margin-top: 35px;
    position: relative;
}
.right_top_heng p{
   font-size: 16px;
   background-image:-webkit-linear-gradient(left,#c400ab,#f756a6);
    background-image:-moz-linear-gradient(left,#c400ab,#f756a6);
    background-image:-ms-linear-gradient(left,#c400ab,#f756a6);
    background-image:-o-linear-gradient(left,#c400ab,#f756a6);
    background-image:linear-gradient(left,#c400ab,#f756a6);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    text-fill-color:transparent;
  font-weight: 900;
  margin-left: 7px;
}
.hengxian{
    margin-left: 8px;
}
.box{
    margin-right: 13px;
    margin-bottom: 10px;
}


/* 个人信息单独css */
.message_box{
    width: 798px;
    height: 132px;
    position: relative;
    display: flex;
    box-sizing: border-box;
   
}

.message_box .img{
    position: absolute;
    top:0px;
    left:0px;
}
.message_box_left{
    width: 343px;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
}
.header_box{
    width: 94px;
    height: 94px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 20px #421920;
    margin-left: 35px;
}
.header_box img{
    width: 94px;
    height: 94px;
}
.header_right_box{
    margin-left: 38px;
}
.header_right_box p:first-child{
    color: #5b474a;
}
.header_right_box p:nth-child(2){
    width: 130px;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.header_right_box img{
    margin-left:-5px;
    margin-top: 8px;
}
.message_box_center{
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction:column;
    color: #ffffff;
    position: relative;
    padding-left: 79px;
    justify-content: center;
    box-sizing: border-box;
}
.message_box_center p:first-child{
    color: #735b5f;
}
.message_box_center p:nth-child(2){
    color: #fff;
    font-size: 18px;
    font-weight: 900;
}
.chognzhi_box{
    margin-top: 5px;
    display: flex;
    margin-left: -10px;
}
.chognzhi_box1{
      margin-top: 5px;
    display: flex;
    margin-left: -5px;
}
.chognzhi_box .div{
    width: 43px;
    height: 22px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a61a4a;

}
.div1{
     width: 60px;
    height: 22px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a61a4a;
}
.xie{
    width: 43px;
    height: 20px;
    border: 1px solid #a61a4a;
    position: absolute;
    top: 0;
    left: 0;
    transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
}
.xie1{
     width: 60px;
    height: 20px;
    border: 1px solid #a61a4a;
    position: absolute;
    top: 0;
    left: 0;
    transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
}
.youhuaxie_box{
    width: 69px;
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a61a4a;
    margin-left: 10px;
}
.youhuaxie{
     width: 69px;
    height: 20px;
    border: 1px solid #a61a4a;
    position: absolute;
    top: 0;
    left: 0;
    transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
}
.message_box_right{
    width: 223px;
    height: 100%;
    display: flex;
    flex-direction:column;
    color: #ffffff;
    position: relative;
    justify-content: center;
    padding-left: 75px;
    box-sizing: border-box;
}
.message_box_right p:first-child{
    color: #735b5f;
}
.message_box_right p:nth-child(2){
    color: #fff;
    font-size: 18px;
    font-weight: 900;
}
.steam_box{
    width: 798px;
    height: 69px;
    margin-top: 26px;
    
    position: relative;
}
.steam_img_bg{
    position: absolute;
    top: 0;
    left: 0;
}
.steam_box_sizing{
    position: relative;
    display: flex;
    padding-left: 30px;
    align-items: center;
    
    height: 100%;
}
.p{
    width: 500px;
    color: #dfdfdf;
   
}
.p .p11{
    width: 535px;
}
.p1{
    color: #4a3b3f;
}
.steam_img_lianjie{
    margin-left: 66px;
}
.doblebox{
    margin-right: 14px;
    margin-bottom: 17px;
}
.fenye{
    width: 100%;
    height: 100px;
    /* position: absolute; */
    /* right: 0;
    bottom: 50px; */
    /*margin-top: 458px;*/
    margin-left: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1088px;
}
.fenye_box{
    margin-right: 8px;
    margin-left: 8px;
}
.black_bg{
  width: 100%;
  height: 1080px;
  position: fixed;
  background: #000;
  opacity: 0.5;
  z-index: 50;
}
.box_right .steam_box_tip{
    width: 814px;
    height: 50px;
    position: absolute;
    top: 167px;
    left: 8px;
    z-index: 51;
}
.box_right .steam_box_tip input{
    width: 658px;
    height: 43px;
    line-height: 43px;
    position: absolute;
    top: 0px;
    left: 25px;
    font-size: 16px;
    background-color:rgba(0,0,0,0);/*背景变为透明*/
    border-color: transparent;/*边框变为透明*/
    color: #fff;
}
.box_right .steam_box_tip button{
    width: 77px;
    height: 43px;
    position: absolute;
    top: 0px;
    right: 21px;
    font-size: 16px;
    background-color:rgba(0,0,0,0);/*背景变为透明*/
    border-color: transparent;/*边框变为透明*/
    color: #fff;
}
.box_right .steam_box_tip img:nth-child(1){
    width: 714px;
    position: absolute;
    top: 0;
}
.box_right .steam_box_tip img:nth-child(2){
    width: 89px;
    position: absolute;
    top: 0px;
    right: 16px;
}
.shang{
    position: relative;
    color: #ff3e82;
    font-size: 14px;
    border: 1px solid #5c1432;
    padding: 3px 13px;
    margin-right: 8px;
    margin-left: 8px;
    transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
    /* background-color: #201d1d; */
    z-index: 1;
    background-image:-webkit-linear-gradient(top,#171717,#0d0909);
    background-image:-moz-linear-gradient(top,#171717,#0d0909);
    background-image:-ms-linear-gradient(top,#171717,#0d0909);
    background-image:-o-linear-gradient(top,#171717,#0d0909);
    background-image:linear-gradient(top,#171717,#0d0909);

}
.disnone,.disnone1{
    background: #fff;
    padding: 0 10px 0 10px;
    margin-top: 4px;
    color: #fff;
    background: url(../assets/exchangeMall/xiala.png);
    background-size: 100% 100%;

}

</style>
