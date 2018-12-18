<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> เพิ่ม QR Code ติดเอกสาร </span>
      </div>
    </div>
    <div class="form t-al-left">
      <b-table class="f-s-16px"
              :data="documents"
              :paginated="true"
              :per-page="10"
              :narrowed="true"
              :checked-rows.sync="checkedRows"
              :pagination-simple="false"
              checkable
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
              <li class="tag is-danger">
                {{ props.row.status }}
              </li>
            </b-table-column>

            <b-table-column field="name" label="ลบ" :centered="true">
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
    <div>
      <button class="button is-info w-30pct" @click="genQRCode()">
        สร้าง QR Code
      </button>
      <button class="button is-success w-30pct mg-l-10px"  @click="printQRCode()" :disabled="qr === ''">
         <svg-filler class="mg-r-10px"
                      :path="`/static/svg/print.svg`"
                      :fill="'#ffffff'"
                      width="20px" height="20px"/>
        <span class="f-w-bold">
          พิมพ์
        </span>
      </button>
    </div>
    <div v-if="this.qr !== ''" class="card mg-t-20px w-fit-content mg-auto print-space">
      <img :src="qr">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {generateQRCode} from '@/utils/qr-code'
export default {
  data () {
    return {
      checkedRows: [],
      qr: ''
    }
  },
  computed: {
    ...mapState({
      documents: state => state.documents
    })
  },
  methods: {
    ...mapActions({
      getDocuments: 'getDocuments',
      setLoading: 'style/setLoading',
      removeDocument: 'removeDocument'
    }),
    async genQRCode () {
      if (this.checkedRows.length === 0) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาเอกสารที่ต้องการสร้าง QR Code'
        })
        return
      }
      let msg = ''
      for (let i = 0; i < this.checkedRows.length; i++) {
        msg += this.checkedRows[i].receiveId + ':;:'
      }
      this.qr = await generateQRCode(msg)
    },
    async printQRCode () {
      window.localStorage.setItem('print_item', JSON.stringify(this.checkedRows))
      window.localStorage.setItem('qr', this.qr)
      const routeData = this.$router.resolve({name: 'print-qr-code'})
      window.open(routeData.href, '_blank')
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
