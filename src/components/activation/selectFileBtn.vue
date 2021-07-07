<template>
  <div class="fileUploadBtn">
    <input type="file" accept="image/*" class="hidden-upload-btn" name="file" id="fileBtn" @change="onChange_fileBtn" title="" ref="fileBtn">
  </div>
</template>

<script>
var picExtList = ['jpeg', 'png', 'jpg']
var fileExtList = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'pdf', 'jpg', 'png', 'jpeg', 'rar', 'zip']
export default {
  name: 'fileUploadBtn',
  props: {
    fileType: {
      type: Array,
      default: () => ['file']
    }
  },
  data () {
    return {
      hasIframe: true,
      isUpload: false
    }
  },
  methods: {
    onChange_fileBtn ($e) {
      if (this.$refs.fileBtn.files.length > 0) {
        var file = this.$refs.fileBtn.files[0]
        var fileName = file.name
        var fileSize = file.size
        var index = file.name.lastIndexOf('.')
        var fileType = fileName.substr(index + 1).toLowerCase()
        fileSize = Math.floor(fileSize / 1048576 * 100) / 100
        if (file) {
          if (fileSize > 10) {
            this.$emit('error', {
              msg: '文件限制大小为10M以内',
              type: fileType
            })
            this.$refs.fileBtn.value = ''
            return
          } else if (this.fileType.length && this.fileType[0] === 'file') {
            // 若是默认file,则按默认预设的file类型过滤
            if (fileExtList.indexOf(fileType) < 0) {
              this.$emit('error', {
                msg: '文件类型不正确，请重新选择',
                type: fileType
              })
              this.$refs.fileBtn.value = ''
              return
            }
          } else if (this.fileType.length && this.fileType[0] === 'image') {
            if (picExtList.indexOf(fileType) < 0) {
              this.$emit('error', {
                msg: '文件类型不正确，请重新选择',
                type: fileType
              })
              this.$refs.fileBtn.value = ''
              return
            }
          }
          this.$emit('file', this.$refs.fileBtn)
          this.$refs.fileBtn.value = ''
        }
      }
    }
  }
}
</script>

<style type="text/css" lang="less" scoped>
.fileUploadBtn {
  overflow: hidden;
  height: 100%;
  width: 100%;
  cursor: pointer;
  input {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
}
.hidden-upload-btn {
  opacity: 0;
}
</style>
