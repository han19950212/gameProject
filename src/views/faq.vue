<template>
  <div class="dailyFree">
      <div class="bg">
        <img  src="../assets/ROLL/1.jpg" alt="">
      </div>
      <!-- <div class="ROLLfuli123">
          常见问题
      </div> -->
      <div class="diceng" v-show="knowimg">
          <img class="diceng_bg" src="../assets/ROLL/8.png" alt="">
          <div class="dicent_text">微信、云闪付通道维护中~暂时关闭，请关注其他方式</div>
          <div class="know" v-cursor @click="know">知道了</div>
          <!-- <img src="../assets/ROLL/9.png" class="know" @click="know" alt=""> -->
        </div>
      <div class="box_left_box">
          <!-- <div class="box_left">
              <publicBoxLeft class="public_box"></publicBoxLeft>
          </div> -->
          <!-- 右边开始 -->
           <div class="box_right">
                <div class="hengxian_box">
                    <div class="right_top_heng">
                        <img src="../assets/faq/3.png" alt="">
                        <p>常见问题</p>
                        <img class="hengxian" src="../assets/faq/6.png" alt="">
                        <img class="triangle" src="../assets/faq/2.png" alt="">
                    </div>
                   
               </div>
                

                <!-- 问题 -->
                <div class="title"  v-for="(item,index) in question" :key='index'>
                    <div class="title_first">
                          <img src="../assets/faq/4.png" alt="">
                          <p class="number">{{item.id}}</p>
                          <p class="question">{{item.title}}</p>
                    </div>
                    <div class="title_question" v-for="(item1,index1) in item.questionlist" :key="index1">
                        <div class="title_question_box">
                            <img class="fangkui" src="../assets/faq/5.png" alt="">
                            <p>{{item1.question}}</p>
                        </div>
              
                        <div class="answer">
                            <p class="answer_text" v-show="item1.answer1">01. {{item1.answer1}}</p>
                            <p class="answer_text" v-show="item1.answer2">02. {{item1.answer2}}</p>
                            <p class="answer_text" v-show="item1.answer3">02. {{item1.answer3}}</p>
                        </div>
                    </div>
                </div>
          </div>
          <!-- 右边结束 -->
      </div>
     
  </div>
</template>

<script>
const publicBoxLeft  = ()=> import ("../components/publicBoxLeft")  //异步加载组件
const doubleBox = () => import("../components/doubleBox")
const exchangefirbox =()=>import('../components/exchangefirbox')
// import doubleBox from '../components/doubleBox'
export default {
  name: '',
  components: {
    publicBoxLeft,
    doubleBox,
    exchangefirbox
  },
  data() {
    return {
        knowimg:true,
        question:[
            {   
                title:'如何取回商品?',
                "id":"01",
                questionlist:[
                    {
                            "question": "由于steam大量封禁机器人账号，且csgo饰品有7天交易冷却目前全网的开箱网站均无法直接取回开箱物品。Blackholeskins支持所有的DOTA2装备取回以及售价高于30美金的CSGO物品（需要等待8天）或者可以去Blackholeskins兑换商城进行兑换。兑换前请保存正确的交易链接！请不要在交易链接处填写QQ号、手机号等！千万别嗷！",
                            "answer1":"",
                            "answer2":"",
                    }
                
                ]
            
            },
            {   
                title:'如何绑定steam或者steam无法访问？',
                "id":"02",
                questionlist:[
                    {
                          "question": "点击个人中心——如何获得交易链接（请注意！需要开启VPN嗷）什么？没有VPN？没有关系！",
                            "answer1":"启动UU加速器或者别的加速器启动登录STEAM",
                            "answer2":"打开STEAM 点击个人资料",
                    }
                ]
              
            },
             {   
                title:'Steam无法访问解决方案',
                "id":"03",
                questionlist:[
                    {
                          "question": "Steam在中国地区被墙导致用户出现无法通过Steam登录、Steam无法连接等问题。建议用户通过安装加速器，以便能临时访问Steam和使用Steam服务。",
                            "answer1":"、在手机APP Store或应用商店搜索手机加速器软件（APP版本），下载安装",
                            "answer2":"安装成功，打开搜索“steam”，点击加速",
                            "answer3":"加速器软件正常使用，用户按照正常存入、取回流程操作即可",
                    }
                ]
              
            },
             {   
                title:'STEAM账号无法交易？',
                "id":"04",
                questionlist:[
                    {
                        "question": "交易限制",
                        "answer1":"为了保护玩家的账户安全， Steam官方会因为用户的一些操作而限制其账户进行交易平台遵循Steam官方市场交易准则交易。交易限制期间的用户将无法取回购买的物品。",
                        "answer2":"",
                    },
                    {
                         
                        "question":"如何查看是否有交易限制?",
                        "answer1":"您可以通过尝试发起一次交易报价便会有所提示。",
                    },
                    {
                         
                        "question":"如何解除交易限制?",
                        "answer1":"无法解除，只能等待限制时间结束。Steam客服不会修改交易或 Steam 社区市场中的限制，无论您的帐户出于何种原因受限。我们同样无权解除用户账户的限制，有交易限制的用户等限制解除之后即可交易",
                    },
                    {
                         
                        "question":"交易限制原因",
                        "answer1":"Steam 令牌未启用",
                        "answer2":"为防止您的物品和 Steam账户被非法获取您密码的人盗用， Steam官方要求您启用Steam手机令牌超过15天，如果您启用Steam令牌不到15 天，您将无法交易。 您可以通过手机直接下载Steam Mobile, 开通Steam令牌，等待15天的冷却时间便可解除限制。",
                    },
                    {
                         
                        "question":"最近重置过密码",
                        "answer1":"如果您重置了您的密码，您将在 5 天内无法进行交易，如果您的帐户超过 2 个月没有任何活动，您将在 30 天内无法进行交易",
                    },
                    {
                         
                        "question":"新设备登陆",
                        "answer1":"如果您在一台受 Steam令牌保护不到7天的设备上登录，您在7天内将无法进行交易或使用社区市场。在其它被Steam令牌保护超过7天的设备上仍然可以进行交易或使用社区市场清除您的浏览器 Cookie、使用新的浏览器、重新安装Steam和格式化等操作将触发此限制。",
                    },

                    {
                         
                        "question":"账户封禁",
                        "answer1":"如果您的帐户被 Steam封禁交易，可能会被临时或永久性的交易封禁",
                    },
                    {
                         
                        "question":"其他限制类型",
                        "answer1":"近期取消交易报价、更改等，其他限制原因在您尝试发起一次报价的时候便会有提示的",
                        "answer2":'更多关于Steam账户安全及账户限制详情请参考文章：http://cncsgo.com/steam-account-protections.html'
                    },
                ]
              
            },
        
        ],
        Free:[
            {
                img:require('../assets/dailyFree/10.png'),
                img1:require('../assets/dailyFree/11.png'),
                text:'每天重新登录网站'
            },
            {
                img:require('../assets/dailyFree/12.png'),
                img1:require('../assets/dailyFree/15.png'),
                text:'提高当天在线时长'
            },
            {
                img:require('../assets/dailyFree/13.png'),
                img1:require('../assets/dailyFree/16.png'),
                text:'提高当天充值总额'
            },
            {
                img:require('../assets/dailyFree/14.png'),
                img1:require('../assets/dailyFree/17.png'),
                text:'绑定steam账号'
            },
        ],
        img:'',
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
  
     
    }
  },
  beforeCreate(){
    let count = 0;
    var imgs =  require('../assets/ROLL/1.png')
    
    let image = new Image();
    image.src = imgs;
    this.img = image;
  },
  methods:{
      know(){
          this.knowimg=false
      }
  }
}
</script>

