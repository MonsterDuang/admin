<template>
<div>
    <section class="content-header">
        <h1>{{msgTitle}}</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 消息管理</a></li>
            <li class="active"> {{msgTitle}}</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">{{subTitle}}</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body" id="container">
                            <div class="form-group">
                                <label for="title" class="col-sm-2 control-label">消息名称</label>
                                <div class="col-sm-8">
                                    <input v-model="title" name="title" type="text" class="form-control" placeholder="请输入消息名称">                                
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left" v-if="!messagesId">（必填）</span>
                            </div>
                            <div class="form-group">
                              <label for="content" class="col-sm-2 control-label">消息内容</label>
                              <div class="col-sm-8">
                                <textarea row="6" class="form-control" id="content" placeholder="请输入消息内容" v-model="content" name="content"></textarea>
                              </div>
                              <span class="col-sm-2 control-label text-red" style="text-align:left" v-if="!messagesId">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="uri" class="col-sm-2 control-label">uri</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" placeholder="跳转页面地址" v-model="uri" name="uri">
                                    <p class="help-block">说明：点击消息跳转页面地址</p>
                                </div>
                            </div> 
                             <div class="form-group" v-if="!messagesId">
                                <label for="coverKey" class="col-sm-2 control-label">上传封面图片</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadImg" disabled="{{isDisabled}}"><i class="fa fa-plus"></i>选择图片</button>                           
                                </div>  
                                 <div class="col-sm-8"><p class="help-block">说明：上传图片前，先填写消息名称和消息内容</p> </div>      
                            </div> 
                            <div class="form-group" v-else>
                                <label for="coverKey" class="col-sm-2 control-label">封面图片</label>
                                <div class="col-sm-8">
                                    <img v-bind:src="cover" style="width: 100px; height: 100px" />
                                </div> 
                            </div>
                            <div class="form-group" v-show="isReady && !messagesId">
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
                            <div class="col-sm-1" v-if="!messagesId">
                                <button type="button" class="btn btn-info" @click="addMessage" disabled="{{isSaveDisabled}}">确定</button>
                            </div>
                            <div class="col-sm-1" style="margin-left:20px" v-if="!messagesId">
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
    if (self.messagesId) {
      return;
    }
    this.uploader = Qiniu.uploader({
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
      uptoken:
        "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
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
          self.requestCommon(res.key);

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
        // Key: function(up, file) {
        //   // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
        //   // 该配置必须要在unique_names: false，save_key: false时才生效
        //   var key = "messages/"+ Date.parse(new Date()) + file.name;
        //   return key;
        // }
      }
    });
  },
  data() {
    return {
      title: "",
      content: "",
      uri: "",
      isDisabled: false,
      uploader: null,
      isReady: false,
      messagesId: "",
      msgTitle: "系统消息发布",
      subTitle: "填写系统消息",
      cover: "",
      isSaveDisabled: false,
      isError: false,//发请求是否错过一次了
      coverKey: ''
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var messagesId = this.$route.query.messagesId || "";
      if (messagesId) {
        this.messagesId = messagesId;
        this.msgTitle = "系统消息详情";
        this.subTitle = "消息详情";
        this.passText = "说明：不填则为默认不修改密码";
        //根据id查询用户详情
        this.getMessageDetail(messagesId);
      }
    }
  },
  watch: {
    title(val) {
      this.isDisabled =
        val.length > 0 && this.content.length > 0 && !this.isReady
          ? false
          : true;
    },
    content(val) {
      this.isDisabled =
        val.length > 0 && this.title.length > 0 && !this.isReady ? false : true;
    },
    isReady(val) {
      this.isDisabled =
        this.content.length > 0 && this.title.length > 0 && !val ? false : true;
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
        $("#preview").children().remove();
      }
      if($(".progressContainer").length > 0){
        $(".progressContainer").remove();
      }
    },
    getMessageDetail: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.messages,
        params: this.messagesId,
        success: function(data) {
          if (data) {
            self.title = data.title;
            self.content = data.content;
            self.uri = data.uri;
            self.cover = data.cover;
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData, "消息详情查询失败");
        }
      });
    },
    requestCommon: function(imgKey){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.messages,
        data: JSON.stringify({
          coverKey: imgKey,
          title: self.title,
          content: self.content,
          uri: self.uri
        }),
        type: "POST",
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isOk) {
            self.$route.router.go({ name: "messagesList" });
            commFun.tip({ text: "系统消息发布成功", type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.isError = true;
          commFun.errorTip(errData, "系统消息发布失败");
          self.isSaveDisabled = false;
        }
      });
    },
    cancelFile: function() {
      if (this.messagesId) {
        return;
      }
      if (this.isReady) {
        // 修改的时候，且错误之后再选图片的，这种情况是可以取消文件的~
        if(this.isError){
          return;
        }

        $("#errTip").text("文件已取消，请重新选择");
        this.uploader.files.splice(0, 1);
				this.isReady = false;
				this.queryPreview();
      }
    },
    //点击保存按钮，添加或者修改后管用户
    addMessage: function() {
      var self = this;
      if (self.messagesId) {
        return;
      }

      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      if (!this.isReady) {
        $("#errTip").text("请先选择图片");
        self.isSaveDisabled = false;
        return;
      }

      if (
        this.checkEmpty(self.title.trim(), "消息名不能为空") ||
        this.checkEmpty(self.content, "消息内容不能为空")
      ) {
        self.isSaveDisabled = false;
        return false;
      }

      if(this.isError){
        this.requestCommon(this.coverKey);
      } else {
        this.uploader.start();
      }
      
    },
    checkEmpty: function(value, tip) {
      if (value.length === 0) {
        commFun.tip({ text: tip });
        return true;
      }
      return false;
    },
    goBack: function() {
      this.$route.router.go({ name: "messagesList" });
    }
  }
};
</script>