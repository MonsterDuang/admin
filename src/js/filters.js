"use strict";

import utils from './utils';
import commFun from './commFun';
import {
    SUPER_ADMIN,
    NORMAL_ADMIN,
    GENDER_MAN,
    GENDER_WOMAN,
    SOURCE_PHONE,
    SOURCE_WECHAT,
    SOURCE_QQ,
    SOURCE_ADMIN,
    STATUS_NORMAL,
    STATUS_STOP,
    USER_TYPE_NORMAL,
    USER_TYPE_SHOP,
    USER_TYPE_APPRAISER,
    MESSAGE_STATUS_READ,
    MESSAGE_STATUS_UNREAD,
    ORDER_CLOSED,
    ORDER_NO,
    ORDER_WAIT_SHIPPING,
    ORDER_WAIT_RECEIVING,
    ORDER_REFUNDING,
    ORDER_COMPLETED,
    PERMISSION_ALL,
    PERMISSION_VIEW,
    LVS_STATUS_IDLE,
    LVS_STATUS_LIVING,
    LVS_STATUS_DISABLED,
    BANNER_TYPE_APP,
    BANNER_TYPE_PC,
    COMMENT_AUCTION,
    COMMENT_LVS,
    COMMENT_POST,
    APPRAISAL_STATUS_DID,
    APPRAISAL_STATUS_DID_NOT,
    POST_TYPE_PHOTO,
    POST_TYPE_VIDEO,
    PAYMENT_CHANNEL_WECHAT,
    PAYMENT_CHANNEL_ALIPAY,
    PAYMENT_STATUS_NOPAY,
    PAYMENT_STATUS_SUCCESS,
    PAYMENT_STATUS_CLOSED,
    PAYMENT_STATUS_FINISHED,
    PAYMENT_STATUS_FAIL,
    PAYMENT_STATUS_REFUNDING,
    PAYMENT_STATUS_REFUND,
    TRADE_TYPE_ORDER,
    TRADE_TYPE_MARGINMONEY,
    TRADE_TYPE_APPRAISAL,
    WITHDRAW_STATUS_UNCONFIRMED,
    WITHDRAW_STATUS_CONFIRMED,
    WITHDRAW_STATUS_COMPLETED,
    STATEMENT_CATEGORY_APPRAISAL,
    STATEMENT_CATEGORY_SELL,
    WITHDRAW_ACCOUNT_TYPE_BANKCARD,
    WITHDRAW_ACCOUNT_TYPE_ALIPAY,
    APPRAISER_TYPE_SELFSUPPORT,
    APPRAISER_TYPE_PARTJOB
} from '../js/constants';

/**格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
    if (friendly) {
        return utils.MillisecondToDate(new Date() - new Date(time));
    } else {
        if (typeof time === 'undefined' || time === '') {
            return '';
        }
        else {
            return utils.fmtDate(new Date(time), 'yyyy-MM-dd hh:mm:ss');
        }

    }
}

/**
 * 用户角色格式转换
 * @param {string} 需要转换的用户角色
 */
exports.adminUserRoleTrans = (role) => {
    return role == SUPER_ADMIN ? '超级管理员' : (role == NORMAL_ADMIN ? '普通管理员' : '');
}

exports.userGenderTrans = (gender) => {
    return gender == GENDER_MAN ? '男' : (gender == GENDER_WOMAN ? '女' : gender);
}

exports.userStatusTrans = (status) => {
    return status == STATUS_NORMAL ? '正常' : (status == STATUS_STOP ? '封停' : '');
}

exports.userSourceTrans = (source) => {
    return source == SOURCE_PHONE ? '手机号' : (source == SOURCE_WECHAT ? '微信' : (source == SOURCE_QQ ? 'qq' : (source == SOURCE_ADMIN ? '后管' : '')));
}

exports.userTypeTrans = (source) => {
    return source == USER_TYPE_NORMAL ? '普通用户' : (source == USER_TYPE_SHOP ? '商户' : (source == USER_TYPE_APPRAISER ? '鉴宝师' : ''));
}

exports.msgStatusTrans = (status) => {
    return status == MESSAGE_STATUS_READ ? '已读' : (status == MESSAGE_STATUS_UNREAD ? '未读' : '');
}

exports.areaTrans = (area) => {
    let temp = [];
    for (let i = 0; i < area.length; i++) {
        if (area[i].name && area[i].id) {
            // populate的select没有生效
            temp.push(area[i].name);
        } else {
            temp.push(area[i]);
        }
    }
    return temp;
}

exports.orderStatusTrans = (status) => {
    let val = '';
    switch (status) {
        case ORDER_CLOSED:
            val = '关闭'
            break;
        case ORDER_NO:
            val = '未付款';
            break;
        case ORDER_WAIT_SHIPPING:
            val = '待发货';
            break;
        case ORDER_WAIT_RECEIVING:
            val = '待收货';
            break;
        case ORDER_REFUNDING:
            val = '退款中';
            break;
        case ORDER_COMPLETED:
            val = '已完成';
            break;
        default:
            val = '';
            break;
    }
    return val;
}

