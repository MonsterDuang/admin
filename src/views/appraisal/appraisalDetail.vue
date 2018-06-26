<style scoped>
    li{
        list-style: none;
        display: inline-block;
        float: left;
    }
</style>
<template>
  <div>
    <section class="content-header">
        <h1>鉴宝详情</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 鉴宝管理</a></li>
            <li class="active"> 鉴宝详情</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-header with-border">
                        <i class="fa fa-text-width"></i>
                        <h3 class="box-title">鉴宝详细信息</h3>
                    </div>
                    <div class="box-body">
                        <dl class="dl-horizontal">
                            <dt>鉴宝问题</dt>
                            <dd>{{ appraisalInfo.questions || "" }}</dd>
                            <dt>求鉴定用户</dt>
                            <dd>{{ appraisalInfo.user.nickname || ""}}</dd>
                            <dt>宝贝分类</dt>
                            <dd>{{ appraisalInfo.category.name || "" }}</dd>
                            <dt>鉴宝师</dt>
                            <dd v-if="appraisalInfo.appraiser">{{ appraisalInfo.appraiser.apply.realname}}</dd>
                            <dd v-else></dd>
                            <dt>鉴定状态</dt>
                            <dd>{{ appraisalInfo.status || "" | appraisalTrans }}</dd>
                            <dt>鉴定结果</dt>
                            <dd>{{ appraisalInfo.result || "" }}</dd>
                            <dt>结果详情</dt>
                            <dd>{{ appraisalInfo.resultIntro || "" }}</dd>
                            <dt>鉴定日期</dt>
                            <dd>{{ appraisalInfo.resultAt || "" }}</dd>
                            <dt>鉴定宝贝图片</dt>
                            <dd>
                                <!--<template v-for="item in appraisalInfo.photos">-->
                                  <!--<img v-bind:src="item" style="width: 100px; height: 100px" @click="enlargeImg(item)" />&nbsp;&nbsp;-->
                                <!--</template>-->

                                <!--track-by="$index-->
                                <ul id="imgShow">
                                    <li v-for="item in appraisalInfo.photos">
                                        <img :src="item" style="width: 100px; height: 100px"/>&nbsp;&nbsp;
                                    </li>
                                    <!--<img v-for="item in list" v-bind:src="item" style="width: 100px; height: 100px" @click="enlargeImg(item)" />&nbsp;&nbsp;-->
                                </ul>
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
        name: "appraisalDetail",
        ready() {

        },
        data() {
            return {
                appraisalInfo: {
                    user:{},
                    category: {},
                    appraiser: {apply:{}}
                },
                list:[
                    "http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg",
                    "http://img2.imgtn.bdimg.com/it/u=3965656371,3751907427&fm=27&gp=0.jpg"
                ]
            }
        },
        route:{
            data(transition){
                let id = this.$route.query.appraisalId;
                this.getDetail(id);
            }
        },
        methods: {
            getDetail: function(id) {
                let self = this;
                commFun.request({
                    url: commFun.apiRouter.newAppraisal,
                    // params: id,
                    type:"POST",
                    data:JSON.stringify({type:'Appraisal',orderId:id}),
                    success: function (data) {
                        if (data) {
                            self.appraisalInfo = data || {};
                                setTimeout(()=>{
                                    new Viewer(document.getElementById('imgShow'));
                                },600)
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
                window.history.go(-1);
                //this.$route.router.go({name:"appraisalList"});
            }
        }
    }
</script>