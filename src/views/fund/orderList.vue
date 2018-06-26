<template>
<div>
  <section class="content-header">
    <h1>
      订单列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 资金管理</a></li>
      <li class="active"> 订单查询</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">订单列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">               
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" v-model="status" v-on:change="searchCommon">
                    <option value="all">全部</option>
                    <option value="{{ ORDER_NO }}">{{ ORDER_NO | orderStatusTrans }}</option>
                    <option value="{{ ORDER_WAIT_SHIPPING }}">{{ ORDER_WAIT_SHIPPING | orderStatusTrans }}</option>   
                    <option value="{{ ORDER_WAIT_RECEIVING }}">{{ ORDER_WAIT_RECEIVING | orderStatusTrans }}</option> 
                    <option value="{{ ORDER_REFUNDING }}">{{ ORDER_REFUNDING | orderStatusTrans }}</option> 
                    <option value="{{ ORDER_COMPLETED }}">{{ ORDER_COMPLETED | orderStatusTrans }}</option>               
                  </select>
                </div>
              </div>
              <div class="form-group pull-left" style="width:20%">
                <div class="col-sm-12">
                  <select class="form-control" style="width:100%;" id="preShopSel" v-model="preShopId">
                    <option value="all">全部商铺</option>
                    <template v-for="item in preShopList">
                        <option value="{{item.id}}">{{ item.name }}</option>        
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>订单编号</th>
                  <th>宝贝名称</th>
                  <th>店铺名称</th>
                  <th>订单状态</th>
                  <th>购买数量</th>
                  <th>产品单价</th>
                  <th>订单总额</th>
                  <th>下单时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td><a href="javascript:;" data-toggle="tooltip" data-original-title="查看订单详情" class="detail" v-link="{name:'orderInfo', query:{ orderId:item.id }}">{{ item.no }}</a></td>
                    <td>{{ item.goods.name || ''}}</td>
                    <td>{{ item.shop.name }}</td>
                    <td>{{ item.status | orderStatusTrans}}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.createdAt | getLastTimeStr }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'orderInfo', query: { orderId: item.id } }"><i class="fa fa-edit"></i> 查看详情</button>
                    </td>
                  </tr>
                </template>
                <tr v-show="showEmptyTip">
                  <td colspan="20">{{ emptyTip }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="8">
                    <div class="pull-right">
                      <boot-page v-ref:page :async="true" :lens="lenArr" :url="url" :page-len="pageLen" :param="param"></boot-page>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
   import bootPage from './../../components/BootPage.vue';
   import {ORDER_NO, ORDER_WAIT_SHIPPING, ORDER_WAIT_RECEIVING, ORDER_REFUNDING, ORDER_COMPLETED} from '../../js/constants';

   export default {
     ready() {
      var self = this;
      $('#preShopSel').select2({});
      self.getPreShopList();

      $("#preShopSel").change(function () {
        self.preShopId = $("#preShopSel").val();
        self.searchCommon();
      });

     }, 
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有订单数据",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.fund_order,
          tableList: [],
          ORDER_NO: ORDER_NO,
          ORDER_WAIT_SHIPPING: ORDER_WAIT_SHIPPING, 
          ORDER_WAIT_RECEIVING: ORDER_WAIT_RECEIVING,
          ORDER_REFUNDING: ORDER_REFUNDING,
          ORDER_COMPLETED: ORDER_COMPLETED,
          status: 'all',
          preShopId: 'all',
          preShopList: [],
        }
    },
    components: {
        bootPage
    },
    methods: {
      getPreShopList: function() {
        var self = this;
        commFun.request({
          url: commFun.apiRouter.shopNoPage,
          data: {},
          success: function (data) {
              self.preShopList = data || [];
          },
          error: function (errData) {
              commFun.errorTip(errData);
          }
        });
      },
      searchCommon: function(){
        var self = this;
        self.param = {
            shop: self.preShopId,
            status: self.status
        };
        setTimeout(function(){ self.refresh(); }, 100);
      },
      //分页相关
      refresh() {
        this.$refs.page.refresh();
      }
    },
    //分页相关
    events: {
        // 分页组件传回的表格数据
        'data' (data) {
            this.tableList = data;
            this.showEmptyTip = data.length > 0 ? false : true;
        },

        // 刷新数据
        'refresh' () {
            this.refresh()
        }
    }

}
</script>