exports.permissionTrans = (permission) => {
    if (permission.length === PERMISSION_ALL.length) {
        return '所有';
    }
    let tempArr = [];
    for (let i = 0; i < permission.length; i++) {
        let index = PERMISSION_ALL.indexOf(permission[i]);
        if (index > -1) {
            tempArr.push(PERMISSION_VIEW[index][permission[i]]);
        }
    }
    return tempArr;
}

exports.lvsStatusTrans = (status) => {
    let val = '';
    switch (status) {
        case LVS_STATUS_IDLE:
            val = '空闲中';
            break;
        case LVS_STATUS_LIVING:
            val = '直播中';
            break;
        case LVS_STATUS_DISABLED:
            val = '禁用';
            break;
        default:
            val = '';
            break;
    }
    return val;
}


exports.bannerTypeTrans = (type) => {
    let val = '';
    switch (type) {
        case BANNER_TYPE_APP:
            val = 'app端使用';
            break;
        case BANNER_TYPE_PC:
            val = 'pc端使用';
            break;
        default:
            val = '';
            break;
    }
    return val;

}

exports.commentTrans = (type) => {
    let val = '';
    switch (type) {
        case COMMENT_AUCTION:
            val = '拍卖会评论';
            break;
        case COMMENT_LVS:
            val = '直播评论';
            break;
        case COMMENT_POST:
            val = '帖子评论';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.appraisalTrans = (status) => {
    let val = '';
    switch (status) {
        case APPRAISAL_STATUS_DID:
            val = '已鉴定';
            break;
        case APPRAISAL_STATUS_DID_NOT:
            val = '未鉴定';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.canCommentTrans = (canComm) => {
    let val = '';
    switch (canComm) {
        case true:
            val = '能';
            break;
        case false:
            val = '不能';
            break;
        default:
            val = '';
            break;
    }
    return val;
}

exports.postTypeTrans = (type) => {
    let val = '';
    switch (type) {
        case POST_TYPE_PHOTO:
            val = '照片';
            break;
        case POST_TYPE_VIDEO:
            val = '短视频';
            break;
        default:
            val = '';
            break;
    }
    return val;
}

exports.tradeChannelTrans = (channel) => {
    let val = '';
    switch (channel) {
        case PAYMENT_CHANNEL_WECHAT:
            val = '微信';
            break;
        case PAYMENT_CHANNEL_ALIPAY:
            val = '支付宝';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.tradeStatusTrans = (status) => {
    let val = '';
    switch (status) {
        case PAYMENT_STATUS_NOPAY:
            val = '未支付';
            break;
        case PAYMENT_STATUS_SUCCESS:
            val = '支付成功';
            break;
        case PAYMENT_STATUS_CLOSED:
            val = '关闭';
            break;
        case PAYMENT_STATUS_FINISHED:
            val = '支付完成';
            break;
        case PAYMENT_STATUS_FAIL:
            val = '支付失败';
            break;
        case PAYMENT_STATUS_REFUNDING:
            val = '退款中';
            break;
        case PAYMENT_STATUS_REFUND:
            val = '已退款';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.tradeKindTrans = (kind) => {
    let val = '';
    switch (kind) {
        case TRADE_TYPE_ORDER:
            val = '购买';
            break;
        case TRADE_TYPE_MARGINMONEY:
            val = '支付保证金';
            break;
        case TRADE_TYPE_APPRAISAL:
            val = '选择鉴宝师';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.withdrawStatusTrans = (status) => {
    let val = '';
    switch (status) {
        case WITHDRAW_STATUS_UNCONFIRMED:
            val = '待确认';
            break;
        case WITHDRAW_STATUS_CONFIRMED:
            val = '已确定';
            break;
        case WITHDRAW_STATUS_COMPLETED:
            val = '提现完成';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.withdrawCategoryTrans = (category) => {
    let val = '';
    switch (category) {
        case STATEMENT_CATEGORY_APPRAISAL:
            val = '鉴定';
            break;
        case STATEMENT_CATEGORY_SELL:
            val = '寄售';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.withdrawAccountTypeTrans = (type) => {
    let val = '';
    switch (type) {
        case WITHDRAW_ACCOUNT_TYPE_BANKCARD:
            val = '银行卡';
            break;
        case WITHDRAW_ACCOUNT_TYPE_ALIPAY:
            val = '支付宝';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.appraiserTypeTrans = (type) => {
    let val = '';
    switch (type) {
        case APPRAISER_TYPE_SELFSUPPORT:
            val = '自营（平台）';
            break;
        case APPRAISER_TYPE_PARTJOB:
            val = '兼职';
            break;
        default:
            val = '';
            break;
    }
    return val;
}
exports.appraiserTypeModifyTrans = (type) => {
    let val = '自营';
    // switch (type) {
    //     case APPRAISER_TYPE_SELFSUPPORT:
    //         val = '转兼职';
    //         break;
    //     case APPRAISER_TYPE_PARTJOB:
    //         val = '转自营';
    //         break;
    //     default:
    //         val = '';
    //         break;
    // }
    return val;
}




