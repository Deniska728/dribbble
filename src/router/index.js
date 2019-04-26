import Vue from 'vue'
import Router from 'vue-router'

import Gallery from '@/components/Gallery.vue'
import Login from '@/components/Login.vue'
import UploadFile from '@/components/UploadFile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/new' },
    { path: '/new', name: 'new', component: Gallery, props: { category: 'new' } },
    { path: '/popular', name: 'popular', component: Gallery, props: { category: 'popular' } },
    { path: '/login', name: 'login', component: Login },
    { path: '/upload-img', name: 'imgUpload', component: UploadFile },
  ]
})
