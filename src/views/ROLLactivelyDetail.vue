<template>
  <div class="welfare">
 
      <div class="bg">
        <!-- <img  src="../assets/ROLL/1.png" alt=""> -->
        <img  src="../assets/ROLL/1.jpg" alt="">
      </div>
      <div class="diceng" v-show="knowimg">
          <img class="diceng_bg" src="../assets/ROLL/8.png" alt="">
          <div class="dicent_text">微信、云闪付通道维护中~暂时关闭，请关注其他方式</div>
          <div class="know" v-cursor @click="know">知道了</div>
          <!-- <img src="../assets/ROLL/9.png" class="know" @click="know" alt=""> -->
        </div>
      <!-- <div class="ROLLfuli">
          ROLL福利
      </div> -->
      <div class="box_left_box">
          <!-- <div class="box_left"> -->
              <!-- <publicBoxLeft class="public_box"></publicBoxLeft> -->
          <!-- </div> -->
           <div class="box_right">
               <div class="box_right_top_box">
                    <img class="bgc" src="../assets/ROLL/detail/1.png" alt="">
                    <div class="top_box_left">
                        <div class="activeBg">
                             <img src="../assets/ROLL/detail/2.png" alt="">
                        </div>
                       
                    </div>
                    <div class="top_box_center">
                        <div class="Color_text">{{message.title}}{{message.desc}}</div>
                        <p>开奖时间</p>
                        <p>{{message.endTime}}</p>
                    </div>
                    <div class="top_box_right">
                        <div>此活动{{playState}}</div>
                        <!--<img src="../assets/ROLL/detail/joinIn.png">-->
                        <div class="join">
                          <div class="joinBg">
                            <img src="../assets/ROLL/detail/joinIn.png" alt="">
                          </div>
                          <div class="but" v-cursor @click="AtonceClick(message.id)">{{join}}</div>
                        </div>
                        <p v-if="message.status">剩余时间  {{day}}天{{Hour}}时{{min}}分{{miao}}秒</p>
                        <p v-else>您可以返回查看更多精彩活动</p>
                    </div>

                </div>

                <!-- 中奖用户 -->
                <div class="right_center" v-show="!urserAndPrize">
                 <div class="right_top_heng">
                        <img src="../assets/ROLL/detail/4.png" alt="">
                        <p>中奖用户</p>
                        <img class="hengxian" src="../assets/ROLL/detail/3.png" alt="">
                        <div class="all_button">
                            <div class="ling"></div>
                            <div class="all">全部</div>

                        </div>
                    </div>
                       <div class="Double_box Double_box_User">
                             <publicBoxJiang 
                             class="doblebox" 
                             v-for="(item,index) in message.rollGoods" 
                             :key="index"
                             :type1='item.type'
                             :name="item.name"
                             :firImg="item.image"
                             :nickName="item.nickName"
                             
                             ></publicBoxJiang>
                        </div>
                </div>




                <!-- 参与用户 -->
                 <div class="right_bottom" v-show="urserAndPrize">
                
                 <div class="right_top_heng">
                        <img src="../assets/ROLL/detail/4.png" alt="">
                        <p>参与用户</p>
                        <img class="hengxian" src="../assets/ROLL/detail/3.png" alt="">
                        <div class="all_button">
                            <div class="ling"></div>
                            <div class="all">全部</div>
                        </div>
                    
                    </div>

                       <div class="Double_box Double_box_User">
                             <publicDobleColor 
                             v-for="(item,index) in message.joinUser" 
                             class="doblebox" 
                             :key="index"
                             :nametype="item.type"
                             :name="item.nickName"
                             :imgedState=false
                             :img_state_show=1
                             :userState=true
                             :shoujiastate=false
                             ></publicDobleColor>
                        </div>
                </div>
       

              <!-- 奖品展示 -->
                <div class="right_bottom">
                
                 <div class="right_top_heng">
                        <img src="../assets/ROLL/detail/4.png" alt="">
                        <p>奖品展示</p>
                        <img class="hengxian" src="../assets/ROLL/detail/3.png" alt="">
                        <div class="all_button">
                            <div class="ling"></div>
                            <div class="all">全部</div>
                        </div>
                    
                    </div>

                       <div class="Double_box">
                             <publicDobleColor 
                             v-for="(item,index) in message.rollGoods" 
                             class="doblebox" 
                             :key="index"
                             :imgedState=false
                             :img_state_show=1
                             :img1='item.image'
                             :nametype="item.type"
                             :name="item.name"
                             :shoujiastate=false
                             ></publicDobleColor>
                        </div>
                </div>
          </div>
      </div>
     <div class="fillPassword" v-show="fillPasswordjoin">
            <input type="text" v-model="passwordfoll" placeholder="输入密码参加活动">
            <div class="quert" v-cursor @click="fillPassClick(message.id)">确定</div>
     </div>
  </div>
