<template>
  <div>
    <div>
       <qrcode-stream @decode="onDecode" @init="onInit" :paused="paused" class="qrcode mg-auto"/>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  data () {
    return {
      paused: false
    }
  },
  components: {
    QrcodeStream
  },
  methods: {
    async onDecode (content) {
      if (content) {
        this.$swal({
          type: 'success',
          title: 'สำเร็จ',
          text: content
        })
        this.playSound()
        await this.delayScan(1000)
      }
    },
    delayScan (timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.paused = false)
        }, timeout)
      })
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
  width:400px;
  height:400px;
  margin-top: 10vh;
  border: 3px solid black;
}
</style>
