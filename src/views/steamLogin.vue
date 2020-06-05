<template>
  <div class="steamLogin">
        <div class="login_top">
            <img class="top_img" src="../assets/login/1.png" alt="">
             <p class="text_bg">LOGIN</p>
            <p class="text_zhuce">登录</p>
            <img class="top_img" src="../assets/login/1.png" alt="">
        </div>

        <div class="mode">
            -登录方式-
        </div>

        <div class="up_price">
                <div class="red_box"></div>
                <div class="daole">
                    <img src="../assets/steamLogin/1.png" alt="">
                </div>
        </div>

          <div class="login_input login_input1">
            <div class="linxing1"></div>
            <div class="tjiao">登录</div>
        </div>

         <div class="mode1" @click="goBack">
            返回上一步
        </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {

    }
  },
    methods:{
      //返回上一层
      goBack(){  
          this.$emit('handleLogin')
      }
  }
}
</script>

<style scoped>
    .steamLogin{
        /* position: fixed;
        top: 50%;
        left: 50%; */
        width: 490px;
        height: 425px;
        background-color: #fff;
        /* transform: translate(-50%,-50%); */
        /* z-index: 9999; */
        /* background: linear-gradient(#232123, #65072c); */
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url(../assets/register/1.png);
    }
    .login_top{
        display: flex;
        width: 160px;
        margin: 36px auto 20px;
        position: relative;
      
    }
    .top_img{
        width: 27px;
        height: 45px;
    }
    .text_zhuce{
        font-size: 26px;
        color:#e60f64;
        width: 105px;
        text-align: center;
        line-height: 32px;
        font-style: oblique;
        font-weight: 700;
    }
    .text_bg{
        font-size: 25px;
        font-style: italic;
        position: absolute;
        top: 9px;
        left: 36.5px;
        color: #2d2d2d;
        font-weight: 700;
        z-index: -1;
    }
    .login_input{
        position: relative;
        width: 336px;
        height: 42px;
        margin-top: 25px;
    }
    .login_input1{
        margin-top:51px;
        cursor:pointer;
    }
    .linxing{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transform: skewX(-15deg);
        -webkit-transform: skewX(-15deg);
        -moz-transform: skewX(-15deg);
        -ms-transform: skewX(-15deg);
        -o-transform: skewX(-15deg);
        border: 1px solid #691534;
        background-color: #151414;
    }
    .linxing1{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transform: skewX(-15deg);
        -webkit-transform: skewX(-15deg);
        -moz-transform: skewX(-15deg);
        -ms-transform: skewX(-15deg);
        -o-transform: skewX(-15deg);
        border: 1px solid #691534;
        background:linear-gradient(to right,#ba023f,#ff537b);
        background:-webkit-linear-gradient(to right,#ba023f,#ff537b);
        background:-moz-linear-gradient(to right,#ba023f,#ff537b);
        background:-ms-linear-gradient(to right,#ba023f,#ff537b);
        background:-o-linear-gradient(to right,#ba023f,#ff537b);
    }
    .tjiao{
        font-size: 16px;
        position: absolute;
        top:50%;
        right: 41%;
        z-index: 2;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        color: #fff;
        font-style: italic;
        font-weight: 700;
    }
     .input_img{
        position: absolute;
        top: 7px;
        left: 18px;
    }
    .mode{
        color: #7d7a7a;
        font-size: 16px;
    }
    .mode1{
        color: #7d7a7a;
        font-size: 16px;
        margin-top: 27px;
        cursor:pointer;
    }
        .up_price{
        width: 100px;
        height: 76px;
        position: relative;
        margin-top: 30px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .red_box{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
         background-color: #151414;
        transform: skewX(-15deg);
        -webkit-transform: skewX(-15deg);
        -moz-transform: skewX(-15deg);
        -ms-transform: skewX(-15deg);
        -o-transform: skewX(-15deg);
        border: 1px solid #e60f64;
    
    }
    .daole{
        font-size: 26px;
        position: absolute;
      
        /* z-index: 10px;
        top:18px;
        left: 31px; */
        display: flex;
        color: #e60f64;
        font-style: italic;
    }
    
</style>
