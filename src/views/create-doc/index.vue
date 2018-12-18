<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> เพิ่มเอกสาร </span>
      </div>
    </div>
    <div class="form t-al-left">

      <div class="columns">
        <div class="column">
          <b-field label="วันที่ได้รับ*">
            <b-datepicker
              placeholder="เลือกวันที่ได้รับเอกสาร"
              v-model="newDocument.receiveDate"
              :date-formatter="(date) => { return dateFormat(date) }">
            </b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="ลงวันที่*">
            <b-datepicker
              placeholder="ลงวันที่เอกสาร"
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
        <div class="column">
          <b-field label="ถึง*">
           <b-input v-model="newDocument.to" placeholder="ถึง"></b-input>
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
          <b-field label="สถานะ">
            <b-input v-model="newDocument.status" placeholder="สถานะ" disabled></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="หมายเหตุ">
            <b-select placeholder="Select a name"
                      class="w-100pct"
                      v-model="newDocument.note"
                      expanded>
                <option value="ปกติ">
                    ปกติ
                </option>
                <option value="ด่วน">
                    ด่วน
                </option>
                <option  value="ด่วนที่สุด">
                    ด่วนที่สุด
                </option>
            </b-select>
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
import moment from 'moment'
export default {
  data () {
    return {
      newDocument: {
        user: '',
        receiveDate: null,
        date: null,
        receiveId: '',
        documentId: '',
        from: '',
        to: '',
        name: '',
        work: '',
        status: 'รับเข้า',
        note: 'ปกติ'
      }
    }
  },
  methods: {
    ...mapActions({
      createDocument: 'createDocument'
    }),
    dateFormat (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    async add () {
      const isvalid = this.validateData()
      if (!isvalid) {
        return
      }
      await this.createDocument(this.newDocument)
      this.$swal({
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
        status: 'รับเข้า',
        note: 'ปกติ'
      }
    },
    validateData () {
      console.log(this.newDocument)
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
      if (this.newDocument.to === '') {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เพิ่มฟิลด์นี้ (ถึง)'
        })
        return false
      }
      return true
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
