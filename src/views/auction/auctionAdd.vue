<template>
<div>
    <section class="content-header">
        <h1>{{auctionTitle}}</h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="#"> 拍卖会管理</a></li>
            <li class="active"> {{auctionTitle}}</li>
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
                                <label for="title" class="col-sm-2 control-label">拍卖会标题</label>
                                <div class="col-sm-8">
                                    <input v-model="title" name="title" type="text" class="form-control" placeholder="请输入拍卖会标题">                                
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                              <label for="playCount" class="col-sm-2 control-label">播放次数</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="请输入播放次数" v-model="playCount">
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="likeCount" class="col-sm-2 control-label">点赞数</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="请输入点赞数" v-model="likeCount">
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="commentCount" class="col-sm-2 control-label">评论数</label>
                              <div class="col-sm-8">
                                <input type="text"  class="form-control" placeholder="请输入评论数" v-model="commentCount">
                              </div>
                            </div>
                            <!-- <div class="form-group" v-if="auctionId">
                                <label for="coverKey" class="col-sm-2 control-label">视频</label>
                                <div class="col-sm-8">
                                    <img v-bind:src="cover" style="width: 100px; height: 100px" />
                                </div> 
                            </div> -->
                            <div class="form-group">
                                <label for="coverKey" class="col-sm-2 control-label">上传视频</label>
                                <div class="col-sm-2">
                                    <button class="btn btn-block btn-default" id="uploadImg" disabled="{{isDisabled}}"><i class="fa fa-plus"></i>选择视频</button>                           
                                </div>  
                                 <div class="col-sm-8"><p class="help-block">说明：上传视频前，先填写拍卖会标题，若要上传多个视频，请同时选择多个</p> </div>      
                            </div> 
                            <div class="form-group" v-show="isReady">
                              <label for="coverKeys" class="col-sm-2 control-label">已选视频</label>
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
                                <button type="button" class="btn btn-info" @click="addAuction" disabled="{{isSaveDisabled}}">确定</button>
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
      browse_button: "uploadImg",
      get_new_uptoken: false,
      container: "container",
      max_file_size: "500mb",
      multi_selection: true,
      max_retries: 3,
      dragdrop: true,
      drop_element: "container",
      chunk_size: "10mb",
      auto_start: false,
      uptoken: "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
      domain: "http://img.aworld.cn/",
      filters: {
        max_file_size: "500mb",
        prevent_duplicates: true,
        mime_types: [{ title: "video files", extensions: "avi,mp4,rm,rmvb,mpeg,mkv,3gp" }]
      },config: {
            region: 'Qiniu.region.z2'
        },
      unique_names: true,
      save_key: false,
      init: {
        FilesAdded: function(up, files) {
          if (files.length > 0) {
            self.isReady = true;
            $("#errTip").text("视频文件已选择，请点击确认上传");
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
          self.keyArray.push(res.key);
					var progress = new FileProgress(file, 'fsUploadProgress');
          progress.setComplete(up, info);
        },
        Error: function(up, err, errTip) {
          //上传出错时，处理相关的事情
          $("#errTip").text(errTip || "上传视频出错");
					self.isSaveDisabled = false;
					var progress = new FileProgress(err.file, 'fsUploadProgress');
					progress.setError();
					progress.setStatus(errTip);
        },
        UploadComplete: function() {
          // todo不知道为啥，FileUploaded还没执行，就执行了UploadComplete
          setTimeout(() => {
             self.requestCommon();
          }, 1000);
        }
      }
    });
  },
  data() {
    return {
      title: "",
      playCount: "",
      likeCount: "",
      commentCount: "",
      isDisabled: true,
      uploader: null,
      isReady: false,
      auctionId: "",
      auctionTitle: "拍卖会添加",
      subTitle: "填写拍卖会相关信息",
      isSaveDisabled: false,
      keyArray: [],
      isError: false,//发请求是否错过一次了
    };
  },
  route: {
    data(transition) {
      //此参数来自插件编辑页点击修改
      var auctionId = this.$route.query.auctionId || "";
      if (auctionId) {
        this.auctionId = auctionId;
        this.auctionTitle = "";
        this.subTitle = "";
        //根据id查询拍卖会详情
        this.getAuctionDetail(auctionId);
      }
    }
  },
  watch: {
    title(val) {
      this.isDisabled = val.length > 0 && !this.isReady ? false: true;
    },
    isReady(val) {
      this.isDisabled = this.title.length > 0 && !val ? false : true;
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
    getAuctionDetail: function() {
      var self = this;
      commFun.request({
        url: commFun.apiRouter.auction,
        params: this.auctionId,
        success: function(data) {
          if (data) {
            self.title = data.title;
            self.playCount = data.content;
            self.likeCount = data.uri;
            self.commentCount = data.cover;
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData, "拍卖会详情查询失败");
        }
      });
    },
    cancelFile: function() {
      if (this.isReady) {
        // 修改的时候，且错误之后再选图片的，这种情况是可以取消文件的~
        if(this.isError){
          return;
        }

        $("#errTip").text("视频文件已取消，请重新选择");
        this.uploader.files.splice(0, 1);
				this.isReady = false;
      }
      this.queryPreview();
    },
    requestCommon: function(){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.auction,
        data: JSON.stringify({
          videoKeys: self.keyArray,
          title: self.title,
          playCount: self.playCount ? 0 : Number(self.playCount),
          likeCount: self.likeCount ? 0 : Number(self.likeCount),
          commentCount: self.commentCount ? 0: Number(self.commentCount)
        }),
        type: "POST",
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "auctionList" });
            commFun.tip({ text: "拍卖会视频添加成功", type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.keyArray = [];
          self.isError = true;
          commFun.errorTip(errData, "拍卖会视频添加失败");
          self.isSaveDisabled = false;
        }
      });

    },
    //点击保存按钮
    addAuction: function() {
      var self = this;
      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      if (!this.isReady) {
        $("#errTip").text("请先选择视频");
        self.isSaveDisabled = false;
        return;
      }

      if (self.title.length === 0) {
        commFun.tip("拍卖会标题不能为空");
        self.isSaveDisabled = false;
        return;
      }
      if(this.isError){
        this.requestCommon();
      }else {
        this.uploader.start();
      }
      
    },
    goBack: function() {
      this.$route.router.go({ name: "auctionList" });
    }
  }
};
</script>