<template>
<div>
    <section class="content-header">
        <h1>{{all_title}}</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> APP管理</a></li>
            <li class="active"> {{all_title}}</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">填写Banner图片信息</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body" id="container">
                            <div class="form-group">
                                <label for="role" class="col-sm-2 control-label">使用端</label>
                                <div class="col-sm-8">
                                <select class="form-control" v-model="type" value={{type}} v-on:change="typeChange">
                                    <option value="{{BANNER_TYPE_APP}}">APP端</option>
                                    <option value="{{BANNER_TYPE_PC}}">PC端</option>
                                </select>
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="uri" class="col-sm-2 control-label">跳转地址</label>
                                <div class="col-sm-8">
                                    <input v-model="uri" name="uri" type="text" class="form-control" placeholder="请输入跳转地址">                                
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group" v-if="bannerId">
                              <label for="coverKey" class="col-sm-2 control-label">已选banner图片</label>
                              <div class="col-sm-2">
                                <img v-bind:src="img" style="width:100px;height:100px"/> 
                              </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">上传banner图片</label>
                                <div class="col-sm-2">
                                   <button class="btn btn-block btn-default" id="uploadImg" disabled="{{isDisabled}}"><i class="fa fa-plus"></i>选择文件</button>                                    
                                </div> 
                                <span class="col-sm-2 control-label text-red" style="text-align:left" v-show="!bannerId">（必须选择）</span>        
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" style="color:red;" id="errTip"></label>                   
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
                            <div class="col-sm-1">
                                <button type="button" class="btn btn-info" @click="addBanner" disabled="{{isSaveDisabled}}">确认</button>
                            </div>
                            <div class="col-sm-1" style="margin-left:20px">
                                <button type="button" class="btn btn-info" id="cancel" @click="cancelBanner">取消文件选择</button>
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
import { BANNER_TYPE_APP, BANNER_TYPE_PC } from "../../js/constants";
export default {
  ready() {
    var self = this;
    self.uploader = Qiniu.uploader({
      config: {
          region: 'Qiniu.region.z2'
      },
      runtimes: "html5,flash,html4",
      browse_button: "uploadImg",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "1mb",
      multi_selection: false,
      // flash_swf_url: 'path/of/plupload/Moxie.swf',
      max_retries: 3,
      dragdrop: true,
      drop_element: "container",
      chunk_size: "4mb",
      auto_start: false,
      uptoken:
        "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
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
          if(self.bannerId){
            // 修改
            self.requestCommon('PUT', {imgKey: res.key}, 'banner修改成功', self.bannerId);
          } else {
            // 增加
            self.requestCommon('POST', {imgKey: res.key}, 'banner添加成功', '');
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
        UploadComplete: function() {
          //队列文件处理完毕后，处理相关的事情
        }
      }
    });
  },
  data() {
    return {
      type: BANNER_TYPE_APP,
      uri: "",
      BANNER_TYPE_APP: BANNER_TYPE_APP,
      BANNER_TYPE_PC: BANNER_TYPE_PC,
      isDisabled: true,
      uploader: null,
      isReady: false,
      isSaveDisabled: false,
      bannerId: '',
      all_title: 'Banner图片配置',
      img: '',
      isError: false,//发请求是否错过一次了
      coverKey: ''
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var bannerId = this.$route.query.bannerId;
      var page = this.$route.query.page;
      if (typeof bannerId !== "undefined" && bannerId) {
        this.bannerId = bannerId;
        this.all_title = "Banner图片修改";
        //根据id查询用户详情
        this.getBannerDetail(bannerId);
      }
    }
  },
  watch: {
    uri(val) {
      this.isDisabled = val.length > 0 && this.type.length > 0 && !this.isReady ? false : true;
    },
    isReady(val) {
      // 当已经选择了文件，就不让再选了，再选七牛会上传已经选择的
      this.isDisabled = this.uri.length > 0 && this.type.length > 0 && !val ? false : true;
    }
  },
  methods: {
    // 选择图片预展
    showPreview: function(file) {
      var image = new Image();
      var preloader = new mOxie.Image();
      preloader.onload = function() {
        preloader.downsize(100, 100);
        image.setAttribute("src", preloader.getAsDataURL());
        $("#preview").append(image);
      };
      preloader.load(file.getSource());
    },
    // 取消时去掉预展
    queryPreview: function() {
      if($("#preview").children().length >0){
         $("#preview").children().remove();
      }
      if($(".progressContainer").length > 0){
         $(".progressContainer").remove();
      }
    },
    requestCommon: function(type, obj, tip, paramsId){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.banner,
        data: JSON.stringify(Object.assign({}, obj, {
          uri: self.uri,
          type: self.type
        })),
        params: paramsId,
        type: type,
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "bannerList" });
            commFun.tip({ text: tip, type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.isError = true;
          commFun.errorTip(errData, "banner图片添加失败");
          self.isSaveDisabled = false;
        }
      });
    },
    getBannerDetail:function(bannerId){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.banner,
        params: bannerId,
        success: function (data) {
          if(data){
            var item = data || {};
            self.uri = item.uri || '';
            self.img= item.img || '';
            self.type = item.type;
          }else{
              commFun.tip({text:'无数据返回，稍后再试'});
          }
        },
        error: function (errData) {
            commFun.errorTip(errData);
        }
      });
    },
    typeChange: function() {},
    cancelBanner: function() {
      if (this.isReady) {
        // 修改的时候，且错误之后再选图片的，这种情况是可以取消文件的~
        if(this.isError){
          if(!(this.bannerId && !this.coverKey && this.uploader.files.length > 0)){
            return;
          }
        }
        $("#errTip").text("文件已取消，请重新选择");
        // 从队列中删除已经选中的图片
        this.uploader.files.splice(0, 1);
				this.isReady = false;
				this.queryPreview();
      }
    },
    //点击保存按钮，添加或者修改后管用户
    addBanner: function() {
      var self = this;
      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      if (!self.isReady && !self.bannerId) {
        $("#errTip").text("请先选择图片");
        self.isSaveDisabled = false;
        return;
      }
      if (this.type.length === 0 || this.uri.length === 0) {
        commFun.tip({ text: "类型和uri不能为空" });
        self.isSaveDisabled = false;
        return;
      }

      if(this.isError){
        if(this.bannerId){
          if(this.coverKey){
            this.requestCommon('PUT', {imgKey: this.coverKey}, 'banner修改成功', this.preShopId);
          }else if(this.uploader.files.length > 0){
            this.uploader.start();
          }else {
            this.requestCommon('PUT', {}, 'banner修改成功', this.preShopId);
          }
        }else {
          this.requestCommon('POST', {imgKey: this.coverKey}, 'banner添加成功', '');
        }
      } else {
        if(self.bannerId && self.uploader.files.length < 1){
          // 没有修改图片
          self.requestCommon('PUT', {}, 'banner修改成功', self.bannerId);
        } else {
          // 增加或者修改了图片
          this.uploader.start();
        }
      }

    },
    goBack: function() {
      this.$route.router.go({ name: "bannerList" });
    }
  }
};
</script>