<template>
  <div size="A4" class="printed dp-flex">
    <div class="item w-fit-content h-fit-content">
      <img :src="qr" class="pd-3px">
    </div>
    <div class="pd-20px pd-t-0px">
      <div v-for="(item, index) in printItem" :key="index" class="mg-r-15px">
        {{index + 1}}. {{item.receiveId}} ({{item.name}}) <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QRcodeA4Page',
  data () {
    return {
      qr: '',
      printItem: []
    }
  },
  async mounted () {
    this.qr = await window.localStorage.getItem('qr')
    this.printItem = await JSON.parse(window.localStorage.getItem('print_item'))
    await window.print()
  }
}
</script>

<style scoped>
  div[size="A4"] {
    background: #fff;
    width: 210mm;
    min-height: 297mm;
    display: block;
    margin: 40px auto;
    padding: 14mm 15mm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    color: #000;
  }
  .item {
    border: 1px solid #000;
  }
  @media print {
    div[size="A4"] {
      width: 190mm;
      min-height: 276mm;
      padding: 2.5mm 5mm;
      zoom: 100%;
      margin: 0;
      box-shadow: none;
    }
  }
</style>
