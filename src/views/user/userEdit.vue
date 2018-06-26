<template>
<div>
  <section class="content-header">
    <h1>
      修改用户昵称密码
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="#"> 用户</a></li>
      <li class="active"> 昵称密码修改</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">请输入用户昵称和密码</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="nickname" class="col-sm-2 control-label">昵称</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="nickname">
                </div>
                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
              </div>

              <div class="form-group">
                <label for="password" class="col-sm-2 control-label">新密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" v-model="password">
                  <p class="help-block">说明：不填则默认密码不修改</p>
                </div>
              </div>   
              <div class="form-group">
                <label for="repassword" class="col-sm-2 control-label">确认密码</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" v-model="repassword">
                </div>
              </div>           
            </div>
          </form>
          <div class="box-footer">
            <div class="col-sm-1">
                <button type="button" class="btn btn-primary" @click="back">返回</button>
            </div>
            <div class="col-sm-1">
            <button type="button" class="btn btn-info" @click="saveUserEdit" :disabled="isDisabled">保存</button>
            </div>
          </div>
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
    },
    data() {
        return {
          nickname: this.$route.query.nickname,
          password: '',
          repassword: '',
          userId:'',
          isDisabled: false
        }
    },
    route: {
      data(transition){
        this.nickname = this.$route.query.nickname;
        this.userId = this.$route.query.userId;
      }
    },
    methods: {
      saveUserEdit:function(){
        var self = this;
        if(self.isDisabled){
          return false;
        }
        self.isDisabled = true;

        var nickname = self.nickname.trim();
        var password = self.password.trim();
        var repassword = self.repassword.trim();

        if (nickname.length === 0) {
          commFun.tip({ text: '昵称不能为空' });
          self.isDisabled = false;
          return;
        }

        if(password !== repassword){
          commFun.tip({ text: '新密码和确认密码必须一致' });
          self.isDisabled = false;
          return false;
        }

        if(password.length !== 0){
          password = CryptoJS.AES.encrypt(password, ENCRYPT_PWD).toString();
          repassword = CryptoJS.AES.encrypt(repassword, ENCRYPT_PWD).toString();
        }

        var params = {
          userId : this.userId,
          nickname: nickname,     
          password: password,
          repassword: repassword
        };

        commFun.request({
          url: commFun.apiRouter.userEdit,
          type: 'PUT',
          data: JSON.stringify(params),
          success: function (data) {
            if (data && data.isOk) {
              commFun.tip({text:'用户昵称密码修改成功',type:'showSuccessToast'});
              self.$route.router.go({name:'userList'});
            }
            else{
              self.isDisabled = false;
              commFun.tip({text:'无数据返回，稍后再试'});
            }
          },
          error: function (errData) {
            self.isDisabled = false;
            commFun.errorTip(errData,'修改昵称密码，请稍后再试');
          }
        });
      },
      back:function(){
          this.$route.router.go({name:"userList"});
      }
    }
  }
</script>