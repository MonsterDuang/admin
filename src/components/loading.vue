<template>
  <div class="cd-popup loading-pop is-visible">
    <div class="cd-popup-container loading-container">
      <img :src="loadingImg" width="100px">
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        loadingImg:require('../assets/images/loading.jpg')
      }
    }
  }
</script>