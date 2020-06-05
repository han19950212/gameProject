<template>
  <div class="csgo">
    
       <div class="bg">
            <!-- <img  src="../assets/ROLL/1.png" alt=""> -->
            <img  src="../assets/ROLL/1.jpg" alt="">
        </div>
        <!-- <div class="ROLLfuli">
            CSGO开箱
        </div> -->
        <div class="diceng" v-show="knowimg">
          <img class="diceng_bg" src="../assets/ROLL/8.png" alt="">
          <div class="dicent_text">微信、云闪付通道维护中~暂时关闭，请关注其他方式</div>
          <div class="know" v-cursor @click="know">知道了</div>
          <!-- <img src="../assets/ROLL/9.png" class="know" @click="know" alt=""> -->
        </div>
          <div class="box_left_box">
          <!-- <div class="box_left"> -->
              <!-- <publicBoxLeft class="public_box"></publicBoxLeft> -->
          <!-- </div> -->
           <div class="box_right">
                
               
               
               <!-- 打开一个箱子 -->
              <div class="openBox_box"  v-for="(item,index) in box" :key="index" v-show="openStatusOnebox">
                    <div class="open_left" @click="openBoxShow" v-cursor>
                        <img src="../assets/openBox/1.png" alt="">
                        <div class="text">开 <span> 1 </span>次 <span>${{item.price}}</span></div>
                    </div>
                    <div class="open_center">
                        <img class="bg" :src="bgImg" alt="">
                        <div class="firearms">
                            <img :src="item.image" alt="">
                            <div class="dao_box">
                                <p class="dao" v-show="openStatus">{{item.name}}</p>
                                <p class="bo1" v-show="openStatus">箱子内包含1件物品</p>
                            </div>
                         
                        </div>
                    </div>
                    <div class="open_right" @click="openBoxShowFive" v-cursor>
                        <img src="../assets/openBox/2.png" alt="">
                          <div class="text">连开<span> 5 </span>次 <span>${{item.price*5}}</span></div>
                    </div>
              </div>

               <openBoxAnimation @shuDingJp='shudingjiangping' v-show="openStatusOne" ref='chid' class="openoneBox"></openBoxAnimation>


               <!--五连开箱-->
               <fiveOpenPiece ref='fiveChild'  @chuxiantanchuang='chuxianfiv' v-show="openStatusFive"></fiveOpenPiece>

                <!-- 背包 -->
               <div class="bag_title">
                   <p>爽到你哭</p>
                   <p>盒子内包含 <span>{{numbers}}</span> 件物品</p>
                   <div v-show="!openStatusOnebox">
                          <div class="bag_title_border">
                                <img src="../assets/fiveOpenBox/10.png">
                            </div>
                            <div class="bag_title_red">
                                <img src="../assets/fiveOpenBox/9.png">
                            </div>
                            <p class="bag_p" >
                                <span @click="openBox(1)" v-cursor>再开 1 次 ${{price}}</span>
                                <span @click="enterback" v-cursor>进入背包</span>
                                <span @click="openboxFive" v-cursor>再开 5 次 ${{price*5}}</span>
                            </p>
                   </div>
                
               </div>
               <div class="hengxian_box">
                    <div class="right_top_heng">
                        <img src="../assets/csgo/1.png" alt="">
                        <p>所有物品展示</p>
                        <img class="hengxian" src="../assets/myCenter/8.png" alt="">
                         <img class="triangle" src="../assets/faq/2.png" alt="">    
                    </div>
                   
                    <div class="Double_box">
                       <publicDobleColor 
                       :img_state_show=1
                       :imgedState=false
                       :name='item.name'
                       :img1='item.image'
                        class="doblebox" 
                        v-for="(item,index) in fenyeList" 
                        :key="index"
                        :borde_color = 'item.kev'
                        :price='item.price'
                        :probability='item.probability'
                        :probabiState=1
                        :nametype="item.type"
                        ></publicDobleColor>
                    </div>
               </div>
               <fenye :total="total" :currentPage='current' :pageLength="pageLength" @pagechange="pagechange"></fenye>
          
          </div>

          <div class="recharge" v-show="recharge">
              <recharge @next="handleClickNext"></recharge>
          </div>
          <div v-show="Jutiprice">
              <rechargeMoney
                      @goback='handleCkickGoback'
                      @qrPage="handleClickNextQr"
                      :price="price1"
                      :payment="payment"
              ></rechargeMoney>
          </div>
          <div v-if="qrCode">
              <reQRCode
                      @goback='handleCodeGoback'
                      :price="price1"
                      :payment="payment"
              ></reQRCode>
          </div>
        <div v-show="back_bg" @click="handleBack_bg" class="black_bg"></div>
      </div>

    <!-- 单开弹窗 -->
      <div class="" v-show="shuqding">
          <xuanzhuan
            :shou_text="shutext"
            :text_state=false
            :price='message.price'
            :firimage='message.image'
            :type='message.type'
            :name='message.name'
            @changeExit='Exits'
          ></xuanzhuan>
      </div>


      <!-- 五连开弹窗 -->
      <div class="wuliankai" v-show='fivekaiguan'>
          <fiveliankai
            @yingcangfive='yingcangfiv'
            :sdsds='this.fiveMessage'
          ></fiveliankai>


      </div>
  </div>
