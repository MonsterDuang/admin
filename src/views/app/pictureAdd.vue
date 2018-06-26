<template>
<div>
    <section class="content-header">
        <h1>上传背景图</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> APP管理</a></li>
            <li class="active"> {{picname}}上传</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">上传{{picname}}</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body" id="container">
                             <div class="form-group">
                                <label for="apkfile" class="col-sm-2 control-label">上传{{picname}}</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadPic"><i class="fa fa-plus"></i>选择文件</button>                           
                                </div>  
                            </div> 
                            <div class="form-group" v-show="isReady">
                              <label for="coverKeys" class="col-sm-2 control-label">已选图片</label>
                              <div class="col-sm-2">
                                <div id="preview"></div>                      
                              </div>                   
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" style="color:red;" id="errTip"></label>                   
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
                                <button type="button" class="btn btn-info" @click="addPic" disabled="{{isSaveDisabled}}">确定</button>
                            </div>
                            <div class="col-sm-1" style="margin-left:20px">
                                <button type="button" class="btn btn-info" id="cancel" @click="cancelFile">取消文件选择</button>
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
import { OPEN_SHOP_BG, NAME_DES_MAP } from "../../js/constants";
export default {
  ready() {
    var self = this;
    this.uploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadPic",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "50mb",
      multi_selection: self.isMult,
      max_retries: 3,
      dragdrop: true,
      drop_element: "container",
      chunk_size: "4mb",
      auto_start: false,
      uptoken:
        "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
      domain: "http://img.aworld.cn/",
      filters: {
        max_file_size: "50mb",
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
            for (let i = 0, len = files.length; i < len; i++) {
              self.showPreview(files[i]);
            }
          }
          plupload.each(files, function(file) {
            var progress = new FileProgress(file, "fsUploadProgress");
            progress.setStatus("等待...");
            progress.bindUploadCancel(up);
          });
        },
        BeforeUpload: function(up, file) {
          var progress = new FileProgress(file, "fsUploadProgress");
          var chunk_size = plupload.parseSize(this.getOption("chunk_size"));
          if (up.runtime === "html5" && chunk_size) {
            progress.setChunkProgess(chunk_size);
          }
        },
        UploadProgress: function(up, file) {
          var progress = new FileProgress(file, "fsUploadProgress");
          var chunk_size = plupload.parseSize(this.getOption("chunk_size"));
          progress.setProgress(file.percent + "%", file.speed, chunk_size);
        },
        FileUploaded: function(up, file, info) {
          var res = JSON.parse(info);
          self.keyArray.push(res.key);
          if (self.name !== OPEN_SHOP_BG) {
            self.requestCommon();
          }

          var progress = new FileProgress(file, "fsUploadProgress");
          progress.setComplete(up, info);
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errTip").text(errTip || "上传文件出错");
          self.isSaveDisabled = false;
          var progress = new FileProgress(err.file, "fsUploadProgress");
          progress.setError();
          progress.setStatus(errTip);
        },
        UploadComplete: function() {
          // todo不知道为啥，FileUploaded还没执行，就执行了UploadComplete
          if (self.name === OPEN_SHOP_BG) {
            setTimeout(() => {
              self.requestCommon();
            }, 1000);
          }
        }
      }
    });
  },
  data() {
    return {
      uploader: null,
      isSaveDisabled: false,
      name: "",
      picname: "",
      keyArray: [],
      isMult: false,
      isReady: false
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var name = this.$route.query.name || "";
      if (name) {
        this.name = name;
        this.picname = NAME_DES_MAP[name];
        if (name === OPEN_SHOP_BG) {
          this.isMult = true;
        }
      }
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
      if ($("#preview").children().length > 0) {
        $("#preview")
          .children()
          .remove();
      }
      if ($(".progressContainer").length > 0) {
        $(".progressContainer").remove();
      }
    },
    requestCommon: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.picUpload,
        data: JSON.stringify({
          keyArray: self.keyArray,
          name: self.name
        }),
        type: "POST",
        success: function(data) {
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "pictureList" });
            commFun.tip({ text: "背景图片上传成功", type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData, "背景图片上传失败");
          self.isSaveDisabled = false;
        }
      });
    },
    cancelFile: function() {
      if (this.isReady) {
        $("#errTip").text("文件已取消，请重新选择");
        this.uploader.files.splice(0, 1);
        this.isReady = false;
        this.queryPreview();
      }
    },
    //点击保存按钮，添加或者修改后管用户
    addPic: function() {
      var self = this;
      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      if (!this.isReady) {
        $("#errTip").text("请先选择apk文件");
        self.isSaveDisabled = false;
        return;
      }

      self.uploader.start();
    },
    goBack: function() {
      this.$route.router.go({ name: "pictureList" });
    }
  }
};
</script>