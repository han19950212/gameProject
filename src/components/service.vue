<template>
  <div class="service">
      <div class="servise_box" v-cursor>
            <div class="servise_box_box"  @mouseenter="service">
                <img src="../assets/servise/1.png" alt="">
                <p>在线客服</p>
            </div>
             <div  class="servise_box_box">
                <img src="../assets/servise/2.png" alt="">
                <p>关于我们</p>
            </div> 
            <div  class="servise_box_box" @click="handleClickQuset" >
                <img src="../assets/servise/3.png" alt="">
                <p>常见问题</p>
            </div>

      </div>

      <div class="tanchuang" v-show='tanchuang' @mouseleave="service">
            <div class="oneimg s" >
                 <img class="dasds" src="../assets/servise/4.png" alt="">
                 <a href="tencent://message/?uin=2324366756&Site=qq&Menu=yes">客服</a>
            </div>

           
            <div class="twoImg s">
                 <img class="dasds" src="../assets/servise/4.png" alt=""> 
                 <div class="kefu">
                    <!--<img class="threeimg" src="../assets/servise/5.png" alt="">-->
                     <a href="http://wpa.qq.com/msgrd?v=1&uin=2324366756&site=qq&menu=yes">QQ: 6484684645</a>
                </div> 
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
        tanchuang:false,
    }
  },
  methods:{
      //出现客服
      service(e){
        this.tanchuang=!this.tanchuang  
      },
      handleClickQuset(){
          this.$router.push({
              path:'public_box_home/faq'
          })
      },
    //   ask(e){
    //       if(e==1){
    //         this.$refs.service.to="tencent://message/?uin=6484684645&Site=qq&Menu=yes";
    //       }else{
    //         this.$refs.service.href="http://wpa.qq.com/msgrd?v=1&uin=6484684645&site=qq&menu=yes";
    //       }
    //   }
  }
}
</script>

<style scoped>
.service{
    width: 55px;
    height: 203px;
    background-color: #1e1b1d;
    border-radius: 10px;
    position: fixed;
    top: 535px;
    right: 0;
    z-index: 1000;
}
.servise_box{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.servise_box img{
    width: 35px;
    height: 33px;
    margin-top: 10px;
}
.servise_box_box{
    display: flex;
    flex:1;
    flex-direction:column;
    align-items: center;
    width: 100%;
    justify-content: center;
}
.servise_box_box p{
    color: #ebd8e0;
    font-style: italic;
    font-size: 8px;
    margin-top: 2px;
}
.tanchuang{
    position: absolute;
    left:-130px;
    top: 0px;
    width: 140px;
}
.twoImg{
    margin-top: 15px;
}
.s{
    position: relative;
    width: 116px;

     height: 23px;
}
.s .dasds{
    position: absolute;
    left: -10px;
    top: -3px;
}
.kefu{
    display: flex;
     align-items: center;
   justify-content: center;
}
.s .threeimg{
    position: relative;
    margin-right: 10px;
}
.s a{
    color: #fff;
  text-decoration: none;
   position: relative;
   width: 115px;
   text-align: center;
}
.oneimg{
    display: flex;
    justify-content: center;

}
.ask{
    color:#fff
}
</style>

