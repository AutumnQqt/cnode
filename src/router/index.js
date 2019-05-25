import Vue from 'vue'
import Router from 'vue-router'
import PostList from './../components/PostList'
import Particle from './../components/Particle'
import UserInfo from './../components/UserInfo'
import SideBar from './../components/SideBar'
import Pagination from './../components/Pagination'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    components: {
      main: PostList,
      pagination: Pagination
    }
  }, {
    name: 'Particle',
    path: '/topic/:id&author=:loginname',
    components: {
      main: Particle,
      sideBar: SideBar
    }
  }, {
    name: 'Userinfo',
    path: '/user/:loginname',
    components: {
      main: UserInfo
    }
  },{
    name: 'rootTag',
    path: '/:tag',
    components: {
      main: PostList,
    }
  }

    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
