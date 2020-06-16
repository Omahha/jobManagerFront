import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import globalAxios from 'axios'
import router from '../router'

import company from './modules/company'
import users from './modules/users'
import schedule from './modules/schedule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    role_id: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken,
      state.userId = userData.userId,
      state.role_id = userData.role_id
    },
    clearAuthData(state) {
      state.idToken = null,
      state.userId = null,
      state.role_id = null
    },
    clearUserData(state) {
      state.user = {
        name: 'Guest'
      }
    },
    'SET_USER' (state, userDataObject) {
      state.user = userDataObject
    }
  },
  actions: {
    setLogoutTimer({dispatch}, expirationTime) {
      setTimeout( () => {
        dispatch('logout')
      }, expirationTime*1000)
    },
    register({commit, dispatch}, registerData) {
      var formData = new FormData();
      for(let key in registerData){
        formData.append(key, registerData[key])
      }
      let config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post('/register', formData, config
      )
        .then(res => {
          console.log(res)
          commit('authUser', {
            idToken: res.data.data.token,
            userId: res.data.data.id,
            role_id: res.data.data.rol_id
          })

          const now = new Date()
          const tokenLife = 3600
          const expirationTime = new Date(now.getTime() + tokenLife*1000)

          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('userId', res.data.data.id)
          localStorage.setItem('role_id', res.data.data.role_id)
          localStorage.setItem('expirationTime', expirationTime)

          dispatch('setLogoutTimer', tokenLife)

          globalAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          router.replace('/home')
        })
        .catch(error => console.log(error))
    },
    login({commit, dispatch}, authData) {
      axios.post('/login', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          // console.log(res)
          if(res.data.success){
            commit('authUser', {
              idToken: res.data.data.token,
              userId: res.data.data.id,
              role_id: res.data.data.role_id
            })
            const now = new Date()
            const tokenLife = 3600
            const expirationTime = new Date(now.getTime() + tokenLife*1000)
            // console.log(expirationTime)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('userId', res.data.data.id)
            localStorage.setItem('role_id', res.data.data.role_id)
            localStorage.setItem('expirationTime', expirationTime)

            dispatch('setLogoutTimer', tokenLife)

            globalAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

            dispatch('fetchUserData')
            router.replace('/home')

          }
        })
        .catch(error => {console.log(error)})
    },
    tryAutoLogin({commit, dispatch}) {
      const token = localStorage.getItem('token')
      if(!token){
        console.log('no token')
        return
      }

      const expirationTime = localStorage.getItem('expirationTime')
      const now = new Date()
      if(now >= expirationTime){
        console.log('token expired')
        return
      }

      const userId = localStorage.getItem('userId')
      const role_id = localStorage.getItem('role_id')
      commit('authUser', {
        idToken: token,
        userId: userId,
        role_id: role_id
      })

      globalAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

      dispatch('fetchUserData')
      // router.replace('/home')

    },
    logout({commit}) {
      commit('clearAuthData')
      commit('clearUserData')
      commit('CLEAR_COMPANIES')
      // localStorage.removeItem('token')
      // localStorage.removeItem('userId')
      // localStorage.removeItem('role_id')
      // localStorage.removeItem('expirationTime')
      localStorage.clear();
      delete globalAxios.defaults.headers.common['Authorization']

      if(router.currentRoute.name !== 'Welcome') {
        router.replace('/')
      }
    },
    fetchUserData({commit}) {
      globalAxios.get('/user')
        .then(res => {
          // console.log(res.data.data)
          const data = res.data.data
          if(data.avatar == ''){
            data.avatar = '/images/image2.jpg'
          }
          commit('SET_USER', data)
        })
    },
    updateUserData({state, dispatch}, userData) {
      // console.log(userData)
      var formData = new FormData();
      for(let key in userData){
        formData.append(key, userData[key])
      }
      let config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      config.headers['X-HTTP-Method-Override'] = 'PUT';

      globalAxios.post('/user/' + state.userId, formData, config)
        .then(() => {
          // console.log(res)

          dispatch('fetchUserData')
        })
        .catch(error => {console.log(error)})
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null
    },
    isAdmin(state) {
      return state.role_id == 1
    },
    user(state) {
      return state.user
    },
    userId(state) {
      return state.userId
    },
  },
  modules: {
    company,
    users,
    schedule
  }
})
