// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.filter('getTab', function (post) {
  var tab;
  if (post.top) {
    tab = "置顶";
  } else if (post.good) {
    tab = "精华";
  } else if (post.tab === "share") {
    tab = "分享";
  } else if (post.tab === "ask") {
    tab = "问答";
  } else if(post.tab === 'job') {
    tab = "招聘";
  }else if (post === "share") {
    tab = "分享";
  } else if (post === "ask") {
    tab = "问答";
  } else if(post === 'job') {
    tab = "招聘";
  }else{
    tab ='其他'
  }
  return tab;
})
Vue.filter('getReplay', function (replay) {
  replay = new Date(replay);
  var replayAt;
  var now = new Date();
  var time = (now.getTime() - replay.getTime()) / 1000;
  if (time < 30) {
    replayAt = "刚刚";
  } else if (time < 60) {
    replayAt = parseInt(time) + "秒前";
  } else if (time / 60 < 60) {
    replayAt = parseInt(time / 60) + "分钟前";
  } else if (time / 3600 < 24) {
    replayAt = parseInt(time / 3600) + "小时前";
  } else if (time / 86400 < 31) {
    replayAt = parseInt(time / 85400) + "天前";
  } else if (time / 2678400 < 12) {
    replayAt = parseInt(time / 2678400) + "月前";
  } else if (time / 31536000 < 12) {
    replayAt = parseInt(time / 31536000) + "年前";
  }
  return replayAt;
})

