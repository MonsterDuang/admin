<template>
  <section class="sidebar">
    <ul class="sidebar-menu">
      <li class="header">主菜单</li>
      <li v-bind:class="{'active':(activeMenu === '0')}">
        <a href="javascript:;" data-link-url="index" data-active-menu="0" data-child-menu="-1" @click="gotoLink" >
          <i class="fa fa-dashboard"></i>
          <span>首页</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
      </li>
      <ul class="treeview-menu"></ul>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '1')}" v-if="permission.indexOf('admin') > -1">
        <a href="javascript:;">
          <i class="fa  fa-home"></i>
          <span>后台设置</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="adminUserList" data-active-menu="1" data-child-menu="1.0" @click="gotoLink" :class="{'active':(childMenu == '1.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 后台用户列表</a></li>
          <li data-link-url="adminUserAdd" data-active-menu="1" data-child-menu="1.1" @click="gotoLink" :class="{'active':(childMenu == '1.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 新增后管用户</a></li>
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '2')}" v-if="permission.indexOf('user') > -1">
        <a href="javascript:;">
          <i class="fa fa-user"></i>
          <span>用户管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="userList" data-active-menu="2" data-child-menu="2.0" @click="gotoLink" :class="{'active':(childMenu == '2.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 用户列表</a></li>
          <!-- <li data-link-url="userEdit" data-active-menu="2" data-child-menu="2.1" @click="gotoLink" :class="{'active':(childMenu == '2.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 昵称密码修改</a></li> -->
          <li data-link-url="shopAdd" data-active-menu="2" data-child-menu="2.2" @click="gotoLink" :class="{'active':(childMenu == '2.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 增加商户</a></li>
          <li data-link-url="appraiserAdd" data-active-menu="2" data-child-menu="2.3" @click="gotoLink" :class="{'active':(childMenu == '2.3' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 增加鉴宝师</a></li>
        </ul>
      </li>
      <!-- <li class="treeview" v-bind:class="{'active':(activeMenu === '3')}">
        <a href="javascript:;">
          <i class="fa fa-user"></i>
          <span>商品管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="goodsList" data-active-menu="3" data-child-menu="3.0" @click="gotoLink" :class="{'active':(childMenu == '3.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 商品列表</a></li>
          <li data-link-url="" data-active-menu="3" data-child-menu="3.1" @click="gotoLink" :class="{'active':(childMenu == '3.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 商品推荐规则</a></li>
          <li data-link-url="" data-active-menu="3" data-child-menu="3.2" @click="gotoLink" :class="{'active':(childMenu == '3.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 商品评论管理</a></li>
          <li data-link-url="" data-active-menu="3" data-child-menu="3.3" @click="gotoLink" :class="{'active':(childMenu == '3.3' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 寄售商品</a></li>
        </ul>
      </li> -->
      <li class="treeview" v-bind:class="{'active':(activeMenu === '4')}" v-if="permission.indexOf('message') > -1">
        <a href="javascript:;">
          <i class="fa fa-folder-open"></i>
          <span>消息管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
            <li data-link-url="messagesList" data-active-menu="4" data-child-menu="4.0" @click="gotoLink" :class="{'active':(childMenu == '4.0')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 系统消息发布</a></li>
            
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '5')}" v-if="permission.indexOf('app') > -1">
        <a href="javascript:;">
          <i class="fa  fa-wrench"></i>
          <span>APP管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="bannerList" data-active-menu="5" data-child-menu="5.0" @click="gotoLink" :class="{'active':(childMenu == '5.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> banner列表</a></li>
          <li data-link-url="appVersion" data-active-menu="5" data-child-menu="5.1" @click="gotoLink" :class="{'active':(childMenu == '5.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i>  Android版本配置</a></li>
          <li data-link-url="topAuctionList" data-active-menu="5" data-child-menu="5.4" @click="gotoLink" :class="{'active':(childMenu == '5.4' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 拍卖会场广告位</a></li>
          <li data-link-url="categoryList" data-active-menu="5" data-child-menu="5.5" @click="gotoLink" :class="{'active':(childMenu == '5.5' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 首页分类标题</a></li>
          <li data-link-url="agreement" data-active-menu="5" data-child-menu="5.2" @click="gotoLink" :class="{'active':(childMenu == '5.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 协议编辑</a></li>
          <li data-link-url="jisongjianbao" data-active-menu="5" data-child-menu="5.6" @click="gotoLink" :class="{'active':(childMenu == '5.6' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 寄送鉴宝</a></li>
          <li data-link-url="otherSet" data-active-menu="5" data-child-menu="5.3" @click="gotoLink" :class="{'active':(childMenu == '5.3' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 其他设置</a></li>
          <li data-link-url="pictureList" data-active-menu="5" data-child-menu="5.7" @click="gotoLink" :class="{'active':(childMenu == '5.7' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 背景图片管理</a></li>
          <li data-link-url="recommendExpert" data-active-menu="5" data-child-menu="5.8" @click="gotoLink" :class="{'active':(childMenu == '5.8' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 推荐专家</a></li>
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '6')}" v-if="permission.indexOf('profit') > -1">
        <a href="javascript:;">
          <i class="fa fa-money"></i>
          <span>分润管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="chargeSet" data-active-menu="6" data-child-menu="6.0" @click="gotoLink" :class="{'active':(childMenu == '6.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 鉴宝师价格设置</a></li>
          <li data-link-url="appraisalCut" data-active-menu="6" data-child-menu="6.1" @click="gotoLink" :class="{'active':(childMenu == '6.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 鉴宝师分成设置</a></li>
          <li data-link-url="appraisalCharge" data-active-menu="6" data-child-menu="6.2" @click="gotoLink" :class="{'active':(childMenu == '6.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 平台鉴宝费用设置</a></li>
          <li data-link-url="sendAppraisal" data-active-menu="6" data-child-menu="6.3" @click="gotoLink" :class="{'active':(childMenu == '6.3' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 寄送鉴定价格设置</a></li>
          <!--<li data-link-url="sendOrder" data-active-menu="6" data-child-menu="6.4" @click="gotoLink" :class="{'active':(childMenu == '6.4' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 寄送鉴定订单</a></li>-->
          <!-- <li data-link-url="chargeSet" data-active-menu="6" data-child-menu="6.2" @click="gotoLink" :class="{'active':(childMenu == '8.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 寄售保证金设置</a></li>       -->
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '7')}" v-if="permission.indexOf('live') > -1">
        <a href="javascript:;">
          <i class="fa fa-caret-square-o-right"></i>
          <span>直播管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="liveshowList" data-active-menu="7" data-child-menu="7.0" @click="gotoLink" :class="{'active':(childMenu == '7.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 直播管理</a></li>
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '8')}" v-if="permission.indexOf('preview') > -1">
        <a href="javascript:;">
          <i class="fa fa-table"></i>
          <span>预展区</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="preShopList" data-active-menu="8" data-child-menu="8.0" @click="gotoLink" :class="{'active':(childMenu == '8.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 预展区商家管理</a></li>
          <li data-link-url="preGoodList" data-active-menu="8" data-child-menu="8.1" @click="gotoLink" :class="{'active':(childMenu == '8.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 预展区商品管理</a></li>    
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '9')}" v-if="permission.indexOf('fund') > -1">
        <a href="javascript:;">
          <i class="fa fa-cny"></i>
          <span>资金管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="orderList" data-active-menu="8" data-child-menu="8.0" @click="gotoLink" :class="{'active':(childMenu == '9.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 订单管理</a></li>
          <li data-link-url="tradeList" data-active-menu="8" data-child-menu="8.1" @click="gotoLink" :class="{'active':(childMenu == '9.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 资金流转</a></li>
          <li data-link-url="marginMoneyList" data-active-menu="8" data-child-menu="8.2" @click="gotoLink" :class="{'active':(childMenu == '9.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 保证金管理</a></li>      
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '10')}" v-if="permission.indexOf('applycheck') > -1">
        <a href="javascript:;">
          <i class="fa fa-calculator"></i>
          <span>申请审核</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="appraiserApplyList" data-active-menu="10" data-child-menu="10.1" @click="gotoLink" :class="{'active':(childMenu == '10.0')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 鉴宝师批准</a></li>
          <li data-link-url="shopApplyList" data-active-menu="10" data-child-menu="10.1" @click="gotoLink" :class="{'active':(childMenu == '10.1')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 商户批准</a></li>  
          <li data-link-url="realnameApplyList" data-active-menu="10" data-child-menu="10.2" @click="gotoLink" :class="{'active':(childMenu == '10.2')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 实名用户批准</a></li>
          <li data-link-url="withdraw" data-active-menu="10" data-child-menu="10.3" @click="gotoLink" :class="{'active':(childMenu == '10.3')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 提现批准</a></li>   
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '11')}" v-if="permission.indexOf('comment') > -1">
        <a href="javascript:;">
          <i class="fa fa-folder-open"></i>
          <span>社区管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="commentList" data-active-menu="11" data-child-menu="11.0" @click="gotoLink" :class="{'active':(childMenu == '11.0')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 评论列表</a></li>  
          <li data-link-url="postList" data-active-menu="11" data-child-menu="11.1" @click="gotoLink" :class="{'active':(childMenu == '11.1')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 帖子列表</a></li>  
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '12')}" v-if="permission.indexOf('auction') > -1">
        <a href="javascript:;">
          <i class="fa fa-video-camera"></i>
          <span>拍卖会管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="auctionList" data-active-menu="12" data-child-menu="12.0" @click="gotoLink" :class="{'active':(childMenu == '12.0')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 拍卖会视频列表</a></li>  
        </ul>
      </li>
      <li class="treeview" v-bind:class="{'active':(activeMenu === '13')}" v-if="permission.indexOf('appraisal') > -1">
        <a href="javascript:;">
          <i class="fa fa-legal"></i>
          <span>鉴宝管理</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="appraisalList" data-active-menu="13" data-child-menu="13.0" @click="gotoLink" :class="{'active':(childMenu == '13.0')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 鉴宝列表</a></li>
          <li data-link-url="sendOrder" data-active-menu="13" data-child-menu="13.1" @click="gotoLink" :class="{'active':(childMenu == '13.1')}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 寄送鉴定订单列表</a></li>
        </ul>
      </li>

      <li class="treeview" v-bind:class="{'active':(activeMenu === '14')}">
        <a href="javascript:;">
          <i class="fa fa-home"></i>
          <span>首页推荐</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li data-link-url="RExpert" data-active-menu="14" data-child-menu="14.0" @click="gotoLink" :class="{'active':(childMenu == '14.0' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 推荐行家</a></li>
          <li data-link-url="RShop" data-active-menu="14" data-child-menu="14.1" @click="gotoLink" :class="{'active':(childMenu == '14.1' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 推荐店铺</a></li>
          <li data-link-url="GuessYouLike" data-active-menu="14" data-child-menu="14.2" @click="gotoLink" :class="{'active':(childMenu == '14.2' )}"><a href="javascript:;"><i class="fa fa-circle-o"></i> 猜你喜欢</a></li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
    export default {
        data(){
            return {
                activeMenu: "-1",//-1表示一级菜单都不选中
                childMenu: "-1",//-1表示二级菜单都不选中
                //permission: [], // 权限数组
                permission: ["appraisal","auction","comment","applycheck","fund","preview","live","profit","app","message","user","admin", "recommend"], // 权限数组
                userImg: require('../assets/images/logo.png')
            }
        },
        methods:{
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
            }
        }
    }
</script>