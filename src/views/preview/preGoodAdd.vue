<template>
<div>
    <section class="content-header">
        <h1>{{title}}</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 预展区</a></li>
            <li class="active"> {{title}}</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">填写预展商品相关信息</h3>
                    </div>
                    <form class="form-horizontal" id="container">
                        <div class="box-body">
                          <div class="form-group">
                              <label for="shop" class="col-sm-2 control-label">所属商铺</label>
                              <div class="col-sm-8">
                                  <div v-show="hasShops">
                                      <select class="form-control select2" style="width:100%" id="shop" v-model="shop">
                                          <template v-for="item in preShopList">
                                              <option value="{{ item.id }}">{{ item.name }}</option>  
                                          </template>
                                      </select>
                                  </div>
                                  <a v-show="!hasShops" type="button" class="btn btn-info" id="addPreGood" v-link="{name:'preShopAdd', query:{frompage: 'addGood'}}">请先添加预展商铺</a>
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                              <label for="name" class="col-sm-2 control-label">商品名称</label>
                              <div class="col-sm-8">
                                  <input v-model="name" type="text" class="form-control" placeholder="请输入商品名称">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                              <label for="no" class="col-sm-2 control-label">商品编号</label>
                              <div class="col-sm-8">
                                  <input v-model="no" type="text" class="form-control" placeholder="请输入商品编号">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                            <label for="intro" class="col-sm-2 control-label">商品信息</label>
                            <div class="col-sm-8">
                              <textarea row="3" class="form-control" id="intro" placeholder="请输入商品信息" v-model="intro"></textarea>
                            </div>
                          </div>                           
                          <div class="form-group">
                              <label for="valuation" class="col-sm-2 control-label">商品估价</label>
                              <div class="col-sm-8">
                                  <input v-model="valuation" type="text" class="form-control" placeholder="请输入商品估计">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                              <label for="floorPrice" class="col-sm-2 control-label">商品底价</label>
                              <div class="col-sm-8">
                                  <input v-model="floorPrice" type="text" class="form-control" placeholder="请输入商品底价">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                              <label for="raisePriceRange" class="col-sm-2 control-label">加价幅度</label>
                              <div class="col-sm-8">
                                  <input v-model="raisePriceRange" type="text" class="form-control" placeholder="请输入商品加价幅度">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                            <label for="auctionStartAt" class="col-sm-2 control-label">拍卖开始时间</label>
                            <div class="col-sm-6 input-group" style="padding-left: 15px;width: 30%;">
                              <input class="form-control form_datetime date" size="16" type="text" id="dtp_input1" v-model="auctionStartAt" readonly data-date-format="yyyy-mm-dd  HH:ii p" data-link-field="dtp_input1">
                              <span class="input-group-addon" @click="clearStart"><i class="fa fa-close"></i></span>  
                            </div>  
                            <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span> 
                          </div>
                          <div class="form-group">
                            <label for="auctionEndAt" class="col-sm-2 control-label">拍卖结束时间</label>
                            <div class="col-sm-6 input-group" style="padding-left: 15px;width: 30%;">
                              <input class="form-control date form_datetime" size="16" type="text" id="dtp_input2" v-model="auctionEndAt" readonly data-date-format="yyyy-mm-dd  HH:ii p" data-link-field="dtp_input2">
                              <span class="input-group-addon" @click="clearEnd"><i class="fa fa-close"></i></span>
                            </div>
                            <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group" v-if="preGoodId">
                            <label for="coverKeys" class="col-sm-2 control-label">商品图片</label>
                            <div class="col-sm-2" v-for="cover in covers" track-by="$index">
                              <img v-bind:src="cover" style="width:100px;height:100px"/> 
                            </div>
                          </div>
                          <div class="form-group">
                              <label for="coverKeys" class="col-sm-2 control-label">上传商品图片</label>
                              <div class="col-sm-2">
                                <button class="btn btn-block btn-default" id="uploadImg" disabled="{{isDisabled}}"><i class="fa fa-plus"></i>选择图片</button>                           
                              </div>  
                              <div class="col-sm-8"><p class="help-block">说明：上传图片前，先填写消息名称和消息内容，商品可同时选择多张图片上传</p> </div>                     
                          </div>
                          <div class="form-group" v-show="isReady">
                              <label for="coverKeys" class="col-sm-2 control-label">已选图片</label>
                              <div class="col-sm-2">
                                <div id="preview"></div>                      
                              </div>                   
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
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-info" @click="addPreGood" disabled="{{isSaveDisabled}}">{{title}}</button>
                            </div>
                            <div class="col-sm-2" style="margin-left:20px" v-if="!messagesId">
                                <button type="button" class="btn btn-info" id="cancel" @click="cancelFile">取消文件选择</button>
                            </div>  
                            <label class="col-sm-4 control-label" style="color:red;" id="errTip"></label>
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
    if(! self.preGoodId){
      self.getPreShopList();
    }
    
    $("#shop").select2({});

    $(".form_datetime").datetimepicker({
      language: "zh-CN",
      weekStart: 0,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
      showMeridian: 1
    });

    //当商铺值改变
    $("#shop").change(function() {
      self.shop = $("#shop").val();
    });

    self.uploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadImg",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "1mb",
      multi_selection: true,
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
          mime_types: [
          {title : "Image files", extensions : "jpg,gif,png,jpeg"}
          ]
      },config: {
            region: 'Qiniu.region.z2'
        },
      unique_names: true,
      save_key: false,
      init: {
          FilesAdded: function(up, files) {
          if(files.length > 0){
              self.isReady = true;
              $("#errTip").text('文件已选择，请点击确认上传');
          }
          plupload.each(files, function(file) {
            // 图片预览
            self.showPreview(file);
            // 进度条相关
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
            // 多文件上传，每次上传一个文件，push图片key到临时数组
            var res = JSON.parse(info);
            self.keyArray.push(res.key);
            var progress = new FileProgress(file, 'fsUploadProgress');
            progress.setComplete(up, info);
          },
          Error: function(up, err, errTip) {
              //上传出错时，处理相关的事情
              $("#errTip").text(errTip || '上传图片出错'); 
              self.isSaveDisabled = false;
              var progress = new FileProgress(err.file, 'fsUploadProgress');
              progress.setError();
              progress.setStatus(errTip);
          },
          UploadComplete: function() {
            if(self.preGoodId){
            // 修改
            self.requestCommon('PUT', {coverKeys: self.keyArray}, '预展商品修改成功', self.preGoodId);
          } else {
            // 增加
            self.requestCommon('POST', {coverKeys: self.keyArray}, '预展商品添加成功', '');
          }
        }
      }
      });
  },
  data() {
    return {
      preShopList: [],
      shop: "",
      name: "",
      no: "",
      intro: "",
      valuation: "",
      floorPrice: "",
      raisePriceRange: "",
      auctionStartAt: "",
      auctionEndAt: "",
      title: "新增预展商品",
      preGoodId: "",
      hasShops: false,
      isDisabled: true,
      uploader: null,
      isReady: false,
      keyArray: [],
      isSaveDisabled: false,
      covers: [],
      isError: false,//发请求是否错过一次了
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var preGoodId = this.$route.query.preGoodId;
      var page = this.$route.query.page;
      if (typeof preGoodId !== "undefined" && preGoodId) {
        this.preGoodId = preGoodId;
        this.title = "修改预展商品";
        //根据id查询用户详情
        this.getPreGoodDetail(preGoodId);
      }
    }
  },
  watch: {
    shop(val) {
      this.isDisabled = this.isEmpty(val, 'shop');
    },
    name(val) {
      this.isDisabled = this.isEmpty(val, 'name');
    },
    no(val) {
      this.isDisabled = this.isEmpty(val, 'no');
    },
    valuation(val) {
      this.isDisabled = this.isEmpty(val, 'valuation');
    },
    floorPrice(val) {
      this.isDisabled = this.isEmpty(val, 'floorPrice');
    },
    raisePriceRange(val) {
      this.isDisabled = this.isEmpty(val, 'raisePriceRange');
    },
    auctionStartAt(val) {
      this.isDisabled = this.isEmpty(val, 'auctionStartAt');
    },
    auctionEndAt(val) {
      this.isDisabled = this.isEmpty(val, 'auctionEndAt');
    },
    isReady(val) {
			this.isDisabled = this.isEmpty(val, 'isReady');
		}
  },
  methods: {
    isEmpty: function(val, type){
      var tempArrar = ['shop', 'name', 'no', 'valuation', 'floorPrice', 'raisePriceRange', 'auctionStartAt', 'auctionEndAt', 'isReady'];
      var flag = false;
      for(var i = 0; i < tempArrar.length; i++){
        var item = tempArrar[i], valueLen = this[item].length;
        if(type === item){
          valueLen = val.length;
        }
        if(valueLen === undefined){
          if(type !== 'isReady'){
             valueLen = this.isReady ? 0 : 1;
          } else {
            valueLen = val ? 0 : 1;
          }
         
        }

        if(valueLen > 0){
          continue;
        } else {
          flag = true;
          break;
        }
      }
      return flag;
    },
    // 选择图片预展
    showPreview: function(file){
      var image = new Image();
      var preloader = new mOxie.Image();
      preloader.onload = function() {
          preloader.downsize( 100, 100 );
          image.setAttribute( "src", preloader.getAsDataURL() );
          $('#preview').append(image);
      };
      preloader.load( file.getSource() );
    },
    // 取消时去掉预展
    queryPreview: function(){
      if($("#preview").children().length > 0){
        $("#preview").children().remove();
      }
      if($(".progressContainer").length > 0){
        $(".progressContainer").remove();
      }
    },
    requestCommon: function(type, obj, tip, paramsId){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.preGood,
        data: JSON.stringify(Object.assign({}, obj, {
          no: self.no, 
          shop: self.shop, 
          name: self.name, 
          intro: self.intro, 
          valuation: Number(self.valuation), 
          floorPrice: Number(self.floorPrice), 
          raisePriceRange: Number(self.raisePriceRange), 
          auctionStartAt: self.auctionStartAt, 
          auctionEndAt: self.auctionEndAt
        })),
        params:paramsId,
        type: type,
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
              self.$route.router.go({name: 'preGoodList'});
              commFun.tip({ text: tip, type: "showSuccessToast" });
          } else {
              commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.keyArray = [];
          self.isError = true;
          commFun.errorTip(errData, "系统消息发布失败");
          self.isSaveDisabled = false;
        }
      });
    },
    getPreShopList: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.preShopNoPage,
        data: {},
        success: function(data) {
          self.preShopList = data || [];

          if (data.length > 0) {
            //有商铺
            self.hasShops = true;
            var shopId = self.preGoodId ? self.shop : data[0].id;
            self.$nextTick(function() {
              $("#shop").select2("val", shopId);
            });
          } else {
            //当没有商铺，提示先添加商铺
            self.hasShops = false;
          }
        },
        error: function(errData) {
          commFun.errorTip(errData);
        }
      });
    },
    //根据id查询预展商品详情
    getPreGoodDetail: function(preGoodId) {
      var self = this;
        commFun.request({
            url: commFun.apiRouter.preGood,
            params: preGoodId,
            success: function (data) {
                if(data){
                  var item = data|| {};
                  self.name = data.name || '';
                  self.no = data.no || '';
                  self.intro = data.intro || '';
                  self.valuation = data.valuation || '';
                  self.floorPrice = data.floorPrice || '';
                  self.raisePriceRange = data.raisePriceRange || '';
                  self.auctionStartAt = commFun.timeTrans(item.auctionStartAt) || '';
                  self.auctionEndAt = commFun.timeTrans(item.auctionEndAt) || '';
                  self.covers = data.covers || [];
                  self.shop = data.shop.id;
                  self.getPreShopList();
                }
                else{
                    commFun.tip({text:'无数据返回，稍后再试'});
                }
            },
            error: function (errData) {
                commFun.errorTip(errData);
            }
        });
    },
    cancelFile: function(){
      if(this.isReady){
        // 修改的时候，且错误之后再选图片的，这种情况是可以取消文件的~
        if(this.isError){
          if(!(this.preGoodId && this.keyArray.length === 0 && this.uploader.files.length > 0)){
            return;
          }
        }

        $("#errTip").text('文件已取消，请重新选择');
        this.uploader.files = [];
        this.isReady = false;
        this.queryPreview();
      }
    },
    //点击保存按钮，添加或者修改预展商品
    addPreGood: function() {
      var self = this;

      if(self.isSaveDisabled){
				return false;
			}
			self.isSaveDisabled = true;

      if(!this.isReady && !self.preGoodId){
        $("#errTip").text('请先选择图片');
        self.isSaveDisabled = false;
        return;
      }

      if (this.checkEmpty(self.shop, "商铺名称不能为空")) {
        self.isSaveDisabled = false;
        return false;
      }

      if (this.checkEmpty(self.name, "商品名称不能为空") || this.checkEmpty(self.no, "商品编号不能为空")) {
        self.isSaveDisabled = false;
        return false;
      }

      if (this.checkEmpty(self.valuation, "商品估价不能为空") || this.checkEmpty(self.floorPrice, "商品底价不能为空") || this.checkEmpty(self.raisePriceRange, "加价幅度不能为空")) {
        self.isSaveDisabled = false;
        return false;
      }

      if (!commFun.checkNotNegative(self.valuation) || !commFun.checkNotNegative(self.floorPrice) || !commFun.checkNotNegative(self.raisePriceRange)) {
        commFun.tip({ text: '商品估价，底价，加价幅度，必须为正数字符串' });
        self.isSaveDisabled = false;
        return false;
      }

      // 拍卖开始时间和拍卖结束时间都必须存在，且拍卖开始时间大于当前时间（todo 暂时不用这个），拍卖结束时间大于拍卖开始时间
      if (this.checkEmpty(self.auctionStartAt, "拍卖开始时间不能为空") || this.checkEmpty(self.auctionEndAt, "拍卖结束时间不能为空")) {
        self.isSaveDisabled = false;
        return false;
      }
      // if (new Date(self.auctionStartAt).getTime() <= new Date().getTime()) {
      //   commFun.tip({
      //     text: "拍卖开始时间必须大于当前时间"
      //   });
      //   self.isSaveDisabled = false;
      //   return false;
      // }
      if (new Date(self.auctionEndAt).getTime() <= new Date(self.auctionStartAt).getTime()) {
        commFun.tip({
          text: "拍卖结束时间必须大于拍卖开始时间"
        });
        self.isSaveDisabled = false;
        return false;
      }

       if(this.isError){
        if(this.preGoodId){
          // 修改
          if(this.keyArray.length > 0){
            this.requestCommon('PUT', {coverKeys: this.keyArray}, '预展商品修改成功', this.preGoodId);
          }else if(this.uploader.files.length > 0){
            this.uploader.start();
          }else {
            this.requestCommon('PUT', {}, '预展商品修改成功', this.preGoodId);
          }
        }
        else {
          // 增加，增加的时候，肯定是选了图片的，第二次增加无需选择图片。
          this.requestCommon('POST', {coverKeys: this.keyArray}, '预展商品添加成功', '');
        }
      } else {
        if(this.preGoodId && this.uploader.files.length < 1){
          // 没有修改图片
          this.requestCommon('PUT', {}, '预展商品修改成功', this.preGoodId);
        } else {
          // 增加或者修改了图片
          this.uploader.start();
        }
      }


      

    },
    //清除生效时间
    clearStart: function() {
      this.auctionStartAt = "";
    },
    clearEnd: function() {
      this.auctionEndAt = "";
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
      this.$route.router.go({ name: "preGoodList" });
    }
  }
};
</script>