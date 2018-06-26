<template>
<div>
    <section class="content-header">
        <h1>新增商户</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 用户管理</a></li>
            <li class="active"> 新增商户</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">填写商户相关信息</h3>
                        注意：添加的新商户，默认用户昵称为:adminuser,密码为888888
                    </div>
                    <form class="form-horizontal" id="container">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="realname" class="col-sm-2 control-label">真实姓名</label>
                                <div class="col-sm-8">
                                    <input v-model="realname" type="text" class="form-control" placeholder="请输入真实姓名">                                 
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="col-sm-2 control-label">手机号码</label>
                                <div class="col-sm-8">
                                    <input v-model="phone" type="text" class="form-control" placeholder="请输入手机号码">                           
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="idCard" class="col-sm-2 control-label">身份证号码</label>
                                <div class="col-sm-8">
                                    <input v-model="idCard" type="text" class="form-control" placeholder="请输入身份证号码">                                   
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="address" class="col-sm-2 control-label">地址</label>
                                <div class="col-sm-2">
                                    <input v-model="address.province" type="text" class="form-control" placeholder="请输入省份">                               
                                </div>
																<div class="col-sm-2">
                                    <input v-model="address.city" type="text" class="form-control" placeholder="请输入市">                               
                                </div>
																<div class="col-sm-2">
                                    <input v-model="address.region" type="text" class="form-control" placeholder="请输入区">                               
                                </div>
																<div class="col-sm-2">
                                    <input v-model="address.street" type="text" class="form-control" placeholder="请输入具体街道">                               
                                </div>	
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>				
                            </div>
                            <div class="form-group">
                                <label for="shopname" class="col-sm-2 control-label">商铺名称</label>
                                <div class="col-sm-8">
                                    <input v-model="shopname" type="text" class="form-control" placeholder="请输入商铺名称">                                   
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="creditCode" class="col-sm-2 control-label">信用代码</label>
                                <div class="col-sm-8">
                                    <input v-model="creditCode" type="text" class="form-control" placeholder="请输入信用代码">                                   
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="businessLicensePhotoKey" class="col-sm-2 control-label">上传营业执照</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadLicenseImg" disabled="{{isLicenseDisabled}}"><i class="fa fa-plus"></i>选择图片</button>                           
                                </div>  
                                <div class="col-sm-2" style="margin-left:20px">
                                        <button type="button" class="btn btn-info" id="cancel" @click="cancelLicense">取消文件选择</button>
                                </div>
                                <label class="col-sm-4 control-label" style="color:red;" id="errLicenseTip"></label>
                            </div>
                            <div class="form-group" v-show="isLicenseReady">
                                <label for="businessLicensePhotoKey" class="col-sm-2 control-label">已选营业执照</label>
                                <div class="col-sm-2">
                                    <div id="previewLicense"></div>                      
                                </div>                   
                            </div>
                            <div class="form-group">
                                <label for="idCardPhotoKey" class="col-sm-2 control-label">上传身份照片</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadIdCardImg" disabled="{{isIdCardDisabled}}"><i class="fa fa-plus"></i>选择图片</button>                           
                                </div>  
                                <div class="col-sm-2" style="margin-left:20px">
                                    <button type="button" class="btn btn-info" id="cancel" @click="cancelIdCard">取消文件选择</button>
                                </div>
                                <label class="col-sm-4 control-label" style="color:red;" id="errIdCardTip"></label>
                            </div>
                            <div class="form-group" v-show="isIdCardReady">
                                <label for="idCardPhotoKey" class="col-sm-2 control-label">已选身份照片</label>
                                <div class="col-sm-2">
                                    <div id="previewIdCard"></div>                      
                                </div>	                  
                            </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label"></label>
                                        <div class="col-sm-8"><p class="help-block">说明：上传图片前，先填写上面的全部信息</p> </div>
                                    </div>
                            <div class="form-group">
                                <table class="table"> 
                                <thead></thead>
                                <tbody id="fsUploadProgress"></tbody>
                                <tfoot><tfoot>
                                </table>
                            </div>
                        </div>
                        <div class="box-footer">
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-primary" id="back" @click="goBack">返回</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-info" @click="addShop" disabled="{{isSaveDisabled}}">确定</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
<script>
export default {
  ready() {


    var self = this;
		self.licenseUploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadLicenseImg",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "1mb",
      multi_selection: false,
      max_retries: 3,
      dragdrop: true,
      drop_element: "container",
      chunk_size: "4mb",
      auto_start: false,
      uptoken: "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
      domain: "http://img.aworld.cn/",
      filters: {
        max_file_size: "1mb",
        prevent_duplicates: true,
        mime_types: [{ title: "Image files", extensions: "jpg,gif,png,jpeg" }]
      },
      unique_names: true,
      save_key: false,
      init: {
        FilesAdded: function(up, files) {
          if (files.length > 0) {
            self.isLicenseReady = true;
            $("#errLicenseTip").text("营业执照已选择，请点击确认上传");
            // 图片预览
            self.showPreview(files[0], "#previewLicense");
          }
          plupload.each(files, function(file) {
            var progress = new FileProgress(file, 'fsUploadProgress');
            progress.setStatus("等待...");
            progress.bindUploadCancel(up);
          });
        },
        BeforeUpload: function(up, file) {
          var progress = new FileProgress(file, 'fsUploadProgress');
          var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
          if (up.runtime === 'html5' && chunk_size) {
              progress.setChunkProgess(chunk_size);
          }
        },
        UploadProgress: function(up, file) {
          var progress = new FileProgress(file, 'fsUploadProgress');
          var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
          progress.setProgress(file.percent + "%", file.speed, chunk_size);
        },
        FileUploaded: function(up, file, info) {
          var res = JSON.parse(info);
          //alert("key")
          //alert(res.key)
					self.businessLicensePhotoKey = res.key;
					// 营业执照上传成功，然后上次身份照片
					self.idCardUploader.start();

          var progress = new FileProgress(file, 'fsUploadProgress');
          progress.setComplete(up, info);
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errLicenseTip").text(errTip || "上传营业执照图片出错");
          self.isSaveDisabled = false;
          var progress = new FileProgress(err.file, 'fsUploadProgress');
          progress.setError();
          progress.setStatus(errTip);
        },
        UploadComplete: function() {}
      }
		});

    self.idCardUploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadIdCardImg",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "1mb",
      multi_selection: false,
      max_retries: 3,
      dragdrop: true,
      drop_element: "container",
      chunk_size: "4mb",
      auto_start: false,
      uptoken: "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
      domain: "http://img.aworld.cn/",
      filters: {
        max_file_size: "1mb",
        prevent_duplicates: true,
        mime_types: [{ title: "Image files", extensions: "jpg,gif,png,jpeg" }]
      },
      unique_names: true,
      save_key: false,
      init: {
        FilesAdded: function(up, files) {
          if (files.length > 0) {
            self.isIdCardReady = true;
            $("#errIdCardTip").text("身份证图片已选择，请点击确认上传");
            // 图片预览
            self.showPreview(files[0], "#previewIdCard");
          }
          plupload.each(files, function(file) {
            var progress = new FileProgress(file, 'fsUploadProgress');
            progress.setStatus("等待...");
            progress.bindUploadCancel(up);
          });
        },
        BeforeUpload: function(up, file) {
          var progress = new FileProgress(file, 'fsUploadProgress');
          var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
          if (up.runtime === 'html5' && chunk_size) {
              progress.setChunkProgess(chunk_size);
          }
        },
        UploadProgress: function(up, file) {
          var progress = new FileProgress(file, 'fsUploadProgress');
          var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
          progress.setProgress(file.percent + "%", file.speed, chunk_size);
        },
        FileUploaded: function(up, file, info) {
          var res = JSON.parse(info);
					self.idCardPhotoKey = res.key;
					// 身份证上传成功，发送请求
					self.requestCommon();
          var progress = new FileProgress(file, 'fsUploadProgress');
          progress.setComplete(up, info);
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errIdCardTip").text(errTip || "上传身份证图片出错");
          self.isSaveDisabled = false;
          var progress = new FileProgress(err.file, 'fsUploadProgress');
          progress.setError();
          progress.setStatus(errTip);
        },
        UploadComplete: function() {}
      }
    });


	},
  data() {
    return {
        realname: "",
        phone: "",
        idCard: "",
        address: {
            province: "",
            city: "",
            region: "",
            street: ""
        },
        shopname: "",
        creditCode: "",
        isSaveDisabled: false,
        isLicenseDisabled: true,
        isIdCardDisabled: true,
        licenseUploader: null,
        idCardUploader: null,
        isLicenseReady: false,
        isIdCardReady: false,
        businessLicensePhotoKey: '',
        idCardPhotoKey: '',
        isError: false,
        };
	},
	watch: {
        realname(val) {
            this.readyChange();
        },
        phone(val) {
            this.readyChange();
        },
        idCard(val) {
            this.readyChange();
        },
        'address': {
          handler(val){
                this.readyChange();
          },
          deep: true
        },
        shopname(val) {
          this.readyChange();
        },
        creditCode(val) {
          this.readyChange();
        },
        isLicenseReady(val) {
          this.readyChange();
        },
        isIdCardReady(val) {
          this.readyChange();
        }
  },
  methods: {
    showPreview: function(file, eleId){
      var image = new Image();
      var preloader = new mOxie.Image();
      preloader.onload = function() {
          preloader.downsize( 100, 100 );
          image.setAttribute( "src", preloader.getAsDataURL() );
          $(eleId).append(image);
      };
      preloader.load( file.getSource() );
    },
    queryPreview: function(eleId){
      if($(eleId).children().length > 0){
         $(eleId).children().remove();
        }
			// 取消一张图片，都不见了，不过应该没关系
      if($(".progressContainer").length > 0){
         $(".progressContainer").remove();
      }
    },
      // 取消营业执照选择
    cancelLicense: function(){
        if(this.isLicenseReady){
        if(this.isError){
					return;
        }
        $("#errLicenseTip").text('营业执照图片已取消，请重新选择');
        this.licenseUploader.files = [];
        this.isLicenseReady = false;
        this.queryPreview("#previewLicense");
        }
    },
      // 取消身份证选择
    cancelIdCard: function(){
		if(this.isIdCardReady){
            if(this.isError){
                return;
            }
        $("#errIdCardTip").text('身份证图片已取消，请重新选择');
        this.idCardUploader.files = [];
        this.isIdCardReady = false;
        this.queryPreview("#previewIdCard");
      }  
    },
    requestCommon: function(){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.userShop,
        data: JSON.stringify({
          businessLicensePhotoKey: self.businessLicensePhotoKey,
          idCardPhotoKey: self.idCardPhotoKey,
          realname: self.realname,
          phone: self.phone,
          idCard: self.idCard,
          address: self.address,
          shopname: self.shopname,
          creditCode: self.creditCode,
        }),
        type: 'POST',
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "userList" });
            commFun.tip({ text: '商户添加成功', type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.isError = true;
          self.isSaveDisabled = false;
          commFun.errorTip(errData, "商户添加失败");
        }
      });

    },
    addShop: function() {
            var self = this;
            if (self.isSaveDisabled) {
                return false;
            }
			self.isSaveDisabled = true;
			
			if(!self.isLicenseReady){
            $("#errLicenseTip").text('请先选择营业执照');
                self.isSaveDisabled = false;
                return;
			}
			if(!self.isIdCardReady){
            $("#errIdCardTip").text('请先选择身份照片');
                self.isSaveDisabled = false;
            return;
			}

			if (self.checkEmpty(self.realname.trim(), "真实姓名不能为空")) {
                self.isSaveDisabled = false;
				return false;
			}
			if (this.checkEmpty(this.phone.trim(), "手机号码不能为空")) {
                self.isSaveDisabled = false;
				return false;
            }
          if(!commFun.isPhoneNumber(self.phone)){
            commFun.tip({ text: '手机号格式不对' });
              self.isSaveDisabled = false;
            return false;
          }
            if (self.checkEmpty(self.idCard.trim(), "身份证号码不能为空")) {
                self.isSaveDisabled = false;
                return false;
          }
          if(!commFun.isCardNo(this.idCard)){
            commFun.tip({ text: '身份证号码格式不对' });
            this.isSaveDisabled = false;
            return false;
          }
          let {province, city, region, street} = this.address;
          var isAddressOK = province.length > 0 && city.length > 0 && region.length > 0 && street.length > 0;
          if(! isAddressOK){
            commFun.tip({ text: '地址不能为空' });
            this.isSaveDisabled = false;
            return false;
          }
          if (this.checkEmpty(this.shopname.trim(), "商铺名称不能为空")) {
				this.isSaveDisabled = false;
				return false;
			}
			if (this.checkEmpty(this.creditCode.trim(), "信用代码不能为空")) {
				this.isSaveDisabled = false;
				return false;
			}

			if(this.isError){
				this.requestCommon();
			} else {
				// 上传营业执照
				this.licenseUploader.start();
			}
		},
    readyChange: function(){
            this.isLicenseDisabled = this.checkEmptyChange(this.isLicenseReady);
            this.isIdCardDisabled = this.checkEmptyChange(this.isIdCardReady);
    },
    checkEmptyChange: function(readyVal){
            let {province, city, region, street} = this.address;
            var isAddressOK = province.length > 0 && city.length > 0 && region.length > 0 && street.length > 0;
			return isAddressOK && this.realname.length > 0 && this.phone.length > 0 && this.idCard.length > 0 && this.shopname.length > 0 && this.creditCode.length > 0 && !readyVal ? false: true;
    },
    checkEmpty: function(value, tip) {
          if (value.length === 0) {
            if (tip && typeof tip !== "undefined") {
              commFun.tip({ text: tip });
            }
            return true;
          }
            return false;
    },
    goBack: function() {
          this.$route.router.go({ name: "userList" });
    }
  }
};
</script>