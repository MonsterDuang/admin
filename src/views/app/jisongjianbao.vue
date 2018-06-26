<template>
<div>
  <section class="content-header">
    <h1>
      寄送鉴宝
    </h1>
    <ol class="breadcrumb">
       <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> 寄送鉴宝</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">请输入寄送鉴宝相关信息</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="disclaimer" class="col-sm-2 control-label">免责申明</label>
                <div class="col-sm-8">
                  <textarea id="disclaimer" row="6" type="text" class="form-control" v-model="data.disclaimer"></textarea>
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="service" class="col-sm-2 control-label">服务内容</label>
                <div class="col-sm-8">
                  <textarea id="service" row="6" type="text" class="form-control" v-model="data.service"></textarea>
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="address" class="col-sm-2 control-label">收货地址</label>
                <div class="col-sm-8">
                  <input id="address" type="text" class="form-control" v-model="data.address">  
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
                <div class="form-group">
                <label for="phone" class="col-sm-2 control-label">服务电话</label>
                <div class="col-sm-8">
                  <input id="phone" type="text" class="form-control" v-model="data.phone">  
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
            </div>
            <div class="box-footer">
              <div class="col-sm-1">
                <button type="button" class="btn btn-primary" @click="back">返回</button>
              </div>
              <div class="col-sm-2">
                <button type="button" class="btn btn-info" @click="save">确定修改</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  ready() {
    this.getConfiguration();
  },
  data() {
    return {
      data: {
        disclaimer: "",
        service: "",
        address: "",
        phone: ""
      }
    };
  },
  methods: {
    getConfiguration: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.jisongjianbao,
        type: "GET",
        success: function(data) {
          if (data) {
            self.data = data;
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData || "获取寄送鉴宝内容失败");
        }
      });
    },
    checkEmpty(value, message) {
      var self = this;
      if (!value) {
        commFun.tip({ text: message });
        return false;
      }
      return true;
    },
    back: function() {
      history.go(-1);
    },
    save: function() {
      var self = this;
      // 判断是否为空
      var isEmpty1 = this.checkEmpty(self.data.disclaimer, "免责申明不能为空");
      var isEmpty2 = this.checkEmpty(self.data.service, "服务内容不能为空");
      var isEmpty3 = this.checkEmpty(self.data.address, "收货地址不能为空");
      var isEmpty4 = this.checkEmpty(self.data.phone, "联系电话不能为空");
      if (!(isEmpty1 && isEmpty2 && isEmpty3 && isEmpty4)) {
        return false;
      }

      commFun.request({
        url: commFun.apiRouter.jisongjianbao,
        type: "PUT",
        data: JSON.stringify(self.data),
        success: function(data) {
          commFun.tip({ text: "寄送鉴宝设置成功", type: "showSuccessToast" });
          self.getConfiguration();
        },
        error: function(errData) {
          commFun.errorTip(errData);
        }
      });
    }
  }
};
</script>