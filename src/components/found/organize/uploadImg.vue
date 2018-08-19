<template>
  <div class="uploadImg">
    <div class="demo-upload-list" v-if="imgList.length !== 0 && !isLoading"  v-for="item in imgList" :key="item.index">
      <span><img :src="item.src" alt=""></span>
      <div class="demo-upload-list-cover">
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </div>
    <div class="demo-upload-img" v-if="isLoading">
      <img src="../../../common/images/loading.gif" alt="">
    </div>
    <div class="uploadFle">
      <input type="file" name="imageFiles[]" multiple class="upload__input" @change="uploadChange($event)"
             accept="image/*">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="md-reverse-camera" size="28"/>
      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations} from 'vuex'

  export default {
    name: "uploadImg",
    props: {
      imgList: {
        type: [Array, Object],
        default: []
      },
      uploadList:{
        type: [Array, Object],
        default: []
      }
    },
    data() {
      return {
        index: 0,
        itemList: [],
        imgNum: 9, //上传的照片数量，可根据实际情况自定义
        sizeM: 1024 * 1024, // 1M
        maxSize: 2, // 最大2M
        isLoading: false,
        isUp: true
      }
    },
    methods: {
      //根据点击上传按钮触发input
      uploadChange(e) {
        this.isLoading = true
        let formData = new FormData();
        let files = e.target.files;
        this.uploadImgNum(this.uploadList.length)
        this.uploadImgNum(files.length)
        for (let i = 0; i < files.length; i++) {
          let item = {
            key: this.index++,
            name: files[i].name,
            size: files[i].size,
            file: files[i]
          };
          let reader = new FileReader()
          reader.onload = (e) => {
            this.$set(item, 'src', e.target.result)
            this.itemList = item
            this.$emit('setImgList', this.itemList)
          };
          reader.readAsDataURL(files[i])
          formData.append('imageFiles[]', files[i]);
          formData.append('type', 'test');
        }
        if (this.isUp) {
          this.uploadImg(formData)
        }
      },
      uploadImg(formData) {
        let obj = {};
        this.$axios.post('/social/self/upload-img', formData)
          .then((res) => {
              if (res.data.code === 2000) {
                obj = res.data.data.url
                this.getUploadList(obj)
                this.isLoading = false
              }
          })
      },
      uploadImgNum(imgNum) {
        if (imgNum > this.imgNum) {
          layer.msg('图片最多可上传9张');
          this.isLoading = false
          this.isUp = false
          return false
        }
      },
      ...mapMutations({
        getUploadList: 'SET_UPLOAD_LIST'
      })
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .uploadImg {
    display: block;
    padding: 10px;
  }

  .uploadFle {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px dashed #b462ff;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    vertical-align: top;
    .upload__input {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }
    .ivu-icon{
      display: block;
      line-height: 58px;
      text-align: center;
      float: none;
    }
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
    vertical-align: top;
  }
  .demo-upload-img{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
    vertical-align: top;
    img{
      display: block;
      margin: 15px auto;
      width: 30px;
      height: 30px;
    }
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .ivu-icon {
    line-height: 58px;
  }
</style>