<style scoped>
.dailyFree{
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
.ROLLfuli123{
  position: absolute;
  width: 100%;
  height: 280px;
  text-align: center;
  line-height: 300px;
  font-size: 46px;
   background-image:-webkit-linear-gradient(left,#ba023f,#ff537b);
    background-image:-moz-linear-gradient(left,#ba023f,#ff537b);
    background-image:-ms-linear-gradient(left,#ba023f,#ff537b);
    background-image:-o-linear-gradient(left,#ba023f,#ff537b);
    background-image:linear-gradient(left,#ba023f,#ff537b);
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
  top: 223px;
}
.box_left{
  width: 288px;  

}
.public_box{
  margin-bottom: 23px;
  }
.box_right{
  width: 992px;
  /* padding-left: 40px; */
  box-sizing: border-box;
  overflow-y: scroll;
  height: 1100px;
}
.box_right::-webkit-scrollbar { width: 0 !important }
.box_right { -ms-overflow-style: none; }
.box_right { overflow: -moz-scrollbars-none; }
/* 右边的开始 */
.right_top{
    display: flex;
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
    /* margin-left: 40px; */
}
.right_top_heng p{
   font-size: 16px;
    background-image:-webkit-linear-gradient(left,#ba023f,#ff537b);
    background-image:-moz-linear-gradient(left,#ba023f,#ff537b);
    background-image:-ms-linear-gradient(left,#ba023f,#ff537b);
    background-image:-o-linear-gradient(left,#ba023f,#ff537b);
    background-image:linear-gradient(left,#ba023f,#ff537b);
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

.title{
    margin-top: 50px;
}
.title_first{
    width: 883px;
    height: 47px;
    position: relative;
    display: flex;
    align-items: center;
}
.title_first img{
    position: absolute;
    top: 0;
    left: 0;
}
.number{
    position: relative;
    color: #fff;
    font-size: 24px;
    margin-left: 25px;
    margin-top: -10px;
    font-style: italic;
}
.question{
    position: relative;
    font-size: 14px;
    color: #bc1c53;
    margin-left: 20px;
}
.title_question{
    margin-top: 37px;
    padding-left: 20px;
    font-size: 12px;
    color: #fff;
    font-weight: normal;
    
}
.title_question p{
    margin-left: 13px;
}
.title_question_box{
    display: flex;
}
.answer{
    margin-top: 13px;
    color: #c4b1b9;
    margin-left: 20px;
}
</style>

