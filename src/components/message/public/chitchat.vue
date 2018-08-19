<template>
  <div class="chitchat fixed" v-title="title">
    <v-header :title="title" :isRight="isRight"></v-header>
    <div class="content">
      <div class="shield" @click.stop="changeShield">
        <span><img src="../../../common/images/menu.png" width="100%" alt=""></span>
      </div>
      <div class="content_row">
        <div class="friend">
          <ul class="item">
            <li v-for="(item,index) in friendList" :key="index">
              <div class="avatar">
                <img :src="lists.avatar" width="100%" alt="">
              </div>
              <div class="cent_body">
                <div class="des" :class="{'on' : item.isRead === true}" v-html="item.des">des</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="times">
          <span>15:30</span>
        </div>
        <div class="oneself">
          <ul class="item">
            <li v-for="(item,i) in oneselfList" :key="i">
              <div class="cent_body">
                <div class="des" :class="{'on' : item.isRead === true}" v-html="item.des">des</div>
              </div>
              <div class="avatar">
                <img src="../../../assets/avatar2.png" width="100%" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="contFoot">
      <div>
        <div class="text">
          <div class="group_input">
            <div class="group_input_text" v-show="PhoneBoard">
              <input type="text" v-model="textVal" @keydown.13="seedFn">
            </div>
            <div class="group_input_sound" v-show="!PhoneBoard">
              <button type="button" class="sounds"
                      @touchstart.prevent="soundDown"
                      @touchmove.prevent="soundMove"
                      @touchend="soundEnd">按住 说话
              </button>
            </div>
            <div class="btn">
              <Button @click="seedFn">发送</Button>
            </div>
          </div>
        </div>
        <div class="icon">
          <div class="item-icon">
            <div class="item" @click.stop="PhoneBoardFn">
              <img src="../../../common/images/speech.png" alt="" v-show="PhoneBoard">
              <img src="../../../common/images/keyboard.png" alt="" v-show="!PhoneBoard">
            </div>
          </div>
          <div class="item-icon">
            <img src="../../../common/images/brow.png" alt="">
          </div>
          <div class="item-icon">
            <img src="../../../common/images/camera.png" alt="">
          </div>
          <div class="item-icon">
            <img src="../../../common/images/print.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="recording" v-if="recording">
      <div class="recording-voice" v-if="recordingVoice">
        <div class="voice-inner">
          <div class="voice-icon"></div>
          <div class="voice-volume">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p>手指上划,取消发送</p>
      </div>
      <div class="recording-cancel" v-if="recordingCancel">
        <div class="cancel-inner"></div>
        <p>松开手指,取消发送</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/VHeader/VHeader'
  import 'vue-awesome-mui/mui/dist/css/mui.css'
  import {mapGetters,mapMutations} from 'vuex'

  export default {
    name: "chitchat",
    data() {
      return {
        isRight: false,
        title: '',
        textVal: '',
        lists: {

        },
        friendList: [
          {
            id: 1,
            des: '反馈给咖啡馆及发动机',
            isRead: false
          },
          {
            id: 2,
            des: '概括了发动机规范来开个机房环境法规和咖啡馆和规范化开发规划开发',
            isRead: false
          }
        ],
        oneselfList: [
          {
            id: 1,
            des: '付款了国际法',
            isRead: false
          },
          {
            id: 2,
            des: '股份的开关',
            isRead: true
          }
        ],
        touch: {},
        recording: false,
        recordingVoice: false,
        recordingCancel: false,
        PhoneBoard: true
      }
    },
    computed:{
      ...mapGetters([
        'isShield'
      ])
    },
    created() {
      this.title = this.$route.query.title
      this.lists = this.$route.query.item
      this.touch = {}
      // this.$axios.get(''+this.$route.query.id)
    },
    mounted() {
      this.$nextTick(() => {
        // console.log(this.lists)
      })
    },
    methods: {
      seedFn() {
        if (this.textVal === '') {
          return
        }
        let obj = {
          id: this.oneselfList + 1,
          des: this.textVal,
          isRead: true
        };
        this.oneselfList.push(obj);
        this.textVal = ''
      },
      soundDown(e) {
        this.recording = true
        this.recordingVoice = true
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      soundMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaY = touch.pageY - this.touch.startY
        if (deltaY < 0) {
          this.recordingVoice = false
          this.recordingCancel = true
        } else {
          this.recordingVoice = true
          this.recordingCancel = false
        }
      },
      soundEnd() {
        this.recording = false
        this.recordingVoice = false
        this.recordingCancel = false
      },
      PhoneBoardFn () {
        this.PhoneBoard = !this.PhoneBoard
      },
      changeShield() {
        this.setShield(!this.isShield)
      },
      ...mapMutations({
        setShield: 'SET_IS_SHIELD'
      })
    },
    components: {
      VHeader
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .chitchat {
    padding-bottom: 65px;
  }

  .contFoot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 76px;
    padding: 3px 0;
    background-color: #e8e8e8;
    .text {
      height: 35px;
      line-height: 35px;
      .group_input {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 5px;
      }
      .group_input_text, .group_input_sound {
        flex: 1;
        height: 32px;
        input {
          height: 32px;
          padding: 0 2px;
          margin-bottom: 0;
          font-size: 13px;
          color: #9939f2;
          margin-top: 0;
          display: block;
        }
        .sounds {
          border-radius: 3px;
          width: 100%;
          height: 32px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          padding: 0;
          color: #565656;
          display: block;
          font-size: 13px;
        }
      }
      .btn {
        width: auto;
        padding-left: 6px;
      }
      .ivu-btn {
        font-size: 14px;
        height: 32px;
        line-height: 30px;
        padding: 0 20px;
        background: #fdfdfd;
        color: #333333;
      }
    }
    .icon {
      height: 35px;
      line-height: 35px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 5px;
      margin-top: 4px;
      .item-icon {
        flex: 1;
        text-align: center;
        width: 100%;
        height: 100%;
        .item{
          display: inline-block;
          overflow: hidden;
          cursor: pointer;
        }
        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  .content {
    width: 100%;
    padding: 8px;
    position: relative;
    .shield {
      position: fixed;
      right: 2px;
      top: 45px;
      width: 30px;
      height: 30px;
      z-index: 9;
      span {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 100%;
        img {
          width: 100%;
        }
      }

    }
    .content_row {
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .friend {
      width: 100%;
      float: left;
      text-align: left;
      clear: both;
      .item {
        display: block;
        li {
          width: 100%;
          overflow: hidden;
          display: flex;
          clear: both;
          margin-bottom: 5px;
          .avatar {
            flex: 0 0 auto;
            width: 45px;
            height: 45px;
            img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
          .cent_body {
            padding-left: 15px;
            padding-right: 35px;
            flex: 1;
            padding-top: 5px;
            text-align: left;
          }
          .des {
            font-size: 12px;
            background-color: #e2e2e2;
            padding: 6px 10px;
            border-radius: 10px;
            position: relative;
            display: inline-block;
            img {
              max-width: 100%;
            }
            &:after {
              content: '';
              position: absolute;
              border: 10px solid transparent;
              border-right-color: #e2e2e2;
              border-top-color: #e2e2e2;
              left: -8px;
              top: 0;
              z-index: -1;
            }
          }
          .on {
            position: relative;
            &:before {
              content: '';
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #9c9c9c;
              z-index: 0;
              left: -8px;
              bottom: 3px;
            }
          }
        }
      }
    }
    .times {
      text-align: center;
      padding: 8px 0 4px;
      overflow: hidden;
      clear: both;
      span {
        display: inline-block;
        color: #999;
        padding: 2px 5px;
        background-color: #f1f1f1;
        border-radius: 4px;
        font-size: 12px;
      }
    }
    .oneself {
      width: 100%;
      float: right;
      text-align: right;
      clear: both;
      .item {
        display: block;
        li {
          width: 100%;
          overflow: hidden;
          display: flex;
          clear: both;
          margin-bottom: 5px;
          .avatar {
            flex: 0 0 auto;
            width: 45px;
            height: 45px;
            img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
          .cent_body {
            padding-left: 35px;
            padding-right: 15px;
            flex: 1;
            padding-top: 5px;
            text-align: right;
          }
          .des {
            font-size: 12px;
            background-color: #a446ff;
            padding: 6px 10px;
            border-radius: 10px;
            position: relative;
            line-height: 1.6;
            display: inline-block;
            color: white;
            &:after {
              content: '';
              position: absolute;
              border: 10px solid transparent;
              border-left-color: #a446ff;
              border-top-color: #a446ff;
              right: -8px;
              top: 0;
              z-index: -1;
            }
          }
          .on {
            position: relative;
            &:before {
              content: '';
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #9618ff;
              z-index: 0;
              right: -8px;
              bottom: 3px;
            }
          }
        }
      }
    }

  }

  .recording {
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    padding: 5px;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
    .recording-voice {
      .voice-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
        .voice-volume {
          width: 30px;
          height: 55px;
          span {
            display: block;
            height: 2px;
            margin-top: 4px;
            min-width: 8px;
            float: left;
            clear: both;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            animation-duration: 2s;
            background-color: #e4e4e5;
            &:first-child {
              width: 24px;
              visibility: hidden;
            }
            &:nth-child(2) {
              width: 22px;
            }
            &:nth-child(3) {
              width: 20px;
            }
            &:nth-child(4) {
              width: 18px;
            }
            &:nth-child(5) {
              width: 16px;
            }
            &:nth-child(6) {
              width: 14px;
            }
            &:nth-child(7) {
              width: 12px;
            }
            &:nth-child(8) {
              width: 10px;
            }
            &:nth-child(9) {
              width: 8px;
            }
          }
        }
        .voice-icon {
          width: 55px;
          height: 90px;
          background: url('../../../common/images/recording-bkg.png') no-repeat 50%;
          background-size: contain;
        }
      }
      p {
        display: block;
        margin: 0 auto;
        width: 100%;
        color: white;
      }
    }
    .recording-cancel {
      .cancel-inner {
        width: 110px;
        height: 110px;
        margin: 0 auto;
        background-image: url('../../../common/images/record-cancel.png');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: contain;
      }
      p {
        border-radius: 3px;
        background-color: #9d383e;
        color: white;
      }
    }
  }
</style>
