<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> เปลี่ยนสถานะเอกสาร </span>
      </div>
    </div>
    <div class="form t-al-left">
      <b-table class="f-s-16px"
              :data="scanQRCodeDocuments"
              :paginated="true"
              :per-page="10"
              :narrowed="true"
              :pagination-simple="false"
              hoverable>
          <template slot-scope="props">
            <b-table-column field="reveiveId" label="ลำดับ" :centered="true">
              {{ props.index + 1 }}
            </b-table-column>

            <b-table-column field="reveiveId" label="เลขที่ได้รับ" :centered="true">
              {{ props.row.receiveId }}
            </b-table-column>

            <b-table-column field="name" label="เรื่อง" :centered="true">
              {{ props.row.name }}
            </b-table-column>

             <b-table-column field="name" label="วันที่ได้รับ" :centered="true">
              {{ props.row.receiveDate }}
            </b-table-column>

            <b-table-column field="name" label="จาก - ถึง" :centered="true">
              {{ props.row.from }} - {{ props.row.to }}
            </b-table-column>

            <b-table-column field="name" label="สถานะ" :centered="true">
              <li class="tag" :class="docStatus(props.row.status)">
                {{ props.row.status }}
              </li>
            </b-table-column>

          </template>
      </b-table>
    </div>
    <div v-if="scanQRCodeDocuments[0].status === 'รับเข้า'">
      <button class="w-60pct button is-info" @click="changeStatusAdmin2()">เสนอคณะบดี</button>
    </div>
    <div v-else-if="scanQRCodeDocuments[0].status === 'เสนอคณะบดี'">
      <button class="w-60pct button is-info" @click="changeStatusAdmin3()">ติดต่อห้องภาควิชา</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      checkedRows: [],
      qr: ''
    }
  },
  computed: {
    ...mapState({
      scanQRCodeDocuments: state => state.scanQRCodeDocuments
    })
  },
  methods: {
    ...mapActions({
      getScanQRCodeDocuments: 'getScanQRCodeDocuments',
      setLoading: 'style/setLoading',
      changeStatusDocument: 'changeStatusDocument'
    }),
    async changeStatusAdmin2 () {
      await this.setLoading(true)
      await this.changeStatusDocument({
        status: 'เสนอคณะบดี',
        data: this.scanQRCodeDocuments
      })
      await this.setLoading(false)
      this.$swal({
        type: 'success',
        title: 'สำเร็จ'
      })
      this.$router.push({ name: 'document-status' })
    },
    async changeStatusAdmin3 () {
      await this.setLoading(true)
      await this.changeStatusDocument({
        status: 'ติดต่อห้องภาควิชา',
        data: this.scanQRCodeDocuments
      })
      await this.setLoading(false)
      this.$swal({
        type: 'success',
        title: 'สำเร็จ'
      })
      this.$router.push({ name: 'document-status' })
    },
    docStatus (status) {
      if (status === 'รับเข้า') {
        return 'is-success'
      } else if (status === 'เสนอคณะบดี') {
        return 'is-info'
      } else if (status === 'ติดต่อห้องภาควิชา') {
        return 'is-danger'
      }
    }
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
