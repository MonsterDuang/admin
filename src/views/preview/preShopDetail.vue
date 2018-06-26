<template>
  <div>
    <section class="content-header">
        <h1>预展商铺详情</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 预展区</a></li>
            <li class="active"> 预展商铺详情</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-header with-border">
                        <i class="fa fa-text-width"></i>
                        <h3 class="box-title">预展商铺详细信息</h3>
                    </div>
                    <div class="box-body">
                        <dl class="dl-horizontal">
                            <dt>预展标题</dt>
                            <dd>{{ preShop.title || "" }}</dd>
                            <dt>商家名称</dt>
                            <dd>{{ preShop.name || "" }}</dd>
                            <dt>商家地址</dt>
                            <dd>{{ preShop.address || "" }}</dd>
                            <dt>商品数量</dt>
                            <dd>{{ preShop.goodsCount || 0 }}</dd>                          
                            <dt>开始时间</dt>
                            <dd>{{ preShop.startAt || "" | getLastTimeStr }}</dd>
                            <dt>结束时间</dt>
                            <dd>{{ preShop.endAt || "" | getLastTimeStr }}</dd>
                            <dt>创建时间</dt>
                            <dd>{{ preShop.createdAt || "" | getLastTimeStr }}</dd>
                            <dt>修改时间</dt>
                            <dd>{{ preShop.updatedAt || "" | getLastTimeStr }}</dd>   
                            <dt>创建人</dt>
                            <dd>{{ preShop.creator || "" }}</dd>
                            <dt>修改人</dt>
                            <dd>{{ preShop.updator || "" }}</dd>
                            <dt>商铺图片</dt>
                            <dd><img v-bind:src="preShop.cover" style="width: 100px; height: 100px" @click="enlargeImg(preShop.cover)" /></dd>
                            <dt>商铺的商品</dt>
                            <dd v-for="good in goodsList"><a href="javascript:;"  class="detail" v-link="{name:'preGoodDetail', query:{ id: good.id }}">{{ good.name }}</a></dd>      
                        </dl>
                    </div>
                    <div class="box-footer">
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary" id="back" @click="goBack">返回</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
    export default {
        ready() {}, 
        data() {
            return {
                preShop: {
                },
                goodsList: [],
            }
        },
        route:{
            data(transition){
                var id = this.$route.query.id;
                this.getDetail(id);
            }
        },
        methods: {
            getDetail: function(id) {
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.preShop,
                    params: id,
                    success: function (data) {
                        if (data) {
                            self.getGoodList(data.id);
                            self.preShop = data || {};
                        }
                        else{
                            commFun.tip({text:'无数据返回，稍后再试'});
                        }
                    },
                    error: function (errData) {
                        commFun.errorTip(errData,'查询失败，请稍后再试');
                    }
                });
            },
            getGoodList: function(id){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.goodByShopId,
                    params: id,
                    success: function (data) {
                        if (data) {                        
                            self.goodsList = data || [];
                        }
                        else{
                            commFun.tip({text:'无数据返回，稍后再试'});
                        }
                    },
                    error: function (errData) {
                        commFun.errorTip(errData,'查询失败，请稍后再试');
                    }
                });
            },
            enlargeImg:function(imgSrc){
                if(imgSrc){
                    commFun.enlargeImg(imgSrc);
                }
            },
            goBack: function() {
                this.$route.router.go({name:"preShopList"});
            }
        }
    }
</script>