<template>
  <div class="headernew">
       <div class="logo">
           <router-link to='/'>
             <img src="../assets/header/logo.png" alt="">
           </router-link>
          
       </div>
       <div class="page_right">
           <div class="page_title">
               <div v-for="(item,index) in list" :key="item.id" class="header_title" @mouseenter="changeColor((item.id-1))" @mouseleave="changeColorLaver((item.id-1))" @click="change_index((item.id-1))">
                   <router-link :to="item.path" class="p"  >
                    <div  :class="index==id?'topbarBox imgAction':'topbarBox'">
                          <div class="xiaotubiao_box">
                              <img class="xiaotubiao" :src="index==id?item.img1:item.img2" alt="">
                          </div>
                          <div :class="index==id?'action':'action123'">
                              <div class="text_header">{{item.title}}</div>
                              <div class="yingyu">{{item.title_t}}</div>
                          </div>
                    </div>
                     </router-link>
               </div>
           </div>
          
       </div>
       <div class="img_doblow_box">
           <div class="img1_box"  v-cursor v-show="!loginTu" >
                 <!-- <div class="img1_box1"></div> -->
                <img class="img1"  :src="xxx==1?dsadasd1:dsadasd" alt="" @click="exit"  @mouseenter="handleenter" @mouseleave="handleleave" > 
                <div class="header_right">
                    <div class="rigth_text">
                        <p>{{nickName}}</p>
                        <p>${{mmoney}}</p>
                    </div>
                    <img src="../assets/header/6.png" alt="" @click="TmyCenter">
                </div>
                <!-- 退出 -->
           </div>
           <div class="img1_box2" @click="TmyCenter" v-cursor v-show='loginTu'>
               <!-- <div class="img1_box3"></div> -->
               <img class="img2" src="../assets/header/5.png" alt="">
           </div>
            
       </div>
        
        <div class="register_box">
            <login @none_login='nonelogin' @changeRister="showRigister" v-show="stateRigister" ></login>
            <register @changeExit='chnageexitfather' @changeSteamRigister="steamdeng"  @changeRigister="change"  ref="regist"  @changeState="changestate" v-show='stateRegister'></register>
            <steamLogin @handleLogin="gobackLogin" v-show="stateSteamRegister"></steamLogin>
        </div>
      <div v-show="back_bg" @click="handleBack_bg" class="black_bg"></div>
        
  </div>
</template>

<script>
import login from '../views/login'
import register from '../views/rigister'
import steamLogin from '../views/steamLogin'
import Bus from '../axios/Bus'
import {MessageBox,Message} from 'element-ui'
import {GetProplePrice} from '../axios/Apilogin'

