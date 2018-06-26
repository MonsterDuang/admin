'use srtict';

/**
 *   对Date的扩展，将 Date 转化为指定格式的String 
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 */
const fmtDate = function(date, fmt) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * tip提示框，错误提示框，警告提示，成功等等提示。
 */
const tip = function (option) {
    var tipText = option.text || "系统繁忙，稍后再试！"
    , callback = option.callback || function () { }
    , tipType = option.type || "showErrorToast";
    // type有{showErrorToast, showSuccessToast, showNoticeToast, showWarningToast}
    $().toastmessage(tipType, tipText);
};
const enlargeImg = function(imgSrc){
    var imgEle = $(".img-pop");
    if (imgEle.length > 0) {
        imgEle.remove();
    }
    var defaultStyle = 'width:400px;height:400px;'
    var image = new Image();
    image.src = imgSrc;
    setTimeout(function(){
        var imgWidth = image.width;
        var imgHeight = image.height;
        if(imgWidth && imgHeight){
            // 图片太大了，处理下
            if(imgWidth > 600){
                imgWidth = 400;
            }
            if(imgHeight > 600){
                imgHeight = 400;
            }
            defaultStyle = 'width:'+ imgWidth +'px;height:' + imgHeight + 'px;';
        }
        var imgHtml = "<img src=" + imgSrc + " style=" + defaultStyle + "></img>";
    
        var img_tip = '<div class="cd-popup img-pop">' +
            '<div class="cd-popup-container" style='+defaultStyle+'>' +
            '<button type="button" class="close" id="tpl_closeBtn" style="position:absolute;right:0;font-size:30px">×</button>' +
            '<div>' + imgHtml + '</div>' +
            '</div></div>';
        $(".wrapper").append(img_tip);
    
        setTimeout(function () {
            $(".img-pop").addClass("is-visible");
        }, 50);
    
        $("body").one("click", "#tpl_closeBtn", function (e) {
            $(".img-pop").removeClass("is-visible");
        });
    }, 100);
};
/**
 * 图片查看
 */
const info_tip = function (options) {
    var infoTitle = options.title || '' , infoText = options.text || '', arr = options.imgArr || [],
      infoEle = $(".info-pop");

    if (infoEle.length > 0) {
        infoEle.remove();
    }
    var imgHtml = '';
    for(var i = 0; i < arr.length; i++){
        imgHtml += "<span>"+arr[i].text+"</span><img src=" + arr[i].photo + " style='width:100px;height:100px' class='imgClass'></img>";
    }
    var info_tip = '<div class="cd-popup info-pop">' +
        '<div class="cd-popup-container alert alert-info">' +
        '<button type="button" class="close" id="tpl_closeBtn">×</button>' +
        '<h4><i class="icon fa fa-info"></i> ' + infoTitle + '</h4>' +
        '<p style="word-break:break-all">' + imgHtml + '</p>' +
        '<div class="modal-footer" style="border: 0;">' +
        '<button type="button" class="btn btn-outline" id="tpl_okBtn">确定</button></div></div></div>';
    $(".wrapper").append(info_tip);

    setTimeout(function () {
        $(".info-pop").addClass("is-visible");
    }, 50);

    $("body").one("click", "#tpl_closeBtn", function (e) {
        $(".info-pop").removeClass("is-visible");
        $("body").off("click", "#tpl_okBtn");
    });
    $("body").one("click", ".imgClass", function (e) {
        enlargeImg(e.currentTarget.src);
        $("body").off("click", "#tpl_okBtn");
    });

    $("body").one("click", "#tpl_okBtn", function (e) {
        $(".info-pop").removeClass("is-visible");
    });
};
/**
 * 警告框，是否删除啊什么的,其实就是确定框，只是有两个按钮，确定或取消
 * 注意：type的作用：确定是否撤销全量的增量发布时，close的icon仅仅只是取消撤销全部。
 * iconCloseCallback type是一套的，不传参数type，iconCloseCallback也可以不用
 */
