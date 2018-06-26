<template>
<div>
  <section class="content-header">
    <h1>
      密码修改
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li class="active"> 修改密码</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">请输入密码信息</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="appName" class="col-sm-2 control-label">原密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" placeholder="请输入原密码" v-model="oldPassword">  
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="appName" class="col-sm-2 control-label">设置新密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" placeholder="请设置新秘密" v-model="password">  
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
              <div class="form-group">
                <label for="appName" class="col-sm-2 control-label">确认新秘密</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" placeholder="请再次输入新秘密" v-model="rePassword">
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>
            </div>
            <div class="box-footer">
              <div class="col-sm-1">
                <button type="button" class="btn btn-primary" @click="back">返回</button>
              </div>
              <div class="col-sm-1">
                <button type="button" class="btn btn-info" @click="save" disabled="{{isSaveDisabled}}">确定</button>
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
  import { ENCRYPT_PWD } from '../../js/constants';
  export default {
    ready() {
      var self = this;
    },
    data() {
        return {
          oldPassword: '',
          password: '',
          rePassword: '',
          isSaveDisabled: false,
        }
    },
    route:{
        data(transition){
        }
    },
    methods: {

      //点击返回按钮
      back:function(){
        history.go(-1);
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

      //点击保存按钮
      save:function(){
        var self = this;
        if(self.isSaveDisabled){
          return false;
        }
        self.isSaveDisabled = true;
        
        //必填
        var oldPassword = self.oldPassword.trim();
        var password = self.password.trim();
        var rePassword = self.rePassword.trim();
        // 判断是否为空
        var isEmpty1 = this.checkEmpty(oldPassword, '原密码不能为空');
        var isEmpty2 = this.checkEmpty(password, '密码不能为空');
        var isEmpty3 = this.checkEmpty(rePassword, '确认密码不能为空');
        if(! (isEmpty1 && isEmpty2 && isEmpty3)){
          return false;
        }
        // 判断是否一致
        if(password !== rePassword){
          commFun.tip({ text: '密码和确认密码必须一致' });
          self.isSaveDisabled = false;
          return false;
        }

        var params = {
          oldPassword: CryptoJS.AES.encrypt(oldPassword,ENCRYPT_PWD).toString(),
          password: CryptoJS.AES.encrypt(password,ENCRYPT_PWD).toString(),
          rePassword: CryptoJS.AES.encrypt(rePassword,ENCRYPT_PWD).toString()
        };

        commFun.request({
          url: commFun.apiRouter.passwordSet,
          type: 'PUT',
          data: JSON.stringify(params),
          success: function (data) {
            self.isSaveDisabled = false;
            if (data && data.isOk) {
              self.oldPassword = '',self.password = '',self.rePassword = '';
              commFun.tip({text:'密码修改成功',type:'showSuccessToast'});
              // TODO 密码修改完之后的逻辑，跳转到哪里？？
            }
            else{
              commFun.tip({text:'无数据返回，稍后再试'});
            }
          },
          error: function (errData) {
            self.isSaveDisabled = false;
            commFun.errorTip(errData);
          }
        });

      }



    }
}
</script>

