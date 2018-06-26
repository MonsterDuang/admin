<template>
  <div>
    <section class="content-header">
        <h1>{{type}}资料</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 用户管理</a></li>
            <li class="active"> {{type}}资料</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-header with-border">
                        <i class="fa fa-text-width"></i>
                        <h3 class="box-title">{{type}}详细信息</h3>
                    </div>
                    <div class="box-body">
                        <dl class="dl-horizontal" v-if="userDetail.type == 'shop'">
                            <dt class="lead text-muted">商户基本信息:</dt><dd></dd>
                            <dt>商户真实姓名</dt>
                            <dd>{{ userDetail.shop.apply.realname || "" }}</dd>
                            <dt>商户证件号</dt>
                            <dd>{{ userDetail.shop.apply.idCard || "" }}</dd>
                            <dt>商户昵称</dt>
                            <dd>{{ userDetail.nickname || "" }}</dd>
                            <dt>商户手机号</dt>
                            <dd>{{ userDetail.phone || "" }}</dd>
                            <dt>商户性别</dt>
                            <dd>{{ userDetail.gender || "" }}</dd>
                            <dt>上一次登录时间</dt>
                            <dd>{{ userDetail.lastLoginAt || "" }}</dd>
                            <br>
                            <dt class="lead text-muted">所属商铺信息:</dt><dd></dd>
                            <dt>商铺名称</dt>
                            <dd>{{ userDetail.shop.name }}</dd>
                            <!-- <dt>商铺名称2(有问题啊！)</dt>
                            <dd>{{ userDetail.shop.apply.shopname || "" }}</dd> -->
                            <dt>商铺信用代码</dt>
                            <dd>{{ userDetail.shop.apply.creditCode }}</dd>                            
                            <dt>商铺成交量</dt>
                            <dd>{{ userDetail.shop.vol }}</dd>
                            <dt>商铺宝贝数量</dt>
                            <dd>{{ userDetail.shop.goodsCount }}</dd>
                            <dt>商铺拍卖数量</dt>
                            <dd>{{ userDetail.shop.auctionGoodsCount }}</dd>
                            <dt>商铺信息</dt>
                            <dd>{{ userDetail.shop.intro }}</dd>
                            <dt>商铺营业执照</dt>
                            <dd><img v-bind:src="userDetail.shop.apply.businessLicensePhoto" style="width:100px;height:100px" @click="enlargeImg(userDetail.shop.apply.businessLicensePhoto)"></dd>
                        </dl>
                        <dl class="dl-horizontal" v-if="userDetail.type == 'appraiser'">
                            <dt class="lead text-muted">鉴宝师基本信息:</dt><dd></dd>
                            <dt>鉴宝师真实姓名</dt>
                            <dd>{{ userDetail.appraiser.apply.realname || "" }}</dd>
                            <dt>鉴宝师证件号</dt>
                            <dd>{{ userDetail.appraiser.apply.idCard || "" }}</dd>
                            <dt>鉴宝师手机号</dt>
                            <dd>{{ userDetail.phone || "" }}</dd>
                            <dt>鉴宝师昵称</dt>
                            <dd>{{ userDetail.nickname || "" }}</dd>
                            <dt>鉴宝师性别</dt>
                            <dd>{{ userDetail.gender | userGenderTrans }}</dd>
                            <dt>上一次登录时间</dt>
                            <dd>{{ userDetail.lastLoginAt | getLastTimeStr }}</dd>
                            <br>
                            <dt class="lead text-muted">鉴宝师详细信息:</dt><dd></dd>
                            <dt>鉴定数量(件)</dt>
                            <dd>{{ userDetail.appraiser.appraiseCount || "" }}</dd>
                            <dt>收费(元)</dt>
                            <dd>{{ userDetail.appraiser.charge || "" }}</dd>
                            <dt>精通的领域</dt>
                            <dd>{{ userDetail.appraiser.apply.area || "" | areaTrans}}</dd>                            
                            <dt>资格证</dt>
                            <dd>{{ userDetail.appraiser.apply.certification || "" }}</dd>
                            <dt>资格证照片</dt>
                            <dd><img v-bind:src="userDetail.appraiser.apply.certificationPhoto" style="width:100px;height:100px" @click="enlargeImg(userDetail.appraiser.apply.certificationPhoto)"></dd>     
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
      type: "",
      page: "",
      userDetail: {
        shop: {}
      }
    };
  },
  route: {
    data(transition) {
      var id = this.$route.query.userId;
      this.page = this.$route.query.page;
      this.getDetail(id);
    }
  },
  methods: {
    getDetail: function(id) {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.user,
        params: id,
        success: function(data) {
          if (data) {
            self.userDetail = data || {};
            self.type = data.type === "shop" ? "商户" : "鉴宝师";
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData, "查询失败，请稍后再试");
        }
      });
    },
    enlargeImg: function(imgSrc) {
      if (imgSrc) {
        commFun.enlargeImg(imgSrc);
      }
    },
    goBack: function() {
      if (!this.page) this.page = "userList";
      this.$route.router.go({ name: this.page });
    }
  }
};
</script>