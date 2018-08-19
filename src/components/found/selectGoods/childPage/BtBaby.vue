<template>
  <div class="BtBaby">
    <com-gra-ent
      :dataList="buyGoodsList"
      @changeDetails="changeDetails"
    ></com-gra-ent>
    <noData v-if="buyGoodsList.length == 0"></noData>
  </div>
</template>

<script type="text/ecmascript-6">
  import ComGraEnt from 'components/found/organize/comGraEnt'
  import {mapGetters, mapMutations} from 'vuex'
  import noData from 'base/noData/noData'
  export default {
    name: "BtBaby",
    data(){
      return{
        buyGoodsList: [],
        getGoods: []
      }
    },
    components: {
      ComGraEnt,
      noData
    },
    computed: {
      ...mapGetters([
        'detailsList'
      ])
    },
    created(){
      this.getBuyGoodsList()

    },
    mounted(){
      this.$nextTick(() => {
      })
    },
    methods: {
      getBuyGoodsList() {
        this.$axios.get('/social/self/buy-goods-list')
          .then((res) => {
              if (res.data.code === 2000) {
                this.buyGoodsList = res.data.data.items
              }
          })
      },
      changeDetails(item){
        let arr = []
        arr.push(item)
        this.getGoodsFn(arr)
        this.$router.replace({
          path: '/publish'
        })
      },
      ...mapMutations({
        getGoodsFn: 'SET_DETAILS_LIST'
      })

    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .BtBaby {
    padding: 5px;
  }
  .bgs{
    background-color: rgb(245,245,245);
  }
  .mui-table-view{
    background-color: black;
  }
</style>
