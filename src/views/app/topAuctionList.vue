<template>
<div>
  <section class="content-header">
    <h1>
      拍卖会场广告位
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> 拍卖会场广告位列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">拍卖会场广告位列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" @click="addTopAuction">设置广告位</button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>商铺名</th>
                  <th>排序</th>
                  <th>创建管理员</th>
                  <th>修改管理员</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{item.shop.name}}</td>
                    <td v-if="isModify  && item.id.toString() == modifyId.toString()"><input type="text" v-model="sortNo"></input></td>
                    <td v-else>{{ item.sortNo }}</td>   
                    <td>{{item.creator}}</td>
                    <td>{{item.updator}}</td>
                    <td>
                      <button v-if="!isModify" class="btn btn-warning btn-xs" @click="modify(item.id, item.sortNo)"><i class="fa fa-edit"></i> 修改排序号</button>
                      <div class="btn-group" v-if="isModify && item.id.toString() == modifyId.toString()">
                        <button class="btn btn-success btn-xs" @click="modifyOk">确定修改</button>
                        <button class="btn btn-primary btn-xs" @click="modifyCancel">取消</button> 
                      </div>
                      &nbsp;&nbsp;
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deleteTopAuction"><i class="fa fa-trash"></i> 删除</button>                    
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
          emptyTip: "暂时还没有设置拍卖会场广告位数据，请先设置",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.topAuction,
          tableList: [],
          isModify: false,
          sortNo: '',
          modifyId: '',
        }
    },
    components: {
        bootPage
    },
    methods: {
      modify: function(id, sortNo){
        this.sortNo = sortNo;
        this.modifyId = id;
        this.isModify = true;
      },
      modifyOk: function(){
        var self = this, sortNo = this.sortNo;
        var id = this.modifyId;

        if (sortNo.length === 0) {
          commFun.tip({
            text: '请输入排序号'
          });
          return false;
        }
        if(!commFun.checkPositiveInteger(sortNo)){
          commFun.tip({ text: "排序为正整数" });
          return false;
        }

        var modifyCallback= function() {
          commFun.request({
            url: commFun.apiRouter.topAuction,
            params: id,
            data: JSON.stringify({sortNo: Number(sortNo)}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:'该商铺排序修改成功',type:'showSuccessToast'});
                self.refresh();
                self.isModify = false;
                self.modifyId = '';
                self.sortNo = '';
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
          text: '确定修改该商铺排序号吗？',
          okCallback:modifyCallback
        });

      },
      modifyCancel: function(){
        this.modifyId = '';
        this.isModify = false;
        this.sortNo = '';
      },
      // 设置拍卖会场广告位数据
      addTopAuction: function() {
        this.$route.router.go({name: 'topAuctionAdd'});
      },
      // 删除拍卖会场广告位数据
      deleteTopAuction: function(events) {
         var self = this;
         var topAuctionId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.topAuction,
            params: topAuctionId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除拍卖会场广告位成功',type:'showSuccessToast'});
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
          text: '确定删除该拍卖会场广告位吗？',
          okCallback:deleteCallback
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