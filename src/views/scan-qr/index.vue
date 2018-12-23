<template>
  <div>
    <div class="list-item">
      <div class="mg-auto w-fit-content h-fit-content t-al-center ">
       <qrcode-reader @decode="onDecode" :paused="paused" class="qrcode">
        </qrcode-reader>
       </div>
    </div>
  </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      paused: false,
      show: true
    }
  },
  components: {
    QrcodeReader
  },
  methods: {
    ...mapActions({
      setScanQRCodeText: 'setScanQRCodeText',
      getScanQRCodeDocuments: 'getScanQRCodeDocuments',
      setLoading: 'style/setLoading'
    }),
    async onDecode (content) {
      if (content) {
        this.$swal({
          type: 'success',
          title: 'สำเร็จ'
        })
        this.playSound()
        await this.setLoading(true)
        await this.getScanQRCodeDocuments(content)
        await this.setLoading(false)
        this.show = false
        this.$router.push({ name: 'scan-qr-item' })
      }
    },
    playSound () {
      let audio = new Audio(require('@/assets/sound/tid.mp3'))
      audio.play()
    }
  }
}
</script>

<style scoped>
/* .list-item {
  overflow: auto;
  height: 100vh;
} */
.qrcode{
  width: 30vw;
  height: auto;
}
@media screen and (max-width: 600px) {
 .qrcode{
    width: 50vw;
    height: auto;
  }
}
/* .list-item {
  overflow: auto;
  height: calc(100vh - 60px);
}
.qrcode{
  width:300px;
  height:300px;
  border: 3px solid black;
} */
</style>
