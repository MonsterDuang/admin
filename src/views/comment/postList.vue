<template>
<div>
  <section class="content-header">
    <h1>
      帖子列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 社区管理</a></li>
      <li class="active"> 帖子列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">帖子列表</h3>
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
                          <option value="{{typePhoto}}">{{typePhoto | postTypeTrans}}</option>
                          <option value="{{typeVideo}}">{{typeVideo | postTypeTrans}}</option>                  
                      </select>
                </div>
                <div class="col-sm-8">
                  <div class="col-sm-9">
                    <input v-model="searchWord" type="text" class="form-control" placeholder="请输入帖子标题"> 
                  </div>
                  <button type="button" class="btn btn-primary" @click="search">搜索</button>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>帖子标题</th>
                  <th>帖子类型</th>
                  <th>发帖用户</th>
                  <th>点赞数</th>
                  <th>评论数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.title }}</td>
                    <td v-if="item.type == typePhoto"><span class="label label-success">{{ item.type | postTypeTrans }}</span></td>
                    <td v-else><span :class="['label', item.type === typeVideo ? 'label-primary ' : '']">{{ item.type | postTypeTrans }}</span></td>
                    <td>{{ item.user.nickname }}</td>
                    <td>{{ item.likeCount }}</td>
                    <td>{{ item.commentCount }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" data-delete="{{item.id}}" @click="deletePost"<i class="fa fa-delete"></i> 删除帖子</button>                   
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
   import {POST_TYPE_PHOTO, POST_TYPE_VIDEO} from '../../js/constants';

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有评论",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.post,
          tableList: [],
          type:'all',
          typePhoto: POST_TYPE_PHOTO,
          typeVideo: POST_TYPE_VIDEO,
          searchWord: ''
        }
    },
    components: {
        bootPage
    },
    methods: {
      deletePost: function(events){
        var self = this;
        var postId = $(events.currentTarget).data('delete');
        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.post,
            params: postId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除该帖子成功',type:'showSuccessToast'});
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
          text: '确定要删除该帖子吗？',
          okCallback:deleteCallback
        });
      },
      // 按角色查找
      searchByType: function() {
        this.searchWord = '';
        this.param = { type: this.type };
        this.url = commFun.apiRouter.post;
        setTimeout(() => { this.refresh(); }, 100);
      },
      search: function(){
        this.param = { type: this.type, searchWord: this.searchWord };
        this.url = commFun.apiRouter.post;
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