<template>
  <div>
    <section class="content-header">
      <h1>{{title}}</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
        <li><a href="#"> 后管用户管理</a></li>
        <li class="active"> {{title}}</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">填写后管用户相关信息</h3>
            </div>
            <form class="form-horizontal">
              <div class="box-body">
                <div class="form-group">
                  <label for="username" class="col-sm-2 control-label">用户名</label>
                  <div class="col-sm-8">
                    <input v-model="username" type="text" class="form-control" placeholder="请输入用户名" maxlength="20">   
                    <p class="help-block">1-20个英文数字组合，不允许有特殊字符</p>                                
                  </div>
                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                </div>
                  <div class="form-group">
                    <label for="role" class="col-sm-2 control-label">角色</label>
                    <div class="col-sm-8">
                      <select class="form-control" id="role" v-model="role" value={{role}} v-on:change="roleChange">
                          <option value="{{normalAdmin}}">普通管理员</option>
                          <option value="{{superAdmin}}">超级管理员</option>
                      </select>
                    </div>
                    <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                  </div>
                    <div class="form-group" v-show="isPerShow">
                      <label for="permission" class="col-sm-2 control-label">权限</label>
                      <div class="col-sm-2">
                        <div class="checkbox">
                          <label><input type="checkbox" v-model="permission.admin">后台设置</label>
                        </div>
                      </div>
                      <div class="col-sm-2">
                        <div class="checkbox">
                          <label><input type="checkbox" v-model="permission.user">用户管理</label>
                        </div>
                      </div>
                      <div class="col-sm-2">
                        <div class="checkbox">
                          <label><input type="checkbox" v-model="permission.message">消息管理</label>
                        </div>
                      </div>
                      <div class="col-sm-2">
                        <div class="checkbox">
                          <label><input type="checkbox" v-model="permission.app">APP管理</label>
                        </div>
                      </div>
                  </div>
                  <div class="form-group" v-show="isPerShow">
                    <label for="permission" class="col-sm-2 control-label"></label>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.profit">分润管理</label>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.live">直播管理</label>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.preview">预展区</label>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.fund">资金管理</label>
                      </div>
                    </div>
                  </div> 
                  <div class="form-group" v-show="isPerShow">
                    <label for="permission" class="col-sm-2 control-label"></label>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.applycheck">申请审核</label>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.comment">社区管理</label>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.auction">拍卖会管理</label>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.appraisal">鉴宝管理</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" v-show="isPerShow">
                    <label for="permission" class="col-sm-2 control-label"></label>
                    <div class="col-sm-2">
                      <div class="checkbox">
                        <label><input type="checkbox" v-model="permission.recommend">首页推荐</label>
                      </div>
                    </div>
                    <span class="col-sm-2 control-label text-red" style="text-align:left">（至少选择一个）</span>
                  </div>
                  <div class="form-group">
                    <label for="password" class="col-sm-2 control-label">用户密码</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" placeholder="请输入用户密码" v-model="password" maxlength=20>
                        <p class="help-block">说明：不填则为默认密码,默认密码为123456</p>
                    </div>
                  </div> 
              </div>
              <div class="box-footer">
                <div class="col-sm-1">
                  <button type="button" class="btn btn-primary" id="back" @click="goBack">返回</button>
                </div>
                <div class="col-sm-1">
                  <button type="button" class="btn btn-info" @click="addAdminUser" disabled="{{isSaveDisabled}}">保存</button>
                </div>
                <label class="col-sm-4 control-label" style="color:red;" id="errTip"></label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {
  NORMAL_ADMIN,
  SUPER_ADMIN,
  PERMISSION_ALL,
  ENCRYPT_PWD
} from "../../js/constants";
export default {
  ready() {},
  data() {
    return {
      username: "",
      role: NORMAL_ADMIN,
      password: "",
      permission: {
        admin: false,
        user: false,
        message: false,
        app: false,
        profit: false,
        live: false,
        preview: false,
        fund: false,
        applycheck: false,
        comment: false,
        auction: false,
        appraisal: false,
        recommend: false
      },
      isPerShow: true,
      title: "新增后管用户",
      passText: "说明：不填则为默认密码",
      adminUserId: "",
      superAdmin: SUPER_ADMIN,
      normalAdmin: NORMAL_ADMIN,
      permissionArr: PERMISSION_ALL,
      isSaveDisabled: false
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var adminUserId = this.$route.query.adminUserId;
      var page = this.$route.query.page;
      if (
        typeof adminUserId !== "undefined" &&
        adminUserId &&
        page === "edit"
      ) {
        this.adminUserId = adminUserId;
        this.title = "修改后管用户";
        this.passText = "说明：不填则为默认不修改密码";
        //根据id查询用户详情
        this.getAdminUserDetail(adminUserId);
      }
    }
  },
  methods: {
    //根据id查询用户详情
    getAdminUserDetail: function(adminUserId) {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.adminUserDetail,
        params: adminUserId,
        // data: {id: adminUserId},
        success: function(data) {
          if (data) {
            self.username = data.username;
            self.role = data.role;
            self.isPerShow = self.role === self.superAdmin ? false : true;
            if (self.isPerShow) {
              for (var i = 0; i < self.permissionArr.length; i++) {
                var item = self.permissionArr[i];
                if (data.permission.indexOf(item) > -1) {
                  self.permission[item] = true;
                }
              }
            }
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData);
        }
      });
    },
    //点击保存按钮，添加或者修改后管用户
    addAdminUser: function() {
      var self = this,
        params = {};
      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      params.username = self.username;
      params.role = self.role;
      params.password = self.password;
      if (self.password.length !== 0) {
        params.password = CryptoJS.AES
          .encrypt(self.password, ENCRYPT_PWD)
          .toString();
      }

      // todo 用户名格式检查不完整。只校验了不为空和最长输入
      if (params.username.length === 0) {
        commFun.tip({ text: "用户名不能为空" });
        self.isSaveDisabled = false;
        return;
      }

      if (!commFun.checkInfoLength(params.username, 20)) {
        commFun.tip({ text: "用户名最多输入20个字" });
        self.isSaveDisabled = false;
        return;
      }

      // 权限校验
      var tempArr = this.permissionArr,
        selectArr = [];
      if (this.role === this.normalAdmin) {
        for (var i = 0; i < tempArr.length; i++) {
          if (this.permission[tempArr[i]]) {
            selectArr.push(tempArr[i]);
          }
        }
        if (selectArr.length === 0) {
          commFun.tip({ text: "普通用户最少选择一个权限" });
          self.isSaveDisabled = false;
          return;
        } else if (selectArr.length === tempArr.length) {
          commFun.tip({ text: "超级管理员才能拥有所有权限，请重新选择角色" });
          self.isSaveDisabled = false;
          return;
        }

        params.permission = selectArr;
      } else {
        params.permission = tempArr;
      }

      var tipText = "后管用户添加成功";
      var options = {
        url: commFun.apiRouter.adminUser,
        type: "POST"
      };
      //当为修改时
      if (this.adminUserId) {
        options = {
          url: commFun.apiRouter.adminUser,
          params: this.adminUserId,
          type: "PUT"
        };
        tipText = "后管用户修改成功";
      }
      commFun.request(
        Object.assign({}, options, {
          data: JSON.stringify(params),
          success: function(data) {
            self.isSaveDisabled = false;
            if (data && data.isOk) {
              commFun.tip({ text: tipText, type: "showSuccessToast" });
              self.$route.router.go({ name: "adminUserList" });
            } else {
              commFun.tip({ text: "无数据返回，稍后再试" });
            }
          },
          error: function(errData) {
            self.isSaveDisabled = false;
            commFun.errorTip(errData);
          }
        })
      );
    },
    // 超级管理员和普通管理员
    roleChange: function() {
      if (this.role === SUPER_ADMIN) {
        this.permission = {
          admin: false,
          user: false,
          message: false,
          app: false,
          profit: false,
          live: false,
          preview: false,
          fund: false
        };
        this.isPerShow = false;
      } else {
        this.isPerShow = true;
      }
    },
    goBack: function() {
      this.$route.router.go({ name: "adminUserList" });
    }
  }
};
</script>