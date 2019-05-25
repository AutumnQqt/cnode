<template>
  <div class="postList">
    <div class="nav">
      <ul>
        <li v-for="tag in tags" :class="{'active':(choose === tag[1])}">
          <router-link :to="{name:'rootTag',params:{tag:tag[1]}}"><span>{{tag[0]}}</span></router-link>
           <!-- @click="change(tag[1])" -->
        </li>
      </ul>
    </div>

    <List @change="changeNum"></List>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import List from "./List";
export default {
  name: "PostList",
  data: function() {
    return {
      posts: [],
      isLoading: true,
      choose:'all',
      tags:[
        ['全部','all'],
        ['精华','good'],
        ['分享','share'],
        ['问答','ask'],
        ['招聘','job']
        
      ]
      
    };
  },
  components: {
    List
  },
  methods:{
    changeNum(value){
      this.choose = value
    }
  },
  beforeMount(){
    this.choose = 'all'
  }
};
</script>

<style scoped>
.postList {
  background: #fff;
  width: 980px;
  min-width: 980px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0px 0px 23px -1px rgba(186, 186, 186, 1);
  border-radius: 3px;
  margin-top: 15px;
}
.nav {
  width: 100%;
  background: rgb(246, 246, 246);
  height: 45px;
}
.nav ul {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding-left: 20px;
}
.nav li a {
  font-size: 14px;
  color: rgb(128, 189, 1);
  margin: 0 6px;
  padding: 3px 4px;
  border-radius: 5px;
}
.nav li a:hover {
  color: #005580;
}
.nav li.active a:hover {
  color: #fff;
}
.nav li.active a {
  background: rgb(128, 189, 1);
  color: #fff;
}
</style>