</template>

<script>
import Bus from '../axios/Bus'
import fiveliankai from './fiveTanchuang'
import recharge from './recharge'
import rechargeMoney from './rechargeMoney'
import xuanzhuan from '../views/xuanzhuan'
import fenye from '../components/fenye'
import openBoxAnimation from '../components/openBoxAnimation'
import {GetBasisBox,GetOpenBox} from "../axios/PersonalApi";
import fiveOpenPiece from '../components/fiveOpenPiece';
import {Message} from "element-ui";
import {GetPeople, GetProplePrice} from "../axios/Apilogin";
const reQRCode =()=>import('./reQRCode')
const publicBoxLeft  = ()=> import ("../components/publicBoxLeft");  //异步加载组件
const publicDobleColor = ()=>import ('../components/publicDobleColor');
const linxingBox =()=>import('../components/lingxingBox');

export default {
  name: '',
  components: {
      publicBoxLeft,
      publicDobleColor,
      linxingBox,
      fiveOpenPiece,
      openBoxAnimation,
      xuanzhuan,
      rechargeMoney,
      recharge,
      fiveliankai,
      fenye
  },
  data() {
    return {
        knowimg:true,
        total: 0,     // 记录总条数
        pageLength: 24,   // 每页显示条数
        current: 1,   // 当前的页数
        fiveMessage:[],  //储存5个奖品
        fivekaiguan:false,  //5个奖品开关
        shuqding:false,  //确定奖品控制展现
        message:'',  //储存确定的奖品
        shutext:'确定饰品',
        price1:0,
        price:0,
        payment:0,
        Jutiprice:false,  //具体金额按钮
        back_bg:false,  //背景按钮
        qrCode:false,//二维码显示
        recharge:false,  //选择金额按钮
        header:require('../assets/myCenter/3.png'),
        numbers:0,
        openStatusOnebox:true,
        openStatus:false,
        openStatusOne:false,//开箱一个
        openStatusFive:false,//开箱五个
        bgImg:require('../assets/openBox/3.png'),
        money:0,
        list:[
          {
            
          }
        ],
        fenyeList:[],
        boxStroge:[],//初始化box数组存储
        box:[
          {

          },
        ],
    }
  },
    mounted() {
        const params = this.$route.query.id;//"032bc9ce719c4416a825b53fc42e900e";
        GetBasisBox(params).then((res)=>{
            // console.log(res)
            if(res!=undefined){
            this.box[0] = res.data[0].box;
            console.log("-----------openbox");
            console.log(res.data)
            this.boxStroge[0] = res.data[0].box;
            var listRes = res.data[0].goodsList;
            for(var i =0;i<listRes.length;i++){
                  switch(listRes[i].level){
                    case '普通级':
                    listRes[i].kev = "rgb(176, 195, 217)";
                    break;
                    case '受限':
                    listRes[i].kev = "rgb(136, 71, 255)";
                    break;
                     case '保密':
                    listRes[i].kev = "rgb(211, 44, 230)";
                    break;
                     case '军规级':
                    listRes[i].kev = "rgb(75, 105, 255)";
                    break;
                     case '工业级':
                    listRes[i].kev = "rgb(94, 152, 217)";
                    break;
                     case '消费级':
                    listRes[i].kev = "rgb(176, 195, 217)";
                    break;
                     case '违禁':
                    listRes[i].kev = " rgb(228, 174, 57)";
                    break;
                     case '隐秘':
                    listRes[i].kev = " rgb(235, 75, 75)";
                    break;
                     case '非凡':
                    listRes[i].kev = "rgb(235, 75, 75)";
                    break;
                  
                }
            }
            this.list = listRes;
            this.total=this.list.length;
            this.fenyeList = this.list.slice(0,24);
            console.log("-------------fenyeList");
            console.log(this.fenyeList);
            // this.bgImg = this.box[0].bgImage; //箱子背景
            this.price = this.box[0].price;  //
            this.numbers=this.list.length;
           }
        })
        // this.MycenterGetProplePrice();
    

    },
  methods:{
    know(){
        this.knowimg=false
    },

      //打开开箱
      openBoxShow(){
          this.openStatusOnebox=false
          this.openStatusOne=true
          this.openBox()
      },

     openBoxShowFive(){
        this.openStatusOnebox=false
        this.openStatusFive=true;
        this.openboxFive();
     },


      //出现5个弹窗
      chuxianfiv(data){
          this.fiveMessage=data;
          this.fivekaiguan=true;
      
      },

      //隐藏5个弹窗
      yingcangfiv(){  
          this.fivekaiguan=false
      },

      //确定奖品展现弹窗
      shudingjiangping(data){
          this.shuqding=true;
          this.message=data;
      },
      
      Exits(){   //隐藏自己
        this.shuqding=false
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
      enterback(){  //进入背包
          this.$router.push({
              path:"/public_box_home/myCenter"
          })
      },
      mouseent(e){
        //   console.log(e)
      },
      mouseleave(e){
        //   console.log(e)
      },
      //5连开   
      openboxFive(){
        this.openStatusOne=false;
        if(this.openStatusFive==true){
            this.$refs.fiveChild.open();
           
        }else{
            this.openStatusFive=true;
        }
      },
      openBox(openNum){
          // console.log( this.openStatusFive);
        this.openStatusFive=false;
        if(this.openStatusOne==true){
            this.$refs.chid.openBoxJisuan()
            
        }else{
            this.openStatusOne=true;
        }
      

      },
      pagechange:function(currentPage){
        this.fenyeList = this.list.slice((currentPage-1)*this.pageLength,currentPage*this.pageLength)
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
      //充值按钮
      invest(){
          this.recharge=true;
          this.back_bg=true;
          this.stop();
      },
      //获取账户余额
      MycenterGetProplePrice(){
          GetProplePrice().then((res)=>{
              if(res!=undefined){
                this.money=res.data.money;
              }
          })
      },
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
    /* width: 442px;
    height: 239px; */
}
.ROLLfuli{
  position: relative;
  width: 100%;
  height: 280px;
  text-align: center;
  line-height:232px;
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
  top: 260px;
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
  width: 60px;
  height: 24px;
  position: relative;
  text-align: center;
  line-height: 23px;
  color: #fff;
  font-style: italic;
  margin-right: 10px;
   /* position: relative; */
}
.ling{
  position:absolute;
  top:0;
  left: 0;
  background: #631936;
  width: 60px;
  height: 24px;
    transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
}
.all{
  position: relative;
}
.Double_box{
  display: flex;
  flex-wrap: wrap;
    /* margin-left: -10px; */
  padding-top: 20px;

}
.hengxian_box{
    margin-bottom: 20px;
    margin-top: -15px;
}
.doube_box{
  margin-right: 13px;
  margin-bottom: 13px;
}
.right_top_heng{
    display: flex;
    align-items: center;
    margin-top: 18px;
    position: relative;
    margin-left: 23px;
    font-style: italic;
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

.doblebox{
    margin-right: 14px;
    margin-bottom: 17px;
}
/* 开箱css */
.openBox_box{
    width: 841px;
    height: 240px;
    display: flex;
    margin-top: -31px;
    margin-left: 35px;
}
.open_left{
    position: relative;
    width: 234px;
    height: 237px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.text{
    color: #fff;
    font-size: 16px;
    position: relative;
    font-style: italic;
    font-weight: 700;
}
.text span{
    color: #ff1f88;
}
.open_left img{
    width: 234px;
    height: 237px;
    position: absolute;
    left: 0;
    top:0;
}
.open_center{
     position: relative;
    width: 442px;
    height: 239px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.open_center .bg{
    position: absolute;
    top: 0px;
    left: -17px;
}
.open_right{
    position: relative;
    width: 234px;
    height: 237px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.open_right img{
    position: absolute;
    top: 0px;
    left: -13px;
}
.firearms{
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
}
.firearms img{
    width: 161px;
    height: 129px;
}
.dao{
    font-size: 19px;
    margin-top: 10px;
}
.bo1{
    font-size: 10px;
}
.dao_box{
    margin-left: -20px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
/*过度提示*/
.bag_title{
    position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
    height: 120px;
    width: 880px;
}
.bag_title p{
    text-align: center;
    font-style:italic;
    font-family: "Microsoft YaHei";
}
.bag_title p:nth-child(1){
    color: #e81264;
    font-weight: bold;
    font-size: 18px;
    font-style:italic
}
.bag_title p:nth-child(2){
    font-size: 15px;
    color:#656565;
}
.bag_title p:nth-child(2) span{
    color: #e81264;
}
.bag_title .bag_p{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 39px;
    margin-top: 12px;
    font-size: 18px;
    color: #fff;
}
.bag_title .bag_p span{
    width: 190px;
    height: 39px;
    
    font-size: 16px;
    text-align: center;
    z-index: 1;
}
.bag_title .bag_p span:nth-child(2){
    font-weight: bold;
}
.bag_title .bag_title_border{
    width: 582px;
    position: absolute;
    top: 66px;
    left: 149px;
}
.bag_title .bag_title_border img{
    width: 100%;
}
.bag_title .bag_title_red{
    width: 194px;
    position: absolute;
    top: 66px;
    left: 343px;
    height: 39px;
}
.bag_title .bag_title_red img{
    width: 100%;
    height: 39px;
}
.openoneBox{
    position: relative;
    z-index: 10;
    margin-top: -31px;
    margin-left: 59px;
    /* background: #000; */
}
.wuliankai{
    position: absolute;
    left:100px;
    top: 180px;
    z-index: 100;
}
</style>
