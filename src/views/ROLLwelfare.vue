<template>
  <div class="welfare1">
      <div class="bg">
        <img  src="../assets/ROLL/1.jpg" alt="">
      </div>
      <!-- <div class="ROLLfuli123">
          ROLL福利
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
           <div class="box_right" >
              
             <div class="Double_box">
               <div class="Double_box1"  v-for="(item,index) in fir" :key="index"  @click="Rollmessage(item.id)">
                     <doubleBox 
                      class="doube_box"
                      :titleTop="item.title+item.desc"
                      :time="item.endTime"
                      :num="item.count"
                      :staus="item.status"
                      :text_left='item.type'
                      :erxi="item.name"
                      :img2="item.image" 
                      ></doubleBox>
               </div>
             
             </div>

              <div class="all_button"  @click="getAllState">
                <div class="ling"></div>
                <div class="all" v-cursor>{{listName}}</div>
                  <div class="allState"  v-show="isState" v-cursor>
                      <div v-for="(item,index) in stateList" @click="getStateData(item.id,item.name)" :key='index'>{{item.name}}</div>
                  </div>
              </div>
              <!-- 分页 -->
              <fenye :total="total" :currentPage='current'  :pageLength="pageLength" @pagechange="pagechange"></fenye>
          </div>
      </div>
     <!-- <rechargeMoney></rechargeMoney> -->
  </div>
</template>

<script>
const publicBoxLeft  = ()=> import ("../components/publicBoxLeft")  //异步加载组件
const doubleBox = () => import("../components/doubleBox")
// import doubleBox from '../components/doubleBox'
const rechargeMoney = ()=>import('./rechargeMoney')
import fenye from '../components/fenye'

import {getRolldata} from '../axios/Apilogin'
export default {
  name: '',
  components: {
    publicBoxLeft,
    doubleBox,
    rechargeMoney,
    fenye
  },
  data() {
    return {
        total: 1,     //记录总条数
        pageLength: 1,//每页显示条数
        current: 1,   //当前的页数
        pageNum:1,
        status:-1,
        knowimg:true,
        image:'https://blackholeskins-cn.oss-cn-shanghai.aliyuncs.com//resources/upload/image/2020/5/e21106bf3eb64ab6a18e46c91d8b4f9b.png',
        img:'',
        listName:"全部",
        fir:[         
        ],
        isState:false,//拉下显示隐藏
        stateList:[
            {
                "id":-1,
                "name":"全部"
            },
            {
                "id":0,
                "name":"已结束"
            },
            {
                "id":1,
                "name":"进行中"
            }
        ],
    }
  },
  beforeCreate(){
    let count = 0;
    var imgs =  require('../assets/ROLL/1.png')
    
    let image = new Image();
    image.src = imgs;
    this.img = image;
  },
  mounted(){
    const params={
      'pageNum':this.pageNum,
      'pageSize':this.pageLength,
      'status':-1
    }
    getRolldata(params).then((res)=>{
      this.status=-1;
      if(res!=undefined){
        this.current=1;
        this.total=res.total;
        this.fir = res.data;
      }
    })
  },
  methods:{
    know(){
      this.knowimg=false
    },
    Rollmessage(e){   //跳转
      this.$router.push({  
        path: 'ROLLactivelyDetail', 
        query: {Rollid: e}
        })
    },
    //获取全部下拉列表
    getAllState(){
        this.isState = !this.isState;
    },
    //获取下拉列表对应的数据
    getStateData(e,name){
      this.status=e;
      this.listName = name;
        const params={
            'pageNum':this.pageNum,
            'pageSize':this.pageLength,
            'status':e
        }
        getRolldata(params).then(res=>{
          if(res!=undefined){
            this.current=1;
            this.total=res.total;
            this.fir = res.data;
          }
        })
    },
    pagechange(currentPage){//根据当前页数请求渲染数据
        // this.fenyeList = this.fir.slice((currentPage-1)*pageLength,currentPage*pageLength)
          const params={
            'pageNum':currentPage,
            'pageSize':this.pageLength,
            'status':this.status
          }
        getRolldata(params).then(res=>{
          if(res!=undefined){
            this.total=res.total;
            this.fir = res.data;
          }
        })
     },
  }
}
</script>

<style scoped>
.welfare1{
    width: 1280px;
    padding-bottom: 20px;
    /* background-color: #0d0c0e; */
    margin:0 auto;
    position: absolute;
    left: 0;
    top: 0;
}
.bg{
  /* position: absolute;
  left: 0;
  top: 0; */
}
.ROLLfuli123{
  position: absolute;
  width: 100%;
  height: 280px;
  text-align: center;
  line-height: 300px;
  font-size: 46px;
    background-image:-webkit-linear-gradient(left,#ec1807,#ff621d);
    background-image:-moz-linear-gradient(left,#ec1807,#ff621d);
    background-image:-ms-linear-gradient(left,#ec1807,#ff621d);
    background-image:-o-linear-gradient(left,#ec1807,#ff621d);
    background-image:linear-gradient(left,#ec1807,#ff621d);
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
  top: 221px;
}
.box_left{
  width: 288px;  

}
.public_box{
  margin-bottom: 23px;
  }
.box_right{
  width: 992px;
 
}
.all_button{
  width: 60px;
  height: 24px;
  position: absolute;
  top: 0;
  right: 80px;
  text-align: center;
  line-height: 23px;
  color: #fff;
   /* position: relative; */
}
.ling{
  position:absolute;
  top:0;
  left: 0;
  background: #ec1807;
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
  padding-left: 20px;
  padding-top: 43px;
}
.Double_box1{
  display: flex;
  flex-wrap: wrap;
  /* padding-left: 20px; */
}
.doube_box{
  margin-right: 13px;
  margin-bottom: 13px;
}
    .allState{
        /*background: #fff;*/
        color: #fff;
        z-index: 5;
        position: relative;
        background: url("../assets/exchangeMall/xiala.png");
        background-size: 100% 100%;
        top: 3px;
        left: -2px;
    }
</style>

