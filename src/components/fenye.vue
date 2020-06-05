<template>
<div class="fenye">
    <div class="shang" @click="setCurrent(current-1)" v-cursor>上一页</div>
    <div class="fenye_box" v-for="(item,index) in grouplist" :key="index" @click='setCurrent(item.val)' v-cursor>
        <p :class="[(current-1)==(item.val-1)?'fenye_box_color':'']" >
            {{item.text}}
        </p>
    </div>
    <div class="shang" @click="setCurrent(current+1)" v-cursor>下一页</div>
</div>
</template>

<script>
  export default{
    data(){
      return {
        current: this.currentPage,
        pagegroup:10,//显示多少页
        // pageLength:this.pageLength,//每页个数
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 1
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pageLength:{
        type: Number,
        default: 24
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.pageLength);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page;
        var temp = [];//放置页码的数组
        var list = [];//放置页数，实时更新的页数
        if(this.page==0){//没有数据时默认
          list.push({//压入
                text: "1",
                val: 1
          });
          return list;
        }
        var count = Math.floor(this.pagegroup / 2);//5
        var center = this.current;
        if (len <= this.pagegroup) {// 判断当总页数<=分页数的情况
          while (len--) {
            temp.push({
                text: this.page - len, 
                val: this.page - len
            });
            
          };
          return temp;
        }
        while (len--) {// 否则就是len>分页数目的情况
          temp.push(this.page - len);
        };
        var start=0;
        if(center <= count){// 判断这个位置与中间偏离的大小,计算出中间值
          start=0                  
        }else{
          if(center-count+this.pagegroup<=this.page){
            start=center-count;
          }else{
            start=this.page-this.pagegroup;
          }
        }
        temp = temp.splice(start, this.pagegroup);
        do {
          var t = temp.shift();//删除
          list.push({//压入
                text: t,
                val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          if(this.current > count + 1){
            list.unshift({text: '...', val: list[0].val - 1});//数组前面加...
          }
          if(this.current < this.page - count){//数组后面加...
            list.push({text: '...', val: list[list.length - 1].val + 1});
          }
        }
          return list; 
        
      }
    },
    methods: {
      setCurrent: function (index) {
        if (this.current != index && index > 0 && index < this.page + 1) {
          this.current = index;
          this.$emit('pagechange', this.current);
        }
      }
    }
  }
</script>

<style scoped>
.fenye_box{
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
    background-image:linear-gradient(top,#171717,#0d0909)
}
.fenye_box_color{
  color: #fff;
}
.fenye_box p{
    transform: skewX(15deg);
    -webkit-transform: skewX(15deg);
    -moz-transform: skewX(15deg);
    -ms-transform: skewX(15deg);
    -o-transform: skewX(15deg);
}
.fenye{
    width: 100%;
    height: 100px;
    /* position: absolute; */
    /* right: 0;
    bottom: 50px; */
    /*margin-top: 358px;*/
    margin-left: 70px;
    position: absolute;
    top:1108px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.shang{
    position: relative;
    color: #ff3e82;
    font-size: 14px;
    border: 1px solid #5c1432;
    padding: 3px 13px;

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
