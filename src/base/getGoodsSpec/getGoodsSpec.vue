<template>
  <div class="" @click.stop>
    <div class="name-goods">
      <div class="col-left">
        <img :src="goodsList.goods_logo" alt="">
      </div>
      <div class="col-right">
        <h4 class="title1">{{goodsList.goods_name}}</h4>
        <p class="price_item">￥{{goodsList.goods_price}}</p>
      </div>
    </div>
    <div class="spec_list">
      <div class="item" v-for="(list,index) in SpecLists" :key="index">
        <div class="title1">{{list.spec_title}}</div>
        <div class="select_items">
          <div class="select_item"
               v-for="(item,i) in list.addrs" :key="i">
            <input class="radioCls"
                   v-model="checked"
                   @click.stop="changeOnSelect(item,index)"
                   type="radio" :id="item.goods_spec_id" :name="index">
            <span>{{item.addr_title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: "getGoodsSpec",
    props: {
      goodsList: {
        type: [Array, Object],
        default: []
      },
      SpecLists: {
        type: [Array, Object],
        default: []
      },
      Specification: {
        type: [Array, Object, String],
        default: []
      },
      amount: {
        type: Number,
        default: 1
      },
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        arr: [],
        indexs: -1,
      }
    },
    computed: {
      checked: {
        get() {
          return false
        },
        set() {
          if (!this.isChecked) {
            return false
          }
        }

      }
    },
    methods: {
      changeOnSelect(item, index) {
        if (this.arr.length < this.SpecLists.length) {
          if (this.indexs < index) {
            this.arr.push(item.goods_spec_id);
            this.indexs = index;
          } else if (this.indexs === index) {
            this.arr[this.arr.length - 1] = item.goods_spec_id;
            this.indexs = index;
          } else if (this.indexs > index) {
            this.arr[this.arr.length] = item.goods_spec_id;
            this.indexs = index;
          }
        } else {
          this.arr[index] = item.goods_spec_id
        }
        console.log(this.arr)
        this.$emit('changeSpec', this.arr)
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">






  .name-goods {
    width: 100%;
    display: block;
    overflow: hidden;
    .col-left {
      float: left;
      width: 33%;
      img {
        display: block;
        width: 100%;
        min-height: 100px;
        max-height: 150px;
      }
    }
    .col-right {
      float: left;
      width: 67%;
      padding-left: 15px;
      .title1 {
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        color: #333333;
        line-height: 36px;
      }
      .price_item {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        margin-top: 10px;
      }
    }
  }

  .spec_list {
    width: 100%;
    display: block;
    overflow: hidden;
    font-size: 15px;
    .item {
      width: 100%;
      padding-top: 10px;
      .title {
        font-size: 15px;
        padding-bottom: 5px;
      }
      .select_items {
        width: 100%;
        .radioCls {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 999;
        }
        .select_item {
          position: relative;
          display: inline-block;
          margin: 5px 2px 5px;
          cursor: pointer;

          &.active {
            border: 1px solid #000;
            color: white;
            background-color: #000000;
          }
          span {
            display: block;
            border: 1px solid #ccc;
            font-size: 12px;
            border-radius: 5px;
            padding: 8px 10px;
          }
        }
        input.radioCls:checked + span {
          display: block;
          border: 1px solid #000;
          color: white;
          background-color: #000000;
        }
      }
    }
  }
</style>
