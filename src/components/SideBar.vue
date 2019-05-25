<template>
  <div class="slideBar">
    <section class="author">
      <div class="header">作者</div>
      <div class="content">
        <router-link :to="{name:'Userinfo',params:{loginname:posts.loginname}}">
          <img :src="posts.avatar_url">
        </router-link>
        <span>{{ posts.loginname }}</span>
        <p>{{ posts.score }}积分</p>
      </div>
    </section>
    <section class="recentTopics">
      <div class="header">作者其它话题</div>
      <ul>
        <li v-for="recent in sliceRecentTopics">
          <router-link
            :to="{name:'Particle',params:{id:recent.id,loginname:recent.author.loginname}}"
          >{{ recent.title }}</router-link>
        </li>
      </ul>
    </section>
    <section class="recentReplies">
      <div class="header">作者近期回复</div>
      <ul>
        <li v-for="recent in sliceRecentTopics">
          <router-link
            :to="{name:'Particle',params:{id:recent.id,loginname:recent.author.loginname}}"
          >{{ recent.title }}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data: function() {
    return {
      posts: [],
      isLoading: true,
      sliceRecentTopics: [],
      sliceRecentReplies: []
    };
  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
          this.sliceRecentTopics = this.posts.recent_topics.slice(0, 5);
          this.sliceRecentReplies = this.posts.recent_replies.slice(0, 5);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getUserData();
  }
};
</script>

<style scoped>
.slideBar {
  width: 19%;
  margin-top: 15px;
}
img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.author .content {
  padding: 10px;
  color: #888;
  line-height: 20px;
  font-size: 14px;
}
.author .content span {
  margin-left: 10px;
}
.author .content p {
  color: #555;
  margin-top: 10px;
}
section {
  background: #fff;
  margin-bottom: 10px;
  margin-left: 5px;
}
section .header {
  height: 40px;
  color: #666;
  line-height: 40px;
  font-size: 14px;
  padding-left: 10px;
  background: #f6f6f6;
  border-bottom: 1px solid #f0f0f0;
}
section .content {
  background: #fff;
}
section li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #666;
  padding: 10px;
}
</style>
