<template>
<div>
  <section class="content-header">
    <h1>
      后管用户列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 用户管理</a></li>
      <li class="active"> 用户列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">用户列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="新增后管用户" @click="addAdminUser"><i class="fa fa-plus"></i></button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <div class="col-sm-12">
                  <select class="form-control" id="per" v-model="role" v-on:change="searchByRole">
                          <option value="all">全部</option>
                          <option value="{{superAdmin}}">超管</option>
                          <option value="{{normalAdmin}}">普通用户</option>                 
                      </select>
                </div>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>用户名</th>
                  <th>角色</th>
                  <th>权限</th>
                  <th>上次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{item.username}}</td>
                    <td v-if="item.role == superAdmin"><span class="label label-danger">{{ item.role | adminUserRoleTrans }}</span></td>
                    <td v-else><span :class="['label', item.role === normalAdmin ? 'label-success' : '']">{{ item.role | adminUserRoleTrans }}</span></td>
                    <td>{{item.permission | permissionTrans}}</td>
                    <td>{{ item.lastLogin | getLastTimeStr }}</td>
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'adminUserAdd', query: { adminUserId: item.id, page: 'edit' } }"><i class="fa fa-edit"></i> 修改</button>
                      <button class="btn btn-danger btn-xs" data-delete="{{ item.id }}" @click="deleteAdminUser"><i class="fa fa-trash"></i> 删除</button>                    
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
          emptyTip: "暂时还没有用户数据，请先去新增用户",
          userList:[],
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.adminUser,
          tableList: [],
          superAdmin:commFun.constants.SUPER_ADMIN,
          normalAdmin:commFun.constants.NORMAL_ADMIN,
          role:'all'
        }
    },
    components: {
        bootPage
    },
    methods: {
      // 新增后管用户
      addAdminUser: function() {
        this.$route.router.go({name: 'adminUserAdd'});
      },
      // 删除后管用户
      deleteAdminUser: function(events) {
         var self = this;
         var adminUserId = $(events.currentTarget).data('delete');

        var deleteCallback = function(){
          commFun.request({
            url: commFun.apiRouter.adminUser,
            params: adminUserId,
            type: "DELETE",
            success: function (data) {
              console.log(data);
              if (data && data.ok) {
                //删除成功
                commFun.tip({text:'删除后管用户成功',type:'showSuccessToast'});
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
          text: '确定删除该后管用户吗？',
          okCallback:deleteCallback
        });
      },
      // 按角色查找
      searchByRole: function() {
        this.param = { role: this.role };
        this.url = commFun.apiRouter.adminUser;
        setTimeout(() => { this.refresh(); }, 100);
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