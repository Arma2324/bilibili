import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')
const UserInfo = () => import('../views/UserInfo.vue')
const Edit = () => import('../views/Edit.vue')
const Article = () => import('../views/Article.vue')
const EditCategory = () => import('../views/EditCategory.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { isAllow: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { isAllow: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit 
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article,
    meta: { isAllow: true }
  },
  {
    path: '/editcategory',
    name: 'EditCategory',
    component: EditCategory,
    meta: { isAllow: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('id') &&
    !localStorage.getItem('token') &&
    !to.meta.isAllow &&
    to.path != '/login') {
    next({ path: '/login' })
    Vue.prototype.$msg.fail('请先登录！')
    }
  else next()
})

export default router
