<template>
  <div class="bg-cl-white pd-20px box">
    <div class="form t-al-left">

      <div class="columns">
        <div class="column">
          <b-field label="Email">
            <b-input v-model="newUser.email" placeholder="ใส่ Email ของคุณที่นี่"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="รหัสผ่าน">
            <b-input v-model="newUser.password" type="password" placeholder="Password"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="กรอกรหัสผ่านอีกครั้ง">
            <b-input v-model="newUser.rePassword" type="password" placeholder="Re-Password"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column dp-flex jtf-ct-center">
         <button class="button is-info w-60pct mg-auto" @click="add()">สมัครสมาชิก</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      newUser: {
        email: '',
        password: '',
        rePassword: ''
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'register',
      setLoading: 'style/setLoading'
    }),
    async add () {
      if (this.newUser.password !== this.newUser.rePassword) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณากรอกรหัสผ่านให้ตรงกัน'
        })
        return
      }
      if (!(/^.+@.+$/.test(this.newUser.email))) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณากรอก Email ให้ถูกต้อง'
        })
        return
      }
      if (this.newUser.password === '') {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณากรอกรหัสผ่าน'
        })
        return
      }
      this.setLoading(true)
      let result = await this.register(this.newUser)
      if (result.success) {
        this.$swal({
          type: 'success',
          title: 'สำเร็จ',
          text: 'สมัครสมาชิกสำเร็จ'
        })
      } else {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message
        })
      }
      this.setLoading(false)
    }
  }
}
</script>
