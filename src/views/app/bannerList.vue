<template>
<div>
  <section class="content-header">
    <h1>
      banner图片列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> banner列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">banner列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="新增banner" @click="addBanner"><i class="fa fa-plus"></i></button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>banner图片</th>
                  <th>使用端</th>
                  <th>点击跳转地址</th>
                  <th>创建用户</th>
                  <th>修改用户</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td><img v-bind:src="item.img" style="width:100px;height:50px" /></td>
                    <td>{{item.type | bannerTypeTrans}}</td>
                    <td>{{ item.uri }}</td>
                    <td>{{ item.creator }}</td>
                    <td>{{ item.updator }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'bannerAdd', query: { bannerId: item.id } }"><i class="fa fa-edit"></i> 修改</button>
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deleteBanner"><i class="fa fa-trash"></i> 删除</button>                    
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
          emptyTip: "暂时还没有banner数据，请先去新增banner",
          bannerList:[],
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.banner,
          tableList: []
        }
    },
    components: {
        bootPage
    },
    methods: {
      // 新增banner
      addBanner: function() {
        this.$route.router.go({name: 'bannerAdd'});
      },
      // 删除banner
      deleteBanner: function(events) {
         var self = this;
         var bannerId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.banner,
            params: bannerId,
            type: "DELETE",
            success: function (data) {
              if (data && data.isok) {
                //删除成功
                commFun.tip({text:'删除banner成功',type:'showSuccessToast'});
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
          text: '确定删除该banner吗？',
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