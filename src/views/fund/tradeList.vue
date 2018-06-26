<template>
<div>
  <section class="content-header">
    <h1>
      资金流转
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 资金管理</a></li>
      <li class="active"> 资金流转</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">交易相关列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left"> 
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>支付渠道</th>
                  <th>付款人</th>
                  <th>交易金额</th>
                  <th>支付状态</th>
                  <th>支付场景</th>
                  <th>交易时间</th>
                  <!-- <th>结束时间</th> -->
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <!-- <td>
                      <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.name }}详情" class="detail" v-link="{name:'preShopDetail', query:{ id:item.id }}">{{ item.name }}</a>
                    </td>       -->
                    <td>{{ item.payment.channel | tradeChannelTrans}}</td>
                    <td>{{ (item.payment.payer || {})['nickname'] }}</td>
                    <td>{{ item.payment.amount }}</td>
                    <td>{{ item.payment.status | tradeStatusTrans}}</td>
                    <td>{{ item.kind | tradeKindTrans}}</td>
                    <td>{{ item.createdAt | getLastTimeStr}}</td>
                    <td>
                      <!-- <button class="btn btn-default btn-xs" v-link="{ name: 'preShopAdd', query: { preShopId: item.id } }"><i class="fa fa-edit"></i> 修改</button>
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deletePreShop"><i class="fa fa-trash"></i> 删除</button>                     -->
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

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有交易数据",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.fund_trade,
          tableList: []
        }
    },
    components: {
        bootPage
    },
    methods: {
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