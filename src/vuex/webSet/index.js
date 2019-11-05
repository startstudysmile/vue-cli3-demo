import { SearchExpPhoto } from '@/api/expPhoto.js'
import { HandleExpPhotoData } from '@/handleData/expPhoto.js'

const WEB_SET_DATA = {
  expPhotoList: [], //样片列表
  expPhotoTotal: 0 // 样片总数
}
export default {
  namespaced: true,
  state: Object.assign({}, WEB_SET_DATA),
  mutations: {
    SET_EXP_PHOTO_LIST(state, data) {
      state.expPhotoList = data
    },
    SET_EXP_PHOTO_TOTAL(state, data) {
      state.expPhotoTotal = data
    }
  },
  actions: {
    initWebSet({ commit }, data) {
      let source = Object.assign({}, WEB_SET_DATA, data || {})
      commit('SET_EXP_PHOTO_LIST', source.expPhotoList)
      commit('SET_EXP_PHOTO_TOTAL', source.expPhotoTotal)
    },

    // 获取样片列表
    getExpPhotoList({ commit }, data) {
      return new Promise(resolve => {
        SearchExpPhoto(data).then(res => {
          commit('SET_EXP_PHOTO_LIST', HandleExpPhotoData(res).expPhotoList)
          commit('SET_EXP_PHOTO_TOTAL', HandleExpPhotoData(res).expPhotoTotal)
          resolve()
        })
      })
    }
  }
}
