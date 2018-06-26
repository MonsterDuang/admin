<template>
<div>
  <section class="content-header">
    <h1>
      评论列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 社区管理</a></li>
      <li class="active"> 评论列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">评论列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-4">
                  <select class="form-control" v-model="type" v-on:change="searchByType">
                          <option value="all">全部类型</option>
                          <option value="{{auctionComm}}">{{auctionComm | commentTrans}}</option>
                          <option value="{{lvsComm}}">{{lvsComm | commentTrans}}</option>    
                          <option value="{{postComm}}">{{postComm | commentTrans}}</option>               
                      </select>
                </div>
                 <div class="col-sm-8">
                  <div class="col-sm-9">
                    <input v-model="searchWord" type="text" class="form-control" placeholder="请输入评论用户"> 
                  </div>
                  <button type="button" class="btn btn-primary" @click="search">搜索</button>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>评论内容</th>
                  <th>评论类型</th>
                  <th>评论对象标题</th>
                  <th>评论用户</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.content }}</td>
                    <td v-if="item.kind == auctionComm"><span class="label label-success">{{ item.kind | commentTrans }}</span></td>
                    <td v-else><span :class="['label', item.kind === lvsComm ? 'label-danger ' : (item.kind === postComm ? 'label-warning ' : '')]">{{ item.kind | commentTrans }}</span></td>
                    <td v-if="item.kind == auctionComm">{{ item.auction.title }}</td>
                    <template v-else>
                      <td v-if="item.kind == lvsComm">{{ item.lvs.title }}</td>
                      <td v-else>{{ item.post.title }}</td>
                    </template>
                    <td>{{ item.nickname }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" data-delete="{{item.id}}" @click="deleteComment"<i class="fa fa-delete"></i> 删除评论</button>                   
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
   import {COMMENT_AUCTION, COMMENT_LVS, COMMENT_POST} from '../../js/constants';

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有评论",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.comment,
          tableList: [],
          type:'all',
          auctionComm: COMMENT_AUCTION,
          lvsComm: COMMENT_LVS,
          postComm: COMMENT_POST,
          searchWord: ''
        }
    },
    components: {
        bootPage
    },
    methods: {
      deleteComment: function(events){
        var self = this;
        var commentId = $(events.currentTarget).data('delete');
        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.comment,
            params: commentId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除该评论成功',type:'showSuccessToast'});
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
          text: '确定要删除该预展评论吗？（注意：该评论的子评论会同时被删除）',
          okCallback:deleteCallback
        });
      },
      // 按角色查找
      searchByType: function() {
        this.searchWord = '';
        this.param = { type: this.type };
        this.url = commFun.apiRouter.comment;
        setTimeout(() => { this.refresh();},100);
      },
      search: function(){
        this.param = { type: this.type, searchWord: this.searchWord };
        this.url = commFun.apiRouter.comment;
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