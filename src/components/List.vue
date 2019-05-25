<template>
  <div class="mainList">
    <div class="loading" v-if="isLoading">
      <img src="./../assets/loading.gif">
    </div>
    <ul class="list" v-else>
      <li v-for="post in posts">
        <router-link :to="{name:'Userinfo',params:{loginname:post.author.loginname}}">
          <img :src="post.author.avatar_url" alt="头像">
        </router-link>
        <span class="reply_count">
          <span class="reply">{{ post.reply_count }}</span>/
          <span class="visit">{{ post.visit_count }}</span>
        </span>
        <span
          :class="{'tab top':post.top,'tab good':post.good,'tab':!post.good&&!post.good}"
        >{{ post | getTab }}</span>

        <span :class="{'title top':post.top,'title':!post.top}">
          <router-link
            :to="{name:'Particle',params:{id:post.id,loginname:post.author.loginname}}"
          >{{ post.title }}</router-link>
        </span>

        <span class="last_reply_at">{{ post.last_reply_at | getReplay }}</span>
      </li>
    </ul>
    <Pagination @changePage="changePage"></Pagination>
  </div>
</template>

<script>
import Pagination from "./Pagination";
export default {
  name: "List",
  data: function() {
    return {
      isLoading: true,
      posts: [],
      pageNum: 1
    };
  },
  components: {
    Pagination
  },
  watch: {
    $route: function(to, from) {
      this.getData();
      this.$emit("change", this.$route.params.tag);
    }
  },
  methods: {
    changePage(value) {
      this.pageNum = value;
      this.getData();
    },
    getData() {
      this.isLoading = true;
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.pageNum,
            limit: 20,
            tab: this.$route.params.tag
          }
        })
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  beforeMount: function() {
    this.getData();
  }
};
</script>

<style scoped>
.mainList {
  background: #fff;
  width: 980px;
  min-width: 980px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}
img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}

.list li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 20px;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}
.list li:last-child {
  border-bottom: none;
}
.list li:hover {
  background: rgb(245, 245, 245);
}
.list li .title {
  flex: 1;
  font-size: 16px;
  padding-left: 6px;
}
.reply_count {
  width: 70px;
  text-align: center;
  font-size: 14px;
}
.reply {
  color: #9e78c0;
}
.visit {
  font-size: 10px;
  color: #b4b4b4;
}
.title a {
  color: #333;
}
.title.top a {
  color: #888;
}
.title:hover {
  text-decoration: underline;
}
.tab {
  font-size: 12px;
  background: #e5e5e5;
  color: #999;
  padding: 1px 4px;
  border-radius: 4px;
}
.tab.top,
.tab.good {
  background: #80bd01;
  color: #fff;
}
.last_reply_at {
  color: #778087;
  font-size: 11px;
}
</style>
