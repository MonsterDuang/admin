<template>
<div>
  <section class="content-header">
    <h1>
      拍卖会视频列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 拍卖会管理</a></li>
      <li class="active"> 拍卖会视频列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">拍卖会视频列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" @click="addMessages">添加拍卖会视频</button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>拍卖会标题</th>
                  <th>播放数</th>
                  <th>点赞数</th>
                  <th>评论数</th>
                  <th>视频地址</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.title }}</td>
                    <td>{{ item.playCount }}</td>
                    <td>{{ item.likeCount }}</td>
                    <td>{{ item.commentCount }}</td>
                    <td>{{ item.videos }}</td>
                    <td> 
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deleteAuction"><i class="fa fa-trash"></i> 删除</button>                        
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
          emptyTip: "暂时还没有拍卖视频",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.auction,
          tableList: []
        }
    },
    components: {
        bootPage
    },
    methods: {
      deleteAuction: function(events){
        var self = this;
         var auctionId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.auction,
            params: auctionId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除拍卖会成功',type:'showSuccessToast'});
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
          text: '确定删除该预展商品吗？',
          okCallback:deleteCallback
        });
      },
      addMessages: function(){
        this.$route.router.go({name: "auctionAdd"});
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