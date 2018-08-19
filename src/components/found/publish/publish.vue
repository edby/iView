<template>
  <div class="publish" v-title="title">
    <form action="" class="group-form">
      <div class="group-text">
        <textarea placeholder="分享购物晒单与使用心得..." maxlength="500" @keyup="calculate" v-model.trim="textVal"></textarea>
      </div>
      <div class="cal_num">
        <p><span>{{len}}/500</span></p>
      </div>
    </form>
    <upload-img
      :imgList="imgList"
      :uploadList="uploadList"
      @setImgList="setImgList"
    ></upload-img>
    <div class="hr"></div>
    <div class="AddMerchandise">
      <div class="title" @click.stop="addGoods">
        <span>添加商品</span>
        <Icon type="ios-arrow-forward" />
      </div>
      <div class="contents">
        <com-gra-ent
          :isClose="isClose"
          :dataList="detailsList"
          @deleteItems="deleteItems"
        ></com-gra-ent>
      </div>
    </div>
    <div class="dexter" @click="publish">发 布</div>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import UploadImg from 'components/found/organize/uploadImg'
  import ComGraEnt from 'components/found/organize/comGraEnt'
  import {getLogin} from "common/js/isLogin";
  import {mapGetters, mapMutations} from 'vuex'

  const _qs = require('qs');

  export default {
    name: "publish",
    data() {
      return {
        isClose: true,
        title: '发布动态',
        textVal: '',
        len: 0
      }
    },
    watch:{
      textVal() {
        this.len = this.textVal.length
      }
    },
    computed: {
      ...mapGetters([
        'detailsList',
        'imgList',
        'uploadList',
        'isLogin',
        'loginUrl'
      ])
    },
    created() {
      getLogin(this);
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        console.log(vm.isLogin)
        if (vm.isLogin == 1000) {
          vm.$router.push({
            path: '/login?callBack=' + encodeURIComponent(window.location.href)
          })
        }
      })
    },
    mounted() {
      setTimeout(() => {
      }, 20)
    },
    methods: {
      back() {
        this.$router.back();
      },
      publish() {
        if (this.textVal == '') {
          layer.msg('发布内容不能为空')
          return
        }
        if (this.uploadList.length == 0) {
          layer.msg('请添加图片')
          return
        }
        if (this.uploadList.length > 9) {
          layer.msg('图片最多上传9张')
          return
        }
        // uploadList
        let obj = {
          "goods_id": this.detailsList.length == 0 ? 0 : this.detailsList[0].goods_id,
          "content": this.textVal,
          "img": this.uploadList
        }
        this.$axios.post('/social/self/publish', _qs.stringify(obj))
          .then(res => {
            console.log(res)
            if (res.status == 200) {
              if (res.data.code == 2000) {
                layer.msg(res.data.message)
                this.$router.replace({
                  path: '/FoundPage/recommend'
                })
                this.emptyUploadList()
                this.emptyImgList()
                this.emptyDeleteList()
              }
              else {
                layer.msg(res.data.message)
              }
            }
          })

        this.textVal = ''
        this.calculate()
      },
      calculate() {
        this.textVal = this.textVal.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'');
        this.len = this.textVal.length
      },
      deleteItems(index) {
        this.deleteList(index)
      },
      addGoods() {
        this.$router.push({
          path: '/selectGoods'
        })
      },
      setImgList(item) {
        this.setImgList(item)
      },
      ...mapMutations({
        deleteList: 'SET_DELETE_LIST',
        setImgList: 'SET_IMG_LIST',
        getUploadList: 'SET_UPLOAD_LIST',
        emptyImgList: 'SET_EMPTY_IMG_LIST',
        emptyUploadList: 'SET_EMPTY_UPLOAD_LIST',
        emptyDeleteList: 'SET_EMPTY_DELETE_LIST',
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      })
    },
    components: {
      UploadImg,
      ComGraEnt
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .publish{
    padding-bottom: 44px;
  }
  .group-form {
    width: 100%;
    .group-text {
      width: 100%;
      display: block;
      textarea {
        width: 100%;
        min-height: 180px;
        border: none;
        padding: 5px;
        font-size: 14px;
        outline: none;
      }
    }
    .cal_num {
      padding: 0 10px;
      text-align: right;
      p {
        display: block;
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;
        color: #ababab;
        font-size: 12px;
      }
    }
  }

  .hr {
    height: 10px;
    background-color: #f5f5f5;
  }
  .dexter {
    position: fixed;
    margin-top: 30px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    left: 0;
    bottom: 0;
    z-index: 1;
    font-size: 15px;
    cursor: pointer;
    background-color: #b462ff;
    color: white;
  }
  .AddMerchandise {
    width: 100%;
    margin-bottom: 15px;
    .title {
      padding: 0 15px;
      height: 44px;
      line-height: 44px;
      overflow: hidden;
      font-size: 15px;
      text-align: right;
      cursor: pointer;
      span {
        float: left;
        display: block;
      }
    }
    .contents {
      width: 100%;
      padding: 0 10px;
    }
  }
</style>
