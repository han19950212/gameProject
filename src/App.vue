<template>
  <div id="app">
    <!-- <Header></Header> -->
    <headerNew></headerNew>
     <router-view></router-view>
    <Floot></Floot>
    <service></service>
    <recharge v-if="recharge"  @next="handleClickNext" @changeExit="handleBack_bg"></recharge>
    <rechargeMoney 
      v-if='rechargeMoney' 
      :price="price"
      :payment="payment"
       @goback='handleCkickGoback'
        @qrPage="handleClickNextQr"
        @changeExit="handleBack_bg"
    ></rechargeMoney>
    <reQRCode 
      v-if="reQRCode"
      @goback='handleCodeGoback'
      @changeExit="handleBack_bg"
    ></reQRCode>
  </div>
</template>


<script>
  import Bus from './axios/Bus'
  // const Index =()=>import('./views/index')
  const headerNew =()=>import ('./components/HeaderNew')
  const Floot =()=>import('./views/floot');
  import recharge from './views/recharge'     //充值3连跳
  import rechargeMoney from './views/rechargeMoney'  //充值3连跳
  const reQRCode =()=>import('./views/reQRCode');  //充值3连跳
  // const Header=()=>import('./components/Header')
  import service from './components/service'

  export default {
    name: '',
    components: {
        headerNew,
        Floot,
        // Index,
        rechargeMoney,
        recharge,
        reQRCode,
        // Header,
        service
       
    },
    data() {
      return {
        recharge:false,
        rechargeMoney:false,
        reQRCode:false,
        price:0,
        payment:0,
      }
    },
    created() {
      var _this=this;
       Bus.$on('yao',data=>{   //事件总线，为了刷新当前页面
          if(data===1){
              _this.recharge=true
          }
      })

    },
    mounted(){
       
    },
    watch: {
      '$route':'getPath',
    },
    methods: {
      getPath(){
       
        Bus.$emit('currentPath',this.$route.path);//监听路由的变化
      },

      handleClickNext(data){  //充值跳转下一步
        this.recharge=false
        this.rechargeMoney=true;
        this.price=data;
        this.payment=data
      },

      handleBack_bg(){   //隐藏充值首页
        this.recharge=false;
        this.rechargeMoney=false;
        this.reQRCode=false
      },
      handleCkickGoback(){  //返回上一页
        this.recharge=true
        this.rechargeMoney=false;
      },
    
      handleClickNextQr(data){  //充值第三页跳第三页
         this.recharge=false;
          this.rechargeMoney=false;
         this.reQRCode = true;
          this.price=data;
          this.payment=data;
      },

      handleCodeGoback(){
          this.recharge=false;
        this.rechargeMoney=true;
        this.reQRCode=false
      },
  
    },
    beforeDestroy() {
    }
  }
</script>

<style>
.diceng{
  width: 1280px;
  height: 35px;
  position: relative;
}
.diceng_bg{
  position: absolute;
  left: 0;
  top: 0;
}
.know{
  position: absolute;
  right: 65px;
  top: 5px;
  padding: 3px 6px;
  border: 1px solid #3b3030;
  border-radius: 5px;
  color: #a38181;
  /* font-size: 8px; */
}
.dicent_text{
   position: absolute;
  left: 110px;
  top: 9px;
  color: #a38181;
}


.el-message.el-message--error .el-message__content{
    color: #fff;
}
.el-message.el-message--error .el-icon-error{
  color: #fff;
}
.el-message.el-message--error{
    background-color: #2c1e24;
    border:none;

	box-shadow:0px 0px 10px #5f2337 inset;    
}

.el-message.el-message--success .el-message__content{
    color: #fff;
}
.el-message.el-message--success .el-icon-success{
  color: #fff;
}
.el-message.el-message--success{
    background-color: #2c1e24;
    border:none;
	  box-shadow:0px 0px 10px #5f2337 inset;    
}


