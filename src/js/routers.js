'use strict';

export default function (router) {
    router.map({
        '/': {
            // 首页
            component: function (resolve) {
                console.info(`resolve:${resolve}`);
                require.ensure([], function (require) {
                    resolve(require('../views/index.vue'));
                }, "index");
            }
        },
        '/index': {
            // 首页
            name: 'index',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/index.vue'));
                }, "index");
            }
        },
        // 首页推荐 ===
        '/GuessYouLike': {
            // 猜你喜欢
            name: 'GuessYouLike',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/Recommend/GuessYouLike.vue'));
                }, "GuessYouLike");
            }
        },
        '/RExpert': {
            // 推荐行家
            name: 'RExpert',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/Recommend/RExpert.vue'));
                }, "RExpert");
            }
        },
        '/expertDetails': {
            // 推荐行家
            name: 'expertDetails',
                component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/Recommend/expertDetails.vue'));
                }, "expertDetails");
            }
        },
        '/RShop': {
            // 推荐店铺
            name: 'RShop',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/Recommend/RShop.vue'));
                }, "RShop");
            }
        },
        '/shopDetail': {
            // 店铺详情
            name: 'shopDetail',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/Recommend/shopDetail.vue'));
                }, "shopDetail");
            }
        },
// ===================
        '/test': {
            // 测试
            name: 'test',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/test/test.vue'));
                }, "test");
            }
        },
