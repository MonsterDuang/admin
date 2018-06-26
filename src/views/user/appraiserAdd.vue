<template>
<div>
    <section class="content-header">
        <h1>新增鉴宝师</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 用户管理</a></li>
            <li class="active"> 新增鉴宝师</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">填写鉴宝师相关信息</h3>
                        注意：添加的新商户，默认用户昵称为:adminuser,密码为888888
                    </div>
                    <form class="form-horizontal" id="container">
                        <div class="box-body">
                            <div class="form-group">
                              <label for="" class="col-sm-2 control-label">选择鉴宝师类型</label>
                              <div class="radio col-sm-4">
                                <label><input type="radio" name="typeRadios" value={{APPRAISER_TYPE_SELFSUPPORT}} v-model="appraiserType">自营</label>
                              </div>
                              <div class="radio col-sm-4">
                                <label><input type="radio" name="typeRadios" value={{APPRAISER_TYPE_PARTJOB}} v-model="appraiserType">兼职</label>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="col-sm-2 control-label"></label>
                              <p class="help-block">说明：自营鉴宝师为平台可分配的鉴宝师</p>  
                            </div>
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
                                <label for="shopname" class="col-sm-2 control-label">精通的领域</label>
                                <div class="col-sm-8">
                                  <select class="form-control select2" style="width:100%" id="area" multiple="multiple">
                                      <template v-for="item in areaList">
                                          <option value="{{ item.id }}">{{ item.name }}</option>  
                                      </template>
                                  </select>
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="certification" class="col-sm-2 control-label">资格证</label>
                                <div class="col-sm-8">
                                    <input v-model="certification" type="text" class="form-control" placeholder="请输入资格证">                                   
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                              <label for="" class="col-sm-2 control-label">选择收款账户</label>
                              <div class="radio col-sm-4">
                                <label><input type="radio" name="optionsRadios" value={{WITHDRAW_ACCOUNT_TYPE_BANKCARD}} v-model="receiptType">银行卡</label>
                              </div>
                              <div class="radio col-sm-4">
                                <label><input type="radio" name="optionsRadios" value={{WITHDRAW_ACCOUNT_TYPE_ALIPAY}} v-model="receiptType">支付宝账户</label>
                              </div>
                            </div>
                            <div v-show="receiptType== WITHDRAW_ACCOUNT_TYPE_ALIPAY">
                              <div class="form-group">
                                  <label for="alipayName" class="col-sm-2 control-label">姓名</label>
                                  <div class="col-sm-8">
                                      <input v-model="alipay.name" type="text" class="form-control" placeholder="请输入姓名">                                   
                                  </div>
                                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                              </div>
                              <div class="form-group">
                                  <label for="alipayAccount" class="col-sm-2 control-label">支付宝账户</label>
                                  <div class="col-sm-8">
                                      <input v-model="alipay.account" type="text" class="form-control" placeholder="请输入支付宝账户">                                   
                                  </div>
                                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                              </div>
                            </div>
                            <div v-show="receiptType== WITHDRAW_ACCOUNT_TYPE_BANKCARD">
                              <div class="form-group">
                                  <label for="bankcardName" class="col-sm-2 control-label">姓名</label>
                                  <div class="col-sm-8">
                                      <input v-model="bankcard.name" type="text" class="form-control" placeholder="请输入姓名">                                   
                                  </div>
                                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                              </div>
                              <div class="form-group">
                                  <label for="bankcardPhone" class="col-sm-2 control-label">电话号码</label>
                                  <div class="col-sm-8">
                                      <input v-model="bankcard.phone" type="text" class="form-control" placeholder="请输入电话号码">                                   
                                  </div>
                                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                              </div>
                              <div class="form-group">
                                  <label for="shop" class="col-sm-2 control-label">开户银行</label>
                                  <div class="col-sm-8">
                                      <div v-show="hasBanks">
                                          <select class="form-control select2" style="width:100%" id="banklist" v-model="bankcard.openingBankCode">
                                              <template v-for="item in bankList">
                                                  <option value="{{ item.code }}">{{ item.name }}</option>  
                                              </template>
                                          </select>
                                      </div>
                                      <a v-show="!hasBanks" type="button" class="btn btn-info">请先添加支持银行</a>
                                  </div>
                                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                              </div>
                              <div class="form-group">
                                  <label for="bankcardCardNo" class="col-sm-2 control-label">银行卡号</label>
                                  <div class="col-sm-8">
                                      <input v-model="bankcard.cardNo" type="text" class="form-control" placeholder="请输入银行卡号">                                   
                                  </div>
                                  <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                              </div>
                            </div>
                            <div class="form-group">
                                <label for="certificationPhotoKey" class="col-sm-2 control-label">上传资格证照片</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadCertificationImg" disabled="{{isCertificationDisabled}}"><i class="fa fa-plus"></i>选择图片</button>                           
                                </div>  
																<div class="col-sm-2" style="margin-left:20px">
																		<button type="button" class="btn btn-info" id="cancel" @click="cancelCertification">取消文件选择</button>
																</div>   
																<label class="col-sm-4 control-label" style="color:red;" id="errCertificationTip"></label>                             
                            </div>
                            <div class="form-group" v-show="isCertificationReady">
                                <label for="certificationPhotoKey" class="col-sm-2 control-label">已选资格证</label>
                                <div class="col-sm-2">
                                    <div id="previewCertification"></div>                      
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
import {WITHDRAW_ACCOUNT_TYPE_BANKCARD, WITHDRAW_ACCOUNT_TYPE_ALIPAY, APPRAISER_TYPE_SELFSUPPORT, APPRAISER_TYPE_PARTJOB} from '../../js/constants';
export default {
  ready() {
    var self = this;
    self.getCategoryList();
    self.getBankList();
    $("#area").select2({
      tags: false
    });
    $("#area").change(function(){
      self.area =  $("#area").val() || [];
    });
    $("#banklist").select2({});
    $("#banklist").change(function() {
      self.bankcard.openingBank = $("#banklist").find("option:selected").text();
      self.bankcard.openingBankCode = $("#banklist").val();
    });

		self.certificationUploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadCertificationImg",
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
            self.isCertificationReady = true;
            $("#errCertificationTip").text("资格证照片已选择，请点击确认上传");
            // 图片预览
            self.showPreview(files[0], "#previewCertification");
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
					self.certificationPhotoKey = res.key;
					// 资格证照上传成功，然后上次身份照片
					self.idCardUploader.start();

          var progress = new FileProgress(file, 'fsUploadProgress');
          progress.setComplete(up, info);
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errCertificationTip").text(errTip || "上传资格证照图片出错");
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
      areaList: [],
      area: [],
			certification: "",
      bankcard: {
        name: '',
        phone: '',
        cardNo: '',
        openingBank: '',
        openingBankCode: ''
      },
      alipay: {
        name: '',
        account: ''
      },
			isSaveDisabled: false,
			isCertificationDisabled: true,
			isIdCardDisabled: true,
			certificationUploader: null,
			idCardUploader: null,
			isCertificationReady: false,
			isIdCardReady: false,
			certificationPhotoKey: '',
			idCardPhotoKey: '',
      isError: false,
      receiptType: WITHDRAW_ACCOUNT_TYPE_BANKCARD,
      hasBanks: false,
      bankList:[],
      appraiserType: APPRAISER_TYPE_SELFSUPPORT,
      WITHDRAW_ACCOUNT_TYPE_BANKCARD: WITHDRAW_ACCOUNT_TYPE_BANKCARD,
      WITHDRAW_ACCOUNT_TYPE_ALIPAY: WITHDRAW_ACCOUNT_TYPE_ALIPAY,
      APPRAISER_TYPE_SELFSUPPORT: APPRAISER_TYPE_SELFSUPPORT,
      APPRAISER_TYPE_PARTJOB: APPRAISER_TYPE_PARTJOB
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
		certification(val) {
      this.readyChange();
    },
    area(val) {
      this.readyChange();
    },
    'address': {
      handler(val){
        this.readyChange();
      },
      deep: true
    },
    'bankcard': {
      handler(val){
        this.readyChange();
      },
      deep: true
    },
    'alipay': {
      handler(val){
        this.readyChange();
      },
      deep: true
    },
		receiptType(val) {
      this.readyChange();
    },
    isCertificationReady(val) {
      this.readyChange();
		},
		isIdCardReady(val) {
      this.readyChange();
    }
  },
  methods: {
    getBankList: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.supportBank,
        data: {},
        success: function(data) {
          self.bankList = data || [];

          if (data.length > 0) {
            self.hasBanks = true;
            self.$nextTick(function() {
              $("#banklist").select2("val", data[0].code);
            });
          } else {
            self.hasBanks = false;
          }
        },
        error: function(errData) {
          commFun.errorTip(errData);
        }
      });
    },
    getCategoryList: function(){
      var self = this;
        commFun.request({
          url: commFun.apiRouter.category,
          type: "GET",
          success: function (data) {
            if (data) {
              self.areaList = data || [];
            }
            else{
              commFun.tip({text:'无数据返回，稍后再试'});
            }
          },
          error: function (errData) {
            commFun.errorTip(errData || '获取分类失败');
          }
        });

    },
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
      if($(".progressContainer").length > 0){
        $(".progressContainer").remove();
      }
    },
		cancelCertification: function(){
			if(this.isCertificationReady){
        if(this.isError){
					return;
        }
        $("#errCertificationTip").text('资格证照图片已取消，请重新选择');
        this.certificationUploader.files = [];
        this.isCertificationReady = false;
        this.queryPreview("#previewCertification");
      }  
		}, 
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
      var receiptsObj = {};
      if(this.receiptType === WITHDRAW_ACCOUNT_TYPE_BANKCARD){
        receiptsObj = {bankcard: this.bankcard};
      } else if(this.receiptType === WITHDRAW_ACCOUNT_TYPE_ALIPAY){
        receiptsObj = {alipay: this.alipay};
      }
      commFun.request({
        url: commFun.apiRouter.userAppraiser,
        data: JSON.stringify(Object.assign({}, receiptsObj, {
					certificationPhotoKey: self.certificationPhotoKey,
					idCardPhotoKey: self.idCardPhotoKey,
          realname: self.realname,
          phone: self.phone,
          idCard: self.idCard,
          address: self.address,
          area: $("#area").val() || [],
          certification: self.certification,
          appraiserType: self.appraiserType
        })),
        type: 'POST',
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "userList" });
            commFun.tip({ text: '鉴宝师添加成功', type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.isError = true;
          self.isSaveDisabled = false;
          commFun.errorTip(errData, "鉴宝师添加失败");
        }
      });

    },
    addShop: function() {
      var self = this;
      if (self.isSaveDisabled) {
        return false;
      }
			self.isSaveDisabled = true;
			
			if(!this.isCertificationReady){
        $("#errCertificationTip").text('请先选择资格证照片');
        this.isSaveDisabled = false;
        return;
			}
			if(!this.isIdCardReady){
        $("#errIdCardTip").text('请先选择身份证照片');
        this.isSaveDisabled = false;
        return;
			}

			if (this.checkEmpty(this.realname.trim(), "真实姓名不能为空")) {
				this.isSaveDisabled = false;
				return false;
			}
			if (this.checkEmpty(this.phone.trim(), "手机号码不能为空")) {
				this.isSaveDisabled = false;
				return false;
      }
      if(!commFun.isPhoneNumber(this.phone)){
        commFun.tip({ text: '手机号格式不对' });
        this.isSaveDisabled = false;
        return false;
      }
			if (this.checkEmpty(this.idCard.trim(), "身份证号码不能为空")) {
				this.isSaveDisabled = false;
				return false;
      }
      if(!commFun.isCardNo(this.idCard)){
        commFun.tip({ text: '身份证号码格式不对' });
        this.isSaveDisabled = false;
        return false;
      }
			if (this.checkEmpty(this.certification.trim(), "资格证不能为空")) {
				this.isSaveDisabled = false;
				return false;
      }
      if(this.area.length === 0){
        commFun.tip({ text: '精通的领域不能为空' });
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

      if(this.receiptType === WITHDRAW_ACCOUNT_TYPE_BANKCARD){
        let {name, phone, cardNo, openingBank, openingBankCode } = this.bankcard;
        let isBankOk = name.length > 0 && phone.length > 0 && cardNo.length > 0 && openingBank.length > 0 && openingBankCode.length > 0;
        if(!isBankOk){
          commFun.tip({ text: '收款银行卡信息不能为空' });
          this.isSaveDisabled = false;
				  return false;
        }
      } else if(this.receiptType === WITHDRAW_ACCOUNT_TYPE_ALIPAY) {
        let {name, account} = this.alipay;
        let isAliPayOk = name.length > 0 && account.length > 0;
        if(!isAliPayOk){
          commFun.tip({ text: '收款支付宝信息不能为空' });
          this.isSaveDisabled = false;
				  return false;
        }
      } else {
        commFun.tip({ text: '请选择收款账户' });
        this.isSaveDisabled = false;
        return false;
      }
      if(this.appraiserType.length === 0){
        commFun.tip({ text: '请选择鉴宝师类型' });
        this.isSaveDisabled = false;
        return false;
      }

			if(this.isError){
				this.requestCommon();
			} else {
				// 上传资格证照
				this.certificationUploader.start();
			}
		},
		readyChange: function(){
			this.isCertificationDisabled = this.checkEmptyChange(this.isCertificationReady);
			this.isIdCardDisabled = this.checkEmptyChange(this.isIdCardReady);
		},
		checkEmptyChange: function(readyVal){
      var isAreaOK = this.area.length > 0;
      let {province, city, region, street} = this.address;
      var isAddressOK = province.length > 0 && city.length > 0 && region.length > 0 && street.length > 0;
      var isOtherOK = this.realname.length > 0 && this.phone.length > 0 && this.idCard.length > 0 && this.certification.length > 0;
      if(this.receiptType === WITHDRAW_ACCOUNT_TYPE_BANKCARD){
        let {name, phone, cardNo, openingBank, openingBankCode } = this.bankcard;
        let isBankOk = name.length > 0 && phone.length > 0 && cardNo.length > 0 && openingBank.length > 0 && openingBankCode.length > 0;
        return isBankOk && isOtherOK && isAreaOK && isAddressOK && !readyVal ? false: true;
      } else if(this.receiptType === WITHDRAW_ACCOUNT_TYPE_ALIPAY) {
        let {name, account} = this.alipay;
        let isAliPayOk = name.length > 0 && account.length > 0;
        return isAliPayOk && isOtherOK && isAreaOK && isAddressOK && !readyVal ? false: true;
      }
			
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