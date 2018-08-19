<template>
  <div class="CofTres">
    <com-gra-ent
      :dataList="dataList"
      @changeDetails="changeDetails"></com-gra-ent>
    <noData v-if="dataList.length == 0"></noData>
  </div>
</template>

<script type="text/ecmascript-6">
  import ComGraEnt from 'components/found/organize/comGraEnt'
  import {mapGetters, mapMutations} from 'vuex'
  import noData from 'base/noData/noData'
  export default {
    name: "CofTres",
    data(){
      return{
        dataList: []
      }
    },
    computed: {
      ...mapGetters([
        'detailsList'
      ])
    },
    created(){
      this.getCollection()
    },
    methods:{
    //  user/collection/get-collection
      getCollection(){
        this.$axios.get('/user/collection/get-collection')
          .then((res) => {
              if (res.data.code === 2000) {
               this.dataList = res.data.data.items
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
    },
    components: {
      ComGraEnt,
      noData
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .CofTres {
    padding: 5px;
  }

  .bgs {
    background-color: rgb(245, 245, 245);
  }
</style>
