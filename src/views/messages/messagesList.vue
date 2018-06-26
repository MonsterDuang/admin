<template>
<div>
  <section class="content-header">
    <h1>
      系统消息列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 消息管理</a></li>
      <li class="active"> 系统消息列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">系统消息列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" @click="addMessages">系统消息发布</button>
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
              <div class="form-group pull-left">
                <!-- <div class="col-sm-12">
                  <select class="form-control" id="status" v-model="status" v-on:change="searchByStatus">
                          <option value="all">全部</option>
                          <option value="{{statusUnread}}">未读</option>
                          <option value="{{statusRead}}">已读</option>                 
                      </select>
                </div> -->
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>消息名称</th>
                  <th>uri</th>
                  <!-- <th>消息状态</th> -->
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in tableList">
                  <tr>
                    <td>{{ item.title }}</td>
                    <td>{{ item.uri }}</td>
                    <!-- <td v-if="item.status == statusRead"><span class="label label-danger">{{ item.status | msgStatusTrans }}</span></td> -->
                    <!-- <td v-else><span :class="['label', item.status === statusUnread ? 'label-success' : '']">{{ item.status | msgStatusTrans }}</span></td> -->
                    <td>
                      <button class="btn btn-default btn-xs" v-link="{ name: 'messagesAdd', query: { messagesId: item.id } }"<i class="fa fa-edit"></i> 详情</button>                   
                      <button class="btn btn-danger btn-xs" @click="remove(item)">删除</button>                   
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
import bootPage from "./../../components/BootPage.vue";
import { MESSAGE_STATUS_READ, MESSAGE_STATUS_UNREAD } from "../../js/constants";

export default {
  data() {
    return {
      showEmptyTip: false,
      emptyTip: "暂时还没有系统消息",
      messagesList: [],
      //分页相关
      lenArr: [10, 50, 100],
      pageLen: 5,
      param: {},
      url: commFun.apiRouter.messages,
      tableList: [],
      status: "all",
      statusRead: MESSAGE_STATUS_READ,
      statusUnread: MESSAGE_STATUS_UNREAD
    };
  },
  components: {
    bootPage
  },
  methods: {
    addMessages: function() {
      this.$route.router.go({ name: "messagesAdd" });
    },
    // 按角色查找
    searchByStatus: function() {
      console.log(this.status);
      this.param = { status: this.status };
      this.url = commFun.apiRouter.messages;
      setTimeout(() => {
        this.refresh();
      }, 100);
    },

    remove: function(item) {
      const self = this;

      commFun.warn_tip({
        text: "确定要删除该消息吗？",
        okCallback: function() {
          commFun.request({
            url: commFun.apiRouter.messages,
            params: item.id,
            type: "DELETE",
            success: function(data) {
              if (data && data.message) {
                commFun.tip({ text: data.message, type: "showSuccessToast" });
                self.refresh();
              } else {
                commFun.tip({ text: "无数据返回，稍后再试" });
              }
            },
            error: function(errData) {
              commFun.errorTip(errData);
            }
          });
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
    data(data) {
      this.tableList = data;
      this.showEmptyTip = data.length > 0 ? false : true;
    },

    // 刷新数据
    refresh() {
      this.refresh();
    }
  }
};
</script>