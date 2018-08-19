<template>
  <div v-title="title">  <!--设置 -->
    <ul class="inform">
      <li>个人资料
      </li>
      <li class="acatat">头像
        <Icon type="chevron-right"></Icon>
        <img :src="imgurl" alt="">
      </li>
      <li>用户名
        <Icon type="chevron-right"></Icon>
        <p>{{inform.nickname}}</p>
      </li>
      <li v-if="inform.tel == '' " @click="dneglu()">手机号
        <Icon type="chevron-right"></Icon>
        <p v-cloak>绑定手机号</p>
      </li>
      <li v-if="inform.tel != '' ">手机号
        <Icon type="chevron-right"></Icon>
        <p v-cloak>{{inform.tel}}</p>
      </li>
      <li v-if="inform.inv_id == '0' " @click="recom()">推荐人
        <Icon type="chevron-right"></Icon>
        <p>暂无推荐人</p>

      </li>
      <li v-if="inform.inv_id != '0' ">推荐人
        <Icon type="chevron-right"></Icon>
        <p>{{inform.inv_nickname}}</p>
      </li>
    </ul>
    <button @click="logut">退出登录</button>
  </div>

</template>
<script>
  import {mapMutations} from 'vuex'

  export default {
    name: "information",
    data() {
      return {
        title: "个人资料",
        inform: {},
        imgurl: "http://img.hena360.cn/head_img.png",
        tels: ""
      };
    },
    created() {
      this.$axios
        .get("/user/index/view") //获取信息
        .then(res => {
          console.log(res)
          this.inform = res.data.data;
          this.imgurl = res.data.data.avatar;
          //this.tels = res.data.data.tel;
          //console.log(this.tels)
        });
    },
    methods: {
      //退出登录
      logut() {
        this.$axios.get("/user/index/logout").then(res => {
          layer.msg(res.data.message);
          //console.log(res.data.message);
          setTimeout(() => {
            this.$router.push({name: "index"});
            this.$storage.remove('isLogin')
            this.setLoginCode('1000')
          }, 2000);
        });
      },
      //点击推荐人进入绑定推荐人的页面
      recom() {
        this.$router.push({path: "/user/recommend/recommend"});
      },
      dneglu() {
        let callUrl = "/bindTel?callBack=" + window.location.href
        this.$router.push({path: callUrl});
      },
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN'
      })
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">

  .inform {
    li {
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 10px;
      color: #000;
      font-size: 14px !important;
      overflow: hidden;
      i {
        float: right !important;
        padding-right: 10px;
        color: #bbb;
        margin-top: 4%;
      }
      p {
        float: right;
        display: inline-block;
        padding-right: 4%;
      }
      img {
        width: 17%;
        float: right !important;
        border-radius: 50%;
      }
    }
    .acatat {
      height: 80px;
      line-height: 45px;
      vertical-align: middle;
      i {
        padding-top: 2%;
      }
      img {
        margin-right: 2%;
      }
    }
  }

  button {
    width: 85%;
    border: 1px solid #ccc;
    padding: 10px 0px;
    font-size: 14px !important;
    position: absolute;
    bottom: 10%;
    left: 8%;
  }
</style>

