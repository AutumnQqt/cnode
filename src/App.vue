<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="main"></router-view>
      <router-view name="sideBar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import PostList from "./components/PostList";
export default {
  name: "App",
  components: {
    Header,
    PostList,
  }
};
</script>

<style>
@import url("./assets/markdown-github.css");
* {
  margin: 0;
  padding: 0;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: "Avenir";
}
#content .highlight pre, #content pre {
  background: rgb(48,48,48);
  color: rgb(222, 223, 224);
}
html {
  background: rgb(225, 225, 225);
  padding-bottom: 100px;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #08c;
}
.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.loading img {
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background: transparent;
}
.main {
  display: flex;
  width: 100%;
  min-width: 980px;
  max-width: 1400px;
  margin: 0 auto;
  justify-content: space-between;
}

/* #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
