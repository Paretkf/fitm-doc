<template>
  <div class="bg-cl-white pd-20px box">
          <b-table class="f-s-16px"
              :data="sendabledusers"
              :paginated="true"
              :per-page="10"
              :narrowed="true"
              :checked-rows.sync="checkedRows"
              :pagination-simple="false"
              checkable
              hoverable>
          <template slot-scope="props">

            <b-table-column field="reveiveId" label="เลือกอีเมลที่ต้องการส่ง" :centered="true">
              {{ props.row.email }}
            </b-table-column>

            <b-table-column field="reveiveId" label="ชื่อที่แสดง" :centered="true">
              {{ props.row.displayName }}
            </b-table-column>

          </template>
      </b-table>
      <div>
        <button class="button is-info w-60pct mg-auto" @click="send()">ส่งเอกสาร</button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      sendabledusers: [],
      checkedRows: []
    }
  },
  methods: {
    ...mapActions({
      setLoading: 'style/setLoading',
      getAllUsers: 'getAllUsers'
    }),
    send () {
      this.$emit('onConfirmUser', this.checkedRows)
      this.$parent.close()
    },
    sendEmail () {}
  },
  computed: {
    ...mapState({
      users: state => state.users
    })
  },
  async mounted () {
    await this.setLoading(true)
    await this.getAllUsers()
    this.sendabledusers = this.users.filter(user => user.roles === 'user')
    await this.setLoading(false)
  }
}
</script>
<style scoped>
</style>
