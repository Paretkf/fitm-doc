<template>
  <div class="">
    <div class="dp-flex jtf-ct-space-between pd-vtc-30px">
      <div>
        <span class="page-title is-paddingless is-marginless"> เพิ่ม QR Code ติดเอกสาร </span>
      </div>
    </div>
    <div class="form t-al-left">
      <b-table class=""
              :data="documents"
              :paginated="true"
              :per-page="10"
              :checked-rows.sync="checkedRows"
              :pagination-simple="false"
              checkable
              hoverable>
          <template slot-scope="props">

            <b-table-column field="reveiveId" label="เลขที่ได้รับ" :centered="true">
              {{ props.row.receiveId }}
            </b-table-column>

            <b-table-column field="name" label="เรื่อง" :centered="true">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="name" label="สถานะ" :centered="true">
              <li class="tag is-medium is-danger">
                {{ props.row.status }}
              </li>
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
      documentData: [
        {
          reveiveId: '12341-1',
          name: 'Lorem ipsum dolor sit amet, consectetur',
          status: 'รับเข้า'
        },
        {
          reveiveId: '12341-1',
          name: 'Lorem ipsum dolor sit amet, consectetur',
          status: 'รับเข้า'
        },
        {
          reveiveId: '12341-1',
          name: 'Lorem ipsum dolor sit amet, consectetur',
          status: 'รับเข้า'
        },
        {
          reveiveId: '12341-1',
          name: 'Lorem ipsum dolor sit amet, consectetur',
          status: 'รับเข้า'
        },
        {
          reveiveId: '12341-1',
          name: 'Lorem ipsum dolor sit amet, consectetur',
          status: 'รับเข้า'
        },
        {
          reveiveId: '12341-1',
          name: 'Lorem ipsum dolor sit amet, consectetur',
          status: 'รับเข้า'
        }
      ],
      checkedRows: []
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
      setLoading: 'style/setLoading'
    })
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