const warn_tip = function (option) {
    var tipText = option.text || ""
    , okCallback = option.okCallback || function () { }
    , closeCallback = option.closeCallback || function () { }
    , iconCloseCallback = option.iconCloseCallback || function(){ }
    , type = option.type || 'normal'
    , tipEle = $(".tip-pop");
    if (tipEle.length > 0) {
        tipEle.remove();
    }

    var idStr = "";
    if(type === 'normal'){
        idStr = "tpl_closeBtn";
    }
    else{
        idStr = "icon_closeBtn";
    }
    var warn_tip = '<div class="cd-popup tip-pop">' +
        '<div class="cd-popup-container alert alert-warning" style="width:30%">' +
        '<button type="button" class="close" id='+idStr+'>×</button>' +
        '<h4><i class="icon fa fa-warning"></i></h4>' +
        '<p>' + tipText + '</p>' +
        '<div class="modal-footer" style="border: 0;">' +
        '<button type="button" class="btn btn-outline pull-left" data-dismiss="modal" id="tpl_closeBtn">取消</button>' +
        '<button type="button" class="btn btn-outline" id="tpl_okBtn">确定</button></div></div></div>';
    $(".wrapper").append(warn_tip);

    setTimeout(function () {
        $(".tip-pop").addClass("is-visible");
    }, 50);

    //取消
    $("body").one("click", "#tpl_closeBtn", function (e) {
        $(".tip-pop").removeClass("is-visible");
        $("body").off("click", "#tpl_okBtn");
        closeCallback();
    });

    //点击close的icon按钮，type不传或者type为normal表示回调和取消一样。
    $("body").one("click", "#icon_closeBtn", function (e) {
        $(".tip-pop").removeClass("is-visible");
        $("body").off("click", "#tpl_okBtn");
        iconCloseCallback();
    });

    //点击确定按钮
    $("body").one("click", "#tpl_okBtn", function (e) {
        $(".tip-pop").removeClass("is-visible");
        okCallback();
    });

};
/**
 * 单个确定按钮确认框,发布提示告知成功
 */
const comfirm_tip = function (option) {
    var text = option.text || ""
    , callback = option.callback || function () { }
    , comfirmEle = $(".comfirm-pop");
    if (comfirmEle.length > 0) {
        comfirmEle.remove();
    }

    var comfirm_tip = '<div class="cd-popup comfirm-pop">'
        + '<div class="cd-popup-container alert alert-success">'
        + '<button type="button" class="close" id="closeBtn">&times;</button>'
        + '<h4><i class="icon fa fa-check"></i> Success</h4><p style="text-align:center;">' + text + '</p>'
        + '<button type="button" class="btn btn-outline" id="okBtn">确定</button>'
        + '</div></div>';

    $(".wrapper").append(comfirm_tip);

    setTimeout(function () {
        $(".comfirm-pop").addClass("is-visible");
    }, 50);

    $("body").one("click", "#closeBtn", function (e) {
        $(".comfirm-pop").removeClass("is-visible");
        //解绑下面的确定绑定事件
        $("body").off("click", "#okBtn");
    });

    $("body").one("click", "#okBtn", function (e) {
        $(".comfirm-pop").removeClass("is-visible");
        callback();
    });

};
/**
 * 统一错误提示，和后台返回值的错误结构有关
 */
const errorTip = function (errData, defaultMsg) {
    if (typeof defaultMsg === 'undefined' || !defaultMsg) {
        defaultMsg = '系统繁忙，稍后再试';
    }
    if(typeof errData.responseText === 'string'){
        tip({ text: errData.responseText || defaultMsg });
        return;
    }
    var errObj = JSON.parse(errData.responseText || '{}');
    if (errObj instanceof Array) {
        //validator检测错误，错误是数组，throw是对象
        errObj = errObj[0];
    }
    tip({ text: errObj.message || defaultMsg });
};
/**
 * 检查信息长度
 */
const checkInfoLength = function (data, len) {
    if (data && data.length > len) {
        return false;
    } else {
        return true;
    }
};

/**
 * 用户角色转换，超级管理员和普通管理员
 */
const transferRole = function (val) {
    var returnValue;
    switch (val) {
        case 'super_admin':
        returnValue = '超级管理员';
        break;
        case 'normal_admin':
        returnValue = '普通管理员';
        break;
        default:
        returnValue = '';
        break;
    }
    return returnValue;
};
/**
 * 时间格式转换,时间格式转换成yyyy-MM-dd hh:mm:ss
 */
