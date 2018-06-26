<template>
<div>
	<section class="content-header">
		<h1>
			首页
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
			<li class="active">首页</li>		
		</ol>
	</section>
	<section class="content">

		<!--<frameset cols="25%,50%,25%">-->
			<!--<frame src="frame_a.htm" />-->
			<!--<frame src="frame_b.htm" />-->
			<!--<frame src="frame_c.htm" />-->
		<!--</frameset>-->

		<!--<div class="main-container" id="main" style="width:99%">-->
			<!--<iframe src="http://localhost:8050/#!/login" width="100%" height="500px" frameborder="0">-->
				<!--您的浏览器不支持iframe，请升级-->
			<!--</iframe>-->
		<!--</div>-->

		<div class="row">
			<div class="col-lg-3 col-xs-6">
				<div class="small-box bg-aqua">
					<div class="inner">
						<h3>{{orderNum}}</h3>
						<p>订单数量</p>
					</div>
					<div class="icon">
						<i class="fa fa-cart-plus"></i>
					</div>
					<a @click="go('orderList')" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
				</div>
			</div>
			<div class="col-lg-3 col-xs-6">
				<div class="small-box bg-green">
					<div class="inner">
						<h3>{{userNum}}</h3>
						<p>用户数量</p>
					</div>
					<div class="icon">
						<i class="fa fa-users"></i>
					</div>
					<a @click="go('userList')" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
				</div>
			</div>
			<div class="col-lg-3 col-xs-6">
				<div class="small-box bg-yellow">
					<div class="inner">
						<h3>{{shopNum}}</h3>
						<p>商铺数量</p>
					</div>
					<div class="icon">
						<i class="fa fa-home"></i>
					</div>
					<a @click="go('userList')" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
				</div>
			</div>
			<div class="col-lg-3 col-xs-6">
				<div class="small-box bg-red">
					<div class="inner">
						<h3>{{appraiserNum}}</h3>
						<p>鉴宝师数量</p>
					</div>
					<div class="icon">
						<i class="fa fa-user"></i>
					</div>
					<a @click="go('userList')" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
				</div>
			</div>


			 
		</div>
		<div class="row">
			<!-- 左边 最新订单数据-->
			<div class="col-md-8">
				<div class="box box-info">
					<div class="box-header with-border">
						<h3 class="box-title">最新订单详情</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
							<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
						</div>
					</div>
					<div class="box-body">
						<div class="table-responsive">
							<table class="table no-margin">
								<thead>
									<tr>
										<th>订单编号</th>
										<th>宝贝名称</th>
										<th>订单状态</th>
										<th>订单总额</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="item in orderList">
										<tr>
											<td>{{ item.no }}</td>
											<td>{{ item.goods.name || ''}}</td>
											<td>{{ item.status | orderStatusTrans}}</td>										
											<td>{{ item.amount }}</td>
										</tr>
									</template>
									<tr v-show="showEmptyTip">
										<td colspan="20">今天还没有订单喔~</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- 右边 近期数据-->
			<div class="col-md-4">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">近期数据</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
							<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
						</div>
					</div>
					<div class="box-body">
						<ul class="products-list product-list-in-box">
							<li class="item">
								<div class="product-info" style="margin-left:0px;">
									<a href="javascript::;" class="product-title">交易总额 <span class="label label-warning pull-right">{{orderMount}}</span></a>
									<span class="product-description">
										到目前为止的所有订单成功支付总额
									</span>
								</div>
							</li>
							<li class="item">
								<div class="product-info" style="margin-left:0px;">
									<a href="javascript::;" class="product-title">总消息数<span class="label label-success pull-right">{{msgNum}}</span></a>
									<span class="product-description">
										到目前为止推送的消息数量
									</span>
								</div>
							</li>
							<li class="item">
								<div class="product-info" style="margin-left:0px;">
									<a href="javascript::;" class="product-title">当日总额 <span class="label label-info pull-right">{{orderMountToday}}</span></a>
									<span class="product-description">
										今日到目前为止的订单总额
									</span>
								</div>
							</li>
							<li class="item">
								<div class="product-info" style="margin-left:0px;">
									<a href="javascript::;" class="product-title">当日注册人数 <span class="label label-danger pull-right">{{userToday}}</span></a>
									<span class="product-description">
										今日到目前为止注册的用户数
									</span>
								</div>
							</li>
						</ul>
					</div>
					<!-- <div class="box-footer text-center">
						<a href="javascript::;" class="uppercase">更多数据见详细菜单</a>
					</div> -->
				</div>
			</div>
		</div>
	</section>
</div>
</template>
<script>
require("../assets/css/style.css");
export default {
  ready() {
  	App.headerVue.show();
    App.menuVue.show();
    App.footerVue.show();
    //样式调整
    $("body")
      .addClass("skin-blue")
      .addClass("sidebar-mini")
      .removeClass("login-page");
    $("#app")
      .addClass("content-wrapper")
      .removeClass("wrapper")
      .removeClass("login-box");

    this.getStaticNumber();
    this.getStaticNumberRight();
    this.getStaticNumberLeft();
  },
  data() {
    return {
      orderNum: "",
      userNum: "",
      shopNum: "",
      appraiserNum: "",
      orderMount: 0,
      msgNum: 0,
      orderMountToday: 0,
      userToday: 0,
      showEmptyTip: true,
      orderList: []
    };
  },
  methods: {
    getStaticNumber: function() {
      var self = this;
        commFun.request({
        url: commFun.apiRouter.indexData,
        data: {},
        success: function(data) {
            if (data && data.object) {
            var item = data.object;
            self.orderNum = item.orderNum;
            self.userNum = item.userNum;
            self.shopNum = item.shopNum;
            self.appraiserNum = item.appraiserNum;
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
            commFun.errorTip(errData);
        }
      });
    },
    getStaticNumberRight: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.indexDataRight,
        data: {},
        success: function(data) {
          if (data && data.object) {
            var item = data.object;
            self.orderMount = item.orderMount;
            self.msgNum = item.msgNum;
            self.orderMountToday = item.orderMountToday;
            self.userToday = item.userToday;
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData);
        }
      });
    },
    getStaticNumberLeft: function() {
      var self = this;
        // console.log(self.$ajax.create(


        //
        // self.$ajax({
        //     method:'GET',
        //     url:"http://192.168.0.172:2388/api/admin/common/staticNumber/",
        //     data:{},
        //     responseType:'json',
        // 	emulateJSON:true,
        //     // url:path,
        //     headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        // }).then(function (res) {
        //     alert("成功")
        //     alert(JSON.stringify(res))
        //     if(res.status == 200){
        //         cb && cb(res.data);
        //     }
        // },function (res) {
        //     alert("失败")
        //     console.log(res);
        //     alert(JSON.stringify(res))
        // })


        // ));
        commFun.request({
			url: commFun.apiRouter.indexDataLeft,
			data: {},
			success: function(data) {
				if (data) {
				self.orderList = data || [];
			  } else {
				commFun.tip({ text: "无数据返回，稍后再试" });
			  }
			},
			error: function(errData) {
			  commFun.errorTip(errData);
			}
      });
    },
    go: function(name) {
      this.$route.router.go({ name: name });
    }
  }
};
// var test = { "username":"admin",
// 				"role":"super_admin",
// 				"permission":["admin","user","message","app","profit","live","preview","fund","applycheck","comment","auction","appraisal"],
// 				"lastLogin":"2018-04-14T06:44:05.408Z"
// }
</script>