<template>
    <a class="logo">
      <span class="logo-mini"><img src="../assets/images/logo.png" style="width: 28px"></span>
      <span class="logo-lg"><b>App后台管理</b></span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img :src="userImg" class="user-image" alt="User Image">
              <span class="hidden-xs">{{userName}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img :src="userImg" class="img-circle" alt="User Image">
                <p>{{userName}}
                  <small>上次登录时间{{lastLogin | getLastTimeStr}}</small>
                </p>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a class="btn btn-default btn-flat" @click="modifyPwd">修改密码</a>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" @click="logout">退出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul> 
      </div>
    </nav>
</template>
<script>
    export default {
        data (){
            return {
                userImg: require('../assets/images/logo.png'),
                userName:'',
                lastLogin:'',
            }
        },
        ready(){
          var userInfo = commFun.data("userInfo") || {};
          this.userName = userInfo.username || '';
          this.lastLogin = userInfo.lastLogin || '';
        },
        methods:{
          //点击退出
          logout:function(){
            commFun.request({
                url: commFun.apiRouter.logout,
                data: {},
                success: function (data) {
                    //用户信息和消息数
                    commFun.data("userInfo", null);
                    location.hash = '#!/login';
                },
                error: function (errData) {
                    commFun.tip({text:errData.responseText || '系统繁忙，稍后再试！'});

                }
            });
          },

          //点击个人信息
          modifyPwd:function(){
            location.hash = '#!/passwordSet';
          }

        }
    }
</script>