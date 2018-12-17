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
    <div class="item-bottom">
    </div>
  </div>

  <div class="nav-bar" v-else>
    <div class="menu-item cs-pointer" @click="routeTo(m.link, index)" v-for="m in menus" :key="m.link">
      <span :class="isActive(m.page)" class="f-s-13px">
        {{m.text}}
      </span>
    </div>
  </div>
</div>
</template>

<script>
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
          link: 'doc-status',
          page: ['Dashboard'],
          text: 'สถานะเอกสาร',
          icon: '3Status'
        },
        {
          link: 'upload-doc',
          page: ['Dashboard'],
          text: 'เก็บเอกสาร',
          icon: '4folder'
        },
        {
          link: 'find-upload-doc',
          page: ['Dashboard'],
          text: 'สืบค้นเอกสารย้อนหลัง',
          icon: '5search'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    logout () {
      this.setSellsukiAuth('')
      this.setLogout()
      this.firebaseLogout()
      window.location.href = process.env.SELLSUKI_LOGOUT_PORTAL
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
  height: calc(100vh - 90px);
}
.item-bottom {
  width: 100%;
  height: 50px;
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