</template>

<script>
const publicBoxLeft  = ()=> import ("../components/publicBoxLeft")  //异步加载组件
const publicDobleColor = ()=>import ('../components/publicDobleColor');
const publicBoxJiang = ()=>import ('../components/publicBoxJiang');
const linxingBox =()=>import('../components/lingxingBox')
// import doubleBox from '../components/doubleBox'
import {
    getRollFuli,
    postRollJon,
    postPassword,
    getRolldata,
    GetPeople,
    postSellGood,
    GetProplePrice
} from '../axios/Apilogin';
import {Message} from 'element-ui';
export default {
  name: '',
  components: {
    publicBoxLeft,
    publicDobleColor,
    publicBoxJiang,
      linxingBox
  },
  data() {
    return {
      knowimg:true,
        fillPasswordjoin:false,  //参加又密码的活动，显示填写密码
        urserAndPrize:true, //活动正在进行时，显示用户和奖品展示
        passwordfoll:"",  //填入密码
        playState:'正在进行',
        join:"立即参与",
        day:'',
        Hour:'',
        min:'',
        miao:'',
        img:'',
        message:'',

        fir:[
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
      list:[
        {
          
        }
      ]
    }
  },
  beforeCreate(){
 
  },
  mounted(){
        this.getRollFuli();
  },
  methods:{
    know(){
      this.knowimg=false
    },
      getRollFuli(){//获取当前信息
          var that=this;
          let Rollid=this.$route.query.Rollid;  // 带过来的id
          //获取当前信息
          getRollFuli(Rollid).then((res)=>{
            if(res!=undefined){
              this.message=res.data;
              if(res.data.millis>0){
                  this.Timer(res.data.millis)
              }
              if(!res.data.join){
                  this.join="已参与"
              }
              if(!res.data.status){
                  this.playState='已结束';
                  this.urserAndPrize=false
              }
            }
          })
      },
    //填写密码参与
    fillPassClick(id){
      const data={
        'id':id,
        'pwd':this.passwordfoll
      }
      postPassword(data).then((res)=>{
        if(res!=undefined){
          if(res.code==1){
              Message({
                message:res.msg,
                type:'error'
              })
          }else if(res.code==0){
            Message({
                message:'参与成功',
                type:'success'
              })
              this.fillPasswordjoin=false
          }
        }
     
      })
    },
    //活动点击理解参与
    AtonceClick(id){
      const data={
        "id":id
      }
    postRollJon(data).then((res)=>{
      if(res!=undefined){
      if(res.msg=='success'){
          this.join='已参与'
          // GetProplePrice().then((res)=>{
          //     console.log("-----------------------用户个人信息")
          //     console.log(res.data)
          //     this.message.joinUser.push({
          //         "avatar": res.data.avatar,
          //         "nickName": res.data.nickName
          //     })
          // })
          //获取当前信息
          let Rollid=this.$route.query.Rollid;  // 带过来的id
          getRollFuli(Rollid).then((res)=>{
            if(res!=undefined){
              this.message=res.data;
            }
          })
      }else if(res.code===1){//已参与
          this.getRollFuli();
           // Message({                                      //element-ui中的展示请求错误的信息
           //      message:res.msg,
           //      type:'error'
           //  })
      }else if(res.code===2){
        this.fillPasswordjoin=true;
      }else if(res.code==3){
           Message({
              message:res.msg,
              type:'error'
            })
        }
      }
    })
  },

    //封装秒数转化为具体时间
    Timer(m){
      
        let day = Math.floor( m / (60 *60 *24))   //剩余天
        let Hour=Math.floor(m / (60 *60)-day*24)   //剩余小时
        let min = Math.floor( m /(60)-day*24*60-Hour*60 )  //剩余分钟
        let miao = Math.floor( m -day*24*60*60-Hour*60*60-min*60 );
        this.day=day
        this.Hour=Hour
        this.min=min
        this.miao=miao
  
        this.AutoTime(day,Hour,min,miao)
        // this.AutoTime(4,0,2,3)
       
    },
    //封装自动减少时间
    AutoTime(day,Hour,min,miao){
      var that=this;
        that.change_timer=setInterval(function(){
              that.miao=miao--;
              if(miao==-1){
                miao=59;
              }if(miao==58){
                 that.min=that.min-1;
              }
              if(that.min==-1){
                  that.min=59;
                  that.Hour=that.Hour-1;
              }if(that.Hour==-1){
                  that.Hour =23;
                  that.day =that.day-1;
              }if(that.day==-1){
                  that.day=0
              }else if(that.day==0&&that.Hour==0&&that.min==0&&that.miao==0){
                clearInterval(that.change_timer)
              }
              
        },1000)
    },
  },
  destroyed(){
    clearInterval(this.change_timer)
  }

}
</script>

<style scoped>
.welfare{
    width: 1280px;
    height: 1500px;
    padding-bottom: 20px;
    /* background-color: #0d0c0e; */
    margin:0 auto;
    position: absolute;
    z-index: 0;
}
.bg{
  /* position: absolute;
  left: 0;
  top: 0; */
}
.ROLLfuli{
  position: relative;
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
  top: 239px;
}
.box_left{
  width: 288px;  

}
.public_box{
  margin-bottom: 23px;
  }
.box_right{
  width: 992px;
  margin-top: -10px;
  position: relative;
}
/* 单独css */
.box_right_top_box{
    width: 844px;
    height: 145px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 47px;
    box-sizing: border-box;
}
.but{
  width: 158px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 900;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
.box_right_top_box .bgc{
    position: absolute;
    left: 0;
    top: 0;
}
.top_box_left{
    position: relative;
}
.activeBg{
    width: 116px;
    height: 116px;
    border-radius: 50%;
    margin-left: 15px;
    overflow: hidden;
}
.top_box_center{
    position: relative;
    font-size: 16px;
    color: #fff;
}
.Color_text{
    background-image:-webkit-linear-gradient(left,#ec1807,#ff621d);
    background-image:-moz-linear-gradient(left,#ec1807,#ff621d);
    background-image:-ms-linear-gradient(left,#ec1807,#ff621d);
    background-image:-o-linear-gradient(left,#ec1807,#ff621d);
    background-image:linear-gradient(left,#ec1807,#ff621d);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    text-fill-color:transparent;
  font-size: 26px; 
  font-weight: 900;
  font-style: italic;
  padding-right: 20px;
}
.top_box_center{
    font-weight: 500;
}
.top_box_right{
    font-size: 14px;
    color: #e60964;
    position: relative;
    font-style: italic;
    text-align: center;
}
.top_box_right .join{
  position: relative;
  width: 170px;
}
.top_box_right .join img{
  width: 100%;
}
.top_box_right div:nth-child(1){
    font-size: 22px;
    font-weight: 900;
}
.right_top_heng{
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 30px;
    position: relative;
}
.right_top_heng p{
   font-size: 16px;
   background-image:-webkit-linear-gradient(left,#94140a,#ff621d);
    background-image:-moz-linear-gradient(left,#94140a,#ff621d);
    background-image:-ms-linear-gradient(left,#94140a,#ff621d);
    background-image:-o-linear-gradient(left,#94140a,#ff621d);
    background-image:linear-gradient(left,#94140a,#ff621d);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    text-fill-color:transparent;
  font-weight: 900;
  font-style: italic;
  margin-left: 7px;
  padding-right: 10px;
}
.hengxian{
    margin-left: 8px;
}
.box{
    margin-right: 13px;
    margin-bottom: 10px;
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
    /* margin-left: -10px; */
  padding-top: 20px;

}
/*
.Double_box_User{
  width: 992px;
  height: 243px;
  overflow-x: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none; 
}
.Double_box_User::-webkit-scrollbar {
    display: none;
}*/
.hengxian_box{
    margin-bottom: 20px;
}
.doube_box{
  margin-right: 13px;
  margin-bottom: 13px;
}
.doblebox{
    margin-right: 20px;
    margin-bottom: 17px;
}
.fillPassword{
  width: 300px;
  height: 100px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.quert{
  border: 1px solid #333;
  margin-left: 20px;
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
    top: 1113px;
}
.fenye_box{
    margin-right: 8px;
    margin-left: 8px;
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
</style>

