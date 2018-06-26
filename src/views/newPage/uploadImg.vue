<template>
    <div style="padding-left: 10px">

        <div>
            测试页面:{{time}}
        </div>
    <br/>
    <form class="form-horizontal" id="container">
        <div class="form-group">
            <label for="businessLicensePhotoKey" class="col-sm-2 control-label">上传图片</label>
            <div class="col-sm-2">
                <!--<button class="btn btn-block btn-default" id="uploadLicenseImg" disabled="{{isLicenseDisabled}}"><i class="fa fa-plus"></i>选择图片</button>-->
                <input id="uploadLicenseImg" type="file">
            </div>
            <div class="col-sm-2" style="margin-left:20px">
                <button type="button" class="btn btn-info" id="cancel" @click="cancelLicense">取消文件选择</button>
            </div>
            <label class="col-sm-4 control-label" style="color:red;" id="errLicenseTip"></label>
        </div>

        <div class="form-group">
            <table class="table">
                <thead></thead>
                <tbody id="fsUploadProgress"></tbody>
                <tfoot><tfoot>
            </table>
        </div>

    </form>

        <button @click="confirmFn()">确定</button>

        <ul id="images">
            <li><img src="1.jpg" alt="Picture"></li>
            <li><img src="2.jpg" alt="Picture 2"></li>
            <li><img src="3.jpg" alt="Picture 3"></li>
        </ul>

    </div>
</template>

<script>
    export default {
        ready() {
            new Viewer(document.getElementById('images'),{});
            var self = this;
            self.licenseUploader = Qiniu.uploader({
                runtimes: "html5,flash,html4",
                browse_button: "uploadLicenseImg",
                get_new_uptoken: false,
                container: "container",
                max_file_size: "4mb",
                multi_selection: true,
                max_retries: 3,
                dragdrop: true,
                drop_element: "container",
                chunk_size: "4mb",
                auto_start: false,
                uptoken: "MDoA3HDqtRSVEd_tq8bJ7pPj9Emm5AFEuWygwLdw:aj-rpYO3EW36K5URfZ5BWFuL0WQ=:eyJzY29wZSI6InlpdGFvIiwiZGVhZGxpbmUiOjE1NDQ1NzI4MDAwMDB9",
                domain: "http://img.aworld.cn/",
                filters: {
                    max_file_size: "100mb",//上传大小
                    prevent_duplicates: true,
                    mime_types: [{ title: "Image files", extensions: "jpg,gif,png,jpeg,apk" }]//文件格式
                },config: {
                    region: 'Qiniu.region.z2'
                },
                unique_names: true,
                save_key: false,
                init: {
                    FilesAdded: function(up, files) {
                        if (files.length > 0) {
                            self.isLicenseReady = true;
                            $("#errLicenseTip").text("图片已选择，请点击确认上传");
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
                        self.businessLicensePhotoKey = res.key;

                        alert(res.key)

                        // 营业执照上传成功，然后上次身份照片
                        // self.idCardUploader.start();

                        var progress = new FileProgress(file, 'fsUploadProgress');
                        progress.setComplete(up, info);
                    },
                    Error: function(up, err, errTip) {
                        //上传出错时，处理相关的事情
                        $("#errLicenseTip").text(errTip || "上传图片出错");
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
                time: new Date(),
                isLicenseReady:false,
                businessLicensePhotoKey:'',
                licenseUploader:null
            }
        },
        watch:{
            businessLicensePhotoKey(newV){
                console.log(newV);
            }
        },
        methods: {
            confirmFn(){
                this.licenseUploader.start();
            },
            back: function(){
                this.$route.router.go({name:"index"});
            },
            cancelLicense: function(){
                var self = this
                if(self.isLicenseReady){
                    if(self.isError){return;}
                    $("#errLicenseTip").text('图片已取消，请重新选择');
                    self.licenseUploader.files = [];
                    self.isLicenseReady = false;
                    self.queryPreview("#previewLicense");
                }
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
        }
    }
</script>

<style scoped>
#images {
    margin-top: 20px;
    clear: both;
}
#images li{
    list-style: none;
    float: left;
    width: 100px;
    height: 100px;
}
#images li img{
    width: 100%;
}
</style>