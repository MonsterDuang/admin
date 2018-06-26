'use srtict';

import utils from './utils';
import constants from './constants';

//win_env是webpack打包，传递给js的环境变量
var env = win_env || 'local';
var host = "";
var apiRouter = {
    // ========Allen start========
    sendlist:"/admin/appraisal/sendlist",//寄送鉴定列表
    cut:"/admin/profit/cut",//鉴定分成接口
    cutId:"/admin/profit/appraiser/send/",//:id鉴定分成修改接口
    appUpgrade:"/admin/appUpgrade/apk",//鉴定师审核内容查看
    appUpgrade:"/admin/appUpgrade/apk",//apk文件上传接口
    appUpgradeM:"/admin/appUpgrade/modify",//app信息修改接口
    recomExperts:"/admin/appraisal/recomExperts",//专家推荐顺序接口
    recomExpertsMdf:"/admin/configuration/recomExperts/mdf",//专家推荐顺序接口修改接口
    platAppraiser:"/admin/appraisal/platAppraiser",//平台专家获取接口
    // =========Allen end=========
    // 公共
    category: '/admin/common/category/',
    shopNoPage: '/admin/common/shopNopage/',
    indexData: '/admin/common/staticNumber/',
    indexDataRight: '/admin/common/staticNumberRight/',
    indexDataLeft: '/admin/common/staticNumberLeft/',
    // 后台设置
    adminUser: '/admin/adminUser/',
    passwordSet: '/admin/adminUser/password/',
    adminUserDetail: '/admin/adminUser/detail/',

    // APP设置
    banner: '/admin/banner/',
    appVersion: '/admin/appUpgrade/',  ///admin/appUpgrade/modify
    apkUpload: '/admin/appUpgrade/apk/',
    agreement: '/admin/configuration/agreement/',
    other: '/admin/configuration/other/',
    jisongjianbao: '/admin/configuration/jisongjianbao/',
    topAuction: '/admin/topAuction/',
    categoryList: '/admin/category/',
    backgroundPic: '/admin/configuration/backgroundPic/',
    picUpload: '/admin/configuration/picUpload/',

    //登录，退出
    login: '/admin/auth/signin',
    logout: '/admin/auth/signout',
   
    //用户管理
    user: '/admin/user/',
    userEdit: '/admin/user/password/',
    userComment : '/admin/user/comment/',
    userStatus: '/admin/user/status/',
    userShop: '/admin/user/shop/',
    userAppraiser: '/admin/user/appraiser/',
    supportBank:'/admin/user/support-banks/',

    // 消息管理
    messages: '/admin/messages/',

    // 预展区
    preShop: '/admin/preview/shops/',
    preGood: '/admin/preview/goods/',
    preShopNoPage: '/admin/preview/shopsNoPage/',
    goodByShopId: '/admin/preview/goods/shops/',

    // 分润管理
    profit_appraiser: '/admin/profit/appraisers/',
    profit_appraiser_type: '/admin/profit/typeTrans/',
    profit_cut: '/admin/profit/cut/',
    profit_charge: '/admin/profit/charge/',

    // 直播管理
    liveshow: '/admin/live/',

    // 审核申请管理
    shopApplyList: '/admin/apply/shopApply/',
    appraiserApplyList: '/admin/apply/appraiserApply/',
    realnameApplyList: '/admin/apply/realnameApply/',
    apply: '/admin/apply/',
    withdraw: '/admin/withdraw/',
    // 资金管理
    fund_order: '/admin/fund/order/',
    fund_trade: '/admin/fund/trade/',
    fund_margin: '/admin/fund/margin/',
    // 评论
    comment: '/admin/comment/',
    post: '/admin/post/',
    
    // 拍卖会管理
    auction: '/admin/auction/',
    // 鉴宝管理
    appraisal: '/admin/appraisal/',
    oldAppraisal: '/admin/appraisal/delete',
    newAppraisal: '/admin/appraisal/order/details',
    platformAppraiser: '/admin/appraisal/platAppraiser',
    sendOrderUpdate: '/admin/appraisal/order/update',

    // 首页推荐
    // 行家列表
    speRecomList: '/admin/home/speRecomList',
    speRecom: '/admin/home/speRecom',
    speDetails: '/admin/home/speDetails',
    // 店铺列表
    shopRecomList: '/admin/home/shopRecomList',
    shopRecom: '/admin/home/shopRecom',
    shopDetails: '/admin/home/shopDetails',
    // 猜你喜欢
    goodsList: '/admin/home/goodsList',
    likeRecom: '/admin/home/likeRecom',
    totalLikeRecom: '/admin/home/totallikeRecom',
    // 数据修改
    modifyData: '/admin/configuration/home/mdf',
};

