<template>
  <div class="floot">
       <div class="floot_left">
           <img src="../assets/floot/1.png" alt="">
           <div class="title">
               <p>条款和服务</p>
               <p>隐私政策</p>
               <p>关于我们</p>
               <p>常见问题</p>
           </div>
       </div>
       <img class="img2" src="../assets/floot/2.png" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style scoped>
    .floot{
         width: 1280px;
         color: #fff;
         height: 160px;
        margin:0 auto;
        position: relative;
    }
    .floot_left{
        /* margin-left: 272px; */
        color: #b2b2b2;
        float: left;
    }
    .title{
        display: flex;
        margin-top: 10px;
    }
    .title p{
        margin-right: 10px;
    }
    .img2{
        float: right;
        margin-top: 70px;
    }
</style>
