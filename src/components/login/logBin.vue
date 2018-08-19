<template>
  <div class="logBin">
    <form class="form_group">
      <div class="input_group">
        <label for="tel">
          <input type="tel"
                 name="tel" id="tel"
                 class="btn_group"
                 ref="telEl"
                 v-model="login.tel"
                 placeholder="请输入手机号">
        </label>
      </div>
      <div class="input_group">
        <label for="codes">
          <input type="text"
                 id="codes" name="codes"
                 class="btn_group"
                 ref="codeEl"
                 v-model="login.codes"
                 placeholder="请输入短信验证码">
          <button type="button" class="code"
                  :disabled="disabled"
                  @click="setCodeFn"
                  v-text="codeVal">获取验证码
          </button>
        </label>
      </div>
      <div class="input_group">
        <button type="button" class="btn_group" @click="submitFn">确定</button>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "logBin",
    data() {
      return {
        login: {},
        countdown: 60,
        codeVal: '获取验证码',
        disabled: false,
        timer: null
      }
    },
    mounted() {
    },
    methods: {
      isTels() {
        let reg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
        if (!this.login.tel || this.login.tel == '') {
          layer.msg('电话不能为空');
          this.$refs.telEl.focus();
          return false
        }
        if (!reg.test(this.login.tel)) {
          layer.msg('电话不正确');
          this.$refs.telEl.focus();
          return false
        }
        return true
      },
      setCodeFn() {
        let flag = this.isTels();
        if (flag) {
          this.setTime();
          this.$axios.post('/user/login/send-sms', {
            tel: this.login.tel
          })
            .then(res => {
              if (res.data.code == 3000) {
                layer.msg(res.data.message);
              }
              if (res.data.code == 2000) {
                layer.msg('发送成功，请耐心等候！');
              }
            });
        }
      },
      setTime() {
        if (this.countdown === 0) {
          this.disabled = false;
          this.codeVal = '免费获取验证码';
          this.countdown = 60;
          clearTimeout(this.timer);
          return;
        } else {
          this.disabled = true;
          this.codeVal = `重新发送(${this.countdown})`;
          this.countdown--;
        }
        this.timer = setTimeout(() => {
          this.setTime();
        }, 1000);
      },
      codeFn() {
        if (!this.login.codes || this.login.codes === '') {
          layer.msg('验证码不能为空');
          this.$refs.codeEl.focus();
          return false
        }
        if (!/^\d+$/.test(this.login.codes) ) {
          layer.msg('验证码不正确');
          this.$refs.codeEl.focus();
          return false
        }
        return true
      },
      submitFn() {
        let flag = this.isTels();
        if (flag) {
          let flagCode = this.codeFn();
          if (flagCode) {
            let obj = {
              tel: this.login.tel,
              codes: this.login.codes
            };
            this.$emit('submitFn', obj)
          }
        }
      }
    }

  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .logBin
    width: 100vw;
    height 100vh
    background: url("http://img.hena360.cn/login_bj.jpg") no-repeat center;
    background-size: 100% 100%;
    padding-top calc(55vh)
    .form_group
      width: 100vw;
      padding: 0 15vw;
      .input_group
        display: block;
        padding-bottom: 15px;
      label
        display: block;
        font-weight: normal;
        font-size 14px
        position: relative
        overflow: hidden;
        input
          width: 100%;
          padding: 0 5px;
          background-color white
        .code
          position: absolute
          height: 40px
          width: 100px;
          right: 0
          top: 0
          font-size 12px
          background-color white
          border none
          outline none
          z-index: 0;
          border-radius 4px
          border-left 1px solid #999
          border-bottom-left-radius 0
          border-top-left-radius 0
      button
        width: 100%;
        text-align center
        background-color: #FFE86A

  .btn_group
    border none
    outline none
    height: 40px
    font-size 14px
    color black
    padding: 0;
    margin: 0;
    border-radius 4px
</style>
