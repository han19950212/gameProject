import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      token:localStorage.getItem('token')?localStorage.getItem('token'):'',
      imgUrl:'https://blackholes.oss-cn-shanghai.aliyuncs.com',
  },
  mutations: {

  },
  actions: {
      
  }
})
