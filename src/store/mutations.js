import * as types from './mutation-types'
import {SET_UNFOLLOW} from "./mutation-types";
import storage from 'common/js/storage'

const mutations = {
  [types.SET_MID](state, mid) {  //登录id
    state.mid = mid
  },
  [types.SET_IS_SHIELD](state, flag) {  //是否屏蔽消息
    state.isShield = flag
  },
  [types.SET_DETAILS_LIST](state, item) {  //选择商品的列表
    state.detailsList = item
  },
  [types.SET_DELETE_LIST](state, i) {  //删除商品的列表
    state.detailsList.splice(i, 1)
  },
  [types.SET_EMPTY_DELETE_LIST](state) {  //清空商品的列表
    state.detailsList = []
  },
  [types.SET_IMG_LIST](state, lists) {  //图片上传前保存的base64
    state.imgList.push(lists)
  },
  [types.SET_UPLOAD_LIST](state, lists) {  //上传后保存的图片路径
    if (state.uploadList.length == 0) {
      state.uploadList = lists
    } else {
      state.uploadList = state.uploadList.concat(lists)
    }
  },
  [types.SET_EMPTY_IMG_LIST](state) {  //清空上传前保存的base64
    state.imgList = []
  },
  [types.SET_EMPTY_UPLOAD_LIST](state) {  //清空上传后保存的图片路径
    state.uploadList = []
  },
  [types.SET_IS_LOGIN](state, code) {  //判断是否登录
    state.isLogin = code
    storage.set('isLogin', code)
  },
  [types.SET_LOGIN_URL](state, url) {  //登录链接
    state.loginUrl = url
  },


}

export default mutations
