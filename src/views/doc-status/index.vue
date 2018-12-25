<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> สถานะเอกสาร </span>
      </div>
      <div>
        <b-select placeholder="เลือกสถานะ" v-model="selectedFilter">
          <option :value="'ทั้งหมด'">ทั้งหมด</option>
          <option :value="'รับเข้า'">รับเข้า</option>
          <option :value="'เสนอคณบดี'">เสนอคณบดี</option>
          <option :value="'ติดต่อห้องภาควิชา'">ติดต่อห้องภาควิชา</option>
        </b-select>
      </div>
    </div>
    <div class="form t-al-left">
      <b-table class="f-s-14px"
              :data="filteredDocument"
              :paginated="true"
              :per-page="10"
              :narrowed="true"
              :pagination-simple="false"
              hoverable>
          <template slot-scope="props">
            <b-table-column field="index" label="ลำดับ" :centered="true">
              {{ props.index + 1 }}
            </b-table-column>

            <b-table-column field="receiveId" label="เลขที่ได้รับ" :centered="true" sortable>
              {{ props.row.receiveId }}
            </b-table-column>

            <b-table-column field="name" label="เรื่อง" :centered="true" sortable>
              {{ props.row.name }}
            </b-table-column>

             <b-table-column field="receiveDate" label="วันที่ได้รับ" :centered="true" sortable>
              {{ props.row.receiveDate }}
            </b-table-column>

            <b-table-column field="from" label="จาก - ถึง" :centered="true" v-if="user.roles !== 'user'">
              {{ props.row.from }} - <li class="tag is-dark cs-pointer" @click="show(props.row.to)">{{ props.row.to.length }}</li>
            </b-table-column>

            <b-table-column field="from" label="จาก" :centered="true" v-else>
              {{ props.row.from }}
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
            <b-table-column field="name" label="บันทึกเอกสาร" :centered="true" v-if="user.roles === 'admin3'">
              <svg-filler
                      :path="`/static/svg/save.svg`"
                      :fill="'#7d8286'"
                      class="cs-pointer"
                      v-if="props.row.status === 'ติดต่อห้องภาควิชา'"
                      @click="saveDoc(props.row)"
                      width="20px" height="20px"/>
              <!-- mail-bulk -->
            </b-table-column>
          </template>
      </b-table>
    </div>
    <b-modal :active.sync="activeModalSaveDoc" class="t-al-center">
      <Create :doc="selectedDoc"/>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Create from './CreateSaveDoc'
export default {
  components: {
    Create
  },
  data () {
    return {
      qr: '',
      selectedFilter: 'ทั้งหมด',
      showDocument: [],
      activeModalSaveDoc: false,
      selectedDoc: {}
    }
  },
  computed: {
    ...mapState({
      documents: state => state.documents,
      user: state => state.user
    }),
    filteredDocument () {
      if (this.selectedFilter !== 'ทั้งหมด') {
        return this.showDocument.filter(doc => doc.status === this.selectedFilter)
      } else {
        return this.showDocument
      }
    }
  },
  methods: {
    ...mapActions({
      getDocuments: 'getDocuments',
      setLoading: 'style/setLoading',
      removeDocument: 'removeDocument'
    }),
    saveDoc (data) {
      this.activeModalSaveDoc = true
      this.selectedDoc = data
    },
    show (data) {
      let msg = ''
      for (let index = 0; index < data.length; index++) {
        msg += `<b>${index + 1}. ${data[index].name}</b><br> (${data[index].email})<br>`
      }
      this.$dialog.alert({
        message: msg,
        type: 'is-info'
      })
    },
    checkUser (c) {
      if (this.user.roles === 'user') {
        if (c.to.findIndex(d => d === this.user.email) === -1) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    docStatus (status) {
      if (status === 'รับเข้า') {
        return 'is-success'
      } else if (status === 'เสนอคณบดี') {
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
      await this.$swal({
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
    if (this.user.roles === 'user') {
      this.showDocument = this.documents.filter(c => c.to.findIndex(d => d.email === this.user.email) !== -1)
    } else {
      this.showDocument = this.documents
    }
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
