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
            <!-- <b-input v-model="newDocument.receiveId" placeholder="เลขที่ได้รับ"></b-input> -->
            <b-autocomplete
                v-model="newDocument.receiveId"
                :data="filteredReceiveIdArray"
                placeholder="เลขที่ได้รับ"
                @select="option => selected = option">
                {{filteredReceiveIdArray}}
            </b-autocomplete>
          </b-field>
        </div>
        <div class="column">
          <b-field label="เลขที่เอกสาร*">
           <!-- <b-input v-model="newDocument.documentId" placeholder="เลขที่เอกสาร"></b-input> -->
            <b-autocomplete
                v-model="newDocument.documentId"
                :data="filtereDocumentIdArray"
                placeholder="เลขที่เอกสาร"
                @select="option => selected = option">
                {{filtereDocumentIdArray}}
            </b-autocomplete>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="จาก*">
            <!-- <b-input v-model="newDocument.from" placeholder="จาก"></b-input> -->
            <b-autocomplete
                v-model="newDocument.from"
                :data="filteredFromArray"
                placeholder="จาก"
                @select="option => selected = option">
                {{filteredFromArray}}
            </b-autocomplete>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="mg-bt-8px">
            <a class="cl-info" @click="activeModalSendDoc = true">เลือกผู้ใช้ที่ต้องการส่งถึง*</a>
          </div>
          <ul>
            <li v-for="(data, index) in checkedRows" :key="data.firebaseId">
              {{index + 1}}. {{data.displayName}} ({{data.email}})
            </li>
          </ul>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="เรื่อง*">
            <!-- <b-input v-model="newDocument.name" placeholder="เรื่อง"></b-input> -->
            <b-autocomplete
                v-model="newDocument.name"
                :data="filteredNameArray"
                placeholder="เรื่อง"
                @select="option => selected = option">
                {{filteredNameArray}}
            </b-autocomplete>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="การปฏิบัติ">
            <!-- <b-input v-model="newDocument.work" placeholder="การปฏิบัติ"></b-input> -->
            <b-autocomplete
                v-model="newDocument.work"
                :data="filteredWorkArray"
                placeholder="การปฏิบัติ"
                @select="option => selected = option">
                {{filteredWorkArray}}
            </b-autocomplete>
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
      <b-modal :active.sync="activeModalSendDoc" class="t-al-center">
        <SendDocument @onConfirmUser="confirmUser"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SendDocument from './SendDocument'
import moment from 'moment'
export default {
  components: {
    SendDocument
  },
  data () {
    return {
      checkedRows: [],
      activeModalSendDoc: false,
      monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤษจิกายน', 'ธันวาคม'],
      dayNames: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
      newDocument: {
        user: '',
        receiveDate: null,
        date: null,
        receiveId: '',
        documentId: '',
        from: '',
        to: [],
        name: '',
        work: '',
        status: 'รับเข้า',
        note: 'ปกติ'
      }
    }
  },
  methods: {
    ...mapActions({
      createDocument: 'createDocument',
      getDocuments: 'getDocuments',
      setLoading: 'style/setLoading'
    }),
    confirmUser (value) {
      this.checkedRows = value
    },
    dateFormat (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    async add () {
      if (this.checkedRows.length !== 0) {
        this.newDocument.to = this.checkedRows.map(row => { return {email: row.email, name: row.displayName} })
      }
      const isvalid = this.validateData()
      if (!isvalid) {
        return
      }
      await this.setLoading(true)
      await this.createDocument(this.newDocument)
      await this.getDocuments()
      await this.setLoading(false)
      await this.$swal({
        type: 'success',
        title: 'สำเร็จ',
        text: 'เพิ่มข้อมูลสำเร็จ'
      })
      this.checkedRows = []
      this.newDocument = {
        user: '',
        receiveDate: null,
        date: null,
        receiveId: '',
        documentId: '',
        from: '',
        to: [],
        name: '',
        work: '',
        status: 'รับเข้า',
        note: 'ปกติ'
      }
    },
    validateData () {
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
      if (this.newDocument.to.length === 0) {
        this.$swal({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เลิกผู้ใช้ที่ต้องการส่งถึง'
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
  },
  computed: {
    ...mapGetters({
      receiveIdArray: 'receiveIdArray',
      documentIdArray: 'documentIdArray',
      fromArray: 'fromArray',
      nameArray: 'nameArray',
      toArray: 'toArray',
      workArray: 'workArray'
    }),
    filteredReceiveIdArray () {
      return this.receiveIdArray.filter(doc => {
        return doc
          .toString()
          .toLowerCase()
          .indexOf(this.newDocument.receiveId.toLowerCase()) >= 0
      })
    },
    filtereDocumentIdArray () {
      return this.documentIdArray.filter(doc => {
        return doc
          .toString()
          .toLowerCase()
          .indexOf(this.newDocument.documentId.toLowerCase()) >= 0
      })
    },
    filteredFromArray () {
      return this.fromArray.filter(doc => {
        return doc
          .toString()
          .toLowerCase()
          .indexOf(this.newDocument.from.toLowerCase()) >= 0
      })
    },
    filteredToArray () {
      return this.toArray.filter(doc => {
        return doc
          .toString()
          .toLowerCase()
          .indexOf(this.newDocument.to.toLowerCase()) >= 0
      })
    },
    filteredNameArray () {
      return this.nameArray.filter(doc => {
        return doc
          .toString()
          .toLowerCase()
          .indexOf(this.newDocument.name.toLowerCase()) >= 0
      })
    },
    filteredWorkArray () {
      return this.workArray.filter(doc => {
        return doc
          .toString()
          .toLowerCase()
          .indexOf(this.newDocument.work.toLowerCase()) >= 0
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
</style>
