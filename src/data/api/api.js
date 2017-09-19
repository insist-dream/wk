import axios from 'axios';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// root url
//Causion: test <-> normal !!!
//let base = "http://api.wktrip.com";
let base = "http://test-api.wktrip.com";



export const get_list_api = base+'/product/get_list';
export const order_add_api = base + '/order/add';
export const order_traveler_add_api = base + '/order/traveler/add';


// export const webVersion = "{'appVersion':'1.0.0','deviceType':'WKTRIP PC'}";

export const appVersionStr = '1.0.0';
export const deviceTypeStr = 'WKTRIP PC';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 发送验证码http://test-api.wktrip.com/city/get_cities
export const send_code = params => { return axios.get(`${base}/user/sms/send_vcode`, { params: params }); };

// 登录
export const login = params => { return axios.get(`${base}/user/login`, { params: params } ); };// ,{withCredentials:true}

// 退出
export const logout = params => { return axios.post(`${base}/user/logout`, { params: params }); };

// 首页列表
export const homeList = params => { return axios.get(`${base}/product/get_list`, { params: params }); };

// 获取产品详情
export const get_detail = params => { return axios.get(`${base}/product/get_detail`, { params: params }); };

// 计算订单
export const calculate_order = params => { return axios.get(`${base}/order/calc`, { params: params }); };

// 订单提交/order/add
export const order_add = params => { return axios.post(`${base}/order/add`, {paramsSerializer : JSON.stringify(params)}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, {maxContentLength: 2000}); };

// export const order_add = params => { return axios.post(`${base}/order/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}); };// { params: params }


// 订单支付
//export const order_pay = params => { return axios.get(`${base}/order_pay`,{ params: params }); };

// 获取产品列表
export const get_list1 = params => { return axios.get(`${base}/product/get_list`, { params: params }); };

// 获取指定ID的路线的费用说明、预订须知、退改政策
export const get_tab_detail = params => { return axios.get(`${base}/product/get_tab_detail`, { params: params }); };

// 获取酒店列表
export const get_hotel_list = params => { return axios.get(`${base}/hotel/get_list`, { params: params }); };

// 获取酒店详情
export const get_hotel_detail = params => { return axios.get(`${base}/hotel/get_detail`, { params: params }); };

//个人中心首页列表
export const get_user_list = params => { return axios.get(`${base}/order/get_list`, { params: params }); };

//用户详情
export const get_user_detail = params => { return axios.get(`${base}/user/get_detail`, { params: params }); };

//个人中心订单详情
export const get_order_detail = params => { return axios.get(`${base}/order/get_detail`, { params: params }); };

//指定订单id的出游人列表
export const get_order_people = params => { return axios.get(`${base}/order/traveler/get_list`, { params: params }); };

// 取消订单
export const order_cancel = params => { return axios.get(`${base}/order/cancel`, { params: params }); };

//补充出游人信息
export const add_traveler = params => { return axios.get(`${base}/order/traveler/add`, { params: params }); };

// 获取车型列表
export const get_car_list = params => { return axios.get(`${base}/site/cartype/get_list`, { params: params }); };

//订单支付
export const order_pay = params => { return axios.get(`${base}/order/pay`, { params: params }); };

//支付宝
export const zfb_pay = params => { return axios.post(`http://wukong.wolianxi.com/alipay/pagepay/pagepay.php`, { params: params }); };

//确认订单
export const order_accept = params => { return axios.get(`${base}/order/accept`, { params: params }); };


//支付成功调用的接口，更新订单状态
export const pay_query = params => { return axios.get(`${base}/pay/query`, { params: params }); };


export const loopwx = params => { return axios.get(`http://test-www.wktrip.com/wxpayv3/my/orderquery.php`, { params: params }); };