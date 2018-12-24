<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> สถานะเอกสาร </span>
      </div>
    </div>
    <div class="form t-al-left">
      <b-table class="f-s-16px"
              :data="documents"
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

            <b-table-column field="name" label="ลบ" :centered="true" v-if="user.roles === 'root'">
              <svg-filler
                      @click="confirmRemove(props.row)"
                      :path="`/static/svg/trash.svg`"
                      :fill="'#7d8286'"
                      class="cs-pointer"
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
      qr: ''
    }
  },
  computed: {
    ...mapState({
      documents: state => state.documents,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions({
      getDocuments: 'getDocuments',
      setLoading: 'style/setLoading',
      removeDocument: 'removeDocument'
    }),
    docStatus (status) {
      if (status === 'รับเข้า') {
        return 'is-success'
      } else if (status === 'เสนอคณะบดี') {
        return 'is-info'
      } else if (status === 'ติดต่อห้องภาควิชา') {
        return 'is-danger'
      }
    },
    async remove (data) {
      await this.setLoading(true)
      await this.removeDocument(data)
      await this.getDocuments()
      await this.setLoading(false)
      this.$swal({
        type: 'success',
        title: 'สำเร็จ',
        text: 'ลบข้อมูลสำเร็จ'
      })
    },
    confirmRemove (data) {
      this.$dialog.confirm({
        message: `คุณต้องการลบข้อมูลเอกสาร ( <b>${data.name} </b> )นี้หรือไม่`,
        confirmText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        hasIcon: true,
        type: 'is-danger',
        onConfirm: () => this.remove(data)
      })
    }
  },
  async mounted () {
    await this.setLoading(true)
    await this.getDocuments()
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
/* @media print {
    body * {
      visibility: hidden;
    }
    .print-space, .print-space * {
      visibility: visible;
    }
} */
</style>
