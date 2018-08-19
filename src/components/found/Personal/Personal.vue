<template>
  <div class="Personal" v-title="title">
    <page-header :dataList="OtherPageList"></page-header>
    <div class="box" v-if="dataList.length">
      <panel-list
        :isFouc = "isFouc"
        :dataList="dataList"
        @changeDetails="changeDetails"
        @changeLike="changeLike"
        @changePersonal="changePersonal"
      ></panel-list>
    </div>
    <div class="personal_foot" v-show="OtherPageList.is_self == 1">
      <div class="item_group">
        <div class="item" @click.stop="focusFn(OtherPageList)" v-show="OtherPageList.is_focus == 1 || OtherPageList.is_focus == 0">
          <span v-if="OtherPageList.is_focus == 0"><Icon type="plus" size="16"></Icon> 关注</span>
          <span v-if="OtherPageList.is_focus == 1">已关注</span>
        </div>
        <div class="item" @touchstart.prevent="priCha"><Icon type="chatbubble-working" size="16"></Icon> 私聊</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/VHeader/VHeader'
  import PageHeader from 'components/found/organize/pageHeads'
  import PanelList from 'base/panelList/panelList'
  import {getLogin} from "common/js/isLogin";
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    name: "Personal",
    data(){
      return{
        title: '个人主页',
        dataList: [],
        OtherPageList: {},
        uId: null,
        isFouc: false,
        id:'',
      }
    },
    computed:{
      ...mapGetters([
        'isLogin',
        'loginUrl'
      ])
    },
    created(){
      this.uId = this.$route.query.id;
      getLogin(this);
      this.getOtherPage();
      this.getOtherList()
    },

    mounted(){
      this.$nextTick(() => {
      })
    },
    methods:{
      ...mapMutations({
        setLoginCode: 'SET_IS_LOGIN',
        setLoginUrl: 'SET_LOGIN_URL'
      }),
      priCha(){
        console.log(this.id)
        layer.msg('暂未开放，敬请期待！')
       // this.$router.push({name:'chitchat',query:{id:this.id}})
      },
      getOtherPage() {
        this.$axios.get('/social/index/other-page?user_id=' + this.uId)
          .then((res) => {
            console.log(res)
            this.id= res.data.data.id
            if (res.status === 200) {
              if (res.data.code === 2000) {
                this.OtherPageList = res.data.data
                console.log(this.OtherPageList)
              }
            }
          })
      },
      getOtherList(){
        this.$axios.get('/social/index/other-list?user_id=' + this.uId)
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              if (res.data.code === 2000) {
                this.dataList = res.data.data.items
                console.log(this.dataList)
              }
            }
          })
      },
      changeDetails(item){
        // window.location.href = '/html/view/details/details.html?id='+item.goods_id+'&mid='+item.user_id
        this.$router.push({
          path: '/CommodityDetails',
          query: {
            id: item.goods_id,
            mid: item.user_id
          }
        })
      },
      focusFn(item){
        console.log(item.is_focus)
        if (item.is_focus == 1) {
          layer.confirm("取消关注后，您将看不到对方发布的实时动态，确认取消？", {title: "取消确认"}, () => {
            this.$axios.get('/social/index/focus-off?id='+item.id)
              .then((res) => {
                if (res.status == 200) {
                  if (res.data.code == 2000) {
                    console.log(res.data.message)
                    layer.msg(res.data.message)
                    this.getOtherPage()
                  }else if (res.data.code == 3000) {
                    layer.msg(res.data.message)
                  }else {
                    layer.msg(res.data.message)
                  }
                }
              })
          })
        }else {
          this.$axios.get('/social/index/focus?id=' + item.id)
            .then((res) => {
              if (res.status == 200) {
                if (res.data.code == 2000) {
                  console.log(res.data.message)
                  layer.msg(res.data.message)
                  this.getOtherPage()
                }else if (res.data.code == 3000) {
                  layer.msg(res.data.message)
                }else {
                  layer.msg(res.data.message)
                }
              }
            })
        }
      },
      changeLike(id){
        this.$axios.get('/social/index/like?id=' + id)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.code == 2000) {
                console.log(res.data.message)
                layer.msg('点赞成功');
                this.getOtherList()
                this.getOtherPage()
              }else if (res.data.code == '3000') {
                layer.msg(res.data.message);
              }else {
                layer.msg(res.data.message);
              }
            }
          })
      },
      changePersonal(item) {
        this.$router.push({
          query: {
            id: item.user_id
          },
          name: 'Personal'
        })
      }
    },
    components: {
      VHeader,
      PageHeader,
      PanelList
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        console.log(vm.isLogin)
        setTimeout(() => {
          if (vm.isLogin == 1000) {
            vm.$router.push({
              path: '/login?callBack=' + encodeURIComponent(window.location.href)
            })
          }
        }, 20)

      })
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .box{
    margin-top: 10px;
  }
  .Personal{
    padding-bottom: 50px;
  }
  .personal_foot{
    position: fixed;
    width: 100%;
    height: 50px;
    left: 0;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    border-top: 1px solid #dddddd;
    color: white;
    .item_group{
      display: flex;
      height: 100%;
      align-items: center;
      .item{
        flex: 1;
        text-align: center;
        cursor: pointer;
        font-size: 15px;
        color: #b462ff;
      }
    }
  }
</style>
