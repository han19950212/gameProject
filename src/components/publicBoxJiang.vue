<template>
  <div class="publicBoxJiang">
        <!-- <img class="bg" src="../assets/publicBoxJiang/1.png" alt=""> -->
        <div class="header">
            <div class="header_box">
                <img v-lazy="headerimg" alt="">
            </div>
            
            <p>{{nickName}}</p>
        </div>
        <div class="firearms">
            <img v-lazy="firImg" alt="">
        </div>
        <div class="text_box">
            <div class="text">
                <p>{{type1}}</p>
                <p>{{name}}</p>
            </div>
            <img src="../assets/publicBoxJiang/4.png" alt="">
        </div>

         <div class="location" ></div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
      type1:{
          default:"M4A4(STrak)"
      },
      name:{
          default:'二西莫夫'
      },
      firImg:{
          default:require('../assets/publicBoxJiang/3.png')
      },
      nickName:{
          default:'etdsadas'
      },
      headerimg:{
          default:require('../assets/publicBoxJiang/2.png')
      }

  },
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.publicBoxJiang{
    width: 160px;
    height: 206px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: skewX(-15deg);
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    -o-transform: skewX(-15deg);
}
.location{
    width: 100%;
    height: 100%;
    position: absolute;;
    top:0;
    left: 0;
    border: 1px solid #fff;
    /* transform: skewX(-15deg); */
    border-image: linear-gradient( #893611, #130b08) 30 30;
    border-image: -webkit-linear-gradient( #893611, #130b08) 30 30;
    border-image: -moz-linear-gradient( #893611, #130b08) 30 30;
    border-image: -ms-linear-gradient( #893611, #130b08) 30 30;
    border-image: -o-linear-gradient( #893611, #130b08) 30 30;
    /* background-color: #201d1d; */
    background: -webkit-linear-gradient(bottom,rgba(42,16,5,0.8),rgba(3,3,3,0.1));
    background: -moz-linear-gradient(bottom,rgba(42,16,5,0.8),rgba(3,3,3,0.1));
    background: -ms-linear-gradient(bottom,rgba(42,16,5,0.8),rgba(3,3,3,0.1));
    background: -o-linear-gradient(bottom,rgba(42,16,5,0.8),rgba(3,3,3,0.1));
    background: linear-gradient(bottom,rgba(42,16,5,0.8),rgba(3,3,3,0.1));
    z-index: -11;
}
.publicBoxJiang .bg{
    position: absolute;
    top: 0;
    left: 0;
    transform: skewX(15deg);
    -webkit-transform: skewX(15deg);
    -moz-transform: skewX(15deg);
    -ms-transform: skewX(15deg);
    -o-transform: skewX(15deg);
    
}
.header{
   position: relative;
    margin-top: 15px;
}
.header p{
    margin-top: 5px;
    color: #fff;
}
.header_box{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    transform: skewX(15deg);
    -webkit-transform: skewX(15deg);
    -moz-transform: skewX(15deg);
    -ms-transform: skewX(15deg);
    -o-transform: skewX(15deg);
}
.firearms{
    position: relative;
    margin: 3px 0;
}
.firearms img{
    width: 83px;
    height: 62px;
}
.text_box{
    position: relative;
    color: #fff;
    display: flex;
    margin-top: 5px;
    align-items: center;
}
.text_box div{
    width: 100px;
}
.text_box div p{
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.text_box img{
    /*margin-left: 30px;*/
    width: 23px;
    height: 29px;
    margin-right: -8px;
    
}
</style>
