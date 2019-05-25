<template>
  <header>
    <div class="header">
      <router-link to="/"><img src="./../assets/cnodejs_light.svg" alt="cnode"></router-link>
      <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <a href="#">新手入门</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
header {
  display: flex;
  height: 50px;
  background: #444;
  justify-content: center;
  align-items: center;
  min-width: 1000px;
}
.header {
  box-sizing: border-box;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-width: 960px;
  max-width: 1400px;
  width: 100%;
  padding-right: 20px;
  padding-left: 10px;
}
img {
  height: 28px;
}
ul {
  display: flex;
}
li {
  list-style: none;
  font-size: 14px;
  padding-left: 20px;
}
a {
  text-decoration: none;
  color: #ccc;
}
</style>

