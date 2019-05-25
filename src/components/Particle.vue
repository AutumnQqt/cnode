<template>
  <div class="particle">
    <div class="loading" v-if="isLoading">
      <img src="./../assets/loading.gif">
    </div>
    <div class="topic" v-else>
      <div class="topic-header">
        <span class="tab" v-if=" posts.top || posts.good ">{{ posts | getTab }}</span>
        <span class="topic-title">{{ posts.title }}</span>
        <ul>
          <li>• 发布于 {{ posts.create_at | getReplay }}</li>
          <li>• 作者 {{ posts.author.loginname }}</li>
          <li>• {{ posts.visit_count }}次浏览</li>
          <li>• 来自 {{ posts.tab | getTab }}</li>
        </ul>
      </div>
      <div class="topic-content">
        <div class="markdown-text" id="content" v-html="posts.content"></div>
      </div>
    </div>
    <div class="topic-reply">
      <div class="reply-header">{{replyNum}} 回复</div>
      <div class="reply-list" v-for="(reply,index) in posts.replies">
        <router-link :to="{name:'Userinfo',params:{loginname:reply.author.loginname}}">
          <img :src="reply.author.avatar_url" alt="头像">
        </router-link>
        <div class="reply-content">
          <span class="author">{{ reply.author.loginname }}</span>
          <span class="time">{{index+1}}楼•{{reply.create_at | getReplay}}</span>
          <span class="ups" v-if="reply.ups.length>0">
            <img src="./../assets/ups.svg">
            {{reply.ups.length}}
          </span>
          <p class="content" v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Partcal",
  data: function() {
    return {
      isLoading: true,
      posts: {},
      replyNum: 0
    };
  },
  watch: {
    $route: function(to, from) {
      this.getTopicData();
    }
  },

  methods: {
    getTopicData: function() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
          this.replyNum = this.posts.replies.length;
          // console.log(this.posts);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
    this.getTopicData();
  }
};
</script>

<style scoped>
.particle {
  /* width: 580px;
  min-width: 580px;
  max-width: 1400px; */
  /* width: 100%; */
  width: 80%;
  /* margin: 0 auto; */
  border-radius: 3px;
  margin-top: 15px;
}
.particle .topic {
  background: #fff;
}
.topic-header {
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.topic-reply {
  margin-top: 15px;
  background: #fff;
}
.tab {
  font-size: 12px;
  background: rgb(128, 189, 1);
  color: #fff;
  margin: 0 6px;
  padding: 1px 5px;
  border-radius: 4px;
}
.topic-title {
  font-size: 20px;
  font-weight: bold;
  line-height: 42px;
}
.topic-header ul {
  display: flex;
  align-items: center;
  color: #838383;
  font-size: 12px;
}
.topic-content {
  padding: 10px;
}
.markdown-text {
  padding: 0 10px;
}
.topic-reply {
  border-radius: 4px;
}
.topic-reply img {
  width: 30px;
  height: 30px;
  margin-top: 5px;
  border-radius: 3px;
}
.reply-header {
  font-size: 14px;
  padding: 0 20px;
  line-height: 42px;
  color: #333;
  background: #f6f6f6;
  border-radius: 4px 4px 0 0;
}
.reply-list {
  border-top: 1px solid #e5e5e5;
  padding: 10px;
  display: flex;
}
.reply-content {
  width: 100%;
  display: inline-block;
  margin-left: 15px;
}
.reply-content .author {
  font-size: 12px;
  color: #666;
}
.reply-content .time {
  font-size: 12px;
  color: #08c;
}
.reply-content .content {
  padding: 10px 0 20px 10px;
}
.reply-content .content a {
  color: #08c;
}
.reply-content .ups {
  float: right;
  color: #666;
  line-height: 15px;
}
.reply-content .ups img {
  width: 15px;
  height: 15px;
}
</style>
