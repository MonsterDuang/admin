<template>
<div>
  <section class="content-header">
    <h1>
      用户列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 用户管理</a></li>
      <li class="active"> 用户列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">用户列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" v-link="{ name: 'shopAdd' }">添加商户</i></button>
                <button class="btn btn-default btn-sm" v-link="{ name: 'appraiserAdd' }">添加鉴宝师</i></button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group">
                <div class="col-sm-2" style="margin-bottom:15px;">
                  <select class="form-control" id="type" v-model="type" v-on:change="searchCommon">
                    <option value="all">全部用户类型</option>
                    <option value="{{USER_TYPE_NORMAL}}">普通用户</option>
                    <option value="{{USER_TYPE_SHOP}}">商户</option>  
                    <option value="{{USER_TYPE_APPRAISER}}">鉴宝师</option>                
                  </select>
                </div>
                <div class="col-sm-2" style="margin-bottom:15px;">
                  <select class="form-control" id="gender" v-model="gender" v-on:change="searchCommon">
                    <option value="all">全部性别</option>
                    <option value="{{GENDER_MAN}}">男</option>
                    <option value="{{GENDER_WOMAN}}">女</option>               
                  </select>
                </div>
                <div class="col-sm-8" style="margin-bottom:15px;">
                  <div class="col-sm-4">
                    <input v-model="searchWord" type="text" class="form-control" placeholder="请输入手机号或昵称"> 
                  </div>
                  <button type="button" class="btn btn-primary" @click="search">搜索</button>
                </div>

              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>昵称</th>
                  <th>性别</th>
                  <th>手机号</th>
                  <th>状态</th>
                  <th>用户类型</th>
                  <th>来源</th>
                  <th>能否评论</th>
                  <th>上次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>      
                    <!-- <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.nickname }}详情" class="detail" v-page-keys:userList v-link="{name:'userInfo', query:{ userId:item.id }}">{{ item.nickname }}</a>               -->
                    <td>{{ item.nickname }}</td>
                    <td v-if="item.gender == GENDER_MAN"><span class="label label-primary">{{ item.gender | userGenderTrans }}</span></td>
                    <td v-else><span :class="['label', item.gender === GENDER_WOMAN ? 'label-success' : '']">{{ item.gender | userGenderTrans }}</span></td>
                    <td>{{item.phone}}</td>
                    <td v-if="item.status == STATUS_NORMAL"><span class="label label-primary">{{ item.status | userStatusTrans }}</span></td>
                    <td v-else><span :class="['label', item.status === STATUS_STOP ? 'label-danger ' : '']">{{ item.status | userStatusTrans }}</span></td>
                    <td v-if="item.type == USER_TYPE_NORMAL"><span class="label label-success">{{ item.type | userTypeTrans }}</span></td>
                    <td v-else><span :class="['label', item.type === USER_TYPE_SHOP ? 'label-danger ' : (item.type === USER_TYPE_APPRAISER ? 'label-warning ' : '')]">{{ item.type | userTypeTrans }}</span></td>
                    <td>{{item.source | userSourceTrans}}</td>
                    <td v-if="item.canComment"><span class="label label-primary">{{ item.canComment | canCommentTrans }}</span></td>
                    <td v-else><span class="label label-danger">{{ item.canComment | canCommentTrans }}</span></td>
                    <td>{{ item.lastLoginAt | getLastTimeStr }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'userEdit', query: { userId: item.id, nickname: item.nickname }}"><i class="fa fa-edit"></i> 修改</button>    
                      <button class="btn btn-default btn-xs" v-link="{ name: 'userInfo', query: { userId: item.id, page: 'userList' }}" v-if="item.type != USER_TYPE_NORMAL"><i class="fa fa-hand-o-right"></i> 详情</button> 
                      <button class="btn btn-default btn-xs" @click="banOfComment(item.id)" v-if="item.canComment"><i class="fa fa-ban"></i> 禁发评论</button>  
                      <button class="btn btn-default btn-xs" @click="allowComment(item.id)" v-else><i class="fa fa-check"></i> 允许发评论</button>  
                      <button class="btn btn-default btn-xs" @click="statusStop(item.id)" v-if="item.status == STATUS_NORMAL"><i class="fa fa-user-times"></i> 封停</button> 
                      <button class="btn btn-default btn-xs" @click="statusStart(item.id)" v-if="item.status == STATUS_STOP"><i class="fa fa-user"></i> 解除封停</button>                 
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
   import {GENDER_MAN, GENDER_WOMAN, STATUS_NORMAL, STATUS_STOP, USER_TYPE_NORMAL, USER_TYPE_SHOP, USER_TYPE_APPRAISER
 } from '../../js/constants';

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有用户数据，请先去新增用户",
          userList:[],
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.user,
          tableList: [],
          GENDER_MAN:GENDER_MAN,
          GENDER_WOMAN:GENDER_WOMAN,
          SOURCE_PHONE:commFun.constants.SOURCE_PHONE,
          SOURCE_WECHAT:commFun.constants.SOURCE_WECHAT,
          SOURCE_QQ:commFun.constants.SOURCE_QQ,
          STATUS_NORMAL: STATUS_NORMAL,
          STATUS_STOP: STATUS_STOP,
          USER_TYPE_NORMAL: USER_TYPE_NORMAL,
          USER_TYPE_SHOP: USER_TYPE_SHOP,
          USER_TYPE_APPRAISER: USER_TYPE_APPRAISER,
          type: 'all',
          gender: 'all',
          searchWord: '',
        }
    },
    components: {
        bootPage
    },
    methods: {
      allowComment: function(id){
        this.commentCommon(id, true, '确定要允许该用户评论吗？', '批准该用户发评论成功')
      },
      banOfComment: function(id){
        this.commentCommon(id, false, '确定要禁止该用户评论吗？', '禁止该用户发评论成功');
      },
      commentCommon: function(id, canComment, confrimTips, successTips ){
        var self = this;
        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.userComment,
            data: JSON.stringify({canComment:canComment}),
            params: id,
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:successTips, type:'showSuccessToast'});
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
          text: confrimTips,
          okCallback:deleteCallback
        });

      },
      statusStop: function(id){
        this.statusCommon(id, this.STATUS_STOP ,'确定要封停该用户吗？', '该用户封停成功');
      },
      statusStart: function(id){
        this.statusCommon(id, this.STATUS_NORMAL ,'确定要解除该封停的用户吗？', '解除该用户封停成功');
      },
      statusCommon: function(id, status, confrimTips, successTips){
        var self = this;
        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.userStatus,
            data: JSON.stringify({status:status}),
            params: id,
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:successTips, type:'showSuccessToast'});
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
          text: confrimTips,
          okCallback:deleteCallback
        });

      },
      searchCommon: function(){
        this.searchWord = '';
        this.param = { type: this.type, gender: this.gender };
        this.url = commFun.apiRouter.user;
        setTimeout(() => { this.refresh(); }, 100);
      },
      search: function(){
        this.param = { type: this.type, gender: this.gender, searchWord: this.searchWord };
        this.url = commFun.apiRouter.user;
        this.activeNum = 0;
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