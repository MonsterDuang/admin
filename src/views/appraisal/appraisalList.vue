<template>
<div>
  <section class="content-header">
    <h1>鉴宝列表</h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 鉴宝管理</a></li>
      <li class="active"> 鉴宝列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">鉴宝列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" v-model="type" v-on:change="searchCommon">
                          <option value="all">全部状态</option>
                          <option value="{{appraisalOk}}">{{appraisalOk | appraisalTrans}}</option>
                          <option value="{{appraisalNot}}">{{appraisalNot | appraisalTrans}}</option>                   
                      </select>
                </div>
              </div>
              <div class="form-group pull-left" style="width:20%">
                <div class="col-sm-12">
                  <select class="form-control" style="width:100%;" id="areaSel" v-model="areaId">
                    <option value="all">全部分类</option>
                    <template v-for="item in areaList">
                        <option value="{{ item.id }}">{{ item.name }}</option>        
                    </template>
                  </select>
                </div>
              </div>
              <!-- <div class="form-group pull-left" style="width:20%">
                <div class="col-sm-12">
                  <select class="form-control" v-model="appraiserType" v-on:change="searchCommon">
                    <option value="all">全部鉴宝师</option>
                    <option value="{{APPRAISER_TYPE_SELFSUPPORT}}">{{APPRAISER_TYPE_SELFSUPPORT | appraiserTypeTrans}}</option>
                    <option value="{{APPRAISER_TYPE_PARTJOB}}">{{APPRAISER_TYPE_PARTJOB | appraiserTypeTrans}}</option>
                  </select>
                </div>
              </div> -->
            </div>
            <table id="userTable" class="table table-bordered table-hover" style="background: white">
              <thead>
                <tr>
                  <th>问题</th>
                  <th>求鉴定用户</th>
                  <th>宝贝分类</th>
                  <th>鉴宝师</th>
                  <th>状态</th>
                  <th>鉴定结果</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.questions }}</td>
                    <td>{{ item.user.nickname }}</td>
                    <td>{{ item.category.name }}</td>
                    <template v-if="isModify && item.id.toString() == modifyId.toString()">
                      <select class="form-control" style="width:100%;" id="appraiserSel" v-model="appraiserId">
                        <template v-for="appraiser in platAppraiserList">
                            <option value="{{ appraiser.id }}">{{ (appraiser.apply || {})['realname'] || ''}}</option>        
                        </template>
                      </select>
                    </template>
                    <template v-else>
                      <td v-if="item.appraiser && item.appraiser.appraiserType == APPRAISER_TYPE_SELFSUPPORT">{{ item.appraiser.apply.realname }}(平台)</td>
                      <template v-else>
                        <td v-if="item.appraiser">{{ item.appraiser.apply.realname }}</td>
                        <td v-else></td>
                      </template>
                    </template>
                    
                    <td v-if="item.status == appraisalOk"><span class="label label-success">{{ item.status | appraisalTrans }}</span></td>
                    <td v-else><span :class="['label', item.status === appraisalNot ? ' label-danger ' : '']">{{ item.status | appraisalTrans }}</span></td>
                    <td>{{ item.result }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'appraisalDetail', query: { appraisalId: item.id } }">查看详情</button>
                      <button class="btn btn-default btn-xs" data-delete="{{item.id}}" @click="deleteAppraisal"><i class="fa fa-delete"></i> 删除</button> 
                      <!-- <button v-if="!isModify && !item.appraiser" class="btn btn-warning btn-xs" @click="allotAppraiser(item.id)"><i class="fa fa-user-plus"></i> 分配鉴宝师</button> -->
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
   import {APPRAISAL_STATUS_DID, APPRAISAL_STATUS_DID_NOT, APPRAISER_TYPE_SELFSUPPORT, APPRAISER_TYPE_PARTJOB} from '../../js/constants';

   export default {
     ready() {
      var self = this;
      $('#areaSel').select2({});
      self.getCategoryList();

      $("#areaSel").change(function () {
        self.areaId = $("#areaSel").val();
        self.searchCommon();
      });

      $('#appraiserSel').select2({});
      $("#appraiserSel").change(function () {
        self.appraiserId = $("#appraiserSel").val();
      });
      self.getPlatformAppraiser();
     },
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有鉴包信息",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.appraisal,
          tableList: [],
          type:'all',
          appraisalOk: APPRAISAL_STATUS_DID,
          appraisalNot: APPRAISAL_STATUS_DID_NOT,
          areaList: [],
          areaId: 'all',
          platAppraiserList: [],
          appraiserId: '',
          modifyId: '',
          isModify: false,
          APPRAISER_TYPE_SELFSUPPORT: APPRAISER_TYPE_SELFSUPPORT,
          APPRAISER_TYPE_PARTJOB: APPRAISER_TYPE_PARTJOB,
          appraiserType: 'all'
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
          success: function (data) {
              self.areaList = data || [];
          },
          error: function (errData) {
              commFun.errorTip(errData);
          }
        });
      },
      getPlatformAppraiser: function(){
        var self = this;
        commFun.request({
          url: commFun.apiRouter.platformAppraiser,
          data: {},
          success: function (data) {
              self.platAppraiserList = data || [];
              if(data.length > 0){
                self.appraiserId = data[0].id;
              }
          },
          error: function (errData) {
              commFun.errorTip(errData);
          }
        });
      },
      // 分配鉴宝师
      allotAppraiser: function(id){
          var self = this
          self.modifyId = id;
          self.isModify = true;
      },
      modifyOk: function(){
        var self = this;
        var id = self.modifyId;

        if (self.appraiserId.length === 0) {
          commFun.tip({
            text: '请先选择平台鉴宝师'
          });
          return false;
        }

        var modifyCallback= function() {
          commFun.request({
            url: commFun.apiRouter.appraisal,
            params: id,
            data: JSON.stringify({platformAppraiser: self.appraiserId}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:'平台鉴宝师分配成功',type:'showSuccessToast'});
                self.refresh();
                self.isModify = false;
                self.modifyId = '';
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
          text: '确定分配该鉴宝师吗？',
          okCallback:modifyCallback
        });

      },
      modifyCancel: function(){
        this.modifyId = '';
        this.isModify = false;
      },
      deleteAppraisal: function(events){
        var self = this;
        var appraisalId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.appraisal,
            params: appraisalId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除鉴宝需求成功',type:'showSuccessToast'});
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
          text: '确定删除该鉴宝需求吗？',
          okCallback:deleteCallback
        });
      },
      // 按角色查找
      searchCommon: function() {
        this.param = { type: this.type, category: this.areaId, appraiserType: this.appraiserType};
        this.url = commFun.apiRouter.appraisal;
        setTimeout(() => { this.refresh(); }, 100);
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