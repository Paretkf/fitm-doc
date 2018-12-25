<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> จัดการผู้ใช้ </span>
      </div>
    </div>
    <div class="form t-al-left">
      <b-table class="f-s-16px"
              :data="users"
              :paginated="true"
              :per-page="5"
              :narrowed="true"
              :pagination-simple="false"
              hoverable>
          <template slot-scope="props">
            <b-table-column field="index" label="รูป" :centered="true">
              <img :src="props.row.photoURL ? props.row.photoURL : 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png'"
                    alt=""
                    width="50">
            </b-table-column>
            <b-table-column field="email" label="อีเมล" :centered="true">
              {{ props.row.email }}
            </b-table-column>
            <b-table-column field="displayName" label="ชื่อที่แสดงผล" :centered="true">
              {{ props.row.displayName }}
            </b-table-column>
            <b-table-column field="roles" label="สิทธิการเข้าถึง" :centered="true">
              {{ props.row.roles }}
            </b-table-column>
            <b-table-column field="roles" label="id" :centered="true">
              {{ props.row.firebaseId }}
            </b-table-column>

            <b-table-column field="edit" label="กำหนดสิทธิเป็น" :centered="true">
              <b-dropdown position="is-bottom-left" class="" v-if="props.row.roles !== 'root'">
                  <svg-filler class="mg-r-10px cs-pointer"
                    :path="`/static/svg/ellipsis.svg`"
                    :fill="'#989b9e'"
                    slot="trigger"
                    width="20px" height="20px"/>
                <b-dropdown-item v-if="props.row.roles !== 'admin1'"
                                  @click="confirmChangeRoles('admin1', props.row)">admin1</b-dropdown-item>
                <b-dropdown-item v-if="props.row.roles !== 'admin2'"
                                  @click="confirmChangeRoles('admin2', props.row)">admin2</b-dropdown-item>
                <b-dropdown-item v-if="props.row.roles !== 'admin3'"
                                  @click="confirmChangeRoles('admin3', props.row)">admin3</b-dropdown-item>
                <b-dropdown-item v-if="props.row.roles !== 'user'"
                                  @click="confirmChangeRoles('user', props.row)">user</b-dropdown-item>
                <!-- <b-dropdown-item v-if="props.row.roles !== 'root'"
                                  @click="confirmChangeRoles('root', props.row)">root</b-dropdown-item> -->
              </b-dropdown>
            </b-table-column>
            <b-table-column field="name" label="ลบ" :centered="true">
              <svg-filler
                      @click="confirmRemove(props.row)"
                      :path="`/static/svg/trash.svg`"
                      :fill="'#7d8286'"
                      class="cs-pointer"
                      v-if="props.row.roles !== 'root'"
                      width="20px" height="20px"/>
            </b-table-column>

          </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      users: state => state.users
    })
  },
  methods: {
    ...mapActions({
      getAllUsers: 'getAllUsers',
      changeRoles: 'changeRoles',
      removeUser: 'removeUser',
      setLoading: 'style/setLoading'
    }),
    async change (roles, user) {
      await this.setLoading(true)
      await this.changeRoles({
        firebaseId: user.firebaseId,
        roles: roles
      })
      await this.getAllUsers()
      await this.setLoading(false)
    },
    async remove (user) {
      await this.setLoading(true)
      await this.removeUser(user.firebaseId)
      await this.getAllUsers()
      await this.setLoading(false)
    },
    confirmRemove (data) {
      this.$dialog.confirm({
        message: `คุณต้องการลบข้อมูลผู้ใช้ ( <b>${data.email} </b> )นี้หรือไม่`,
        confirmText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => this.remove(data)
      })
    },
    confirmChangeRoles (roles, user) {
      this.$dialog.confirm({
        message: `คุณต้องการตั้ง <b>${user.email} </b> เป็น <b>${roles} </b> นี้หรือไม่`,
        confirmText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        hasIcon: true,
        type: 'is-warning',
        onConfirm: () => this.change(roles, user)
      })
    }
  },
  async mounted () {
    await this.setLoading(true)
    await this.getAllUsers()
    await this.setLoading(false)
  }
}
</script>
<style scoped>
@media screen and (max-width: 600px) {
  .page-title {
    display: none;
  }
}
.page-title {
  font-size: 2vw;
}
</style>
