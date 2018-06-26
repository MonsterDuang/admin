<template>
<div>
  <section class="content-header">
    <h1>
      待审核商户列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 申请审核管理</a></li>
      <li class="active"> 待审核商户列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">待审核商户列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>真实姓名</th>
                  <th>昵称</th>
                  <th>手机号码</th>
                  <th>身份证号码</th>
                  <th>店铺名称</th>
                  <th>信用代码</th>
                  <th>相关证件照</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.realname }}</td>
                    <td>{{ item.user.nickname }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.idCard }}</td>
                    <td>{{ item.shopname }}</td>
                    <td>{{ item.creditCode }}</td>
                    <td><button class="btn btn-default btn-xs" @click="viewPhoto(item.businessLicensePhoto, item.idCardPhoto)">查看</button></td>
                    <td>
                      <button class="btn btn-default btn-xs" data-apply="{{ item.id }}" @click="agreeApply"><i class="fa fa-thumbs-o-up"></i> 同意</button>
                      <button class="btn btn-danger btn-xs" data-apply="{{ item.id }}" @click="disagreeApply"><i class="fa fa-remove"></i> 拒绝</button>                    
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
          emptyTip: "暂时还没有商户申请",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.shopApplyList,
          tableList: []
        }
    },
    components: {
        bootPage
    },
    methods: {
      viewPhoto: function(photo1, photo2){
        var self = this;
        var photoArr = [];
        photoArr.push({text:'营业执照', photo: photo1});
        photoArr.push({text:'身份证照片', photo: photo2});
        commFun.info_tip({title:'相关证件照', imgArr: photoArr});
      },
      // 拒绝申请
      disagreeApply: function(events) {
        var self = this;
        var applyId = $(events.currentTarget).data('apply');
        commFun.warn_tip({ 
          text: '确定要拒绝该商户申请吗',
          okCallback:function(){
            self.commonApply(applyId,'refuse');
          }
        });
      },
      // 同意申请
      agreeApply: function(events) {
        var self = this;
        var applyId = $(events.currentTarget).data('apply');
        commFun.warn_tip({ 
          text: '确定要同意该商户申请吗',
          okCallback:function(){
            self.commonApply(applyId, 'agree');
          }
        });
      },

      // 申请
      commonApply: function(applyId, status){
        var self = this;
        commFun.request({
          url: commFun.apiRouter.apply,
          params: applyId,
          data: JSON.stringify({status: status}),
          type: "PUT",
          success: function (data) {
            if (data && data.isok) {
              // 成功
              commFun.tip({text:'审批成功',type:'showSuccessToast'});
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