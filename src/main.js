// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// 导入饿了吗组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
// 导入日历组件
import fullCalendar from 'vue-fullcalendar'
Vue.component('full-calendar', fullCalendar)

// 导入百度地图组件
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'S5Yjp7v5GzGFVTt13iKyNTltFt2xYAmb'
})


import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
// axios.defaults.withCredentials = true

import store from './../store/index'
Vue.prototype.$http = axios

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.config.productionTip = false
// Vue.http.options.emulateJSON = true;// x-www
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
