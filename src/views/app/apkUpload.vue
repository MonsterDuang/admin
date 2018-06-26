<template>
<div>
    <section class="content-header">
        <h1>上传安卓安装包</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> APP管理</a></li>
            <li class="active"> apk文件上传</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">上传安卓安装包</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body" id="container">
                             <div class="form-group">
                                <label for="apkfile" class="col-sm-2 control-label">上传apk文件</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadApk"><i class="fa fa-plus"></i>选择文件</button>                           
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
                                <button type="button" class="btn btn-info" @click="addAPK" disabled="{{isSaveDisabled}}">确定</button>
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
export default {
  ready() {
    var self = this;
    this.uploader = Qiniu.uploader({
      runtimes: "html5,flash,html4",
      browse_button: "uploadApk",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "200mb",
      multi_selection: false,
      max_retries: 3,
      dragdrop: true,
      drop_element: "container",
      chunk_size: "200mb",
      auto_start: false,
      uptoken:
        "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
      domain: "http://img.aworld.cn/",
      filters: {
        max_file_size: "200mb",
        prevent_duplicates: true,
        mime_types: [{ title: "apk files", extensions: "apk" }]
      },
        config: {
            region: 'Qiniu.region.z2'
        },
      unique_names: false,
      save_key: false,
      init: {
        FilesAdded: function(up, files) {
          if (files.length > 0) {
              self.isReady = true;
              $("#errTip").text("文件已选择，请点击确认上传");
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
            self.fileKey = res.key;
            // commFun.qiniuPath+
            self.requestCommon(res.key);
            var progress = new FileProgress(file,'fsUploadProgress');
            progress.setComplete(up, info);
        },
        Key: function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在unique_names: false，save_key: false时才生效;
            // do something with key here
            return file.name;
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errTip").text(errTip || "上传文件出错");
            self.isSaveDisabled = false;
            var progress = new FileProgress(err.file, 'fsUploadProgress');
            progress.setError();
            progress.setStatus(errTip);
        }
      }
    });
  },
  data() {
    return {
      uploader: null,
      isSaveDisabled: false,
      fileKey: ''
    };
  },
  methods: {
    // 取消时去掉预展
    queryPreview: function() {
      if ($("#preview").children().length > 0) {
        $("#preview").children().remove();
      }
      if($(".progressContainer").length > 0){
        $(".progressContainer").remove();
      }
    },
   // 文件上传
    requestCommon: function(fileKey){
      console.log(fileKey,"===上传文件===");
      var self = this;
      commFun.request({
        url: commFun.apiRouter.apkUpload,
        data: JSON.stringify({
            fileKey: fileKey,
            type:"android"
        }),
        type: "POST",
        success: function(data) {
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "appVersion" });
            commFun.tip({ text: "apk文件上传成功", type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData, "apk文件上传失败");
          self.isSaveDisabled = false;
        }
      });
    },
    // 取消文件选择
    cancelFile: function() {
      if (this.isReady) {
        $("#errTip").text("文件已取消，请重新选择");
        this.uploader.files.splice(0, 1);
				this.isReady = false;
				this.queryPreview();
      }
    },
    //点击保存按钮，添加或者修改后管用户
    addAPK: function() {
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
      this.$route.router.go({ name: "appVersion" });
    }
  }
};
</script>