// ===================
        '/login': {
            // 登录
            name: 'login',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/login.vue'));
                }, "login");
            }
        },
        '/errorPage': {
            // 404错误页
            name: 'errorPage',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require('../views/404Page.vue'));
                }, 'errorPage');
            }
        },
        '/userList': {
            // 用户列表页
            name: 'userList',
            component: function (resolve) {
                require.ensure([], function (require) {
                    resolve(require("../views/user/userList.vue"));
                }, "userList");
            }
        },
        '/userEdit': {
            // 用户信息编辑
            name: 'userEdit',
            component: function (resolve) {
                require.ensure([], function () {
                    resolve(require("../views/user/userEdit.vue"));
                }, "userEdit");
            }
        },
        '/userInfo': {
            name: 'userInfo',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require('../views/user/userInfo.vue'));
                });
            }
        },
        '/shopAdd': {
            name: 'shopAdd',
            component: function(resolve){
                require.ensure([], function() {
                    resolve(require('../views/user/shopAdd.vue'));
                });
            }
        },
        '/uploadImg': {
            name: 'uploadImg',
            component: function(resolve){
                require.ensure([], function() {
                    resolve(require('../views/newPage/uploadImg.vue'));
                });
            }
        },
        '/appraiserAdd': {
            name: 'appraiserAdd',
            component: function(resolve) {
                require.ensure([], function(){
                    resolve(require('../views/user/appraiserAdd.vue'));
                });
            }
        },
        '/adminUserList': {
            //管理员用户列表
            name: 'adminUserList',
            component: function(resolve) {
                require.ensure([], function(){
                    resolve(require("../views/admin/adminUserList.vue"));
                }, "adminUserList");
            }
        },
        '/adminUserAdd': {
            name: 'adminUserAdd',
            component: function(resolve) {
                require.ensure([], function(){
                    resolve(require("../views/admin/adminUserAdd.vue"));
                }, "adminUserAdd");
            }
        },
        '/passwordSet': {
            // 用户信息编辑
            name: 'passwordSet',
            component: function (resolve) {
                require.ensure([], function () {
                    resolve(require("../views/admin/passwordSet.vue"));
                }, "passwordSet");
            }
        },
        'bannerList': {
            // banner列表
            name: 'bannerList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require('../views/app/bannerList.vue'));
                }, "bannerList");
            }
        },
        '/bannerAdd': {
            name: 'bannerAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/bannerAdd.vue"));
                }, "bannerAdd");
            }
        },
        '/appVersion': {
            name: 'appVersion',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/appVersion.vue"));
                }, 'appVersion');
            }
        },
        '/apkUpload': {
            name: 'apkUpload',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/apkUpload.vue"));
                }, 'apkUpload');
            }
        },
        '/agreement': {
            name: 'agreement',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/agreement.vue"));
                }, 'agreement');
            }
        },
        '/RecommendedExperts': {
            name: 'recommended-experts',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/RecommendedExperts.vue"));
                }, 'recommended-experts');
            }
        },
        '/pictureList': {
            name: 'pictureList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/pictureList.vue"));
                }, 'pictureList');
            }
        },
        '/recommendExpert': {
            name: 'recommendExpert',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/recommendExpert.vue"));
                }, 'recommendExpert');
            }
        },
        '/pictureAdd': {
            name: 'pictureAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/pictureAdd.vue"));
                }, 'pictureAdd');
            }
        },
        '/topAuctionList': {
            name: 'topAuctionList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/topAuctionList.vue"));
                }, 'topAuctionList');
            }
        },
        '/topAuctionAdd': {
            name: 'topAuctionAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/topAuctionAdd.vue"));
                }, 'topAuctionAdd');
            }
        },
        '/otherSet': {
            name: 'otherSet',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/otherSet.vue"));
                }, 'otherSet');
            }
        },
        '/jisongjianbao': {
            name: 'jisongjianbao',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/jisongjianbao.vue"));
                }, 'jisongjianbao');
            }
        },
        '/categoryList': {
            name: 'categoryList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/categoryList.vue"));
                }, 'categoryList');
            }
        },
        '/categoryAdd': {
            name: 'categoryAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/app/categoryAdd.vue"));
                }, 'categoryAdd');
            }
        },
        '/messagesList': {
            name: 'messagesList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/messages/messagesList.vue"))
                }, "messagesList");
            }
        },
        '/messagesAdd': {
            name: 'messagesAdd',
            component: function(resolve) {
                require.ensure([], function(){
                    resolve(require("../views/messages/messagesAdd.vue"))
                }, "messagesAdd");
            }
        },
        '/preGoodList': {
            name: 'preGoodList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/preview/preGoodList.vue"));
                }, 'preGoodList');
            }
        },
        '/preGoodDetail': {
            name: 'preGoodDetail',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/preview/preGoodDetail.vue"));
                }, 'preGoodDetail');
            }
        },
        '/preGoodAdd': {
            name: 'preGoodAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/preview/preGoodAdd.vue"));
                }, 'preGoodAdd');
            }
        },
        '/preShopList': {
            name: 'preShopList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/preview/preShopList.vue"));
                }, 'preShopList');
            }
        },
        '/preShopDetail': {
            name: 'preShopDetail',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/preview/preShopDetail.vue"));
                }, 'preShopDetail');
            }
        },
        '/preShopAdd': {
            name: 'preShopAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/preview/preShopAdd.vue"));
                }, 'preShopAdd');
            }
        },
        '/orderList': {
            name: 'orderList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/fund/orderList.vue"));
                }, 'orderList');
            }
        },
        '/orderInfo': {
            name: 'orderInfo',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/fund/orderInfo.vue"));
                }, 'orderInfo');
            }
        },
        '/tradeList': {
            name: 'tradeList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/fund/tradeList.vue"));
                }, 'tradeList');
            }
        },
        '/marginMoneyList': {
            name: 'marginMoneyList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/fund/marginMoneyList.vue"));
                }, 'marginMoneyList');
            }
        },
        '/chargeSet': {
            name: 'chargeSet',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/profit/chargeSet.vue"));
                }, 'chargeSet');
            }
        },
        '/sendAppraisal': {
            name: 'send-appraisal',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/profit/sendAppraisal.vue"));
                }, 'sendAppraisal');
            }
        },
        '/sendOrder': {
            name: 'send-appraisal',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/appraisal/sendOrder.vue"));
                }, 'sendOrder');
            }
        },

            '/sendOrderDetail': {
        name: 'sendOrderDetail',
            component: function(resolve) {
            require.ensure([], function() {
                resolve(require("../views/appraisal/sendOrderDetail.vue"));
            }, 'sendOrderDetail');
        }
    },
        '/appraisalCut': {
            name: 'appraisalCut',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/profit/appraisalCut.vue"));
                }, 'appraisalCut');
            }
        },
        '/appraisalCharge': {
            name: 'appraisalCharge',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/profit/appraisalCharge.vue"));
                }, 'appraisalCharge');
            }
        },
        '/liveshowList': {
            name: 'liveshowList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/liveshow/liveshowList.vue"));
                }, 'liveshowList');
            }
        },
        '/shopApplyList': {
            name: 'shopApplyList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/applycheck/shopApplyList.vue"))
                }, "shopApplyList");
            }
        },
        '/appraiserApplyList': {
            name: 'appraiserApplyList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/applycheck/appraiserApplyList.vue"))
                }, "appraiserApplyList");
            }
        },
        '/realnameApplyList': {
            name: 'realnameApplyList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/applycheck/realnameApplyList.vue"))
                }, "realnameApplyList");
            }
        },
        '/commentList': {
            name: 'commentList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/comment/commentList.vue"));
                }, 'commentList');
            }
        },
        '/postList': {
            name: 'postList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/comment/postList.vue"));
                }, 'postList');
            }
        },
        '/auctionList': {
            name: 'auctionList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/auction/auctionList.vue"));
                }, 'auctionList');
            }
        },
        '/auctionAdd': {
            name: 'auctionAdd',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/auction/auctionAdd.vue"));
                }, 'auctionAdd');
            }
        },
        '/appraisalList': {
            name: 'appraisalList',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/appraisal/appraisalList.vue"));
                }, 'appraisalList');
            }
        },
        '/appraisalDetail': {
            name: 'appraisalDetail',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/appraisal/appraisalDetail.vue"));
                }, 'appraisalDetail');
            }
        },
        '/withdraw': {
            name: 'withdraw',
            component: function(resolve) {
                require.ensure([], function() {
                    resolve(require("../views/applycheck/withdraw.vue"));
                }, 'withdraw');
            }
        },
    })
}