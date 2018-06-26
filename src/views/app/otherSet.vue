<template>
<div>
  <section class="content-header">
    <h1>
      其他设置
    </h1>
    <ol class="breadcrumb">
       <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> 其他设置</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">请输入相关信息</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="hotWords" class="col-sm-2 control-label">热门搜索词</label>
                <div class="col-sm-8">
                  <select class="form-control select2" style="width:100%" id="hotWordsList" multiple="multiple">
                    <template v-for="item in hotList">
                      <option value="{{ item }}">{{ item }}</option>
                    </template>
                  </select>
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="sensitive" class="col-sm-2 control-label">敏感词</label>
                <div class="col-sm-8">
                  <select class="form-control select2" style="width:100%" id="sensitiveList" multiple="multiple">
                    <template v-for="item in senList">
                      <option value="{{ item }}">{{ item }}</option>
                    </template>
                  </select>
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="numberVal" class="col-sm-2 control-label">联系电话</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="numberVal">  
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="aboutVal" class="col-sm-2 control-label">关于我们</label>
                <div class="col-sm-8">
                  <textarea row="20" type="text" class="form-control" style="min-height: 400px" v-model="aboutVal"></textarea>
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
            </div>
            <div class="box-footer">
              <div class="col-sm-1">
                <button type="button" class="btn btn-primary" @click="back">返回</button>
              </div>
              <div class="col-sm-2">
                <button type="button" class="btn btn-info" @click="save" disabled="{{isSaveDisabled}}">确定修改</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
  import { ABOUT_US, CONTACT_NUMBER, HOT_WORDS, SENSITIVE_WORDS } from '../../js/constants';
   export default {
    ready() {
      this.getConfiguration();
      $("#hotWordsList").select2({
        tags: true
      });
      $("#sensitiveList").select2({
        tags: true
      });
    },
    data() {
        return {
          list:[],
          ABOUT_US: ABOUT_US,
          CONTACT_NUMBER: CONTACT_NUMBER,
          HOT_WORDS: HOT_WORDS,
          SENSITIVE_WORDS: SENSITIVE_WORDS,
          aboutVal: '',
          numberVal: '',
          hotList: [],
          senList:[],
          isSaveDisabled: false,
        }
    },
    methods: {
      getConfiguration: function() {
        var self = this;
        commFun.request({
          url: commFun.apiRouter.other,
          type: "GET",
          success: function (data) {
            if (data) {
              var arr = data || [];
              for(var i = 0; i < arr.length; i++){
                if(arr[i].name === self.ABOUT_US){
                  self.aboutVal = arr[i].val;
                } else if(arr[i].name === self.CONTACT_NUMBER){
                  self.numberVal = arr[i].val;
                } else if(arr[i].name === self.HOT_WORDS){
                  self.hotList = arr[i].val;
                  setTimeout(function(){
                    $("#hotWordsList").select2('val', self.hotList);
                  }, 1000);
                } else if(arr[i].name === self.SENSITIVE_WORDS){
                  self.senList = arr[i].val;
                  setTimeout(function(){
                    $("#sensitiveList").select2('val', self.senList);
                  }, 1000);
                }
              }

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
      checkEmpty(value, message) {
        var self = this;
        if(! value){
          commFun.tip({ text: message });
          self.isSaveDisabled = false;
          return false;
        }
        return true;
      },
      back: function(){
        history.go(-1);
      },
      save: function(){
        var self = this;
        if(self.isSaveDisabled){
          return false;
        }
        self.isSaveDisabled = true;

        var aboutVal = self.aboutVal.trim();
        var numberVal = self.numberVal.trim();
        var hotList = $("#hotWordsList").val() || [];
        var senList = $("#sensitiveList").val() || [];

         // 判断是否为空
        var isEmpty1 = this.checkEmpty(aboutVal, '关于我们不能为空');
        var isEmpty2 = this.checkEmpty(numberVal, '联系电话不能为空');
        if(! (isEmpty1 && isEmpty2)){
          return false;
        }
        if(hotList.length === 0){
          commFun.tip({ text: '热门搜索词不能为空' });
          self.isSaveDisabled = false;
          return false;
        }
         if(senList.length === 0){
          commFun.tip({ text: '敏感词不能为空' });
          self.isSaveDisabled = false;
          return false;
        }

        commFun.request({
          url: commFun.apiRouter.other,
          type: 'PUT',
          data: JSON.stringify({
            aboutVal: aboutVal,
            numberVal: numberVal,
            hotList: hotList,
            senList: senList
          }),
          success: function (data) {
            if (data && data.isok) {
              commFun.tip({text:'相关设置设置成功',type:'showSuccessToast'});
              self.getConfiguration();
            }
            else{
              commFun.tip({text:'无数据返回，稍后再试'});
            }
          },
          error: function (errData) {
            commFun.errorTip(errData);
          },
          complete: function(){
             self.isSaveDisabled = false;
          }
        });

      }
    }
}
</script>