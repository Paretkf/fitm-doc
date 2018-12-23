<template>
<div>
  <div class="nav-bar" v-if="!isMobile">
    <div class="group-item">
      <div class="gw-logo t-al-center">
        <img class="cs-pointer" src="/static/img/images/logo.png" alt="" width="" @click="routeTo('main')">
      </div>

      <div class="menu-item cs-pointer" @click="routeTo(menu.link)" v-for="menu in menus" :key="menu.link">
        <span :class="isActive(menu.page)" class="f-s-13px">
          <svg-filler class="mg-r-10px"
                      :path="`/static/svg/${menu.icon}.svg`"
                      :fill="isActive((menu.page)) === 'cl-white' ? colorIconWhite : colorIcon"
                      width="20px" height="20px"/>
          {{menu.text}}
        </span>
      </div>

    </div>
    <div class="item-bottom cl-white cs-pointer" @click="setLogout()">
      ออกจากระบบ
       <svg-filler class="mg-l-10px"
                      :path="`/static/svg/sign-out.svg`"
                      :fill="colorIconWhite"
                      width="20px" height="20px"/>
    </div>
  </div>

  <div class="nav-bar" v-else>
    <div class="menu-item cs-pointer" @click="routeTo(m.link)" v-for="m in menus" :key="m.link">
      <span :class="isActive(m.page)" class="f-s-13px">
        {{m.text}}
      </span>
    </div>
    <div class="menu-item cs-pointer" @click="setLogout()">
      <span class="f-s-13px cl-white cs-pointer">
        ออกจากระบบ
      </span>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'NavBar',
  props: ['isMobile'],
  components: {
  },
  data () {
    return {
      colorIcon: '#989b9e',
      colorIconWhite: '#fff',
      activeModalCheckOut: false,
      activeModalgetDisCount: false,
      menus: [
        {
          link: 'create-doc',
          page: ['create-doc'],
          text: 'เพิ่มเอกสาร',
          icon: 'file'
        },
        {
          link: 'gen-qr',
          page: ['gen-qr'],
          text: 'สร้าง QR Code',
          icon: '2qrcode'
        },
        {
          link: 'scan-qr-code',
          page: ['scan-qr-code'],
          text: 'สแกน QR Code',
          icon: '2qrcode'
        },
        {
          link: 'document-status',
          page: ['document-status'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        },
        {
          link: 'save-document',
          page: ['save-document'],
          text: 'สืบค้นเอกสารย้อนหลัง',
          icon: '5search'
        },
        {
          link: 'manage-user',
          page: ['manage-user'],
          text: 'จัดการผู้ใช้',
          icon: 'users-solid'
        }
      ]
    }
  },
  mounted () {
    if (this.user.roles === 'admin1') {
      this.menus = [
        {
          link: 'create-doc',
          page: ['create-doc'],
          text: 'เพิ่มเอกสาร',
          icon: 'file'
        },
        {
          link: 'gen-qr',
          page: ['gen-qr'],
          text: 'สร้าง QR Code',
          icon: '2qrcode'
        },
        {
          link: 'document-status',
          page: ['document-status'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        }
      ]
    } else if (this.user.roles === 'admin2') {
      this.menus = [
        {
          link: 'scan-qr-code',
          page: ['scan-qr-code'],
          text: 'สแกน QR Code',
          icon: '2qrcode'
        },
        {
          link: 'document-status',
          page: ['document-status'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        }
      ]
    } else if (this.user.roles === 'admin3') {
      this.menus = [
        {
          link: 'scan-qr-code',
          page: ['scan-qr-code'],
          text: 'สแกน QR Code',
          icon: '2qrcode'
        },
        {
          link: 'document-status',
          page: ['document-status'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        },
        {
          link: 'save-document',
          page: ['save-document'],
          text: 'สืบค้นเอกสารย้อนหลัง',
          icon: '5search'
        }
      ]
    } else if (this.user.roles === 'root') {
      this.menus = [
        {
          link: 'manage-user',
          page: ['manage-user'],
          text: 'จัดการผู้ใช้',
          icon: 'users-solid'
        },
        {
          link: 'document-status',
          page: ['document-status'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        }
      ]
    } else if (this.user.roles === 'user') {
      this.menus = [
        {
          link: 'document-status',
          page: ['document-status'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        }
      ]
    }
  },
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
    },
    isActive (menu) {
      if (Array.isArray(menu)) {
        return menu.find(item => item === this.$route.name) ? 'cl-white' : ''
      } else {
        return menu === this.$route.name ? 'cl-white' : ''
      }
    },
    routeTo (name) {
      this.$emit('onChangeRoute')
      this.$router.push({ name: name })
    }
  }
}
</script>

<style scoped>
* {
  user-select: none;
}
.nav-bar {
  padding: 20px;
  background-color: #2a323b;
}
.gw-logo {
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #202327;
}
.menu-item {
  font-size: 13px;
  padding-top: 20px;
  width: 100%;
  height: 50px;
  color: #989b9e;
}
.group-item {
  height: calc(100vh - 60px);
}
.item-bottom {
  width: 100%;
  height: 20px;
}
.user-img {
  width: 33px;
  height: 33px;
  border-radius: 25%;
}
.store-name {
  font-size: 16px;
  color: #989b9e;
}
.user-name {
  font-size: 12px;
  color: #989b9e;
}
.a{
  /* color: #fff; */
  font-weight: bold;
}
</style>
