<template>
  <div class="message fixed" v-title="title">
    <v-header :title="title" :isRight="isRight"></v-header>
    <div class="mui-content">
      <ul class="mui-table-view" id="OATask">
        <li class="mui-table-view-cell" @tap="bound(item)" v-for="(item,index) in listData" :key="index">
          <div class="mui-slider-right mui-disabled">
            <a class="mui-btn mui-btn-red" @tap.stop="deletes">删除</a>
          </div>
          <div class="mui-slider-handle mui-media">
            <img class="mui-media-object mui-pull-left" :src="item.avatar">
            <div class="mui-media-body">
              {{item.title}}
              <p class="mui-ellipsis" v-html="item.des">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
            </div>
            <div class="mui-media-right">
              <h4>{{item.times}}</h4>
              <div v-if="!isShield">
                <p v-if="item.isRead">未读</p>
              </div>
              <div v-if="isShield">
                <p><img src="../../common/images/shield.png" alt=""></p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/VHeader/VHeader'
  import 'vue-awesome-mui/mui/dist/css/mui.css'
  import {mapGetters} from 'vuex'

  export default {
    name: "message",
    data(){
      return{
        isRight: false,
        title: '消息',
        btnArray: ['确认', '取消'],
        listData: [
          {
            id: 1,
            title: '幸福1',
            avatar: 'http://placehold.it/46x46',
            des: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            times: '2018/07/20',
            isRead: true
          },
          {
            id: 2,
            title: '幸福2',
            avatar: 'http://placehold.it/46x46',
            des: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
            times: '2018/06/20',
            isRead: false
          }
        ]
      }
    },
    computed:{
      ...mapGetters([
        'isShield'
      ])
    },
    created(){

      const Qs = require('qs');
      console.log(this.getStatus(this.$route.path))
      console.log(this.isShield)
      // this.$axios.post('http://im.test.qc1680.cn/Query_list_Message',Qs.stringify({tos:18414 }))
      //   .then(res=>{
      //     console.log(res)
      //   })
    },
    watch: {
      'this.$route' () {
        console.log(this.getStatus(this.$route.path))
      }
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      bound(item) {
        this.$router.push({
          query: {
            title: item.title,
            item: item
          },
          name: 'chitchat'
        })
      },
      deletes(){
        mui.confirm('确认删除该条记录？', '温馨提示', this.btnArray, (e) => {
          if (e.index == 0) {
            console.log('1')
          } else {
            setTimeout(() => {
              console.log('2')
            }, 0);
          }
        })
      },
      getStatus (urlStr) {
        let urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      }
    },
    components: {
      VHeader
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .mui-plus header.mui-bar {
    display: none;
  }
  .mui-plus .mui-bar-nav ~ .mui-content {
    padding: 0;
  }
  .hm-description {
    margin: .5em 0;
  }
  .hm-description > li {
    font-size: 14px;
    color: #8f8f94;
  }
  .mui-content {
    .mui-table-view{
      &:first-child{
        margin-top: 0;
      }
    }
  }
  .mui-slider-handle{
    width: 100%;
  }
  .mui-media{
    width: 100%;
    position: relative;
    .mui-media-object{
      width: 46px;
      height: 46px;
      max-width:46px;
      line-height: 46px;
      border-radius: 50%;
    }
    .mui-media-body{
      padding-top: 2px;
      width: 50%;
      float: left;
    }
    .mui-ellipsis{
      margin-top: 2px;
    }
    .mui-media-right{
      position: absolute;
      width: auto;
      top: 0;
      right: 0;
      text-align: right;
      float: right;
      overflow: hidden;
      h4{
        font-size: 12px;
        margin-bottom: 5px;
        margin-top: 5px;
        color: #ababab;
        font-weight: normal;
      }
      p{
        font-size: 12px;
        margin-top: 8px;
        color: #9618ff;
      }
      img{
        width: 24px;
      }
    }
  }
</style>
