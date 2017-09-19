import Vue from 'vue'
import Router from 'vue-router'                                     //路由
import slider from '@/components/slider'                            //首页
import classify from '@/listPage/classify'                          //三种自驾的列表组件
import self from '@/listPage/self-list'                             //三种自驾的列表组件
import motorcade from '@/listPage/motorcade'                        //三种自驾的列表组件
import login from '@/components/login'                              //登录注册
import personalCenter from '@/user/personal-center'                 //个人中心主组件
import centerCard from '@/user/centerCard'                          //个人中心首页
import allOrders from '@/user/all-orders'                           //个人中心订单列表
import selfDetails from '@/user/self-details'                       //个人中心确认信息---自助
import motorcade_details from '@/user/motorcade-details'            //个人中心订单详情---车队
import bcDatum from '@/user/bcDatum'                                //补充出游人信息
import self_driving from '@/components/self_driving'                //（第一步选择商品）商品详情
import teambycar from '@/components/teambycar'                      //车队自驾详情页面
import confirm_itinerary from '@/components/confirm_itinerary'      //第二部确认行程
import fill_order from '@/components/fill_order'                    //第三步填写订单
import tfill_order from '@/components/tfill_order'
import tranship from '@/components/tranship'                        //更换车辆
import replace_hotel from '@/components/replace_hotel'              //更换酒店
import submit_order from '@/components/submit_order'                //（第四部)支付的结果
import grogshop from '@/components/change-grogshop'                //（第四部)支付的结果
import bookedSuccess from '@/order_status/booked_success'            // 支付成功
import error from '@/components/error'
import wx_pay from '@/order_status/wx_pay'

import reuse_left from'@/about_me/reuse_left'                      //页面底部 关于我们10个组件的主组件
import about_one from '@/about_me/about_one'
import about_two from '@/about_me/about_two'
import about_three from '@/about_me/about_three'
import about_four from '@/about_me/about_four'
import about_five from '@/about_me/about_five'
import about_six from '@/about_me/about_six'
import about_sever from '@/about_me/about_sever'
import about_jxdz from '@/about_me/about_jxdz'

/*服务协议*/
import user_agreement from '@/server_agreement/user_agreement'
import car_agreement from '@/server_agreement/car_agreement'
import select_travel_agreement from '@/server_agreement/select_travel_agreement'
import outer_travel_agreement from '@/server_agreement/outer_travel_agreement'
import inner_travel_agreement from '@/server_agreement/inner_travel_agreement'
import car_insurance from '@/about_me/car_insurance'
import travel_insurance from '@/about_me/travel_insurance'

Vue.use(Router)

export default new Router({
  mode: 'history',

  scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    //consolea.log(savedPosition)
    return savedPosition
    } else {
    return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect:'/home',
      name: 'slider',
      component:slider,
      children:[
      ]
    },
    {
      path: '/home',
      name: 'slider',
      component:slider,
      children:[
      ]
    },
    {
      path: '/classify',
      name: 'classify',
      component:classify
    },
    {
      path: '/self',
      name: 'self',
      component:self
    },
    {
      path:'/motorcade',
      name:'motorcade',
      component:motorcade
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/personalCenter',
      name:'personalCenter',
      component:personalCenter,
      children:[
        {path:'/personalCenter/centerCard',component:centerCard},
        {path:'/personalCenter/allOrders',component:allOrders},
      ]
    },
    {
      path:'/selfDetails',
      name:'selfDetails',
      component:selfDetails
    },
    {
      path:'/motorcade_details',
      name:'motorcade_details',
      component:motorcade_details
    },
    {
      path:'/bcDatum',
      name:'bcDatum',
      component:bcDatum
    },
    {
      path:'/self_driving/:id',
      name:'self_driving',
      component:self_driving
    },
    {
      path:'/teambycar/:id',
      name:'teambycar',
      component:teambycar
    },
    {
      path:'/confirm_itinerary/:id/:adult/:child/:start_date/:flag',
      name:'confirm_itinerary',
      component:confirm_itinerary
    },
    {
      path:'/fill_order',
      name:'fill_order',
      component:fill_order
    },
    {
      path:'/tfill_order',
      name:'tfill_order',
      component:tfill_order
    },
    {
      path:'/tranship/:id/:start_date/:car_id/:adult/:child/:day_num',
      name:'tranship',
      component:tranship
    },
    {
      path:'/submit_order',
      name:'submit_order',
      component:submit_order
    },
    {
      path:'/replace_hotel/:id/:start_date/:step/:hotel_id/:index/:adult/:child/:day_num',
      name:'replace_hotel',
      component:replace_hotel
    },
    {
      path:'/error',
      name:'error',
      component:error
    },
    {
      path:'/about_jxdz',
      name:'about_jxdz',
      component:about_jxdz
    },
    {
      path:'/grogshop/:pid/:hid/:step/:start_date/:idx/:adult/:child',
      name:'grogshop',
      component:grogshop
    },
    {
     path:'/bookedSuccess',
     name:'bookedSuccess',
     component:bookedSuccess
    },
    {
      path:'/reuse_left',
      name:'reuse_left',
      component:reuse_left,
      children:[
        {path:'/reuse_left/about_one',component:about_one},
        {path:'/reuse_left/about_two',component:about_two},
        {path:'/reuse_left/about_three',component:about_three},
        {path:'/reuse_left/about_four',component:about_four},
        {path:'/reuse_left/about_five',component:about_five},
        {path:'/reuse_left/about_six',component:about_six},
        {path:'/reuse_left/about_sever',component:about_sever},
        {path:'/reuse_left/user_agreement',component:user_agreement},
        {path:'/reuse_left/car_agreement',component:car_agreement},
        {path:'/reuse_left/select_travel_agreement',component:select_travel_agreement},
        {path:'/reuse_left/outer_travel_agreement',component:outer_travel_agreement},
        {path:'/reuse_left/inner_travel_agreement',component:inner_travel_agreement},
        {path:'/reuse_left/car_insurance',component:car_insurance},
        {path:'/reuse_left/travel_insurance',component:travel_insurance},

      ]
    },
    {
      path:'/wx_pay',
      name:'wx_pay',
      component:wx_pay
    }
  ],


})
