<style scoped>
  td,th{
    text-align: center;
  }
  .table-bordered[_v-3086a230]{
    background: white;
  }
</style>
<template>
<div>
  <section class="content-header">
    <h1>
      App版本配置
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> APP管理</a></li>
      <li class="active"> App版本配置</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">版本信息列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>平台</th>
                  <th>版本</th>
                  <th>版本号</th>
                  <th>MD5值</th>
                  <th>文件大小</th>
                  <th>强制升级</th>
                  <th>是否升级</th>
                  <th>下载地址</th>
                  <th>变更日志</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(index,item) in list">
                    <!--========Allen modify=======-->
                    <tr>
                        <td>
                            <span>{{ item.platform }}</span>
                        </td>

                        <td>
                            <input v-if="showIndex==index" type="text" v-model="item.version">
                            <span v-else>{{ item.version }}</span>
                        </td>

                        <td>
                            <input v-if="showIndex==index" type="text" v-model="item.versionCode">
                            <span v-else>{{ item.versionCode }}</span>
                        </td>

                        <td>
                            <input v-if="showIndex==index" type="text" v-model="item.apkMD5">
                            <span v-else>{{ item.apkMD5 }}</span>
                        </td>

                        <td>
                            <input v-if="showIndex==index" type="text" v-model="item.apkSize">
                            <span v-else>{{ item.apkSize }}</span>
                        </td>

                        <td>
                            <!--<input v-if="showIndex==index" type="text" v-model="isForcedUpgrade">-->
                            <span v-if="showIndex==index">
                                是 <input type="radio" :checked="item.isForcedUpgrade" @click="item.isForcedUpgrade=!item.isForcedUpgrade">&nbsp;
                                否 <input type="radio" :checked="!item.isForcedUpgrade" @click="item.isForcedUpgrade=!item.isForcedUpgrade">
                            </span>
                            <span v-else>{{ item.isForcedUpgrade?"是":"否" }}</span>
                        </td>

                        <td>
                            <!--<input v-if="showIndex==index" type="text" v-model="isUpgrade">-->
                            <span v-if="showIndex==index">
                                是 <input type="radio" :checked="item.isUpgrade" @click="isUpgradeFn(item.isUpgrade=!item.isUpgrade)">&nbsp;
                                否 <input type="radio" :checked="!item.isUpgrade" @click="isUpgradeFn(item.isUpgrade=!item.isUpgrade)">
                            </span>
                            <span v-else>{{ item.isUpgrade?"是":"否" }}</span>
                        </td>

                        <td>{{ item.downloadUri }}</td>

                        <td>
                            <!--<input v-if="showIndex==index" type="text" v-model="item.changelog">-->
                            <textarea v-if="showIndex==index" name="" id="" cols="25" rows="3" v-model="item.changelog"></textarea>
                            <span v-else>{{ item.changelog }}</span>
                        </td>

                        <td>
                            <button v-if="ModifyShow" class="btn btn-warning btn-xs" @click="newModify(index)"><i class="fa fa-edit"></i> 修改版本</button>
                            <button v-if="!ModifyShow&&showIndex==index" class="btn btn-success btn-xs" @click="newModifyOk(item.id)">确定修改</button>
                            <button v-if="!ModifyShow&&showIndex==index" class="btn btn-danger btn-xs" @click="newModifyCancel()">取消</button>
                            <button v-if="item.platform==PLATFORM_ANDROID&&ModifyShow" class="btn btn-success btn-xs" @click="uploadAPK(item.id)"><i class="fa fa-upload"></i> 上传apk</button>
                            <button v-if="item.platform==PLATFORM_ANDROID&&ModifyShow" class="btn btn-primary btn-xs" @click="downloadAPK(item.downloadUri)"><i class="fa fa-download"></i> 下载apk</button>
                        </td>
                    </tr>

                    <!--========Allen End=======-->


                  <!--<tr>-->
                    <!--<td >{{ item.platform }}</td>-->
  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model="version"></td>-->
                    <!--<td v-else>{{ item.version }}</td>-->

  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="number" v-model='versionCode'></td>-->
                    <!--<td v-else>{{item.versionCode}}</td>-->

  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model='apkMD5'></td>-->
                    <!--<td v-else>{{item.apkMD5}}</td>-->

  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model='apkSize'></td>-->
                    <!--<td v-else>{{item.apkSize}}{{item.apkSize?"MB":""}}</td>-->

  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model='ForcedUpgrade'></td>-->
                    <!--<td v-else>{{item.isForcedUpgrade?"是":"否"}}</td>-->

  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model='Upgrade'></td>-->
                    <!--<td v-else>{{item.isUpgrade?"是":"否"}}</td>-->

                    <!--&lt;!&ndash; <td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model="downloadUri"></td> &ndash;&gt;-->
                    <!--<td>{{ item.downloadUri }}</td>-->

  <!--<td v-if="isModify && item.platform == PLATFORM_ANDROID"><input type="text" v-model="changelog"></td>-->
                    <!--<td v-else>{{ item.changelog }}</td>-->

  <!--<td v-if="iosModify && item.platform == 'ios'"><input type="text" v-model="iosChangelog"></td>-->
                    <!--<td v-else>{{ item.changelog }}</td>-->
                    <!--<td>-->
                        <!--&lt;!&ndash;&& &ndash;&gt;-->
                      <!--<button v-if="!isModify&&item.platform == PLATFORM_ANDROID" class="btn btn-warning btn-xs" @click="modify()"><i class="fa fa-edit"></i> 修改版本</button>-->
                      <!--<button v-if="!iosModify&&item.platform == 'ios'" class="btn btn-warning btn-xs" @click="modifyiOS()"><i class="fa fa-edit"></i> 修改版本</button>-->

                      <!--<div class="btn-group" v-if="isModify && item.platform == PLATFORM_ANDROID">-->
                        <!--<button class="btn btn-success btn-xs" data-id="{{item.id}}" @click="modifyOk">确定修改</button>-->
                        <!--<button class="btn btn-danger btn-xs" @click="modifyCancel">取消</button> -->
                      <!--</div>-->

                      <!--<div class="btn-group" v-if="iosModify && item.platform == 'ios'">-->
                         <!--<button class="btn btn-success btn-xs" data-id="{{item.id}}" @click="iosModifyOk">确定修改</button>-->
                         <!--<button class="btn btn-danger btn-xs" @click="iosModifyCancel">取消</button>-->
                      <!--</div>-->
                      <!--&nbsp;-->
                      <!--<button v-if="!isModify && item.platform == PLATFORM_ANDROID" class="btn btn-success btn-xs" @click="uploadAPK(item.id)"><i class="fa fa-upload"></i> 上传apk</button>-->
                      <!--&nbsp;-->
                      <!--<button v-if="!isModify && item.platform == PLATFORM_ANDROID" class="btn btn-primary btn-xs" @click="downloadAPK(item.downloadUri)"><i class="fa fa-download"></i> 下载apk</button>                 -->
                    <!--</td>-->
                  <!--</tr>-->
                </template>
                <tr v-show="showEmptyTip">
                  <td colspan="20">{{ emptyTip }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import { PLATFORM_ANDROID,PLATFORM_IOS } from "../../js/constants";
export default {
  ready() {
    this.getAppVersion();
      console.log("new");
  },
  data() {
    return {
      showEmptyTip: false,
      emptyTip: "暂时还没有版本信息",
      list: [],
      PLATFORM_ANDROID: PLATFORM_ANDROID,
      isModify: false,
      version: "",
      downloadUri: "",
      changelog: "",
      iosChangelog:"",
      apkMD5:"",
      ForcedUpgrade:"",
      Upgrade:"",
      apkSize:"",
      versionCode:"",
      iosModify:false,
      showIndex:null,
      ModifyShow:true,
      isForcedUpgrade:"",
      isUpgrade:"",
    };
  },
  methods: {
      isForcedUpgradeFn(){},
      isUpgradeFn(){},

    // 获取app版本
    getAppVersion() {
      let self = this;
      commFun.request({
        url: commFun.apiRouter.appVersion,
        type: "GET",
        success: function(data) {
          console.log(data,"打印App版本data数据");
          if (data) {
            self.list = data;
              for(let i=0;i<self.list.length;i++){
                if(self.list[i].platform=="android"){
                    self.list[i].platform = self.list[i].platform[0].toUpperCase()+"ndroid"
                }
              }
          } else {
            commFun.tip({ text: "无数据返回，稍后再试" });
          }
        },
        error: function(errData) {
          commFun.errorTip(errData);
        }
      });
    },
      // New取消
    newModifyCancel(){
        let self = this;
        self.ModifyShow = true;
        self.showIndex = null
    },
      // New确认修改
    newModifyOk(id){
        let self = this,
            list = self.list[self.showIndex],
            flag = list.platform=="ios",text;
            text = flag?"iOS":"Android";
        if (list.version.length === 0) {
            commFun.tip({
                text: "请输入版本号"
            });
            return false;
        }
        if (!commFun.checkVersion(list.version)) {
            commFun.tip({
                text: "版本号格式不对，请正确输入"
            });
            return false;
        }
        let obj = {
            appId:id,
            apkMD5:list.apkMD5,
            apkSize:list.apkSize,
            version:list.version,
            changelog:list.changelog,
            isForcedUpgrade:list.isForcedUpgrade,
            isUpgrade:list.isUpgrade,
            versionCode:''
        }
        if(!list.versionCode||list.versionCode.length===0){
            commFun.tip({
                text: "版本码格式不对，请正确输入"
            });
            return false;
        }else {
            obj.versionCode = list.versionCode
        }

        // if(!list.apkMD5&&list.apkMD5.length===0&&!flag){
        //     commFun.tip({
        //         text: "请输入MD5值"
        //     });
        //     return false;
        // }
        // if(!list.apkSize&&list.apkSize.length===0&&!flag){
        //     commFun.tip({
        //         text: "文件大小"
        //     });
        //     return false;
        // }

        let modifyCallback = function() {
            commFun.request({
                url: commFun.apiRouter.appUpgradeM,
                data: JSON.stringify(obj),
                type: "POST",
                success(data) {
                    console.log(data,"成功");
                    if (data && data.isok) {
                        commFun.tip({ text: "版本配置成功", type: "showSuccessToast" });
                        self.getAppVersion()
                    } else {
                        commFun.tip({ text: "无数据返回，稍后再试" });
                    }
                },
                error(errData) {
                    console.log(errData,"失败");
                    commFun.errorTip(errData);
                }
            });
        };

        // 确认提示
        commFun.warn_tip({
            text: "确定修改"+text+"版本吗？",
            okCallback: modifyCallback
        });

        self.ModifyShow = true;
        self.showIndex = null;
    },
    newModify(I){
        let self = this
        self.isshow = !self.isshow;
        self.showIndex = I;
        self.ModifyShow = false
    },
    modifyiOS(){
        let self = this
        self.iosModify = true;
        self.list.forEach((key,index,Arr)=>{
            if(Arr[index].platform=="ios"){
                console.log("触发了");
            }
        })
        // self.changelog
    },
    // 修改版本
    modify(version,apkMD5,ForcedUpgrade,Upgrade,apkSize,versionCode){
        let self = this;
        self.version = version;
        self.isModify = true;
    //  ====Allen modify====
        self.apkMD5 = apkMD5 || '';
        self.ForcedUpgrade = ForcedUpgrade?"是":"否";
        self.Upgrade = Upgrade?"是":"否";
        self.apkSize = apkSize;
        self.versionCode = versionCode;
        //  ====End====
    },

    iosModifyOk(){

    },
    iosModifyCancel(){
        let self = this;
        self.iosModify = false;
        self.changelog = '';
    },
  // 取消修改
    modifyCancel: function() {
        let self = this;
        self.isModify = false;
        self.version = "";
    //===Allen modify===
        self.apkMD5 = '';
        self.ForcedUpgrade ='';
        self.Upgrade = '';
        self.apkSize = '';
        self.versionCode = '';
    //  ===End===
    },
  // 上传app
    uploadAPK:function(){
        this.$route.router.go({name: 'apkUpload'});
    },
    downloadAPK:function(downUrl){
        window.location = downUrl;
    },
  //分页相关
    refresh() {
        this.$refs.page.refresh();
    }
  },
  //分页相关
  events: {
    // 分页组件传回的表格数据
    data(data) {
        let slef = this;
        slef.tableList = data;
        slef.showEmptyTip = data.length > 0 ? false : true;
    },
    // 刷新数据
    refresh() {
        this.refresh();
    }
  }
};
</script>