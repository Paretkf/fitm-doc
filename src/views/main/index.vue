<template>
  <div class="">
    <div class="box column is-6 f-s-14px-mobile">
     <img :src="user.photoURL ? user.photoURL : 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png'" alt="" class="user-img">
      <table class="table mg-auto">
        <tr>
          <th>อีเมล</th>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <th>ชื่อแสดงผล</th>
          <td v-if="user.displayName">{{ user.displayName }}</td>
          <td v-else>{{ user.email }}</td>
        </tr>
        <tr>
          <th>สิทธื์การเข้าถึง</th>
          <td>{{ user.roles }}</td>
        </tr>
        <tr>
          <td colspan="2">
             <div class="cl-white bg-cl-black f-w-bold cs-pointer t-al-center mg-auto pd-vtc-5px pd-hrzt-2px" @click="setLogout()"> ออกจากระบบ </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    setLogout () {
      this.logout()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
<style scoped>
.user-img {
  border-radius: 20%;
  width: 60%;
}
</style>
