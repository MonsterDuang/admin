<template>
  <div>
    <section class="content-header">
        <h1>订单详情</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 资金管理</a></li>
            <li class="active"> 订单详情</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-header with-border">
                      <i class="fa fa-text-width"></i>
											<h3 class="box-title">订单详细信息</h3>
                    </div>
                    <div class="box-body">
                        <dl class="dl-horizontal">
                            <dt>订单编号</dt>
                            <dd>{{ orderDetail.no || "" }}</dd>
                            <dt>商品名称</dt>
                            <dd>{{ orderDetail.goods.name || "" }}</dd>
                            <dt>商品描述</dt>
                            <dd>{{ orderDetail.goods.description || "" }}</dd>
                            <dt>购买数量</dt>
                            <dd>{{ orderDetail.quantity || "" }}</dd>
                            <dt>产品单价(元)</dt>
                            <dd>{{ orderDetail.price || "" }}</dd>
                            <dt>邮费(元)</dt>
                            <dd>{{ orderDetail.postage || "" }}</dd>
                            <dt>订单总额(元)</dt>
                            <dd>{{ orderDetail.amount || "" }}</dd>
                            <dt>店铺名称</dt>
                            <dd>{{ orderDetail.shop.name || "" }}</dd>
                            <dt>订单状态</dt>
                            <dd>{{ orderDetail.status || "" | orderStatusTrans }}</dd>
                            <dt>卖家</dt>
                            <dd>{{ orderDetail.seller.nickname + '(' + orderDetail.seller.phone + ')' || "" }}</dd>
                            <dt>买家</dt>
                            <dd>{{ orderDetail.buyer.nickname + '(' + orderDetail.buyer.phone + ')' || "" }}</dd>
                            <dt>收货地址</dt>
                            <dd>{{ orderDetail.addressBook.name + ' ' + orderDetail.addressBook.phone + ' ' + orderDetail.addressBook.address.province + '-' + orderDetail.addressBook.address.city + '-' + orderDetail.addressBook.address.region + '-' + orderDetail.addressBook.address.street + ' ' + orderDetail.addressBook.zipCode || "" }}</dd>
                            <dt>发货物流</dt>
                            <dd>{{ orderDetail.shipping && (orderDetail.shipping.express + ' ' + orderDetail.shipping.no) || "" }}</dd>
                            <dt>退款详情</dt>
                            <dd>{{ '待定待定待定待定'}}</dd>
                            <dt>退款时间</dt>
                            <dd>{{ orderDetail.refundAt | getLastTimeStr || "" }}</dd>
                        </dl>
                    </div>
                    <div class="box-footer">
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary" id="back" @click="goBack">返回</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
export default {
  ready() {},
  data() {
    return {
      orderDetail: {
        shop: {},
        goods: {},
        seller: {},
        buyer: {},
        addressBook: {
          address: {}
        }
      }
    };
  },
  route: {
    data(transition) {
      var id = this.$route.query.orderId;
      this.getDetail(id);
    }
  },
  methods: {
    getDetail: function(id) {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.fund_order,
        params: id,
        success: function(data) {
          if (data) {
            self.orderDetail = data || {};
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData, "查询失败，请稍后再试");
        }
      });
    },
    goBack: function() {
      this.$route.router.go({ name: "orderList" });
    }
  }
};
</script>