import Vue from 'vue'
import Router from 'vue-router'

import expPhotoManage from '@/views/webSet/expPhotoManage'

Vue.use(Router)

const router = new Router({
  routes: [{ path: '/expPhotoManage', name: 'expPhotoManage', component: expPhotoManage, meta: { title: '样片管理' } }]
})

// 增加title变化
router.afterEach(to => {
  if (!to.meta.title) return
  // 修改页面title
  document.title = to.meta.title
  // 通过iframe修改title描述(兼容低版本微信)
  let hackIframe = document.createElement('iframe')
  hackIframe.style.display = 'none'
  document.body.appendChild(hackIframe)
  document.body.removeChild(hackIframe)
})

export default router