const timeTrans = function (date) {
    if (typeof date === 'undefined' || date === '' || date === null) {
        return '';
    }
    else {
        return fmtDate(new Date(date), 'yyyy-MM-dd hh:mm:ss');
    }
};
/**
 * new Date()时间格式转换成字符串，返回格式是yyyy-mm-dd
 */
const changeDatetoStr = function(date){
    var month = date.getMonth() > 8 ? (date.getMonth()+1) : "0"+(date.getMonth()+1);
    var day = date.getDate() > 9 ? date.getDate() : ("0"+date.getDate());
    var dateStr = date.getFullYear()+"-"+month+"-"+day;
    return dateStr;
};
/**
 * 本地数据操作，本地浏览器存储---主要存储登录信息和用户信息，直接把localStorage换成了sessionStorage
 */
const data = function (key, value) {
    var getItemValue = function () {
        var data = sessionStorage.getItem(key);
        try {
            data = JSON.parse(data);
        } catch (e) {
            tip({ text: e.message });
        }
        return data;
    };
    if (key && value === undefined) {
        return getItemValue();
    } else if (key && value === null) {
        sessionStorage.removeItem(key);
    } else {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};

/**
 * 密码校验
 */
const checkPassword = function (pass) {
    return /^[A-Za-z0-9]{6,10}$/.test(pass);
};

/**
 * 检查版本号格式,n1.n2.n3的格式
 * 注意，n1 n2 n3不能超过4位数
 */
const checkVersion = function (version) {
    var isOk =  /^\d+(\.\d+){2}$/.test(version);
    if(isOk){
        var list = version.split('.');
        if(list.length === 3 && list[0].length < 5 && list[1].length < 5 && list[2].length < 5){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
};
// 检查是大于1的正数1 1.2 100 23.4
const checkNumber = function(value) {
    var reg = /^[1-9]+.?[0-9]*$/;  
    if (reg.test(value)) {  
        return true;  
    }
    return false;  
};
// 检查非负数 0 0.01 0.1 1.2 2 9 12.3等
const checkNotNegative = function(value) {
    var reg = /^(0|([1-9]\d*))(\.\d+)?$/;  
    if (reg.test(value)) {  
        return true;  
    }
    return false;  
};

// 检查小于1的非负浮点数,0.1 0.09
const checkFloatLessOne= function(value) {
    var reg = /^0|0\.\d+$/;  
    if (reg.test(value)) {  
        return true;  
    }
    return false;  
};
// 检查正整数 1 2 10 11 90
const checkPositiveInteger = function(value){
    var reg = /^[1-9]*[1-9][0-9]*$/;
    if(reg.test(value)){
        return true;
    }
    return false;
};
// 0或正整数
const checkZeroOrPositiveInteger = function(value){
    var reg = /(^(0|[1-9]\d*)$)/;
    if(reg.test(value)){
        return true;
    }
    return false;
}

// 身份证校验,身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
// 下面的校验是简单校验，复杂校验看http://blog.csdn.net/lvchaman/article/details/51462656
const isCardNo = function (card) { 
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(reg.test(card)) { 
        return true;
    } 
    return false;
}
const isPhoneNumber = function (phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
    if (myreg.test(phone)) {  
        return true;  
    } 
    return false;
}

module.exports = {
    fmtDate: fmtDate,
    tip:tip,
    info_tip:info_tip,
    warn_tip:warn_tip,
    comfirm_tip:comfirm_tip,
    errorTip:errorTip, 
    checkInfoLength:checkInfoLength,  
    transferRole:transferRole,
    changeDatetoStr:changeDatetoStr,
    data:data,
    timeTrans:timeTrans,
    checkPassword:checkPassword,
    checkVersion:checkVersion,
    checkNumber: checkNumber,
    checkFloatLessOne: checkFloatLessOne,
    checkPositiveInteger: checkPositiveInteger,
    checkNotNegative: checkNotNegative,
    checkZeroOrPositiveInteger: checkZeroOrPositiveInteger,
    enlargeImg: enlargeImg,
    isCardNo: isCardNo,
    isPhoneNumber: isPhoneNumber
};
