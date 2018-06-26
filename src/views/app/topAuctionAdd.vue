<template>
<div>
  <section class="content-header">
    <h1>
      拍卖会场广告位
    </h1>
    <ol class="breadcrumb">
       <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> 拍卖会场广告位设置</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">请选择店铺及排序信息</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <div class="form-group">
                    <label for="shop" class="col-sm-2 control-label">选择店铺</label>
                    <div class="col-sm-8">
                        <div v-show="hasShops">
                            <select class="form-control select2" style="width:100%" id="shop" v-model="shop">
                                <template v-for="item in shopList">
                                    <option value="{{ item.id }}">{{ item.name }}</option>  
                                </template>
                            </select>
                        </div>
                        <a v-show="!hasShops" type="button" class="btn btn-info">暂无店铺可选</a>
                    </div>
                    <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                </div>
              <div class="form-group">
                <label for="sortNo" class="col-sm-2 control-label">排序号</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="sortNo">  
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
            </div>
            <div class="box-footer">
              <div class="col-sm-1">
                <button type="button" class="btn btn-primary" @click="back">返回</button>
              </div>
              <div class="col-sm-2">
                <button type="button" class="btn btn-info" @click="save" disabled="{{isSaveDisabled}}">确定</button>
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
    var self = this;
    self.getShopList();
    $("#shop").select2({});
    //当商铺值改变
    $("#shop").change(function() {
      self.shop = $("#shop").val();
    });
  },
  data() {
    return {
      sortNo: "",
      shopList: [],
      isSaveDisabled: false,
      shop: "",
      hasShops: false,
    };
  },
  methods: {
    getShopList: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.shopNoPage,
        success: function(data) {
          if (data) {
            self.shopList = data || [];
            if (data.length > 0) {
              self.hasShops = true;
              self.$nextTick(function() {
                $("#shop").select2("val", data[0].id);
              });
            } else {
              self.hasShops = false;
            }
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData || "获取店铺信息失败");
        }
      });
    },
    checkEmpty(value, message) {
      var self = this;
      if (!value) {
        commFun.tip({ text: message });
        self.isSaveDisabled = false;
        return false;
      }
      return true;
    },
    back: function() {
      this.$route.router.go({name: 'topAuctionList'});
    },
    save: function() {
      var self = this;
      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      var shop = self.shop;
      var sortNo = self.sortNo;

      // 判断是否为空
      var isEmpty1 = this.checkEmpty(shop, "店铺不能为空");
      var isEmpty2 = this.checkEmpty(sortNo, "排序不能为空");
      if (!(isEmpty1 && isEmpty2)) {
        return false;
      }
      if (!commFun.checkPositiveInteger(sortNo)) {
        commFun.tip({ text: "排序为正整数" });
        self.isSaveDisabled = false;
        return false;
      }

      commFun.request({
        url: commFun.apiRouter.topAuction,
        type: 'POST',
        data: JSON.stringify({shop: shop, sortNo: Number(sortNo)}),
        success: function (data) {
          self.isSaveDisabled = false;
          if (data && data.isok) {
            commFun.tip({text:'拍卖会场广告位设置成功',type:'showSuccessToast'});
            self.$route.router.go({name: 'topAuctionList'});
          }
          else{
            commFun.tip({text:'无数据返回，稍后再试'});
          }
        },
        error: function (errData) {
          self.isSaveDisabled = false;
          commFun.errorTip(errData);
        }
      });
    }
  }
};
</script>