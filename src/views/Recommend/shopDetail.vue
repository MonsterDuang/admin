<template>
<div>
    <div class="showImg" v-show="bigImg !== ''" @click="close">
        <div class="img-container">
            <span class="close" @click="close">X</span>
            <img :src="bigImg" alt="">
        </div>
    </div>
    <section class="content-header">
        <h1>
            店铺详情
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="javascript:;"> 首页推荐</a></li>
            <li class="active"> 店铺详情</li>
        </ol>
    </section>
    <section class="content">
        <div class='class="row" box box-primary clearfix'>
            <div class="box-header with-border">
                <h3 class="box-title">店铺详情</h3>
                <p style="float: right;color: #666;cursor: pointer" data-link-url="RShop" data-active-menu="14" data-child-menu="14.1" @click="gotoLink">&lt; 返回店铺列表</p>
            </div>
            <form class="form-horizontal">

                <div class="box-body">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">店铺名字：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{shopArr.shopName}}
                                <span style="display:inline-block;width:30px;height:30px;border-radius:50%;overflow:hidden;vertical-align:top">
                                    <img style="width:100%;vertical-align: top" :src="shopArr.avatarKey" alt="">
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">手机号码：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{shopArr.phone}}</p>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">身份证号：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{shopArr.idCard}}</p>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">营业执照号：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{shopArr.creditCode}}</p>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <div class="form-group" style="text-align:center">
                        <div class="col-sm-6">
                            <p style="height:34px;line-height:34px">身份证照</p>
                            <img  width="300" height="250" :src="shopArr.idCardPhotoKey" alt="" style="cursor: pointer" @click="showBigImg(shopArr.idCardPhotoKey)">
                        </div>
                        <div class="col-sm-6">
                            <p style="height:34px;line-height:34px">营业证照</p>
                            <img  width="300" height="250" :src="shopArr.businessLicensePhotoKey" alt="" style="cursor: pointer" @click="showBigImg(shopArr.businessLicensePhotoKey)">
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">所在地区：</label>
                        <div class="col-sm-8">
                            <p style="height:34px;line-height:34px">{{address.province}}{{address.city}}{{address.region}}{{address.street}}</p>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    </section>
</div>
</template>

<script>
    export default {
        name: "shopDetail",
        ready(){

        },
        data(){
            return{
                shopArr: [],
                address: [],
                bigImg: ''
            }
        },
        created(){
            this.getShopDetail()
        },
        methods:{
            getShopDetail(){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.shopDetails,
                    data: {
                        shopId: self.$route.query.shopid
                    },
                    success: function (res) {
                        if (res) {
                            // 成功
                            let data = res.data
                            data.avatarKey = 'http://img.aworld.cn/' + data.avatarKey
                            data.businessLicensePhotoKey = 'http://img.aworld.cn/' + data.businessLicensePhotoKey
                            data.idCardPhotoKey = 'http://img.aworld.cn/' + data.idCardPhotoKey
                            self.address = data.address
                            self.shopArr = data
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
                console.log($(window).scrollTop())
            },
            close(){
                this.bigImg = ''
                $('body').css('overflow', 'auto')
            }
        }
    }
</script>

<style scoped>
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