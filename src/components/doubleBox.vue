<template>
  <div class="doubleBox">
      <div class="ling"></div>
      <div class="ling_left" v-cursor>
            <img class="left_img clear_skew" v-if="staus" src="../assets/ROLL/3.png" alt="">
            <img class="left_img clear_skew" v-else src="../assets/ROLL/2.png" alt="">
            <img class="title clear_skew"  v-if="staus" src="../assets/ROLL/7.png" alt="">
            <img class="title clear_skew"  v-else src="../assets/ROLL/5.png" alt="">
            <p class=" p clear_skew">{{titleTop}}</p>
            <p class="p2 clear_skew">开奖时间：{{time}}</p>
      </div>
      <div class="ling_left_box"></div>
      <div class="ling_right" v-cursor>
            <img class="right_img clear_skew" v-lazy="img2" alt="">
            <img class="right_img1 clear_skew" v-lazy="fir" alt="">
            <div class="text_left clear_skew"> 
                <div class="textdsd">{{text_left}}</div>
                <div>{{erxi}}</div>
            </div>
            <div class="text_right clear_skew">等<span>{{num}}</span>件奖品</div>
      </div>
  </div>
</template>

<script>

export default {
  name: '',
  props:{
      staus:{
          type:Boolean,
          default:true,
      },
  
      titleTop:{
          type:String,
          default:"星会员免费ROLL房第三期"
      },
      img2:{
          type:String,
          default:require('../assets/ROLL/4.png')
      },
      time:{
          type:String,
          default:"2020-03-28 00:00:00"
      },

      fir:{
          type:String,
          default:require('../assets/ROLL/6.png')
        //   default:require('../assets/ROLL/6.png')
      },
      text_left:{
          type:String,
          default:"M4A4(STrik)",      
        },
      erxi:{
            type:String,
            default:"二西莫夫"
      },
      num:{
          type:Number,
          default:'50'
      }
  },
  components: {},
  data() {
    return {

    }
  },
  mounted(){
      
  },
  methods:{
  }
}
</script>

<style scoped>
    .doubleBox{
         width: 433px;
        height: 153px;
        position: relative;
    }
    .ling{
        width: 433px;
        height: 153px;
        position: absolute;
        background-image: -webkit-linear-gradient( rgba(18, 17, 17, 0.1), rgba(54, 28, 17, 1));
        background-image: -moz-linear-gradient( rgba(18, 17, 17, 0.1), rgba(54, 28, 17, 1));
        background-image: -ms-linear-gradient( rgba(18, 17, 17, 0.1), rgba(54, 28, 17, 1));
        background-image: -o-linear-gradient( rgba(18, 17, 17, 0.1), rgba(54, 28, 17, 1));
        background-image: linear-gradient( rgba(18, 17, 17, 0.1), rgba(54, 28, 17, 1));
        top: 0;
        left: 0;
        transform:skewX(-15deg);
        -webkit-transform:skewX(-15deg);
        -moz-transform:skewX(-15deg);
        -ms-transform:skewX(-15deg);
        -o-transform:skewX(-15deg);
    }
    .ling_left{
        width: 192px;
        height: 153px;
        border: 1px solid #fff;
        border-image: linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -webkit-linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -moz-linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -ms-linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -o-linear-gradient( #5e2a14, #100f10) 30 30;
        position: absolute;
        top: 0;
        left: 0;
        transform: skewX(-15deg);
        -webkit-transform:skewX(-15deg);
        -moz-transform:skewX(-15deg);
        -ms-transform:skewX(-15deg);
        -o-transform:skewX(-15deg);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content:center;
        flex-direction: column;
    }
    .ling_right{
        width: 242px;
        height: 153px;
        border: 1px solid #fff;
        border-left: none;
        border-image: linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -webkit-linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -ms-linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -moz-linear-gradient( #5e2a14, #100f10) 30 30;
        border-image: -o-linear-gradient( #5e2a14, #100f10) 30 30;
        position: absolute;
        top: 0;
        right: 0;
        transform:skewX(-15deg);
        -webkit-transform:skewX(-15deg);
        -moz-transform:skewX(-15deg);
        -ms-transform:skewX(-15deg);
        -o-transform:skewX(-15deg);
        z-index: 2;
        
    }
    .clear_skew{
        transform: skewX(15deg);
        -webkit-transform:skewX(15deg);
        -moz-transform:skewX(15deg);
        -ms-transform:skewX(15deg);
        -o-transform:skewX(15deg);
        
    }
    .left_img{
        width: 69px;
        height: 75px;
    }
    .ling_left .p{
        margin-top: 10px;
        color: #fff;
        font-weight: 900;
    }
    .ling_left .p2{
        color: #835968;
        font-weight: 900;
    }
    .title{
        width: 39px;
        height: 16px;
        position: absolute;
        top: 34px;
        right: 40px;
    }
    .right_img{
        position: absolute;
        top:19px;
        left: 23px;
        width: 130px;
        /* height: 100px; */
    }
    .right_img1{
        position: absolute;
        top:36px;
        right: 0px;
    }
    .text_left{
        color:#fff;
        position: absolute;
        bottom: 18px;
        left: 23px;
     
    }
    .textdsd{
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        width: 180px;
        margin-top: -34px;
    }
    .text_right{
        position: absolute;
        bottom: 17px;
        right: 10px;
        color: #906375;
    }
    .text_right span{
        color: #dd407e;
    }
</style>

