<template>
<div>
    <section class="content-header">
        <h1>{{all_title}}</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 预展区</a></li>
            <li class="active"> {{all_title}}</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">填写预展商铺相关信息</h3>
                    </div>
                    <form class="form-horizontal" id="container">
                        <div class="box-body">
                          <div class="form-group">
                              <label for="title" class="col-sm-2 control-label">预展标题</label>
                              <div class="col-sm-8">
                                  <input v-model="title" type="text" class="form-control" placeholder="请输入预展标题">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>
                          <div class="form-group">
                              <label for="name" class="col-sm-2 control-label">商家名称</label>
                              <div class="col-sm-8">
                                  <input v-model="name" type="text" class="form-control" placeholder="请输入商家名称">                               
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div>                         
                          <div class="form-group">
                            <label for="address" class="col-sm-2 control-label">商家地址</label>
                            <div class="col-sm-8">                       
                              <input v-model="address" type="text" class="form-control" placeholder="请输入预展商家地址">
                            </div>
                            <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                          </div> 
                          <div class="form-group">
                              <label for="goodsCount" class="col-sm-2 control-label">商品数量</label>
                              <div class="col-sm-8">
                                  <input v-model="goodsCount" type="text" class="form-control" placeholder="请输入商品估计">                               
                              </div>                           
                          </div>
                          <div class="form-group">
                            <label for="startAt" class="col-sm-2 control-label">开始时间</label>
                            <div class="col-sm-8 input-group" style="padding-left: 15px;width: 40%;">
                              <input class="form-control form_datetime date" size="16" type="text" id="dtp_input1" v-model="startAt" readonly data-date-format="yyyy-mm-dd  HH:ii p" data-link-field="dtp_input1">
                              <span class="input-group-addon" @click="clearStart"><i class="fa fa-close"></i></span>  
                            </div>   
                          </div>
                          <div class="form-group">
                            <label for="endAt" class="col-sm-2 control-label">结束时间</label>
                            <div class="col-sm-8 input-group" style="padding-left: 15px;width: 40%;">
                              <input class="form-control date form_datetime" size="16" type="text" id="dtp_input2" v-model="endAt" readonly data-date-format="yyyy-mm-dd  HH:ii p" data-link-field="dtp_input2">
                              <span class="input-group-addon" @click="clearEnd"><i class="fa fa-close"></i></span>
                            </div>
                          </div>
                          <div class="form-group" v-if="preShopId">
                            <label for="coverKey" class="col-sm-2 control-label">已选商铺图片</label>
                            <div class="col-sm-2">
                              <img v-bind:src="cover" style="width:100px;height:100px"/> 
                            </div>
                          </div>
                          <div class="form-group">
                              <label for="coverKey" class="col-sm-2 control-label">上传商铺图片</label>
                              <div class="col-sm-2">
                                <button class="btn btn-block btn-default" id="uploadImg" disabled="{{isDisabled}}"><i class="fa fa-plus"></i>选择图片</button>                           
                              </div>  
                              <div class="col-sm-8"><p class="help-block">说明：上传图片前，先填写预展标题，商家名称，商家地址</p> </div>                    
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
                                <button type="button" class="btn btn-info" @click="addPreShop" disabled="{{isSaveDisabled}}">{{all_title}}</button>
                            </div>
                            <div class="col-sm-2" style="margin-left:20px">
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
    $(".form_datetime").datetimepicker({
      language: "zh-CN",
      weekStart: 0,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
      showMeridian: 1,
    });

    self.uploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadImg",
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
      },config: {
            region: 'Qiniu.region.z2'
        },
      unique_names: true,
      save_key: false,
      init: {
        FilesAdded: function(up, files) {
          if (files.length > 0) {
            self.isReady = true;
            $("#errTip").text("文件已选择，请点击确认上传");
            // 图片预览
            self.showPreview(files[0]);
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
          self.coverKey = res.key;
          if(self.preShopId){
            // 修改
            self.requestCommon('PUT', {coverKey: res.key}, '预展商铺修改成功', self.preShopId);

          } else {
            // 增加
            self.requestCommon('POST', {coverKey: res.key}, '预展商铺添加成功', '');
          }
          var progress = new FileProgress(file, 'fsUploadProgress');
          progress.setComplete(up, info);
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errTip").text(errTip || "上传图片出错");
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
      title: "",
      name: "",
      address: "",
      startAt: "",
      endAt: "",
      cover: "",
      goodsCount: "",
      all_title: "新增预展商铺",
      preShopId: "",
      isDisabled: true,
      uploader: null,
      isReady: false,
      isSaveDisabled: false,
      isError: false,//发请求是否错过一次了
      coverKey: ''
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var preShopId = this.$route.query.preShopId;
      var page = this.$route.query.page;
      if (typeof preShopId !== "undefined" && preShopId) {
        this.preShopId = preShopId;
        this.all_title = "修改预展商铺";
        //根据id查询用户详情
        this.getPreShopDetail(preShopId);
      }
    }
  },
  watch: {
    title(val) {
      this.isDisabled = (this.address.length > 0 && val.length > 0 && this.name.length > 0 && !this.isReady) ? false : true;
    },
    name(val) {
      this.isDisabled = (this.address.length > 0 && val.length > 0 && this.title.length > 0 && !this.isReady) ? false : true;
    },
    address(val) {
      this.isDisabled = (val.length > 0 && this.title.length > 0 && this.name.length > 0 && !this.isReady) ? false : true;
    },
    isReady(val) {
      this.isDisabled = (this.address.length > 0 && this.title.length > 0 && this.name.length > 0 && !val) ? false : true;
    }
  },
  methods: {
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
    //根据id查询预展商品详情
    getPreShopDetail: function(preShopId) {
      var self = this;
      commFun.request({
          url: commFun.apiRouter.preShop,
          params: preShopId,
          success: function (data) {
              if(data){
                var item = data || {};
                self.title = item.title || '';
                self.name = item.name || '';
                self.address = item.address || '';
                self.startAt = commFun.timeTrans(item.startAt) || '';
                self.endAt = commFun.timeTrans(item.endAt) || '';
                self.goodsCount = item.goodsCount.toString() || '';
                self.cover= item.cover || '';
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
          if(!(this.preShopId && !this.coverKey && this.uploader.files.length > 0)){
            return;
          }
        }
        $("#errTip").text('文件已取消，请重新选择');
        this.uploader.files = [];
        this.isReady = false;
        this.queryPreview();
      }  
    },
    requestCommon: function(type, obj, tip, paramsId){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.preShop,
        data: JSON.stringify(Object.assign({}, obj, {
          title: self.title,
          name: self.name,
          address: self.address,
          goodsCount: self.goodsCount ? Number(self.goodsCount) : 0,
          startAt: self.startAt,
          endAt: self.endAt,
        })),
        params: paramsId,
        type: type,
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "preShopList" });
            commFun.tip({ text: tip, type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.isError = true;
          self.isSaveDisabled = false;
          commFun.errorTip(errData, "系统消息发布失败");
        }
      });

    },
    //点击保存按钮，添加或者修改预展商铺
    addPreShop: function() {
      if(this.isSaveDisabled){
				return false;
			}
      this.isSaveDisabled = true;

      if(!this.isReady && !this.preShopId){
        $("#errTip").text('请先选择图片');
        this.isSaveDisabled = false;
        return;
      }

      if (this.checkEmpty(this.title.trim(), "预展标题不能为空")) {
        this.isSaveDisabled = false;
        return false;
      }

      if (this.checkEmpty(this.name.trim(), "商家名称不能为空") ||this.checkEmpty(this.address.trim(), "商家地址不能为空")) {
        this.isSaveDisabled = false;
        return false;
      }
      // 若goodsCount存在，则必须为非负整数字符串
      if(!this.checkEmpty(this.goodsCount.trim()) && !commFun.checkZeroOrPositiveInteger(this.goodsCount.trim())){
        commFun.tip({ text: '商品数量必须为非负整数字符串' });
        this.isSaveDisabled = false;
        return false;
      }


      // 开始时间大于当前时间，结束时间大于开始时间,todo 开始时间大于结束时间不一定啊不一定
      // if (this.startAt && new Date(this.startAt).getTime() <= new Date().getTime()) {
      //   commFun.tip({
      //     text: "开始时间必须大于当前时间"
      //   });
      //   return false;
      // }
      if (this.startAt && this.endAt && new Date(this.endAt).getTime() <= new Date(this.startAt).getTime()) {
        commFun.tip({
          text: "结束时间必须大于开始时间"
        });
        return false;
      }

      // 第一次错了，下次直接发请求
      if(this.isError){
        if(this.preShopId){
          // 修改
          if(this.coverKey){
            // 第一次有图片，修改失败,这是第二次修改，图片不动
            this.requestCommon('PUT', {coverKey: this.coverKey}, '预展商铺修改成功', this.preShopId);
          }else if(this.uploader.files.length > 0){
            // 第一次没有图片，第二次选择了图片，这是第二次修改，需要上传图片
            this.uploader.start();
          }else {
            // 第一次没有图片，第二次也没有图片，这是第二次修改，无需图片。
            this.requestCommon('PUT', {}, '预展商铺修改成功', this.preShopId);
          }
        }
        else {
          // 增加，增加的时候，肯定是选了图片的，第二次增加无需选择图片。
          this.requestCommon('POST', {coverKey: this.coverKey}, '预展商铺添加成功', '');
        }
      } else {
        // 第一次发请求
        if(this.preShopId && this.uploader.files.length < 1){
          // 没有修改图片
          this.requestCommon('PUT', {}, '预展商铺修改成功', this.preShopId);
        } else {
          // 增加或者修改了图片
          this.uploader.start();
        }
      }
      
      
    },
    //清除生效时间
    clearStart: function() {
      this.startAt = "";
    },
    clearEnd: function() {
      this.endAt = "";
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
      this.$route.router.go({ name: "preShopList" });
    }
  }
};
</script>