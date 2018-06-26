<template>
<div>
  <section class="content-header">
    <h1>
      直播管理
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 直播管理</a></li>
      <li class="active"> 直播列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">直播列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" id="status" v-model="status" v-on:change="searchByStatus">
                    <option value="all">全部状态</option>
                    <option value="{{LVS_STATUS_IDLE}}">空闲中</option>
                    <option value="{{LVS_STATUS_LIVING}}">直播中</option>  
                    <option value="{{LVS_STATUS_DISABLED}}">禁用</option>                
                  </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>直播标题</th>
                  <th>直播编号</th>
                  <th>直播商铺</th>
                  <th>直播用户</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{item.title}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.shop.name}}</td>
                    <td>{{item.user.nickname}}</td>
                    <td v-if="item.status == LVS_STATUS_IDLE"><span class="label label-success">{{ item.status | lvsStatusTrans }}</span></td>
                    <td v-else><span :class="['label', item.status == LVS_STATUS_LIVING ? ' label-warning' : (item.status == LVS_STATUS_DISABLED ? ' label-danger' : '')]">{{ item.status | lvsStatusTrans }}</span></td>
                    <td v-if="item.status != LVS_STATUS_DISABLED">
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="clickDelete"><i class="fa fa-times"></i> 强制下拨</button>
                      <!-- <button class="btn btn-default btn-xs" data-warning="{{ item.id }}" @click="clickWarning"><i class="fa fa-warning"></i> 发警告</button>                        -->
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
   import {LVS_STATUS_IDLE, LVS_STATUS_LIVING, LVS_STATUS_DISABLED} from '../../js/constants';

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有直播数据",
          lvsList:[],
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.liveshow,
          tableList: [],
          LVS_STATUS_IDLE: LVS_STATUS_IDLE,
          LVS_STATUS_LIVING: LVS_STATUS_LIVING,
          LVS_STATUS_DISABLED: LVS_STATUS_DISABLED,
          status:'all'
        }
    },
    components: {
        bootPage
    },
    methods: {
      // 强制下拨
      clickDelete: function(events){
        var self = this;
        var lvsId = $(events.currentTarget).data('delete');
        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.liveshow,
            params: lvsId,
            type: "DELETE",
            success: function (data) {
              if (data && data.ok) {
                //删除成功
                commFun.tip({text:'视屏强制下拨成功',type:'showSuccessToast'});
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
          text: '确定要强制下拨该视屏吗？',
          okCallback:deleteCallback
        });

      },
      // 发警告
      clickWarning: function(events){
        var lvsId = $(events.currentTarget).data('warning');
        //alert("未完待续");
        return false;
      },
      // 按状态查找
      searchByStatus: function() {
        this.param = { status: this.status };
        this.url = commFun.apiRouter.liveshow;
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