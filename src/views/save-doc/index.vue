<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between">
      <div>
        <span class="page-title is-paddingless is-marginless"> จัดเก็บเอกสาร </span>
      </div>
      <div>
        <div class="button add-btn" @click="activeModalCreate = true">เพิ่ม</div>
        <input class="search-input pd-5px" type="text" v-model="search"  placeholder="คีย์เวิร์ดสำหรับการค้นหา">
      </div>
    </div>
    <div class="pd-vtc-20px">
      <b-table class="f-s-16px"
              :data="filterDocuments"
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

             <b-table-column field="name" label="ลงวันที่" :centered="true">
              {{ props.row.date }}
            </b-table-column>

            <b-table-column field="name" label="จาก - ถึง" :centered="true">
              {{ props.row.from }} - {{ props.row.to }}
            </b-table-column>

            <b-table-column field="name" label="ดูข้อมูลเอกสาร" :centered="true">
              <a :href="props.row.dowloadUrl" target="_blank">ดูข้อมูลเอกสาร</a>
            </b-table-column>

          </template>
      </b-table>
    </div>
    <b-modal :active.sync="activeModalCreate" class="t-al-center">
      <Create/>
    </b-modal>
  </div>
</template>
<script>
import Create from './Create'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Create
  },
  data () {
    return {
      activeModalCreate: false,
      search: ''
    }
  },
  computed: {
    ...mapState({
      backupDocuments: state => state.backupDocuments
    }),
    filterDocuments () {
      return this.backupDocuments.filter(doc => {
        return (doc.name).includes(this.search) || doc.date.includes(this.search)
      })
    }
  },
  methods: {
    ...mapActions({
      getBackUpDocuments: 'getBackUpDocuments',
      setLoading: 'style/setLoading'
    })
  },
  async mounted () {
    await this.setLoading(true)
    await this.getBackUpDocuments()
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
.search-input {
  width: 60%;
  height: 36px;
  border-radius: 3px;
  border: solid 1px #d2d2d2;
}
.add-btn {
  width: 25%;
  color: #ffffff;
  background-color: #1480e2;
}
</style>
