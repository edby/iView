import storage from '../common/js/storage'

const state = {
  // 登录id
  mid: 0,
  // 判断是否登录
  isLogin: (storage.get('isLogin') != null) ? storage.get('isLogin') : '1000',
  // 登录链接
  loginUrl: '/html/view/user/login.html?callBack=',
  //是否屏蔽消息
  isShield: false,
  // 选择商品的列表
  detailsList: [],
//  图片上传前保存的base64
  imgList: [],
  //  上传后保存的图片路径
  uploadList: []

}

export default state
