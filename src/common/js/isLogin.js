export const getLogin = (_this) => {
  _this.$axios.get('/common/is-login')
    .then(res => {
      if (res.data.code == 1000) {
        let baseUrl = '/login?callBack='
        _this.$storage.set('isLogin', res.data.code)
        _this.setLoginUrl(baseUrl)
        _this.setLoginCode(res.data.code)
      }
      if (res.data.code == 2000) {
        _this.$storage.set('isLogin', res.data.code)
        _this.setLoginCode(res.data.code)
      }
    })
};
