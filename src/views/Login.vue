<template>
  <div class="dp-flex">
    <div class="w-60pct-desktop w-60pct-tablet left w-0pct-mobile h-100vh ovf-hidden  jtf-ct-center al-it-center"></div>
    <div class="w-40pct-desktop w-100pct-mobile h-100vh dp-flex jtf-ct-center al-it-center f-drt-column">
      <div class="dp-flex f-drt-column t-al-center">
        <span class="f-s-20px f-w-bold pd-10px">
          Campaign Manangement
        </span>
        <p>
          ระบบจัดการ Campaign ที่เทพที่สุด
        </p>
      </div>
      <div class="dp-flex f-drt-column pd-20px">
        <div class="pd-10px">
          <span>อีเมล* </span>
          <input type="text" class="input" v-model="user.email" placeholder="กรุณาระบุอีเมล">
        </div>
        <div class="pd-10px">
          <span>รหัสผ่าน* </span>
          <input type="password" class="input" v-model="user.password" placeholder="กรุณาระบุรหัสผ่าน">
        </div>
        <div class="pd-10px">
          <div class="button is-primary" @click="sendLogin()">เข้าสู่ระบบ</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    sendLogin () {
      console.log(this.user)
    }
  }
}
</script>
<style scoped>
.left {
  background: linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.05)),url('../assets/login-cover-img.jpg') no-repeat center center;
}
</style>
