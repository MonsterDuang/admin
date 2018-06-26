<template>
<div>
  <section class="content-header">
    <h1>
      鉴宝师分成设置
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 分润管理</a></li>
      <li class="active"> 鉴宝师分成设置</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">鉴宝师分成详情</h3>
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
                  <th>配置名称</th>
                  <th>配置内容</th>
                  <th>分成</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in list">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.discription }}</td>
                    <td v-if="isModify && item.id.toString() == modifyId.toString()"><input type="text" v-model="cut"></input></td>
                    <td v-else>{{ item.val }}</td>        
                    <td>
                      <button v-if="!isModify" class="btn btn-warning btn-xs" @click="modify(item.id, item.val)"><i class="fa fa-trash"></i> 修改分成</button>
                      <div class="btn-group" v-if="isModify && item.id.toString() == modifyId.toString()">
                        <button class="btn btn-success btn-xs" @click="modifyOk">确定修改</button> 
                        <button class="btn btn-danger btn-xs" @click="modifyCancel">取消</button>     
                      </div>                
                    </td>
                  </tr>
                </template>
                <tr v-show="showEmptyTip">
                  <td colspan="20">{{ emptyTip }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>

   export default {
    ready() {
      var self = this;
      self.getSetList();
    },
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有鉴宝师分成数据",
          list: [],
          isModify: false,
          cut:'',
          modifyId:'',
        }
    },
    methods: {
      refresh: function(){
        this.getSetList();
      },
      // 获取分成数据
      getSetList: function(){
        var self = this;
        commFun.request({
            url: commFun.apiRouter.profit_cut,
            type: "GET",
            success: function (data) {
              if (data) {
                self.list = data;
                self.showEmptyTip = data.length > 0 ? false : true;
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
      modify: function(id, cut){
        this.modifyId = id;
        this.isModify = true;
        this.cut = cut;
      },
      modifyOk: function(){
        var self = this, cut = this.cut.trim();
        var id = this.modifyId;
        if (cut.length === 0) {
          commFun.tip({
            text: '请输入分成'
          });
          return false;
        }

        if(! commFun.checkFloatLessOne(cut)){
          commFun.tip({
            text: '分成格式不对，请正确输入'
          });
          return false;
        }
        var modifyCallback = function(){
          commFun.request({
            url: commFun.apiRouter.profit_cut,
            params: id,
            data: JSON.stringify({cut: cut}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:'鉴宝师分成设置成功',type:'showSuccessToast'});
                self.refresh();
                self.isModify = false;
                self.modifyId = '';
                self.cut = '';
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
          text: '确定修改该鉴宝师分成吗？',
          okCallback:modifyCallback
        });

      },
      modifyCancel: function(){
        this.modifyId = '';
        this.isModify = false;
        this.cut = '';
      }
    },

}
</script>