.el-message-box__wrapper .el-message-box{ 
    background: linear-gradient(left, #341c25, #232123);
    border:none;
	  box-shadow:0px 0px 10px #5f2337 inset;
}
.el-message-box__wrapper .el-message-box .el-message-box__btns .el-button.el-button--default.el-button--small{
    /*border-image: -webkit-linear-gradient( #5f2337, #1f1a1c) 60 30 !important;*/
    border:2px solid #341c25;
    background: #1e1a1c;
}
.el-message-box__wrapper .el-message-box .el-message-box__btns .el-button.el-button--default.el-button--small.el-button--primary {
  background: none;
  border:none;
}
.el-message-box .el-message-box__title,.el-message-box__message,.el-button span{
  color:#fff
}
.el-message-box__container .el-message-box__status.el-icon-warning {
    color: #fff;
}
.el-message-box .el-message-box__headerbtn .el-message-box__close{
  color:#fff;
}
.el-message-box__wrapper .el-message-box .el-message-box__headerbtn .el-message-box__close:hover {
    color: #fff;
}


#app{
  width: 100%;
  min-width:1280px;
  background-color: #100f0f;
}
*{word-wrap:break-word}
    html,body,h1,h2,h3,h4,h5,h6,hr,p,iframe,dl,dt,dd,ul,ol,li,pre,form,button,input,textarea,th,td,fieldset{margin:0;padding:0}
    ul,ol,dl{list-style-type:none}
    html,body{*position:static}
    html{font-family: sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
    address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:400}
    input,button,textarea,select,optgroup,option{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit}
    input,button{overflow: visible;vertical-align:middle;outline:none}
    body,th,td,button,input,select,textarea{font-family:"Microsoft Yahei","Hiragino Sans GB","Helvetica Neue",Helvetica,tahoma,arial,Verdana,sans-serif,"WenQuanYi Micro Hei","\5B8B\4F53";font-size:12px;color: #333;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing:grayscale}
    body{line-height:1.6}
    h1,h2,h3,h4,h5,h6{font-size:100%}
    a,area{outline:none;blr:expression(this.onFocus=this.blur())}
    a{text-decoration:none;cursor: pointer}
    a:hover{text-decoration:underline;outline:none}
    a.ie6:hover{zoom:1}
    a:focus{outline:none}
    a:hover,a:active{outline:none}:focus{outline:none}
    sub,sup{vertical-align:baseline}
    button,input[type="button"], input[type="submit"] {line-height:normal !important}
    /*img*/
    img{border:0;vertical-align:middle}
    a img,img{-ms-interpolation-mode:bicubic}
    .img-responsive{max-width: 100%;height: auto}
    
    /*IE下a:hover 背景闪烁*/
    *html{overflow:-moz-scrollbars-vertical;zoom:expression(function(ele){ele.style.zoom = "1";document.execCommand("BackgroundImageCache",false,true)}(this))}
    
    /*HTML5 reset*/
    header,footer,section,aside,details,menu,article,section,nav,address,hgroup,figure,figcaption,legend{display:block;margin:0;padding:0}time{display:inline}
    audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
    audio:not([controls]){display:none}
    legend{width:100%;margin-bottom:20px;font-size:21px;line-height:40px;border:0;border-bottom:1px solid #e5e5e5}
    legend small{font-size:15px;color:#999}
    svg:not(:root) {overflow: hidden}
    fieldset {border-width:0;padding: 0.35em 0.625em 0.75em;margin: 0 2px;border: 1px solid #c0c0c0}
    input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {height: auto}
    input[type="search"] {-webkit-appearance: textfield; /* 1 */-moz-box-sizing: content-box;-webkit-box-sizing: content-box; /* 2 */box-sizing: content-box}
    input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration {-webkit-appearance: none}
    /*
    Name:			style_clearfix
    Example:		class="clearfix|cl"
    Explain:		Clearfix（简写cl）避免因子元素浮动而导致的父元素高度缺失能问题
    */
    .cl:after,.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.cl,.clearfix{zoom:1}

</style>
