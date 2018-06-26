<template>
<div>
  <section class="content-header">
    <h1>
    鉴宝师价格设置
  </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 分润管理</a></li>
      <li class="active"> 鉴宝师价格设置</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">鉴宝师列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left" style="width:20%">
                <div class="col-sm-12">
                  <select class="form-control" style="width:100%;" id="areaSel" v-model="areaId">
                    <option value="all">全部领域</option>
                    <template v-for="item in areaList">
                        <option value="{{ item.id }}">{{ item.name }}</option>        
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>鉴宝师昵称</th>
                  <th>鉴宝师真名</th>
                  <th>类别</th>
                  <th>鉴定数量</th>
                  <th>精通的领域</th>
                  <th>收费(元)</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.user.nickname }}</td>
                    <td>
                      <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.apply.realname }}详情" class="detail" v-link="{name:'userInfo', query:{ userId:item.user.id, page:'chargeSet' }}">{{ item.apply.realname }}</a>
                    </td> 
                    <td>
                      {{item.appraiserType | appraiserTypeTrans}}&nbsp;&nbsp;&nbsp;&nbsp;
                      <!--<button :class="['btn btn-xs', item.appraiserType == APPRAISER_TYPE_PARTJOB ?  'btn-success' : 'btn-primary' ]" @click="modifyType(item.id, item.appraiserType)">{{item.appraiserType | appraiserTypeModifyTrans}}</button>-->
                    </td>
                    <td>{{ item.appraiseCount }}</td>
                    <td>{{ item.area | areaTrans}}</td> 
                    <td v-if="isModify && item.id.toString() == modifyId.toString()"><input type="text" v-model="charge"></input></td>
                    <td v-else>{{ item.charge }}</td>          
                    <td>
                      <!--v-if="item.appraiserType == APPRAISER_TYPE_PARTJOB && !isModify"-->
                      <button class="btn btn-warning btn-xs" v-if="isShow" @click="modify(item.id, item.charge )"><i class="fa fa-trash"></i> 修改价格</button>
                      <div class="btn-group" v-if="isModify && item.id.toString() == modifyId.toString()">
                        <button class="btn btn-success btn-xs" @click="modifyOk">确定修改</button> 
                        <button class="btn btn-danger btn-xs" @click="modifyCancel">取消</button>
                      </div>
                                               
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
   import {APPRAISER_TYPE_PARTJOB} from '../../js/constants';

   export default {
    ready() {
      var self = this;
      $('#areaSel').select2({});
      self.getCategoryList();

      $("#areaSel").change(function () {
        self.preShopId = $("#areaSel").val();
        self.searchCommon();
      });
    },
    data() {
        return {
          areaId: 'all',
          areaList: [],
          showEmptyTip: false,
          emptyTip: "暂时还没有鉴宝师数据",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.profit_appraiser,
          tableList: [],
          isModify: true,
          charge:'',
          modifyId:'',
          APPRAISER_TYPE_PARTJOB:APPRAISER_TYPE_PARTJOB,
          isShow:true
        }
    },
    components: {
        bootPage
    },
    methods: {
      getCategoryList: function(){
        var self = this;
        commFun.request({
          url: commFun.apiRouter.category,
          data: {},
          success: function (data){
              self.areaList = data || [];
          },
          error: function (errData) {
              commFun.errorTip(errData);
          }
        });
      },
      modify: function(id, charge){
          var self = this
          self.isShow = false;
          self.modifyId = id;
          self.isModify = true;
          self.charge = charge;
      },
      modifyOk: function(){
        var self = this, charge = this.charge.trim();
        var id = this.modifyId;
        if (charge.length === 0) {
          commFun.tip({
            text: '请输入价格'
          });
          return false;
        }

        if(! commFun.checkNotNegative(charge)){
          commFun.tip({
            text: '金额格式不对，请正确输入'
          });
          return false;
        }
        var modifyCallback = function(){
          commFun.request({
            url: commFun.apiRouter.profit_appraiser,
            params: id,
            data: JSON.stringify({charge: charge}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:'鉴宝师价格设置成功',type:'showSuccessToast'});
                self.refresh();
                self.isModify = false;
                self.isShow = true;
                self.modifyId = '';
                self.charge = '';
              }
              else{
                commFun.tip({text:'无数据返回，稍后再试'});
              }
            },
            error: function (errData) {
              commFun.errorTip(errData);
            }
          });
        };
        
        commFun.warn_tip({ 
          text: '确定修改该鉴定师价格吗？',
          okCallback:modifyCallback
        });
      },
      modifyCancel: function(){
        var self = this;
        self.isShow = true;
        self.modifyId = '';
        self.isModify = false;
        self.charge = '';
      },
      searchCommon: function(){
        var self = this;
        self.param = {
            shop: self.preShopId,
        };
        setTimeout(function(){ self.refresh(); }, 100);
      },
      // 类型互转
      modifyType: function(id, type){
        var self = this;
        var modifyText = '确定该平台（自营）鉴定师要转为兼职鉴定师吗'
        if(type === this.APPRAISER_TYPE_PARTJOB){
          modifyText = '确定该兼职鉴定师要转为平台（自营）鉴定师吗？'
        }
        var modifyCallback = function(){
          commFun.request({
            url: commFun.apiRouter.profit_appraiser_type,
            params: id,
            data: JSON.stringify({type, type}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:'鉴宝师类型转换成功',type:'showSuccessToast'});
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
        };
        
        commFun.warn_tip({ 
          text: modifyText,
          okCallback:modifyCallback
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
            console.log(data,"event打印的数据");
            this.tableList = data;
            this.showEmptyTip = data.length > 0 ? false : true;
        },
        // 刷新数据
        'refresh' () {
            this.refresh()
        }
    },
    watch:{
        "tableList"(newV){
            console.log(newV,"监听的数组");
        }
    }

}
</script>