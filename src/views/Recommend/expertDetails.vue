<template>
<div id="content">
    <div class="showImg" v-show="bigImg !== ''" @click="close">
        <div class="img-container">
            <span class="close" @click="close">X</span>
            <img :src="bigImg" alt="">
        </div>
    </div>
    <section class="content-header">
        <h1>
            行家详情
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="javascript:;"> 首页推荐</a></li>
            <li class="active"> 行家详情</li>
        </ol>
    </section>
    <section class="content">
        <div class='class="row" box box-primary clearfix'>
             <div class="box-header with-border">
                <h3 class="box-title">行家详情</h3>
                <p style="float: right;color: #666;cursor: pointer" data-link-url="RExpert" data-active-menu="14" data-child-menu="14.0" @click="gotoLink">&lt; 返回行家列表</p>
            </div>
            <form class="form-horizontal">
                <div class="box-body">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">专家名字：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{expertArr.realname}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">行家类型：</label>
                        <div class="col-sm-8">
                            <!--<input type="text" disabled class="form-control" value="鉴定师">-->
                            <p style="height:34px;line-height:34px">{{expertArr.type == 'appraiser' ? '鉴定师' : '艺术家'}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">精通：</label>
                        <div class="col-sm-8">
                            <!--<input type="text" disabled class="form-control" value="鉴定师">-->
                            <p style="height:34px;line-height:34px">{{expertArr.area}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">手机：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{expertArr.phone}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">身份证号：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{expertArr.idCard}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">资格证号：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{expertArr.certification}}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-6">
                            <p style="height:34px;line-height:34px">身份证照</p>
                            <img  width="300" height="250" :src="expertArr.idCardPhotoKey" alt="" style="cursor: pointer" @click="showBigImg(expertArr.idCardPhotoKey)">
                        </div>
                        <div class="col-sm-6">
                            <p style="height:34px;line-height:34px">资格证照</p>
                            <img  width="300" height="250" :src="expertArr.certificationPhotoKey" alt="" style="cursor: pointer" @click="showBigImg(expertArr.certificationPhotoKey)">
                        </div>
                    </div>

                    <h2 style="margin-left:10%;font-weight:500">详情:</h2>
                    <b style="margin-left:10%;font-weight:700;font-size:16px">专家背景</b>
                    <p style="margin:0 10%;word-wrap:break-word">{{expertArr.intro}}</p>
                    <br>
                    <b style="margin-left:10%;font-weight:700;font-size:16px">专家专长</b>
                    <p style="margin:0 10%;word-wrap:break-word">{{expertArr.speintroduce}}</p>
                    <br>
                    <b style="margin-left:10%;font-weight:700;font-size:16px">学术成果</b>
                    <p style="margin:0 10%;word-wrap:break-word">{{expertArr.acaresearch}}</p>
                    <br>
                    <b style="margin-left:10%;font-weight:700;font-size:16px">生活风采</b>
                    <div style="margin-left:10%;">
                        <img :src="item" alt="" v-for="item in lifestyle" :key="item" width="32%" height="400" style="margin-bottom:25px; margin-right:23px;cursor: pointer" class="photo" @click="showBigImg(item)">
                    </div>
                </div>
            </form>

        </div>
    </section>
</div>
</template>

<script>
    export default {
        name: "expertDetails",
        data(){
            return{
                expertArr: [],
                lifestyle: [],
                bigImg: ''
            }
        },
        created(){
            this.getExpertDetail()
        },
        methods:{
            getExpertDetail(){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.speDetails,
                    data: {
                        speId: self.$route.query.speid,
                        type: self.$route.query.type
                    },
                    success: function (res) {
                        if (res) {
                            // 成功
                            let data = res.data
                            data.certificationPhotoKey = 'http://img.aworld.cn/' + data.certificationPhotoKey
                            data.idCardPhotoKey = 'http://img.aworld.cn/' + data.idCardPhotoKey
                            let lifestyle = data.lifestyle
                            for (let i = 0; i < lifestyle.length; i++) {
                                lifestyle[i] = 'http://img.aworld.cn/' + lifestyle[i]
                            }
                            self.lifestyle = lifestyle
                            self.expertArr = data
                        }else{
                            commFun.tip({text:'无数据返回，稍后再试'});
                        }
                    },
                    error: function (errData) {
                        commFun.errorTip(errData);
                    }
                })
            },
            gotoLink: function(e) {
                var url = $(e.currentTarget).data('link-url'),
                    activeMenu = $(e.currentTarget).data('active-menu'),
                    childMenu = $(e.currentTarget).data('child-menu');
                // 选定左侧菜单
                this.curNav = url;
                if (typeof activeMenu !== 'undefined') {
                    this.activeMenu = activeMenu;
                }
                if (typeof childMenu !== 'undefined') {
                    this.childMenu = childMenu;
                }
                location.hash = '#!/' + url;
            },
            showBigImg(item) {
                this.bigImg = item
                $('body').css('overflow', 'hidden')
                $('.showImg').css('top', $(window).scrollTop())
            },
            close(){
                this.bigImg = ''
                $('body').css('overflow', 'auto')
            }
        }
    }
</script>

<style scoped>
    .certificate div{
        display: inline-block;
        text-align: center;
    }
    .col-sm-6{
        text-align: center;
    }
    .photo:nth-of-type(3n){
        margin-right: 0 !important;
    }
    .showImg{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .img-container{
        padding: 20px;
        max-height: 100%;
        background: #fff;
        margin: 0;
        overflow-y: auto;
        position: relative;
    }
    .img-container img{
        max-height: 100%;
    }
    .close{
        position: absolute;
        top: 3px;
        right: 3px;
    }
</style>