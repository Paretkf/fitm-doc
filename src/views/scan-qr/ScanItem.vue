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
              <li class="tag is-danger">
                {{ props.row.status }}
              </li>
            </b-table-column>

            <b-table-column field="name" label="เสนอคณะบดี" :centered="true">
             <button>
               เสนอคณะบดี
             </button>
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
      setLoading: 'style/setLoading'
    })
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
