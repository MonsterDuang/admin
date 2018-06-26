<template>
  <div>
    <section class="content-header">
        <h1>预展商品详情</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 预展区</a></li>
            <li class="active"> 预展商品详情</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-header with-border">
                        <i class="fa fa-text-width"></i>
                        <h3 class="box-title">预展商品详细信息</h3>
                    </div>
                    <div class="box-body">
                        <dl class="dl-horizontal">
                            <dt>商品名称</dt>
                            <dd>{{ preGood.name || "" }}</dd>
                            <dt>商品编号</dt>
                            <dd>{{ preGood.no || "" }}</dd>
                            <dt>商家名称</dt>
                            <dd>{{ preGood.shop.name || "" }}</dd>
                            <dt>估价(元)</dt>
                            <dd>{{ preGood.valuation || "" }}</dd>
                            <dt>底价(元)</dt>
                            <dd>{{ preGood.floorPrice || "" }}</dd>
                            <dt>加价幅度(元)</dt>
                            <dd>{{ preGood.raisePriceRange || "" }}</dd>
                            <dt>商品介绍</dt>
                            <dd>{{ preGood.intro || "" }}</dd>
                            <dt>拍卖开始时间</dt>
                            <dd>{{ preGood.auctionStartAt || "" | getLastTimeStr }}</dd>
                            <dt>拍卖结束时间</dt>
                            <dd>{{ preGood.auctionEndAt || "" | getLastTimeStr }}</dd>
                            <dt>创建时间</dt>
                            <dd>{{ preGood.createdAt || "" | getLastTimeStr }}</dd>
                            <dt>修改时间</dt>
                            <dd>{{ preGood.updatedAt || "" | getLastTimeStr }}</dd>
                            <dt>创建人</dt>
                            <dd>{{ preGood.creator || "" }}</dd>
                            <dt>修改人</dt>
                            <dd>{{ preGood.updator || "" }}</dd>
                            <dt>商品图片</dt>
                            <dd>
                                <template v-for="item in preGood.covers" track-by="$index">
                                  <img v-bind:src="item" style="width: 100px; height: 100px" @click="enlargeImg(item)" />       
                                </template>
                            </dd> 
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
        ready() {
        }, 
        data() {
            return {
                preGood: {
                    shop:{},
                }
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
                    url: commFun.apiRouter.preGood,
                    params: id,
                    success: function (data) {
                        if (data) {
                            self.preGood = data || {};
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
                this.$route.router.go({name:"preGoodList"});
            }
        }
    }
</script>