export default {
  name: '',
  components: {
      register,
      login,
      steamLogin
  },
  data() {
    return {
        nickName:"",
        mmoney:"",
        dsadasd:require("../assets/header/4.png"),
        dsadasd1:require("../assets/header/7.png"),
        xxx:0,
        message:"",
        loginTu:true,
        back_bg:false,  //储存是否显示黑色屏幕
        img1_box:false,// 是否显示退出
        stateRegister:false,//this.$store.state.token==""?true:false,   //登录页面是否显示
        stateRigister:false,   //注册页面是否显示
        stateSteamRegister:false,  //steam登录页面是否显示
        ids:-1, //储存上一次的id值
        id:-1,
        list:[
            {
                id:1,
                title:"每日免费",
                title_t:"DAILY FREE",
                path:'/public_box_home/dailyFree',
                img1:require('../assets/header/topBar/2.png'),
                img2:require('../assets/header/topBar/2-1.png'),
            },
            {
                id:2,
                title:"兑换商城",
                title_t:"EXCHANGE MALL",
                path:'/public_box_home/exchangeMall',
                 img1:require('../assets/header/topBar/1.png'),
                img2:require('../assets/header/topBar/1-1.png'),
            },
            {
                id:3,
                title:"ROLL福利",
                title_t:"ROLL WELFARE",
                path:'/public_box_home/Roll',
                 img1:require('../assets/header/topBar/3-1.png'),
                img2:require('../assets/header/topBar/3.png'),
            },
          
            {
                id:4,
                title:"CSGO开箱",
                title_t:"STAR MEMBER",
                path:'/public_box_home/csgo',
                 img1:require('../assets/header/topBar/5-1.png'),
                img2:require('../assets/header/topBar/5.png'),
            },
            {
                id:5,
                title:"常见问题",
                title_t:"QUESTIONS",
                path:'/public_box_home/faq',
                 img1:require('../assets/header/topBar/6-1.png'),
                img2:require('../assets/header/topBar/6.png'),
            },
            // {
            //     id:6,
            //     title:"个人中心",
            //     path:'/public_box_home/myCenter'
            // },
            // {
            //     id:7,
            //     title:"打开箱子",
            //     path:'/public_box_home/openBox'
            // },
            // {
            //     id:8,
            //     title:"五连开箱子",
            //     path:'/public_box_home/fiveOpenBox'
            // },
            // {
            //     id:11,
            //     title:"细节",
            //     path:'/public_box_home/ROLLactivelyDetail'
            // },
        ]
    }
  },
  created:function(){
    let _this = this;
    document.onkeydown = function(e){  
          //监听用户按键键盘事件，如果按esc，就返回
        let _key = window.event.keyCode;
        if(_key === 27){
            _this.TmyCenter()
        }
        
    },
    Bus.$on('MoreLogin',content=>{
    
        if(content==1){
    
            _this.stateRegister=true;
        }
    })
    Bus.$on("currentPath",data=>{
        if(data=='/' || data=="/public_box_home/myCenter"){
            _this.id=-1
        }
        if(data=="/public_box_home/openBox"){
            _this.id=3;
        }
        if(data=="/public_box_home/ROLLactivelyDetail"){
            _this.id=2
        }
        this.list.forEach(function (value) {
            if(data==value.path){
                _this.id = value.id-1;
            }
        })
    })
    Bus.$on("moneySell",data=>{
        if(data==1){
            this.getMoney();
        }
    })
},

  mounted(){
      var token=localStorage.getItem('token')
      if(token!=null){
          this.loginTu = false;
      }
    var message = localStorage.getItem('message');
    if(message!=null){
        this.mmoney=message
    }
    var name = localStorage.getItem('name');
    
    if(message!=null){
        this.nickName=name
    }
  },
  methods:{
      changeColor(e){
         
          this.id=e;
      },
     changeColorLaver(e){
         this.id=e;
         this.id=this.ids;
     },

      //小叉叉
      chnageexitfather(){
          this.stateRegister=false
          this.back_bg=false;
          this.move();
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
      //退出登录
      exit(){ 
     
         this.$confirm('是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
            if(res!=undefined){
                localStorage.removeItem('token');
                this.$refs.regist.clear();
                this.$message({
                    type: 'success',
                    message: '退出成功!',
                });
                this.img1_box=false;
                this.back_bg=false;
                this.loginTu=true
                Bus.$emit('shuaxin',1);  
            }
        }).catch(() => {     
        });
      },
      handleBack_bg(){
          this.back_bg=false;
          // this.img1_box=false;
          this.stateRegister=false;
          this.stateRigister=false;
          this.stateSteamRegister=false;
          this.move();
      },
      //判断登录是否登录--通过叼个人中心的接口，来判断登录信息是否过期
    //   MycenterGetProplePrice(){
    //     GetProplePrice().then((res)=>{
    //             console.log(res)
    //             if(res!=undefined){
    //                   this.img1_box=true
    //             }
              
    //         })
    //   },


      //点击header小人，判断是否登录，登录就进入个人中心页面，否则就跳出登录页
      TmyCenter(){
        GetProplePrice().then((res)=>{
            console.log(res)
                if(res!=undefined){
                    this.$router.push({
                        path:'/public_box_home/myCenter'
                    })
                    this.id=-1;
                }else{
                     this.stateRegister=true;
                     this.back_bg=true
                     this.stop();
                }
            
            })
       
      },
      //鼠标移入
      handleenter(){
         this.xxx=1;   
      },
      //鼠标移出
      handleleave(){
          this.xxx=0;
      },
      change_index(e){
           this.ids=this.id;
          this.id=e;
      },
      changestate(e){   //改变登录信息的状态
            this.stateRegister=false;
            this.img1_box=true
            this.back_bg=false;
            this.loginTu=false
            this.move();
            this.getMoney()

      },
      //获取金额
      getMoney(){
             GetProplePrice().then((res)=>{
                 if(res!=undefined){
                        this.mmoney=res.data.money;
                        this.nickName=res.data.nickName;
                        console.log(this.message)
                        localStorage.setItem('message',res.data.money)
                        localStorage.setItem('name',res.data.nickName)
                 }
            })
      },
      change(e){        //是否显示注册页面
            this.stateRigister=true,
            this.stateRegister=false
            this.back_bg=true
            this.stop();
      },
      showRigister(e){   //是否显示登录页面
            this.stateRigister=false,
            this.stateRegister=true;
            this.back_bg=true
            this.stop();
      },
      steamdeng(){     //是否显示steam登录页面
            this.stateRegister=false,
            this.stateSteamRegister=true
            this.back_bg=true
            this.stop();
      },
      gobackLogin(){   //steam页面的返回上一层,就是显示登录主页面
            this.stateRegister=true,
            this.stateSteamRegister=false
            this.back_bg=true
            this.stop();
      },
      nonelogin(){   //注册成功注册页面
            this.stateRigister=false
            this.stateRegister=true
            this.back_bg=true
            this.stop();
      },
  },
  beforeDestroy(){
    // Bus.$off("MoreLogin")
    //   Bus.$off("currentPath")
  }
}
</script>

