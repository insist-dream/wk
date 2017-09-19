/**
 * Created by ambition on 2017/6/14.
 */
import moment from 'moment';
export const ppp = params => {
  return '123'
};
// 生成唯一ID uuid
export const onlyid = function(len,radix){
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};
// 获取时间戳 timestamp
export const times = function(){
    // 获取格式化当前时间  Y-m-d H:i:s
  Date.prototype.Format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }
  var date = new Date();
  var currentTime = date.Format("yyyy-MM-dd hh:mm:ss");
  return currentTime;
}
// 日期函数
export const getNewDay = function(dateTemp, days){
  return moment(dateTemp).add(days, 'day').format("YYYY-MM-DD")
// 日期加上天数得到新的日期
// dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD
// var dateTemp = dateTemp.split("-");
// var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
// var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
// var rDate = new Date(millSeconds);
// var year = rDate.getFullYear();
// var month = rDate.getMonth() + 1;
// if (month < 10) month = "0" + month;
// var date = rDate.getDate();
// if (date < 10) date = "0" + date;
// return (year + "-" + month + "-" + date);
}
export const setDataToLocal = function(key, obj){
  let ls = window.localStorage
  let obj_str = JSON.stringify(obj)
  ls.setItem(key, obj_str)
}
export const getDataFromLocal = function(item, field){
  let ls = window.localStorage
  let obj_str = ls.getItem(item)
  if(obj_str){
    if(field){
      return JSON.parse(obj_str)[field]
    }else{
      return JSON.parse(obj_str)
    }
  }else{
    return false
  }
}
export const delItemFromLocal = function(key){
  let ls = window.localStorage
  ls.removeItem(key)
}
export const clearLocal = function(){
  let ls = window.localStorage
  ls.clear()
}
