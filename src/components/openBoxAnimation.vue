<template>
  <div class="openBoxAinmation">
      <!-- <div @click="openBoxJisuan" class="open" v-cursor>open</div> -->
      <!-- <div class="content"> -->
        <img class="animation_bg" src="../assets/openBox/oneOpenBox/1.png" alt="">
      <!-- </div> -->
      <div class="lundongbox" :style="{'right':rgt}">
        <!-- <div class="yidong_box" > -->
          <div class="boxsssss">
                <div class="gun_box" v-for="(item,index) in list" :key="index">
                  <img class="gun_box_bg" :src="index%2?imgbg1:imgbg2" alt="">
                  <img class="fir" :src="item.image" alt="">
                  <div class="text">
                       <p class="first_p">{{item.type}}</p>
                       <P class="two_p">{{item.name}}</P>
                    </div>
                
              </div>
          </div>
          
        <!-- </div> -->
      </div>
      <img class="_jiantou" src="../assets/openBox/oneOpenBox/2.png" alt="">
     
  </div>

</template>

<script>

import {GetBoxShowing} from '../axios/Apilogin'
import {GetOpenBox} from '../axios/PersonalApi'
import Bus from '../axios/Bus'
export default {
  name: '',
  components: {
 
  },
  data() {
    return {
      imgbg1:require('../assets/openBox/oneOpenBox/5.png'),
      imgbg2:require('../assets/openBox/oneOpenBox/3.png'),
      rgt:'0px',//控制移动
      fir_LIST:[
        {},
      ],
      list:[],
      xxxx:'',
      timer:false,
    }
  },
  mounted(){
    const id=this.$route.query.id;
    GetBoxShowing(id).then((res)=>{  //获取所有的箱子内容
      if(res!=undefined){
         var bigArray = Array(80);
        var smallArray = res.data[0].goodsList;
        var xunhuanBigArray=this.HpArray(smallArray,bigArray)
        this.list=xunhuanBigArray;
        console.log(this.list)
      }
    })
  },
  methods:{
      //测试点击按钮，跑动滚轮
      open(arr){
          var that=this;
          var right = 0;  //起始滑动距离
          // this.render();   //添加滚动的内容，进入盒子  添加60个小方格
          // console.log(this.list[68])   //确定68是具体位置
          var count=0;    //启示速度
          var speed=50;   //这个是控制滑动速度  
          var list = this.list;
          list[68]=arr;
          this.list = list;

          //生成一个1-145的随机数，然后加上475，控制滚轮滑动的位置
          var suiji = Math.floor(Math.random()*130)+1
          this.timer=true;
           var timer = setInterval(function(){   //定时任务

              right+=speed  //开始后先移动50
              count++  //
              that.rgt=right+'px';

              if(count>=150 ){    //当速度大于150的，慢慢的慢下来
                  speed=30
              }
              if(count>=200){     //大于200的时候，速度再慢一点
                  speed=20     
              } 
              if(count>=250){  
                  speed=10
              }
              if(count>=300){   
                  speed=5
              }
              if(count>=320){
                  speed=3
              }
              if(count>=340){
                  speed=2
              }
              if(count>=380){
                  speed=1
              } if(count>=suiji+475){
                  clearInterval(timer)
                  that.timer=false;  //结束可以继续开箱
                  // rendertime++    //统计开箱几次
                  // $('#btn').css('display','block');
                  // var copy= $.clone($('.swiper-slide')[50])
                  // console.log(copy)   //克隆选中的div，把他加到，下面的选中框里  
                  that.$emit('shuDingJp',arr)      
              }                
                  // $('.layout').append(copy)
          },20)
      },



    //封装轮播结束得到位置，并计算到哪里停止
    openBoxJisuan(){
        if(this.timer){
            return
          }
        const data={
          "openNum":1,
          "id":this.$route.query.id
        }
        GetOpenBox(data).then((res)=>{
            if(res!=undefined){
                if(res.code==500){
                  Bus.$emit('yao',1)
                }else if(res.code==0){
                  this.xxxx=res.data[0];
                  this.open(res.data[0])
                  Bus.$emit('moneySell',1)  //重新刷新登上金额
                }
            }
        })
      
   },

    //封装小数组填充大数组的算法=>超复杂
    HpArray(smallArray,bigArray){
        var bei =0;
        var  wwww =0;                 //声明一个第二个元素的长度  
        for(var i=0;i<bigArray.length;i++){
          if(bei!= 0){
              bigArray[i]=smallArray[i-wwww*bei];
              if(i==(smallArray.length)*(bei+1)-1){
                wwww=smallArray.length;
                bei++;
              }
          }else if(bei==0){
            bigArray[i]=smallArray[i-wwww];
              if(i==smallArray.length-1){
                wwww=smallArray.length;
                bei++;
              }
          }
      
        }
        return bigArray
    },


     render(){   //render函数
            // $('.slider-wrapper').empty()   //每次重新点击，都会移除滚动元素的所有内容
            var bigArray = Array(60);
            var smallArray = this.fir_LIST;
            var xunhuanBigArray=this.HpArray(smallArray,bigArray)
            this.list=xunhuanBigArray;
        },

        random(){   //产生随机数
            return parseInt((Math.random()*100)+1)
        }

  }
}
</script>

<style scoped>
.boxsssss{
  display: flex;
}
.yidong_box{
  position: absolute;
  top: 0px;
  display: flex;
}
.open{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000000000000000;
  color: #ffffff;
}
.openBoxAinmation{
  width: 824px;
  transform: skewX(-15deg);
  height: 239px;
  overflow: hidden;
}
.content{
  width: 883px;
  height: 239px;
  position: relative;
  display: block;
  
}
.animation_bg{
  width: 883px;
  height: 239px;
  transform: skewX(14deg);
  position: absolute;
  left: -29px;
  top: 0px;
}
.lundongbox{
  /* width: 883px; */
  height: 239px;
  position: relative;
  display: flex;
  transform: skewX(15deg);
  margin-left: -29px;
}
._jiantou{
  position: absolute;
  bottom:31px;
  left: 325px;
}
.gun_box{
  width: 165px;
  height: 208px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #ffffff;
  padding-top: 11px;
  box-sizing: border-box;
}
.gun_box_bg{
  position: absolute;
  left: 0;
  bottom: 0;
}
.fir{
  width: 110px;
  /* height: 69px; */
  position: relative;
  margin-left:59px;
}
.gun_box p{
  position: relative;

}
.first_p{
  /* margin-top: 31px; */

}
.gun_box .two_p{
  /* margin-left: -10px; */
}
.text{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-left: 32px;
  margin-top: 28px;
}
</style>
