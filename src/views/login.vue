<template>
<div>
    <div class="login-logo">
        <a href="javascript:;"><b>App后台管理</b></a>
    </div>
    <div class="login-box-body">
        <p class="login-box-msg">请登录您的账号</p>
        <form>
            <div class="form-group has-feedback">
                <input type="text" class="form-control" placeholder="用户名" v-model="username" v-on:keyup.enter="next" @blur="getPwd">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="密码" id="password" v-model="password" v-on:keyup.enter="login">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-8">
                    <div class="checkbox"  style="margin-top: -5px;">
                        <label><input type="checkbox" v-model="isRemember" @click="setPwdAndCheck">记住密码</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12" style="margin-top:10px;">
                    <button type="button" class="btn btn-primary btn-block" @click="login">登录</button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
    import { ENCRYPT_PWD } from '../js/constants';
    export default {
        ready() {
            var self = this;
            //头 尾 菜单不显示
            App.headerVue.hide();
            App.menuVue.hide();
            App.footerVue.hide();
            //样式调整
            $("body").removeClass("skin-blue").removeClass("sidebar-mini").addClass("login-page");
            $("#app").removeClass("content-wrapper").addClass("wrapper").addClass("login-box");

            //页面初始化之后，查询本地缓存的用户名
            self.getLastUser();
        },
        data() {
            return {
                username:'',
                password:'', 
                isRemember:false
            }
        },
        methods: {
            //用户名点击enter键
            next(){
                var username = this.username.trim();
                if(username.length === 0){
                    commFun.tip({text:'用户名不能为空，请重新输入'});
                    return false;
                }
                $("#password").focus();
            },

            //登录
            login(){
                var self = this;
                var username = this.username.trim();
                var password = this.password.trim();

                if(username.length === 0){
                    commFun.tip({text:'用户名不能为空，请重新输入'});
                    return false;
                }
                if(password.length === 0){
                    commFun.tip({text:'密码不能为空，请重新输入'});
                    return false;
                }
                var params = {
                    username:username,
                    password:CryptoJS.AES.encrypt(password, ENCRYPT_PWD).toString()
                };
                // alert(JSON.stringify(commFun.apiRouter.login))
                commFun.request({
                    url: commFun.apiRouter.login,
                    data: JSON.stringify(params),
                    type: 'POST',
                    success: function (data) {
                        if(data && data.username){
                            // alert(JSON.stringify(data))
                            commFun.data("userInfo",data);
                            //登录成功存用户名密码cookie
                            self.setPwd();
                            location.hash = '#!/index';
                            window.location.reload();
                        }else{
                            commFun.tip({text:'无数据返回，稍后再试'});
                        }
                    },
                    error: function (errData) {
                        commFun.errorTip(errData);
                    }
                });
            },

            //点击记住密码
            setPwdAndCheck(){
                this.isRemember = (this.isRemember) ? false : true;          
            },

            //获取最新的用户
            getLastUser(){
                var id = document.domain+"07BAC005-7D5B-8462-8CEA-44578BEACD09";
                var usr = this.getCookie(id);
                if(usr !== null){
                    this.username = usr;
                    //取到最新用户后，取对应的密码
                    this.getPwd();
                }else{
                    this.username = usr;
                }               
            },

            //在cookie中存最新的用户名
            setLastUser(user){
                var id = document.domain+"07BAC005-7D5B-8462-8CEA-44578BEACD09";
                var expdate = new Date();
                expdate.setTime(expdate.getTime()+ 14*(24*60*60*1000));
                // console.log(expdate,"时间");
                this.setCookie(id,user,expdate);
            },

            //根据用户名获取cookie的密码，用户名框失焦调用
            getPwd(){
                var pwd = this.getCookie(this.username);
                // alert(JSON.stringify(pwd))
                if(typeof pwd !== 'undefined' && pwd){
                    pwd = CryptoJS.AES.decrypt(pwd, ENCRYPT_PWD).toString(CryptoJS.enc.Utf8);
                }
                if(pwd !== null){
                    this.password = pwd;
                    this.isRemember = true;
                }else{
                    this.password = '';
                    this.isRemember = false;
                }
            },

            //登录调用记住用户名密码
            setPwd(){
                var user = this.username.trim();
                var pwd = this.password.trim();
                if(typeof pwd !== 'undefined' && pwd ){
                    pwd = CryptoJS.AES.encrypt(pwd, ENCRYPT_PWD).toString();
                }
                //将最后一个用户信息写到Cookie
                this.setLastUser(user);
                if(this.isRemember){
                    var expdate = new Date();
                    expdate.setTime(expdate.getTime() + 14*(24*60*60*1000));
                    // console.log(user,"名字");
                    // console.log(pwd,"密码");
                    // console.log(expdate,"时间");
                    this.setCookie(user, pwd, expdate);
                }else{
                    //如果没有选中记住密码，则立即过期
                    this.resetCookie();
                }
            },    

            //重置cookie
            resetCookie(){
                var user = this.username;
                var expdate = new Date();
                this.setCookie(user, null, expdate);
            },
            //设置cookie
            setCookie(name, value, expires){
                var argv = arguments;
                var argc = argv.length;
                var expires = (argc > 2) ? argv[2] :null;
                var path = (argc > 3) ? argv[3] : null;
                var domain = (argc > 4) ? argv[4] : null;
                var secure = (argc > 5) ? argv[5] : false;
                console.log("cookie");
                console.log(name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : ""));

                document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
            },
            //获取cookie
            getCookie(name){
                var arg = name + '=';
                var alen = arg.length;
                var clen = document.cookie.length;
                var i = 0;
                while (i < clen){
                    var j = i + alen;
                    if(document.cookie.substring(i,j) == arg) return this.getCookieVal(j);
                    i = document.cookie.indexOf(" ", i) + 1;
                    if(i === 0) break;
                }
                return null;
            },
            // 47.106.104.156 07BAC005-7D5B-8462-8CEA-44578BEACD09=admin
            getCookieVal(offset){
                var endstr = document.cookie.indexOf(";", offset);
                if (endstr == -1) endstr = document.cookie.length;
                return unescape(document.cookie.substring(offset, endstr));
            }
        
        }
    }
</script>