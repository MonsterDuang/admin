'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
import routerMap from './routers';
import App from './index';
import filters from './filters';
import commFun from './commFun';

Vue.use(VueRouter);
window.Vue = Vue;
window.commFun = commFun;


//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

//实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

//添加头部vue
var headerVue = require('./../components/header.vue');
Vue.component('header-component', headerVue);
App.headerVue = new Vue({
    el: '#header-component',
    data: {
        isShow: true
    },
    methods: {
        show: function () {
            this.isShow = true;
        },
        hide: function () {
            this.isShow = false;
        }
    }
});

//添加左侧导航vue
var menuVue = require('./../components/menu.vue');
Vue.component('menu-component', menuVue);
App.menuVue = new Vue({
    el: '#menu-component',
    data: {
        isShow: true
    },
    methods: {
        show: function () {
            this.isShow = true;
        },
        hide: function () {
            this.isShow = false;
        }
    }
});

//添加底部footer
var footerVue = require('./../components/footer.vue');
Vue.component('footer-component', footerVue);
App.footerVue = new Vue({
    el: '#footer-component',
    data: {
        isShow: true
    },
    methods: {
        show: function () {
            this.isShow = true;
        },
        hide: function () {
            this.isShow = false;
        }
    }
});

//添加loading
var loadingVue = require('./../components/loading.vue');
Vue.component('loading-component', loadingVue);
App.loadingVue = new Vue({
    el: '#loading-component',
    data: {
        isShow: false
    },
    methods: {
        show: function () {
            this.isShow = true;
        },
        hide: function () {
            this.isShow = false;
        }
    }
});

//使用v-link跳转的时候，记录当前页以及当前每页显示多少条
Vue.directive('page-keys', {
    bind: function(){
         var keys = this.arg;
        this.el.onclick = function(){
            //千万注意，这个指令会把keys全部换成小写字母
            commFun.setActiveNum(keys);
        };
    }
});

