<template>
  <div class="userinfo">
    <div class="loading" v-if="isLoading">
      <img src="./../assets/loading.gif">
    </div>
    <div class="user" v-else>
      <section class="mainInfo">
        <div class="header">
          <router-link to="/">主页</router-link>/
        </div>
        <div class="content">
          <img :src="posts.avatar_url">
          <span class="loginname">{{ posts.loginname }}</span>
          <p class="score">{{ posts.score }}积分</p>
          <ul>
            <li>{{ collect.length }}个话题收藏</li>
            <li>
              <i class="iconfont" v-if="posts.githubUsername">&#xe6d5;</i>
              <a :href="github">@{{posts.githubUsername}}</a>
            </li>
          </ul>
          <p class="footer">注册时间:{{ posts.create_at | getReplay }}</p>
        </div>
      </section>
      <section class="recentTopic">
        <div class="header">最近创建的话题</div>
        <ul>
          <li v-for="recent in limitRecentTopic">
            <router-link :to="{name:'Userinfo',params:{loginname:recent.author.loginname}}">
              <img :src="recent.author.avatar_url">
            </router-link>
            <router-link class="title" :to="{name:'Particle',params:{id:recent.id}}">
              <span>{{recent.title}}</span>
            </router-link>
            <span class="time">{{ recent.last_reply_at | getReplay }}</span>
          </li>
          <li class="more">
            <router-link to="/">
              <span>查看更多>></span>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="recentReplies">
        <div class="header">最近参与的话题</div>
        <ul>
          <li v-for="recent in limitRecentReplies">
            <router-link :to="{name:'Userinfo',params:{loginname:recent.author.loginname}}">
              <img :src="recent.author.avatar_url">
            </router-link>
            <router-link class="title" :to="{name:'Particle',params:{id:recent.id}}">
              <span>{{recent.title}}</span>
            </router-link>
            <span class="time">{{ recent.last_reply_at | getReplay }}</span>
          </li>
          <li class="more">
            <router-link to="/">
              <span>查看更多>></span>
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: "UserInfo",
  data: function() {
    return {
      isLoading: true,
      posts: {},
      collect: {},
      github: ""
    };
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': "getUserData"
  },
  computed: {
    limitRecentTopic: function() {
      return this.posts.recent_topics.slice(0, 5);
    },
    limitRecentReplies: function() {
      return this.posts.recent_replies.slice(0, 5);
    }
  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
          this.github = "https://github.com/" + this.posts.githubUsername;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCollect() {
      this.$http
        .get(
          `https://cnodejs.org/api/v1/topic_collect/${this.$route.params.loginname}`
        )
        .then(res => {
          this.collect = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getUserData();
    this.getCollect();
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
@font-face {
  font-family: "iconfont"; /* project id 1207265 */
  src: url("//at.alicdn.com/t/font_1207265_45wubtgk3vs.eot");
  src: url("//at.alicdn.com/t/font_1207265_45wubtgk3vs.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1207265_45wubtgk3vs.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1207265_45wubtgk3vs.woff") format("woff"),
    url("//at.alicdn.com/t/font_1207265_45wubtgk3vs.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1207265_45wubtgk3vs.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.userinfo {
  width: 980px;
  min-width: 980px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  border-radius: 3px;
  margin-top: 15px;
}
section {
  margin: 10px 0;
  background: #fff;
  border-radius: 3px;
}
section .header {
  height: 40px;
  background: #f6f6f6;
  line-height: 40px;
  padding-left: 10px;
  font-size: 14px;
  border-radius: 3px;
  color: #444;
  border-bottom: 1px solid #f0f0f0;
}
section .header a {
  color: rgb(128, 189, 1);
  margin-right: 3px;
}
section img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
section.mainInfo .header {
  color: #bbb;
}
section.mainInfo img {
  width: 40px;
  height: 40px;
  float: left;
}
section.mainInfo .content {
  padding: 10px;
  font-size: 14px;
}
section.mainInfo .loginname {
  line-height: 40px;
  margin-left: 10px;
  color: #778087;
}
section.mainInfo ul {
  padding: 5px 0 5px;
}
section.mainInfo li {
  color: #778087;
  padding: 3px;
}
section.mainInfo .score {
  padding: 15px 0 0;
}
section.mainInfo .footer {
  padding: 10px 0;
  color: #aaa;
}
.recentTopic li,
.recentReplies li {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
li .title {
  flex: 1;
  padding-left: 20px;
}
.more a {
  color: #666;
  font-size: 13px;
  padding: 3px;
}
.time {
  font-size: 12px;
  color: #888;
}
</style>
