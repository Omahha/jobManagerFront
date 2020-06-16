import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Welcome from '../components/layouts/Welcome.vue'
import Home from '../components/contents/home/Home.vue'

import Companies from '../components/contents/company/Companies.vue'
import CompanyCreate from '../components/contents/company/CompanyCreate.vue'
import CompanyHome from '../components/contents/company/CompanyHome.vue'

import Users from '../components/contents/user/Users.vue'

import User from '../components/contents/user/User.vue'
import UserProfile from '../components/contents/user/UserProfile.vue'

import Schedule from '../components/contents/schedule/Schedule.vue'
import ScheduleHome from '../components/contents/schedule/ScheduleHome.vue'


Vue.use(VueRouter)

  const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/home', name: 'Home', component: Home,
    beforeEnter(to, from, next) {
      if(store.state.idToken){
        next()
      }else{
        store.dispatch('tryAutoLogin').then(()=> {
          if(store.state.idToken){
            next()
          }else{
            next('/')
          }
        })
      }
    }},
  { path: '/companies', component: Companies,
    children: [
      { path: '', component: CompanyHome },
      { path: 'create', component: CompanyCreate },
    ],
    beforeEnter(to, from, next) {
      if(store.state.idToken){
        next()
      }else{
        store.dispatch('tryAutoLogin').then(() => {
          if(store.state.idToken){
            next()
          }else{
            next('/')
          }
        })
      }
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter(to, from, next) {
      if(store.state.idToken && store.state.user.role_id==1){
        next()
      }else if(store.state.idToken){
        next('/home')
      }

      store.dispatch('tryAutoLogin').then(() => {
        if(store.state.idToken){
          if(store.state.role_id==1){
            next()
          }else{
            next('/home')
          }
        }else
          next('/')
      })
      
      
    }
  },
  {
    path: '/user/:id', component: User,
    children: [
      { path: '', name: 'user', component: UserProfile },
      { path: 'schedule', component: Schedule, 
        children: [
          { path: '', name: 'user_schedule', component: ScheduleHome }
        ]}
    ],
    beforeEnter(to, from, next) {
      if(store.state.idToken){
        next()
      }else{
        store.dispatch('tryAutoLogin').then(() => {
          if(store.state.idToken){
            next()
          }else{
            next('/')
          }
        })
      }
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
