/**
 * Created by ambition on 2017/6/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user:{},	//?????, null -> {} 2017-07-10
    bankInf: {
    	"name":"我是vuex的第一个数据",
    	"id":100,
    	"bankName":"中国银行"
    },
    // 获取对应产品
    nget_details: {},
    // nget_details:{},
    // 立即预订
    book_now: {
      "product_no": "100",
      "product_name": "产品1",
      "level": "ZIJIAYOU_GENERAL",
      "level_name": "普通产品",
      "type": "PRODUCT_TYPE_SELFHELP",
      "type_name": "自助自驾",
      "min_price": 10000,
      "supplier_id": 100001,
      "city_id": 110000,
      "group_id": "1000000",
      "supplier_name": "悟空租车（测试勿删勿改）",
      "group_name": "党中央",
      "city_name": "北京",
      "day_num": 6,
      "night_num": 10,

    },
    // 自助自驾详情页
    selfdriving:{
      "product_id": 10000004,
      "start_date": "2017-06-07",
      "adult_num": 4,
      "children_num": 3,
      "site_products": [
        {
          "site_product_id": "10000002",
          "num": 1
        }
      ],
      "hotels": [
        {
          "step": 1,
          "hotel_id": "10000001",
          "products": [
            {
              "id": "10000003",
              "num": 2
            },
            {
              "id": "10000003",
              "num": 3
            }
          ]
        }
      ],
      "sights": [
        {
          "step": 1,
          "sight_id": "100001",
          "products": [
            {
              "id": "10000001",
              "num": 2
            }
          ]
        }
      ],
      "contact":{
        "name":"林林",
        "phone":"15321000661",
        "id_card_no":"370832199009070611"
      },
      "user_id":"100088",
      "wkcoin_pay":20
    },
    // 自助自驾确认行程
    // 用户订单计算
    norder_calc:{},
    //登录后刷新top
    userlogin:{
      "user_login":"",
    },
    // 订单计算
    hotel_param_str:'',
    sight_param_str:'',
    // 车队自驾计算接口请求参数
    team_order_calc:{},
    // 车队自驾人数记录
    team_person:{},
    witdhvalue:true,
    carnum:0
  },

  mutations: {
    // 订单详情
    nget_details:function(state,msg) {
      state.nget_details = msg;
    },
    // 用户订单计算
    norder_calc:function(state,msg) {
      state.norder_calc = msg;
    },
    //登录后刷新top
    userlogin:function(state,msg){
      state.userlogin.user_login = msg;
    },
    setUser:function(state,user){
      state.user = user;
    },
    changehotelnum:function(state,msg){
      Vue.set(state.nget_details.trip_hotels[msg.idx].hotels[0],'hotel_id',msg.content.hotel_id)
      Vue.set(state.nget_details.trip_hotels[msg.idx].hotels[0],'hotel_name',msg.content.hotel_name)
      Vue.set(state.nget_details.trip_hotels[msg.idx].hotels[0],'hotel_products',msg.content.hotel_products)
    },
    sight_param_str:function(state,msg){
      // console.log("sight_param_str");
      // console.log(msg);
     state.sight_param_str = msg;
    },
    hotel_param_str:function(state,msg){
      // console.log("hotel_param_str");
      // console.log(msg);
      state.hotel_param_str = msg;
    },
    changecar:function(state,msg){
      Vue.set(state.nget_details.site_products,'product_id',msg.product_id)
      Vue.set(state.nget_details.site_products,'product_name',msg.product_name)
      Vue.set(state.nget_details.site_products,'transmission_name',msg.transmission_name)
      Vue.set(state.nget_details.site_products,'displacement',msg.displacement)
      Vue.set(state.nget_details.site_products,'carriage',msg.carriage)
      Vue.set(state.nget_details.site_products,'capacity',msg.capacity)
    },
    addcarnum:function(state,msg){
      state.carnum = msg;
    },
    addhotelnum:function(state,msg){
      Vue.set(state.nget_details.trip_hotels[msg.th].hotels[0].hotel_products[msg.hp],'num',msg.hm);
      // console.log('addhotelnum')
      // console.log(msg)
    },
    addticketnum:function(state,msg){
      // console.log(state.nget_details.trip_sights[0].sights[0].sight_products[1]);
      Vue.set(state.nget_details.trip_sights[msg.sh].sights[msg.ss].sight_products[msg.sp],'num',msg.sm);
      // console.log(state.nget_details.trip_sights[msg.sh].sights[msg.ss].sight_products[msg.sp].num)
      // console.log(state.nget_details.trip_sights[msg.sh]);
      // console.log(state.nget_details.trip_sights[msg.sh].sights[0].sight_products[msg.sp].num)
    },
    // 车队自驾订单计算返回结果
    team_order_calc:function(state,msg){
      state.team_order_calc = msg;
    },
    // 车队详情人数保存传递
    team_person:function(state,msg){
      state.team_person = msg;
    },
    changeswitdhvalue:function(state,msg){
      state.witdhvalue = msg;
    },
  }
})
export default store
