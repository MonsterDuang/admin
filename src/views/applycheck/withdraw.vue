<template>
<div>
  <section class="content-header">
    <h1>
      提现列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 申请审核管理</a></li>
      <li class="active"> 提现列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">提现列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" id="status" v-model="status" v-on:change="searchCommon">
                          <option value="all">全部状态</option>
                          <option value="{{WITHDRAW_STATUS_UNCONFIRMED}}">{{WITHDRAW_STATUS_UNCONFIRMED | withdrawStatusTrans}}</option>
                          <option value="{{WITHDRAW_STATUS_CONFIRMED}}">{{WITHDRAW_STATUS_CONFIRMED | withdrawStatusTrans}}</option>   
                          <option value="{{WITHDRAW_STATUS_COMPLETED}}">{{WITHDRAW_STATUS_COMPLETED | withdrawStatusTrans}}</option>              
                      </select>
                </div>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" id="category" v-model="category" v-on:change="searchCommon">
                          <option value="all">全部分类</option>
                          <option value="{{STATEMENT_CATEGORY_APPRAISAL}}">{{STATEMENT_CATEGORY_APPRAISAL | withdrawCategoryTrans}}</option>
                          <option value="{{STATEMENT_CATEGORY_SELL}}">{{STATEMENT_CATEGORY_SELL | withdrawCategoryTrans}}</option>               
                      </select>
                </div>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" id="category" v-model="receiptsAccountType" v-on:change="searchCommon">
                          <option value="all">全部类型</option>
                          <option value="{{WITHDRAW_ACCOUNT_TYPE_BANKCARD}}">{{WITHDRAW_ACCOUNT_TYPE_BANKCARD | withdrawAccountTypeTrans}}</option>
                          <option value="{{WITHDRAW_ACCOUNT_TYPE_ALIPAY}}">{{WITHDRAW_ACCOUNT_TYPE_ALIPAY | withdrawAccountTypeTrans}}</option>               
                      </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>申请人</th>
                  <th>提现分类</th>
                  <th>收款账户类型</th>
                  <th>收款账户</th>
                  <th>提现额度</th>
                  <th>状态</th>
                  <th>批准人</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.user.nickname }}</td>
                    <td>{{ item.category | withdrawCategoryTrans }}</td>
                    <td>{{ item.receiptsAccountType | withdrawAccountTypeTrans}}</td>
                    <td v-if="item.receiptsAccountType == WITHDRAW_ACCOUNT_TYPE_BANKCARD">{{ item.receiptsAccount.bankcard.cardNo }}({{item.receiptsAccount.bankcard.openingBank}})</td>
                    <td v-else>{{ item.receiptsAccount.alipay.account }}(支付宝)</td>
                    <td>{{ item.amount }}</td>
                    <td v-if="item.status == WITHDRAW_STATUS_UNCONFIRMED"><span class="label label-success">{{ item.status | withdrawStatusTrans }}</span></td>
                    <td v-else><span :class="['label', item.status === WITHDRAW_STATUS_COMPLETED ? 'label-danger ' : (item.status === WITHDRAW_STATUS_CONFIRMED ? 'label-warning ' : '')]">{{ item.status | withdrawStatusTrans }}</span></td>
                    <td>{{ (item.approver || {})['username'] }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" data-apply="{{ item.id }}" @click="agreeApply" v-show="item.status == WITHDRAW_STATUS_UNCONFIRMED"><i class="fa fa-thumbs-o-up"></i> 确认</button>
                      <!-- <button class="btn btn-danger btn-xs" data-apply="{{ item.id }}" @click="disagreeApply"><i class="fa fa-remove"></i> 拒绝</button>                     -->
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
   import {WITHDRAW_STATUS_UNCONFIRMED, WITHDRAW_STATUS_CONFIRMED, WITHDRAW_STATUS_COMPLETED, STATEMENT_CATEGORY_APPRAISAL, STATEMENT_CATEGORY_SELL, WITHDRAW_ACCOUNT_TYPE_BANKCARD, WITHDRAW_ACCOUNT_TYPE_ALIPAY} from '../../js/constants';

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有提现申请",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.withdraw,
          tableList: [],
          status: 'all',
          category: 'all',
          receiptsAccountType: 'all',
          WITHDRAW_STATUS_UNCONFIRMED: WITHDRAW_STATUS_UNCONFIRMED,
          WITHDRAW_STATUS_CONFIRMED: WITHDRAW_STATUS_CONFIRMED,
          WITHDRAW_STATUS_COMPLETED: WITHDRAW_STATUS_COMPLETED,
          STATEMENT_CATEGORY_APPRAISAL: STATEMENT_CATEGORY_APPRAISAL,
          STATEMENT_CATEGORY_SELL: STATEMENT_CATEGORY_SELL,
          WITHDRAW_ACCOUNT_TYPE_BANKCARD: WITHDRAW_ACCOUNT_TYPE_BANKCARD,
          WITHDRAW_ACCOUNT_TYPE_ALIPAY: WITHDRAW_ACCOUNT_TYPE_ALIPAY
        }
    },
    components: {
        bootPage
    },
    methods: {
      searchCommon: function() {
        this.param = { 
          status: this.status,
          category: this.category,
          receiptsAccountType: this.receiptsAccountType
        };
        this.url = commFun.apiRouter.withdraw;
        setTimeout(() => { this.refresh(); }, 100);
      },
      // 拒绝申请
      disagreeApply: function(events) {
        // 暂时没有这个功能
        return false;
        var self = this;
        var applyId = $(events.currentTarget).data('apply');
        commFun.warn_tip({ 
          text: '确定要拒绝该用户提现吗',
          okCallback:function(){
            self.commonApply(applyId,'refuse');
          }
        });
      },
      // 同意申请
      agreeApply: function(events) {
        var self = this;
        var applyId = $(events.currentTarget).data('apply');
        commFun.warn_tip({ 
          text: '确定要同意该用户提现吗',
          okCallback:function(){
            self.commonApply(applyId, 'agree');
          }
        });
      },

      // 申请
      commonApply: function(applyId, status){
        var self = this;
        commFun.request({
          url: commFun.apiRouter.withdraw,
          params: applyId,
          data: JSON.stringify({status: status}),
          type: "PUT",
          success: function (data) {
            if (data && data.isok) {
              // 成功
              commFun.tip({text:'批准成功',type:'showSuccessToast'});
              self.refresh();
            }
            else{
              commFun.tip({text:'无数据返回，稍后再试'});
            }
          },
          error: function (errData) {
            commFun.errorTip(errData);
          }
        });

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