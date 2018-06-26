<template>
  <span :style="{ background: (size > 1024 * 1024) ? 'rgba(252, 26, 36, 0.7)' : 'transparent', color: (size > 1024 * 1024) ? 'white' : 'black', width: barWidth, display: 'block'}"
    style="padding-left: 2px">
<slot></slot>{{size | transferUnit}}</span>
</template>

<script>
  export default {
    data() {
      return {};
    },

    props: ['size'],

    computed: {
      barWidth: function () {
        let width = (this.size / (5 * 1024 * 1024)) * 100;
        width = width > 100 ? 100 : width;
        return (this.size > 1024 * 1024) ? (width + '%') : '';
      }
    }
  }
</script>