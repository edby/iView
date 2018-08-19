<template>
  <div v-title="title">
    <div class="linkage-wrap">
      <div class="address-box">
        <span>选择地区:</span>
        <input class="input" :value="address" readonly type="text" placeholder="请选择所在地区"
               @click="addressFlag = !addressFlag">
      </div>
      <div class="address-box">
        <span>详细地址:</span>
        <input class="input addressDataisl" v-model="addressDataisl" type="text" placeholder="如街道，楼排号等">
      </div>
      <div class="address-box">
        <span>姓名:</span>
        <input class="input name" type="text" v-model="name" placeholder="请输入姓名">
      </div>
      <div class="address-box tel">
        <span>电话:</span>
        <input class="input" type="text" v-model="tel" placeholder="请输入11位手机号">
      </div>
      <div class="pick-mark" v-show="addressFlag">
        <div class="btn-box">
          <a class="btn-cancel" @click="addressFlag = !addressFlag">取消</a>
          <a class="btn-sure" @click="onFillAddress">确定</a>
        </div>
        <mt-picker class="select" :slots="slots" value-key="aname" @change="onValuesChange"></mt-picker>
      </div>
      <p style="text-align: center;line-height: 500%;" v-on:click="del">删除</p>
      <Row class="send">
        <Button @click="send">保存</Button>
      </Row>
    </div>


  </div>

</template>

<script>
  import {address, slots} from './address';

  export default {
    name: 'editAddress',
    data() {
      return {
        title:'编辑地址',
        slots,
        address: '',
        tempAddress: '',
        addressFlag: false,
        addressDataisl: '',
        name: '',
        tel: '',
        user_id:'',
        realname:'',
        pcaaddress:'',
        detail:'',
        id:'',
        status:'',
        specId:{},
        num:"",
        goods_id:"",
      };
    },
    created() {
      this.specId = this.$route.query.specId
      this.num = this.$route.query.num
      this.goods_id = this.$route.query.goods_id
      this.$axios.get('/user/address/view?id='+this.$route.query.editid)
        .then(res=>{
          this.id=res.data.data.id
          this.status=res.data.data.status
          this.tempAddress=res.data.data.pcaaddress
          this.name=res.data.data.realname
          this.tel=res.data.data.tel
          this.addressDataisl=res.data.data.detail
        })
    },
    mounted() {
      this.$nextTick(() => {
        this.onInitAddress();
      })
    },
    methods: {
      del(){
        this.$axios.get('/user/address/del?id='+this.$route.query.editid+'&status=9')
          .then(res=>{
            if(res.data.code==2000){
              layer.msg('地址删除成功')
              setTimeout(()=>{
                this.$router.push({path: '/user/address/addressList'})
              },2000)
            }
          })
      },
      onInitAddress() {
        console.log(slots)
        this.slots[0].values = address.filter((item, index) => {
          if (item.apid == 0) {
            return item;
          }
        });
      },
      onFillAddress() {
        // 填入省市区
        this.address = this.tempAddress;
        this.addressFlag = !this.addressFlag;
      },
      onValuesChange(picker, values) {
        // 防止没有省份时报错
        if (values[0]) {
          this.slots[1].values = address.filter((item, index) => {
            if (item.apid == values[0].aid) {
              return item;
            }
          });
        }
        // 防止没有市时报错
        if (values[1]) {
          this.slots[2].values = address.filter((item, index) => {
            if (item.apid == values[1].aid) {
              return item;
            }
          });
        }
        // 防止没有区时报错
        if (values[2]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.tempAddress = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname;
        }
      },
      send() {
        if (this.address.trim() == '') {
          layer.msg('请选择省市区')
          return
        }
        if (this.addressDataisl.trim() == '') {
          layer.msg('请输入详细信息')
          return
        }
        if (this.name.trim() == '') {
          layer.msg('请输入联系人')
          return
        }
        if (!/^[\u4E00-\u9FA5]{1,6}$/.test(this.name)) {
          layer.msg("请输入2-6位中文姓名");
          return
        }
        if (this.tel.trim() == '') {
          layer.msg('请输入手机号')
          return
        }
        let tel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!tel.test(this.tel)) {
          layer.msg("请输入正确的手机号!");
          return false;
        }
        const Qs = require('qs');
        this.$axios.post('/user/address/edit', Qs.stringify({
          realname: this.name,
          tel: this.tel,
          pcaaddress: this.address,
          detail: this.addressDataisl,
          id:this.id,
          status:this.status
        }))
          .then(res => {
            console.log(res)
            if (res.data.code == 2000) {
              layer.msg('修改成功')
              setTimeout(()=>{
                this.$router.push({name:'addressList',query:{specId:this.specId,num:this.num,goods_id:this.goods_id}})
              },2000)
            }
            if (res.data.code == 3000) {
              layer.msg(res.data.message)
            }
          })
      },
    }
  };
</script>

<style scoped lang="less">
  .linkage-wrap {
    position: relative;
    padding: 15px;
    span {
      padding-right: 5%;
    }
    .address-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      font-size: 14px;
      color: #333;
      .input {
        display: flex;
        align-items: center;
        flex: 1;
        height: 40px;
        padding: 0;
        box-sizing: border-box;
        border: none !important;
        border-bottom: 1px solid #f2f2f2 !important;
      }
    }
    .pick-mark {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(236, 240, 243, 0.8);
      .btn-box {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 230px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        font-size: 14px;
        background: #fff;
        .btn-cancel {
          color: #55f;
        }
        .btn-sure {
          color: #e5004d;
        }
      }
      .select {
        position: absolute;
        left: 0;
        bottom: 50px;
        width: 100%;
      }
      .picker-items {
        background: #eee;
        .picker-slot {
          font-size: 14px;
        }
        .picker-item {
          &.picker-selected {
            color: #535353;
          }
        }
        .picker-center-highlight {
          &:after,
          &:before {
            background: #fff;
          }
        }
      }
    }
  }

  .send {
    position: fixed !important;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    button {
      background: #000000;
      border: none;
      display: block;
      width: 100%;
      height: 50px;
      color: #ffffff;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
    }
  ;
  }
</style>
