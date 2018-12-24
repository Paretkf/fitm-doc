<template>
  <div class="bg-cl-white pd-20px box">
          <b-table class="f-s-16px"
              :data="sendabledusers"
              :paginated="true"
              :per-page="10"
              :narrowed="true"
              :checked-rows.sync="checkedRows"
              :pagination-simple="false"
              :is-row-checkable="(row) => checkUser(row)"
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
  props: ['document'],
  data () {
    return {
      checkedRows: [],
      sendabledusers: []
    }
  },
  methods: {
    ...mapActions({
      setLoading: 'style/setLoading',
      getAllUsers: 'getAllUsers',
      getBackUpDocuments: 'getBackUpDocuments',
      setDocInUser: 'setDocInUser',
      setUserInDoc: 'setUserInDoc'
    }),
    checkUser (user) {
      if (this.document.users) {
        return this.document.users.findIndex(u => u === user.email) === -1
      } else {
        return true
      }
    },
    async send () {
      await this.setLoading(true)
      await this.setDocInUser({
        user: this.checkedRows,
        document: this.document
      })
      await this.setUserInDoc({
        user: this.checkedRows,
        document: this.document
      })
      await this.getBackUpDocuments()
      await this.setLoading(false)
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