<style scoped>
    .headernew{
        width: 1280px;
        height: 71px;
        /* background-image: linear-gradient(to bottom, #271215 , #1a1515); */
        background-color: #020202;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        top:0;
        left: 50%;
        transform: translate(-50%);
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);
        z-index: 1000;
    }
    .logo img{
        margin-left: 48px;
    }
    .page_right{
        display:flex;
        align-items: center;
        margin-left:85px;
    }
    .page_title{
        display: flex;
       
    }
    .header_title{
        margin-left: 19px;
        color: #fff;
        display:flex;
        align-items: center;
        font-size: 16px;
      
        
    }
    .header_title .p{
        
        /* font-style: italic;
        background-image:-webkit-linear-gradient(left,#7c7b7b,#e3e3e3);
        background-image:-ms-linear-gradient(left,#7c7b7b,#e3e3e3);
        background-image:-moz-linear-gradient(left,#7c7b7b,#e3e3e3);
        background-image:-o-linear-gradient(left,#7c7b7b,#e3e3e3);
        background-image:linear-gradient(left,#7c7b7b,#e3e3e3); */
        color: #4e4e4e;
        /* filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr='#7c7b7b', EndColorStr='#e3e3e3'); */
        /* -webkit-background-clip:text;
        -ms-background-clip:text;
        -webkit-text-fill-color:transparent;
        -ms-text-fill-color:transparent;
        text-fill-color:transparent; */
        padding-right: 4px;
        font-weight: 900;
    }
    .header_title .p:hover{
        text-decoration: none;
    }
    .img1{
        width: 40px;
        height: 70px;
        margin-right: 20px;
    
    }
    .img2{
        width: 164px;
        height: 70px;
        /* margin: 0 16px 0 20px; */

    }
     .action{
         /* background-image:-webkit-linear-gradient(left,#ec1807,#ff621d);
         background-image:-moz-linear-gradient(left,#ec1807,#ff621d);
         background-image:-ms-linear-gradient(left,#ec1807,#ff621d);
         background-image:-o-linear-gradient(left,#ec1807,#ff621d);
         background-image:linear-gradient(left,#ec1807,#ff621d);
         filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr='#ec1807', EndColorStr='#ff621d');
         -webkit-background-clip:text;
         -ms-background-clip:text;
         -webkit-text-fill-color:transparent;
         -ms-text-fill-color:transparent;
         text-fill-color:transparent;
         text-shadow: 0 0 10px #ff621d;
         -webkit-text-shadow: 0 0 10px #ff621d;
         -moz-text-shadow: 0 0 10px #ff621d; */
         color: #fff;
         transition: all ease 0.5s;
    }
    .action123{
        color: #4e4e4e;
        transition: all ease 0.5s;
    }
    .img1_box{
        /* background-color: #272025; */
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #fff;
        min-width: 40px;
    }
    .img1_box1{
        width: 60px;
        height: 55px;
        background-color: #272025;
        opacity: 0.8;
        position: absolute;
        z-index: -1;
    }
    .img1_box2{
        /* width: 60px;
        height: 55px; */
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        position: relative;
    }
    .img1_box3{
          width: 60px;
        height: 55px;
        background-color: #272025;
         position: absolute;
        opacity: 0.8;
        z-index: -1;
    }
    .img_doblow_box{
        display: flex;
    }
    .register_box{
        position: fixed;
        z-index: 999;
        left: 50%;
        top: 103%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);

    }
    .black_bg{
        width: 100%;
        height: 1080px;
        position: fixed;
        background: #000;
        opacity: 0.3;
        z-index: 50;
    }
    .topbarBox{
        color: #4e4e4e;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    .xiaotubiao_box{
        width: 45px;
        height: 41px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  .imgAction .xiaotubiao{
       /* width: 100px;  */
       width: 38px;
       height: 34px;
       transition: all ease 0.2s;
    }
    .yingyu{
        font-size: 10px;
        text-decoration: none;
    }
    .text_header{
        font-size: 14px;
    }
    .xiaotubiao{
        width: 42px;
        height: 38px;
    }
    .header_right{
        display: flex;
        align-items: center;
    }
</style>

