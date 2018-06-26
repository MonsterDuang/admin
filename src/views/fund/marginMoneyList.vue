<template>
<div>
  <section class="content-header">
    <h1>
      保证金列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 资金管理</a></li>
      <li class="active"> 竞拍保证金管理</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">保证金列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">               
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" v-model="isRefund" v-on:change="searchCommon">
                    <option value="all">全部退款状态</option>
                    <option value={{true}}>退</option>
                    <option value={false}}>不退</option>          
                  </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>竞拍商品</th>
                  <th>竞拍用户</th>
                  <th>竞拍保证金额</th>
                  <th>缴纳时间</th>
                  <th>是否退保证金</th>
                  <th>支付状态</th>
                  <th>支付渠道</th>
                  <th>退款状态</th>
                  <th>退款时间</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.auctionGoods.title }}</td>
                    <td>{{ (item.user || {})['nickname'] }}</td>
                    <td>{{ item.payment.amount || ''}}</td>
                    <td>{{ item.createdAt | getLastTimeStr}}</td>
                    <td>{{ item.isRefund ? '退' : '不退'}}</td>
                    <td>{{ item.payment.status | tradeStatusTrans}}</td>
                    <td>{{ item.payment.channel | tradeChannelTrans}}</td>
                    <td>{{ item.refundAt ? '已退' : '未退' }}</td>
                    <td>{{ item.refundAt | getLastTimeStr }}</td>
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
import bootPage from "./../../components/BootPage.vue";

export default {
  ready() {},
  data() {
    return {
      showEmptyTip: false,
      emptyTip: "暂时还没有保证金数据",
      //分页相关
      lenArr: [10, 50, 100],
      pageLen: 5,
      param: {},
      url: commFun.apiRouter.fund_margin,
      tableList: [],
      isRefund: "all"
    };
  },
  components: {
    bootPage
  },
  methods: {
    searchCommon: function() {
      var self = this;
      self.param = {
        isRefund: self.isRefund
      };
      setTimeout(function() {
        self.refresh();
      }, 100);
    },
    //分页相关
    refresh() {
      this.$refs.page.refresh();
    }
  },
  //分页相关
  events: {
    // 分页组件传回的表格数据
    data(data) {
      this.tableList = data;
      this.showEmptyTip = data.length > 0 ? false : true;
    },

    // 刷新数据
    refresh() {
      this.refresh();
    }
  }
};
</script>