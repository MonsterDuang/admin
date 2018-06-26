<template>
<div>
  <section class="content-header">
    <h1>
      预展区商品列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 预展区</a></li>
      <li class="active"> 预展区商品管理</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">预展区商品列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="新增预展商品" @click="addPreGood"><i class="fa fa-plus"></i></button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left" style="width:20%">
                <div class="col-sm-12">
                  <select class="form-control" style="width:100%;" id="preShopSel" v-model="preShopId">
                    <option value="all">全部商铺</option>
                    <template v-for="item in preShopList">
                        <option value="{{ item.id }}">{{ item.name }}</option>        
                    </template>
                  </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>商品名称</th>
                  <th>商家名称</th>
                  <th>估价</th>
                  <th>底价</th>
                  <th>加价幅度</th>
                  <th>拍卖开始</th>
                  <th>拍卖结束</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>
                      <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.name }}详情" class="detail" v-link="{name:'preGoodDetail', query:{ id:item.id }}">{{ item.name }}</a>
                    </td>               
                    <td>{{ item.shop.name }}</td>
                    <td>{{ item.valuation }}</td>
                    <td>{{ item.floorPrice }}</td>                
                    <td>{{ item.raisePriceRange }}</td>
                    <td>{{ item.auctionStartAt | getLastTimeStr }}</td>
                    <td>{{ item.auctionEndAt | getLastTimeStr }}</td>                
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'preGoodAdd', query: { preGoodId: item.id } }"><i class="fa fa-edit"></i> 修改</button>
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deletePreGood"><i class="fa fa-trash"></i> 删除</button>                    
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
                    <div class="pull-left">说明：估价、底价以及加价幅度单位都为“元”</div>
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
    ready() {
      var self = this;
      $('#preShopSel').select2({});
      self.getPreShopList();

      $("#preShopSel").change(function () {
        self.preShopId = $("#preShopSel").val();
        self.searchCommon();
      });
    },
    data() {
        return {
          preShopId: 'all',
          preShopList: [],
          showEmptyTip: false,
          emptyTip: "暂时还没有预展商品数据",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.preGood,
          tableList: []
        }
    },
    components: {
        bootPage
    },
    methods: {
      getPreShopList: function(){
        var self = this;
        commFun.request({
          url: commFun.apiRouter.preShopNoPage,
          data: {},
          success: function (data) {
              self.preShopList = data || [];
          },
          error: function (errData) {
              commFun.errorTip(errData);
          }
        });
      },
      // 新增后管用户
      addPreGood: function() {
        this.$route.router.go({name: 'preGoodAdd'});
      },
      deletePreGood: function(events) {
         var self = this;
         var preGoodId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.preGood,
            params: preGoodId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除预展商品成功',type:'showSuccessToast'});
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
      searchCommon: function(){
        var self = this;
        self.param = {
            shop: self.preShopId,
        };
        setTimeout(function(){ self.refresh(); }, 100);
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