switch (env) {
    case 'local':
        // host = "http://192.168.0.172:2388/api";//本地
        host = "https://www.aworld.xyz/api";//本地
        console.log("build local");
        break;
    case 'dev':
        host = "https://www.aworld.xyz/api"; //阿里云测试
        console.log("build dev");
        break;
    case 'production':
        host = "http://aworld.cn/api";//线上
        console.log("build production");
        break;
    default:
        host = "/api";
        break;
};

// todo 暂时不确定是否用到
window.getURL = function (name) {
    return host + (apiRouter[name] || name);
};

var commFun = {
    qiniuPath : "http://img.aworld.cn/",
    //接口地址
    apiRouter: apiRouter,
    //域名
    host: host,
    //常量
    constants: constants,
    //发送请求
    request: function (options) {
        var url = host + options.url;
        var type = options.type || "GET";
        var data = options.data;
        var contentType = "application/json";
        var processData = true;
        // params适用于url拼接后面需要加上id参数这种的
        if(typeof options.params !== 'undefined') {
            url = url + options.params;
        }

        if (typeof options.contentType !== 'undefined') {
            contentType = options.contentType;
        }

        if (typeof options.processData !== 'undefined') {
            processData = options.processData
        }

        var success = options.success;
        var complete = options.complete || function () { };
        var error = options.error || function (res) {
            //TODO 错误处理
        }
        $.ajax({
            url: url,
            type: type,
            data: data,
            contentType: contentType,
            processData: processData,
            // dataType:"jsonp",
            // xhrFields:{withCredentials:true},
            crossDomain: true,
            beforeSend: function (xhr) {
                var userInfo = commFun.data("userInfo");
                if (typeof userInfo !== 'undefined' && userInfo && userInfo.token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.token);
                }
            },
            success: function (sendData) {
                if (sendData === null) {
                    return;
                }
                success(sendData);
            },
            error: function (sendData) {
                if(sendData.status == 401){
                    // location.hash = '#!/login';
                }
                error(sendData);
            },
            complete: function (sendData) {
                complete(sendData);
            }
        });
    },
    //刷新消息数
    refreshMsg: function () {
        $("#msgText").text(commFun.data("messageNumber") || '');
    },
    //loading开始
    loadingBegin: function () {
        App.loadingVue.show();
    },
    //loading结束
    loadingEnd: function () {
        App.loadingVue.hide();
    },
    // 页面输入框错误样式
    errorBorder: function (e) {
        $(e.currentTarget).addClass('errorBorderStyle');
    },
    // 除去页面输入框错误样式
    normalBorder: function (e) {
        $(e.currentTarget).removeClass('errorBorderStyle');
    },
     //tip提示
    tip: utils.tip,
    //信息框，设备信息 依赖组件信息
    info_tip: utils.info_tip,
    //警告框，是否删除啊什么的
    warn_tip: utils.warn_tip,
    //单个确定按钮确认框,发布提示告知成功
    comfirm_tip: utils.comfirm_tip,
    //错误统一提示
    errorTip: utils.errorTip,
    // 检查信息长度
    checkInfoLength: utils.checkInfoLength,
    //时间格式转换
    timeTrans: utils.timeTrans,
    //用户角色转换
    transferRole: utils.transferRole,
    //new Date()时间格式转换成字符串，返回格式是yyyy-mm-dd
    changeDatetoStr:utils.changeDatetoStr,
    //本地数据操作，本地浏览器存储---主要存储登录信息和用户信息，直接把localStorage换成了sessionStorage
    data: utils.data,
    checkPassword: utils.checkPassword,
    checkVersion: utils.checkVersion,
    checkNumber: utils.checkNumber,
    checkFloatLessOne: utils.checkFloatLessOne,
    checkPositiveInteger: utils.checkPositiveInteger,
    checkNotNegative: utils.checkNotNegative,
    checkZeroOrPositiveInteger: utils.checkZeroOrPositiveInteger,
    enlargeImg: utils.enlargeImg,
    isPhoneNumber: utils.isPhoneNumber,
    isCardNo: utils.isCardNo
};

module.exports = commFun;