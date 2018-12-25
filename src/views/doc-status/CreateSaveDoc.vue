<template>
  <div class="bg-cl-white pd-20px box">
    <div class="form t-al-left">

      <div class="columns">
        <div class="column">
          <b-field label="วันที่ได้รับ*">
            <b-datepicker
              placeholder="เลือกวันที่ได้รับเอกสาร"
              :month-names="monthNames"
              :day-names="dayNames"
              v-model="newDocument.receiveDate"
              :date-formatter="(date) => { return dateFormat(date) }">
            </b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="ลงวันที่*">
            <b-datepicker
              placeholder="ลงวันที่เอกสาร"
              :month-names="monthNames"
              :day-names="dayNames"
              v-model="newDocument.date"
              :date-formatter="(date) => { return dateFormat(date) }">
            </b-datepicker>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="เลขที่ได้รับ*">
            <b-input v-model="newDocument.receiveId" placeholder="เลขที่ได้รับ"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="เลขที่เอกสาร*">
           <b-input v-model="newDocument.documentId" placeholder="เลขที่เอกสาร"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="จาก*">
            <b-input v-model="newDocument.from" placeholder="จาก"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="เรื่อง*">
            <b-input v-model="newDocument.name" placeholder="เรื่อง"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="การปฏิบัติ">
            <b-input v-model="newDocument.work" placeholder="การปฏิบัติ"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field class="file">
            <!-- accept="application/pdf" -->
            <b-upload v-model="newDocument.file" accept="application/pdf">
                <a class="button is-primary">
                    <b-icon icon="upload"></b-icon>
                    <span>Click to upload</span>
                </a>
            </b-upload>
            <span class="file-name" v-if="newDocument.file.length !== 0">
                {{ newDocument.file.name }}
            </span>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column dp-flex jtf-ct-center">
         <button class="button is-info w-60pct mg-auto" @click="add()">เพิ่มข้อมูล</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { formatDate } from '@/utils/date'
import moment from 'moment'
export default {
  props: ['doc'],
  data () {
    return {
      monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤษจิกายน', 'ธันวาคม'],
      dayNames: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
      newDocument: {
        receiveDate: null,
        date: null,
        user: '',
        receiveId: '',
        documentId: '',
        from: '',
        name: '',
        work: '',
        file: []
      }
    }
  },
  mounted () {
    this.newDocument.receiveDate = formatDate(this.doc.receiveDate)
    this.newDocument.date = formatDate(this.doc.date)
    this.newDocument.receiveId = this.doc.receiveId
    this.newDocument.documentId = this.doc.documentId
    this.newDocument.from = this.doc.from
    this.newDocument.name = this.doc.name
    this.newDocument.work = this.doc.work
  },
  methods: {
    ...mapActions({
      createSaveDocument: 'createSaveDocument',
      getBackUpDocuments: 'getBackUpDocuments',
      setLoading: 'style/setLoading'
    }),
    dateFormat (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    async add () {
      const isvalid = this.validateData()
      if (!isvalid) {
        return
      }
      this.setLoading(true)
      await this.createSaveDocument(this.newDocument)
      await this.getBackUpDocuments()
      this.setLoading(false)
      await this.$swal({
        type: 'success',
        title: 'สำเร็จ',
        text: 'เพิ่มข้อมูลสำเร็จ'
      })
      this.newDocument = {
        user: '',
        receiveDate: null,
        date: null,
        receiveId: '',
        documentId: '',
        from: '',
        to: '',
        name: '',
        work: '',
        file: {}
      }
    },
    validateData () {
      if (this.newDocument.file.length === 0) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาเพิ่มไฟล์เพื่ออัพโหลด'
        })
        return false
      }
      if (this.newDocument.receiveDate === null) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาเลือกวันที่รับเข้า'
        })
        return false
      }
      if (this.newDocument.date === null) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาลงวันที่'
        })
        return false
      }
      if (this.newDocument.receiveId === '') {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาเพิ่มเลขที่ได้รับ'
        })
        return false
      }
      if (this.newDocument.documentId === '') {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาเพิ่มเลขที่เอกสาร'
        })
        return false
      }
      if (this.newDocument.from === '') {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เพิ่มฟิลด์นี้ (จาก)'
        })
        return false
      }
      if (this.newDocument.name === '') {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาเพิ่มชื่อ เรื่อง เอกสาร'
        })
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
</style>