window.App = App;


 //左侧菜单路由
  const menuMap = {
      index: { activeMenu: '0', childMenu: '-1', per: 'all'},
      login: { activeMenu: '-1', childMenu: '-1', per: 'all'},
      errorPage: { activeMenu: '-1', childMenu: '-1', per: 'all' },

      adminUserList: { activeMenu: '1', childMenu: '1.0', per: 'admin' },
      adminUserAdd: { activeMenu: '1', childMenu: '1.1', per: 'admin' },
      passwordSet: { activeMenu: '1', childMenu: '1.0', per: 'admin' },
      // 用户管理
      userList: { activeMenu: '2', childMenu: '2.0', per: 'user'},
      userInfo: { activeMenu: '2', childMenu: '2.0', per: 'user'},
      userEdit: { activeMenu: '2', childMenu: '2.0', per: 'user'},
      shopAdd: { activeMenu: '2', childMenu: '2.2', per: 'user'},
      appraiserAdd: { activeMenu: '2', childMenu: '2.3', per: 'user'},
      // 3留着，商品
      // 4消息
      messagesList: { activeMenu: '4', childMenu: '4.0', per: 'message' },
      messagesAdd: { activeMenu: '4', childMenu: '4.0', per: 'message' },
      // 5 APP管理
      bannerList: {activeMenu: '5', childMenu: '5.0', per: 'app'},
      bannerAdd: {activeMenu: '5', childMenu: '5.0', per: 'app'},
      appVersion: {activeMenu: '5', childMenu: '5.1', per: 'app'},
      apkUpload: {activeMenu: '5', childMenu: '5.1', per: 'app'},
      recommendExpert: {activeMenu: '5', childMenu: '5.1.1', per: 'app'},
      // 注意协议编辑暂时不对外开放
      agreement: {activeMenu: '5', childMenu: '5.2', per: 'app'},
      otherSet: {activeMenu: '5', childMenu: '5.3', per: 'app'},
      jisongjianbao: {activeMenu: '5', childMenu: '5.6', per: 'app'},
      topAuctionList: {activeMenu: '5', childMenu: '5.4', per: 'app'},
      topAuctionAdd: {activeMenu: '5', childMenu: '5.4', per: 'app'},
      categoryList: {activeMenu: '5', childMenu: '5.5', per: 'app'},
      categoryAdd: {activeMenu: '5', childMenu: '5.5', per: 'app'},
      pictureList: {activeMenu: '5', childMenu: '5.7', per: 'app'},
      pictureAdd: {activeMenu: '5', childMenu: '5.7', per: 'app'},

      // 6 分润管理
      chargeSet: {activeMenu: '6', childMenu: '6.0', per: 'profit'},
      appraisalCut:  {activeMenu: '6', childMenu: '6.1', per: 'profit'},
      appraisalCharge:  {activeMenu: '6', childMenu: '6.2', per: 'profit'},

      // 7 直播管理
      liveshowList: {activeMenu: '7', childMenu: '7.0', per: 'live'},

      // 8 预展区
      preShopList: {activeMenu: '8', childMenu: '8.0', per: 'preview'},
      preShopAdd: {activeMenu: '8', childMenu: '8.0', per: 'preview'},
      preShopDetail: {activeMenu: '8', childMenu: '8.0', per: 'preview'},
      preGoodList: {activeMenu: '8', childMenu: '8.1', per: 'preview'},
      preGoodAdd: {activeMenu: '8', childMenu: '8.1', per: 'preview'},
      preGoodDetail: {activeMenu: '8', childMenu: '8.1', per: 'preview'},
      // 9 资金管理
      orderList: {activeMenu: '9', childMenu: '9.0', per: 'fund'},
      orderInfo: {activeMenu: '9', childMenu: '9.0', per: 'fund'},
      tradeList: {activeMenu: '9', childMenu: '9.1', per: 'fund'},
      marginMoneyList: {activeMenu: '9', childMenu: '9.2', per: 'fund'},
      // 申请审核
      appraiserApplyList: { activeMenu: '10', childMenu: '10.0', per: 'applycheck'  },
	  shopApplyList: { activeMenu: '10', childMenu: '10.1', per: 'applycheck'  },
      realnameApplyList: { activeMenu: '10', childMenu: '10.2', per: 'applycheck'  },  
      withdraw: { activeMenu: '10', childMenu: '10.3', per: 'applycheck'  },
      //帖子管理
      commentList: { activeMenu: '11', childMenu: '11.0', per: 'comment'  },
      postList: { activeMenu: '11', childMenu: '11.1', per: 'comment'  },
      // 拍卖会管理
      auctionList: { activeMenu: '12', childMenu: '12.0', per: 'auction'  },
      auctionAdd: { activeMenu: '12', childMenu: '12.0', per: 'auction'  },
     // 鉴宝管理
      appraisalList: { activeMenu: '13', childMenu: '13.0', per: 'appraisal'  },
      appraisalDetail: { activeMenu: '13', childMenu: '13.0', per: 'appraisal'  },
// ===============NEW===============
      sendOrder: {activeMenu: '13', childMenu: '13.1', per: 'appraisal'},
      sendAppraisal: {activeMenu: '13', childMenu: '13.0', per: 'appraisal'},
      sendOrderDetail: {activeMenu: '13', childMenu: '13.0', per: 'appraisal'},
// =================================
      // 首页推荐
      RExpert:{activeMenu: '14', childMenu: '14.0', per: 'recommend'},
      expertDetails:{activeMenu: '14', childMenu: '14.0', per: 'recommend'},
      RShop:{activeMenu: '14', childMenu: '14.1', per: 'recommend'},
      shopDetail:{activeMenu: '14', childMenu: '14.1', per: 'recommend'},
      GuessYouLike:{activeMenu: '14', childMenu: '14.2', per: 'recommend'},
  };

//登录中间验证，页面需要登录而没有登录的情况跳转登录
router.beforeEach((transition) => {
    let userInfo = commFun.data("userInfo");
    if (typeof userInfo === 'undefined' || !userInfo) {
        if (location.hash.indexOf('login') === -1) {
             transition.redirect('/login');
        }else {
            transition.next();
        }
    }else {
        //当直接输入地址时，对应菜单
        let index = location.hash.replace("#!/", '').split('?')[0];
        if (index.length === 0) { index = 'index';}
        if(typeof menuMap[index] === 'undefined'){
            transition.redirect('/errorPage');
            return false;
        }
        let activeMenu = menuMap[index].activeMenu || '-1';
        let childMenu = menuMap[index].childMenu || '-1';
        if (App.menuVue.$children && App.menuVue.$children.length > 0) {
            App.menuVue.$children[0].$data.activeMenu = activeMenu;
            App.menuVue.$children[0].$data.childMenu = childMenu;
            //菜单权限控制
            let per = userInfo.permission || [], curPer = menuMap[index].per;
            App.menuVue.$children[0].$data.permission = per;
            // alert(JSON.stringify(App.menuVue.$children[0].$data))
            // 当不为all权限，且权限不在用户权限列表中，那么跳转错误页面
            if(curPer !== 'all' && per.indexOf(curPer) === -1){
                transition.redirect('/errorPage?index=401');
                return false;
            }
        }
        //已登录，继续
        transition.next();
    }
});

let app = Vue.extend({});
routerMap(router);
router.start(app, "#app");

