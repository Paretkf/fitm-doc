<template>
  <div class="dp-flex">
    <div class="w-60pct-desktop w-60pct-tablet left w-0pct-mobile h-100vh ovf-hidden  jtf-ct-center al-it-center"></div>
    <div class="w-40pct-desktop w-100pct-mobile h-100vh dp-flex jtf-ct-center al-it-center f-drt-column">
      <div class="dp-flex f-drt-column t-al-center">
        <span class="f-s-20px f-w-bold pd-10px">
          FITM Document Tracking
        </span>
        <p>
          ระบบติดตามเอกสารและจัดการงานสารบัญ
        </p>
      </div>
      <div class="dp-flex f-drt-column pd-20px">
        <div class="pd-10px">
          <span>อีเมล* </span>
          <input type="text" class="input" v-model="userLogin.email" placeholder="กรุณาระบุอีเมล">
        </div>
        <div class="pd-10px">
          <span>รหัสผ่าน* </span>
          <input type="password" class="input" v-model="userLogin.password" placeholder="กรุณาระบุรหัสผ่าน">
        </div>
        <div class="pd-5px t-al-right">
          <a class="mg-r-20px cl-danger" @click="forgot()">ลืมรหัสผ่าน*</a>
          <a class="cl-primary" @click="activeModalRegister = true">สมัครสมาชิก</a>
        </div>
        <div class="pd-10px">
          <div class="button w-100pct is-info" @click="sendLogin()">เข้าสู่ระบบ</div>
        </div>
        <div class="pd-10px">
          <div class="button is-google w-100pct" @click="loginWithGoogle()">
            <svg-filler class="mg-r-10px"
                      :path="`/static/svg/google.svg`"
                      :fill="'#ffffff'"
                      width="20px" height="20px"/>
            เข้าสู่ระบบด้วย Google+
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="activeModalRegister" class="t-al-center">
      <Register/>
    </b-modal>
  </div>
</template>
<script>
import Register from '@/components/Register'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Register
  },
  data () {
    return {
      userLogin: {
        email: '',
        password: ''
      },
      activeModalRegister: false
    }
  },
  methods: {
    ...mapActions({
      loginWithGoogle: 'loginWithGoogle',
      login: 'login',
      forgotPassword: 'forgotPassword',
      setLoading: 'style/setLoading'
    }),
    forgot () {
      if (!(/^.+@.+$/.test(this.userLogin.email))) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณากรอก Email ให้ถูกต้อง'
        })
        return
      }
      this.$swal({
        type: 'success',
        title: 'ส่ง Email Reset รหัสผ่านสำเร็จ',
        text: 'กรุณาตรวจสอบ Email ของท่านเพื่อเปลี่ยนรหัสผ่าน'
      })
      this.forgotPassword(this.userLogin.email)
    },
    async sendLogin () {
      this.setLoading(true)
      let result = await this.login(this.userLogin)
      if (result.success === 0) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message
        })
      }
      this.setLoading(false)
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  watch: {
    user (val) {
      if (val.uid) {
        this.$router.push({ name: 'main' })
        this.$toast.open({
          message: 'เข้าสู่ระบบสำเร็จ',
          type: 'is-success'
        })
      }
    }
  }
}
</script>
<style scoped>
.is-google {
  background-color: #ce4231;
  color: #ffffff;
}
.is-google:hover {
  color: #ffffff;
}
.left {
  background: linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.05)),url('../assets/login-cover-img.jpg') no-repeat center center;
}
</style>
