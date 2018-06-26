<template>
<div>
  <section class="content-header">
    <h1>
      背景图片
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> 背景图片</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">背景图片列表</h3>
            <div style="margin-top:10px;">注意:上传背景图片会替换已有的背景图片</div>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>描述</th>
                  <th>图片名称</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in list">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td >{{ item.discription }}</td>
                    <td>{{ item.val }}</td>                
                    <td>
                      <button class="btn btn-warning btn-xs" v-link="{ name: 'pictureAdd', query: { name: item.name} }"><i class="fa fa-upload"></i> 上传背景图</button>
                    </td>
                  </tr>
                </template>
                <tr v-show="showEmptyTip">
                  <td colspan="20">{{ emptyTip }}</td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
  import { PLATFORM_ANDROID } from '../../js/constants';
   export default {
    ready() {
      this.getBackgroundPic();
    },
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有背景图信息",
          list:[]
        }
    },
    methods: {
      getBackgroundPic: function() {
        var self = this;
        commFun.request({
          url: commFun.apiRouter.backgroundPic,
          type: "GET",
          success: function (data) {
            if (data) {
              self.list = data;
            }
            else{
              commFun.tip({text:'无数据返回，稍后再试'});
            }
          },
          error: function (errData) {
            commFun.errorTip(errData || '获取协议内容失败');
          }
        });
      }
    }
}
</script>