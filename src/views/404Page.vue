<template>
<div>
  <section class="content-header">
    <h1>
      {{index}} 提示页
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li class="active">{{index}}提示页</li>
    </ol>
  </section>
  <section class="content">
    <div class="error-page">
      <h2 class="headline text-yellow"> {{index}}</h2>
      <div class="error-content">
        <h3><i class="fa fa-warning text-yellow"></i> {{text}}</h3>
        <p>
          We could not find the page you were looking for. Meanwhile, you may <a href="javascript:;" @click="back">back to dashboard</a>
        </p>
      </div>
    </div>
  </section>
</div>
</template>
<script>
export default {
  ready() {
    var index = this.$route.query.index;
    if(index === '401'){
      this.index = '401';
      this.text = '很抱歉，您没有权限访问该页面';
    }
  },
  data() {
      return {
        index: '404',
        text: '很抱歉，您所访问的页面不存在',
      }
  },
  methods: {
    back: function(){
      this.$route.router.go({name:"index"});
    }
  }
}
</script>