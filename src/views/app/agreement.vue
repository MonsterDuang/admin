<template>
<div>
  <section class="content-header">
    <h1>
      协议编辑
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> 协议编辑</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">协议列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th style="width:18%">协议名称</th>
                  <th style="width:67%">协议内容</th>
                  <th style="width:15%">操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in list">
                  <tr>
                    <td style="width:15%">{{item.discription}}</td>
                    <td v-if="isModify && item.id.toString() == modifyId.toString()" style="width:67%"><textarea row="6" class="form-control" v-model="val"></textarea></td>
                    <td v-else style="width:67%">{{ item.val }}</td>                
                    <td style="width:15%">
                      <button v-if="!isModify" class="btn btn-warning btn-xs" @click="modify(item.id, item.val)"><i class="fa fa-edit"></i> 修改协议</button>
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
  import { PLATFORM_ANDROID } from '../../js/constants';
   export default {
    ready() {
      this.getAgreement();
    },
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有协议信息",
          list:[],
          modifyId: '',
          isModify: false,
          val: '',
        }
    },
    methods: {
      getAgreement: function() {
        var self = this;
        commFun.request({
          url: commFun.apiRouter.agreement,
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

      },
      modify: function(id, val){
        this.modifyId = id;
        this.isModify = true;
        this.val = val;
      },
      modifyOk: function(){
        var self = this, val = this.val.trim();
        var id = this.modifyId;

        if (val.length === 0) {
          commFun.tip({
            text: '请输入协议内容'
          });
          return false;
        }

        var modifyCallback= function() {
          commFun.request({
            url: commFun.apiRouter.agreement,
            params: id,
            data: JSON.stringify({val: val}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                commFun.tip({text:'协议修改成功',type:'showSuccessToast'});
                self.getAgreement();
                self.isModify = false;
                self.modifyId = '';
                self.val = '';
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
          text: '确定修改该协议内容吗？',
          okCallback:modifyCallback
        });

      },
      modifyCancel: function(){
        this.modifyId = '';
        this.isModify = false;
        this.val = '';
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