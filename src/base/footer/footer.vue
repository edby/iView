<template>
  <div class="footer">
    <ul class="footer-nav">
      <router-link tag="li" :to="{path: '/'}">
        <div class="icon home"></div>
        <h3 class="nav_name">首页</h3>
      </router-link>
      <router-link tag="li" :to="{path: '/maker/maker'}">
        <div class="icon center"></div>
        <h3 class="nav_name">创客中心</h3>
      </router-link>
      <router-link tag="li" :to="{path: '/FoundPage/recommend'}">
        <div class="icon fond"></div>
        <h3 class="nav_name">发现</h3>
      </router-link>
      <router-link tag="li" :to="{path: '/user/index'}">
        <div class="icon may"></div>
        <h3 class="nav_name">我的</h3>
      </router-link>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: "VFooter",

  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .footer {
    position: fixed;
    height: 55px;
    width: 100%;
    left: 0;
    background: #ffffff;
    border-top: 1px solid #cccccc;
    bottom: 0;
    z-index: 9000;
    li {
      width: 25%;
      color: #000000;
      float: left;
      text-align: center;
      font-size: 12px;
      padding: 1%;
      cursor: pointer;
      h3 {
        /*line-height: 150%;*/
      }

      div {
        width: 45%;
        height: (55/2)*1px;
        margin: 0 auto;

      }
    }
  }


  .home {
    background-image: url("http://img.hena360.cn/s_11.png");
    background-position: center;
    background-size: cover;
  }

  .router-link-exact-active .home {
    background-image: url("http://img.hena360.cn/s_1.png");
    background-position: center;
    background-size: cover;
  }

  .center {
    background-image: url("http://img.hena360.cn/s_33.png");
    background-position: center;
    background-size: cover;
  }

  .router-link-exact-active .center {
    background-image: url("http://img.hena360.cn/s_3.png");
    background-position: center;
    background-size: cover;
  }

  .fond {
    background-image: url("http://img.hena360.cn/s_22.png");
    background-position: center;
    background-size: cover;
  }

  .router-link-exact-active {
    .fond {
      background-image: url("http://img.hena360.cn/s_2.png");
      background-position: center;
      background-size: cover;
    }
    h3 {
      color: #a045fd;
    }
  }

  .may {
    background-image: url("http://img.hena360.cn/s_55.png");
    background-position: center;
    background-size: cover;
  }

  .router-link-exact-active .may {
    background-image: url("http://img.hena360.cn/s_5.png");
    background-position: center;
    background-size: cover;

  }

  .router-link-exact-active {
    h3 {
      color: #a045fd;
    }

  }

</style>
