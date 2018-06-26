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
                        <h3 class="box-title">填写首页分类信息</h3>
                    </div>
                    <form class="form-horizontal">
                        <div class="box-body" id="container">
                           <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">分类名称</label>
                                <div class="col-sm-8">
                                    <input v-model="name" type="text" class="form-control" placeholder="请输入分类名称">                                
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group">
                                <label for="sort" class="col-sm-2 control-label">排序</label>
                                <div class="col-sm-8">
                                    <input v-model="sort" type="text" class="form-control" placeholder="请输入分类排序">                                
                                </div>
                                <span class="col-sm-2 control-label text-red" style="text-align:left">（必填）</span>
                            </div>
                            <div class="form-group" v-if="categoryId">
                              <label for="iconKey" class="col-sm-2 control-label">已选分类图标</label>
                              <div class="col-sm-2">
                                <img v-bind:src="img" style="width:100px;height:100px"/> 
                              </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">上传分类图标</label>
                                <div class="col-sm-2">
                                   <button class="btn btn-block btn-default" id="uploadImg" disabled="{{isDisabled}}"><i class="fa fa-plus"></i>选择文件</button>                                    
                                </div> 
                                <span class="col-sm-2 control-label text-red" style="text-align:left" v-show="!categoryId">（必须选择）</span>        
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" style="color:red;" id="errTip"></label>                   
                            </div>
                            <div class="form-group" v-show="isReady">
                              <label for="iconKey" class="col-sm-2 control-label">已选图片</label>
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
                                <button type="button" class="btn btn-info" @click="addCategory" disabled="{{isSaveDisabled}}">确认</button>
                            </div>
                            <div class="col-sm-1" style="margin-left:20px">
                                <button type="button" class="btn btn-info" id="cancel" @click="cancelCategory">取消文件选择</button>
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
    self.uploader = Qiniu.uploader({
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
          self.iconKey = res.key;
          if(self.categoryId){
            // 修改
            self.requestCommon('PUT', {iconKey: res.key}, '首页分类修改成功', self.categoryId);
          } else {
            // 增加
            self.requestCommon('POST', {iconKey: res.key}, '首页分类添加成功', '');
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
      name: "",
      sort: "",
      img: '',
      categoryId: '',
      isDisabled: true,
      uploader: null,
      isReady: false,
      isSaveDisabled: false,
      all_title: '添加首页分类',
      isError: false,//发请求是否错过一次了
      iconKey: ''
    };
  },
  route: {
    data(transition) {
        //此参数来自插件编辑页点击修改
      var categoryId = this.$route.query.categoryId;
      var page = this.$route.query.page;
      if (typeof categoryId !== "undefined" && categoryId) {
        this.categoryId = categoryId;
        this.all_title = "首页分类修改";
        //根据id查询用户详情
        this.getCategoryDetail(categoryId);
      }
    }
  },
  watch: {
    name(val) {
      this.isDisabled = val.length > 0 && this.sort.length > 0 && !this.isReady ? false : true;
    },
    sort(val) {
      this.isDisabled = val.length > 0 && this.name.length > 0 && !this.isReady ? false : true;
    },
    isReady(val) {
      // 当已经选择了文件，就不让再选了，再选七牛会上传已经选择的
      this.isDisabled = this.name.length > 0 && this.sort.length > 0 && !val ? false : true;
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
    requestCommon: function(type, obj, tip, paramsId){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.categoryList,
        data: JSON.stringify(Object.assign({}, obj, {
          name: self.name,
          sort: Number(self.sort)
        })),
        params: paramsId,
        type: type,
        success: function(data) {
          self.isError = false;
          self.isSaveDisabled = false;
          if (data && data.isok) {
            self.$route.router.go({ name: "categoryList" });
            commFun.tip({ text: tip, type: "showSuccessToast" });
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          self.isError = true;
          commFun.errorTip(errData, "首页分类添加失败");
          self.isSaveDisabled = false;
        }
      });
    },
    getCategoryDetail:function(categoryId){
      var self = this;
      commFun.request({
        url: commFun.apiRouter.categoryList,
        params: categoryId,
        success: function (data) {
          if(data){
            var item = data || {};
            self.name = item.name || '';
            self.img= item.icon || '';
            self.sort = (item.sort || '').toString();
          }else{
              commFun.tip({text:'无数据返回，稍后再试'});
          }
        },
        error: function (errData) {
            commFun.errorTip(errData);
        }
      });
    },
    cancelCategory: function() {
      if (this.isReady) {
        // 修改的时候，且错误之后再选图片的，这种情况是可以取消文件的~
        if(this.isError){
          if(!(this.categoryId && !this.iconKey && this.uploader.files.length > 0)){
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
    addCategory: function() {
      var self = this;
      if (self.isSaveDisabled) {
        return false;
      }
      self.isSaveDisabled = true;

      if (!self.isReady && !self.categoryId) {
        $("#errTip").text("请先选择图片");
        self.isSaveDisabled = false;
        return;
      }
      if (this.name.length === 0 || this.sort.length === 0) {
        commFun.tip({ text: "名称和排序不能为空" });
        self.isSaveDisabled = false;
        return;
      }
       if (!commFun.checkPositiveInteger(this.sort)) {
        commFun.tip({ text: "排序为正整数" });
        self.isSaveDisabled = false;
        return;
      }

      if(this.isError){
        if(this.categoryId){
          if(this.iconKey){
            this.requestCommon('PUT', {iconKey: this.iconKey}, '首页分类修改成功', this.preShopId);
          }else if(this.uploader.files.length > 0){
            this.uploader.start();
          }else {
            this.requestCommon('PUT', {}, '首页分类修改成功', this.preShopId);
          }
        }
        else {
          this.requestCommon('POST', {iconKey: this.iconKey}, '首页分类添加成功', '');
        }
      } else {
        if(self.categoryId && self.uploader.files.length < 1){
          // 没有修改图片
          self.requestCommon('PUT', {}, '首页分类修改成功', self.categoryId);
        } else {
          // 增加或者修改了图片
          this.uploader.start();
        }
      }

      
    },
    goBack: function() {
      this.$route.router.go({ name: "categoryList" });
    }
  }
};
</script>