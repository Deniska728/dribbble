import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import userInfo from '@/common/authInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorization: false,
    accessToken: null,
    refreshToken: null
  },
  getters: {
    GET_ACCESS_TOKEN: (state) => state.accessToken,
    GET_AUTHORIZATION: (state) => state.authorization,
    GET_REFRESH_TOKEN: (state) => state.refreshToken
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, token) => { state.accessToken = token },
    SET_AUTHORIZATION: (state, authorization) => { state.authorization = authorization },
    SET_REFRESH_TOKEN: (state, token) => { state.refreshToken = token }
  },
  actions: {
    SET_TOKEN: (state, { type, token }) => {
      state.commit(`SET_${type}_TOKEN`, token)
    },
    CHECK_AUTHORIZED: (state, authorized) => {
      if(authorized !== null) {
        state.commit('SET_AUTHORIZATION', authorized)
      } else {
        if(localStorage.getItem('access_token')) {
          state.commit('SET_AUTHORIZATION', true)
        } else {
          state.commit('SET_AUTHORIZATION', false)
        }
      }
    },
    GET_PHOTOS: (state, { limit, page, category }) => (
      axios.get(`https://cors-anywhere.herokuapp.com/gallery.dev.webant.ru/api/photos`, {
        params: {
          [category]: true,
          page,
          limit
        }
      })
      .then( ({data: {data, totalItems, countOfPages}}) => ({
        images: data,
        totalItems,
        countOfPages
      }))
      .catch(err => console.error(err))
    ),
    LOGIN: (state, {password, login, grant_type}) => (
      axios.get(`https://cors-anywhere.herokuapp.com/gallery.dev.webant.ru/oauth/v2/token`, {
        params: {
          client_id: userInfo.id,
          grant_type,
          client_secret: userInfo.secret,
          username: login,
          password: password
        }
      })
      .then(({data: {access_token, refresh_token}}) => {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        state.dispatch('SET_TOKEN', {type: 'ACCESS', token: access_token})
        state.dispatch('SET_TOKEN', {type: 'REFRESH', token: refresh_token})
        state.dispatch('CHECK_AUTHORIZED', true)
      })
      .catch(err => console.log(err))
    ),
    CHECK_TOKEN: (state) => (
      axios({
        url: 'https://cors-anywhere.herokuapp.com/gallery.dev.webant.ru/api/users/current',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(() => state.commit('SET_AUTHORIZATION', true))
      .catch(() => {
        state.dispatch('UPDATE_TOKEN')
        state.commit('SET_AUTHORIZATION', true)
      })
    ),
    UPDATE_TOKEN: state => (
      axios.get('https://cors-anywhere.herokuapp.com/gallery.dev.webant.ru/oauth/v2/token', {
        params: {
          refresh_token: localStorage.getItem('refresh_token'),
          grant_type: 'refresh_token',
          client_id: userInfo.id,
          client_secret: userInfo.secret
        }
      })
      .then(({data: {access_token, refresh_token}}) => {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        state.dispatch('SET_TOKEN', {type: 'ACCESS', token: access_token})
        state.dispatch('SET_TOKEN', {type: 'REFRESH', token: refresh_token})
        state.dispatch('CHECK_AUTHORIZED', true)
      })
      .catch(err => console.log(err))
    ),
    LOGOUT: state => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      state.dispatch('SET_TOKEN', {type: 'ACCESS', token: ''})
      state.dispatch('SET_TOKEN', {type: 'REFRESH', token: ''})
      state.dispatch('CHECK_AUTHORIZED', false)
    },
    UPLOAD_FILE: (state, { file, name, description, popular, categoryNew }) => {
      const formData = new FormData()
      formData.append('file', file)
      
      return axios.post('https://cors-anywhere.herokuapp.com/gallery.dev.webant.ru/api/media_objects', {
        data: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(response => console.log(response))
      .catch(err => console.log(err))
    }
  }
})
