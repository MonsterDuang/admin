<template>
<div>
  <section class="content-header">
    <h1>
      预展区商铺列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 预展区</a></li>
      <li class="active"> 预展区商铺管理</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">预展区商铺列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="新增预展商铺" @click="addPreShop"><i class="fa fa-plus"></i></button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>商家名称</th>
                  <th>商品数量</th>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>
                      <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.name }}详情" class="detail" v-link="{name:'preShopDetail', query:{ id:item.id }}">{{ item.name }}</a>
                    </td>      
                    <td>{{ item.goodsCount }}</td>
                    <td>{{ item.startAt | getLastTimeStr }}</td>
                    <td>{{ item.endAt | getLastTimeStr }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'preShopAdd', query: { preShopId: item.id } }"><i class="fa fa-edit"></i> 修改</button>
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deletePreShop"><i class="fa fa-trash"></i> 删除</button>                    
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
          emptyTip: "暂时还没有预展商铺数据",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.preShop,
          tableList: []
        }
    },
    components: {
        bootPage
    },
    methods: {
      addPreShop: function() {
        this.$route.router.go({name: 'preShopAdd'});
      },
      deletePreShop: function(events) {
         var self = this;
         var preShopId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.preShop,
            params: preShopId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除预展商铺成功',type:'showSuccessToast'});
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
          text: '确定删除该预展商铺吗？注意：删除该商铺的同时，该商铺的预展商品也同时删除！！！',
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