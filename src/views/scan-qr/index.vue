<template>
  <div>
    <div class="qrcode mg-auto">
       <qrcode-reader @decode="onDecode" @init="onInit" :paused="paused"/>
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
          title: 'สำเร็จ',
          text: content
        })
        this.playSound()
        await this.setLoading(true)
        await this.getScanQRCodeDocuments(content)
        await this.setLoading(false)
        this.show = false
        this.$router.push({ name: 'scan-qr-item' })
        // await this.setLoading(true)
        // await this.getScanQRCodeDocuments(content)
        // await this.setLoading(false)
        // await this.$router.push({name: 'scan-qr-item'})
      }
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
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
.qrcode{
  width:300px;
  height:300px;
  /* margin-top: 10vh; */
  /* border: 3px solid black; */
}
</style>
