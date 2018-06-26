<style scoped>
  .masking{
      position:fixed;z-index:100;width:100%;height:100%;background:rgba(0,0,0,.3);top:0;left:0;
  }
  .masking_content{
      background: white;
      position: relative;
      left: 15%;
      top: 10%;
      width: 80%;
      height: 80%;
  }
  .masking_content div:nth-child(1){
      padding:10px 10px 0 0;
      text-align: right;
  }
  .masking_content div:nth-child(1) img{
      width: 30px;
      height: 30px;
  }
  .masking_content div:nth-child(2){
      padding: 10px 5%;
      color: rgb(79,79,79);
  }
  .masking_content div:nth-child(2) span{
      color: black;
  }
  .masking_content div:nth-child(2) p img{
      width: 25px;
      height: 25px;
      vertical-align: middle;
  }
  .photoImg{
      width: 50px;
      height: 50px;
      margin: 0 5px;
  }
  #images li{
      float:left;
  }
  li{
      list-style: none;
  }
  #images_1 li img,#images_2 li img{
      width: 50px;
      height: 50px;
  }
  p{
    max-height: 80px;
    overflow-y: auto;
    word-wrap:break-word;
  }
</style>
<template>
<div>
  <section class="content-header">
    <h1>
      待审核鉴宝师列表
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
      <li><a href="javascript:;"> 申请审核管理</a></li>
      <li class="active"> 待审核鉴宝师列表</li>
    </ol>
  </section>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">待审核鉴宝师列表</h3>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls box-tools">
              <div class="pull-left">
                <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
            <table id="userTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>真实姓名</th>
                  <th>昵称</th>
                  <th>手机号码</th>
                  <th>身份证号码</th>
                  <th>资格证</th>
                  <th>精通的领域</th>
                  <th>相关证件照</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(index,item) in tableList">
                  <tr>
                    <td>{{ item.realname }}</td>
                    <td>{{ item.user.nickname }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.idCard }}</td>
                    <td>{{ item.certification }}</td>
                    <td>{{ item.area | areaTrans}}</td>
                    <td><button class="btn btn-default btn-xs" @click="viewPhoto(item.certificationPhoto, item.idCardPhoto,index)">查看</button></td>
                    <td>
                      <button class="btn btn-default btn-xs" data-apply="{{ item.id }}" @click="agreeApply"><i class="fa fa-thumbs-o-up"></i> 同意</button>
                       <button class="btn btn-danger btn-xs" data-apply="{{ item.id }}" @click="disagreeApply"><i class="fa fa-remove"></i> 拒绝</button>                    
                    </td>
                  </tr>
                </template>
                <tr v-show="showEmptyTip">
                  <td colspan="20">{{ emptyTip }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="8">
                    <div class="pull-right">
                      <boot-page v-ref:page :async="true" :lens="lenArr" :url="url" :page-len="pageLen" :param="param"></boot-page>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--  弹出蒙版  -->
  <div class='masking' v-show="isshow">
      <div class='masking_content'>
          <div><img @click.stop='quitFn' :src="quitPath" alt=""></div>
          <div>
            <p><img :src="tableListIndex.avatar" alt=""> <span> 姓名：</span> {{tableListIndex.realname}}</p>
            <p><img :src="tableListIndex.user.avatar" alt=""> <span> 昵称：</span> {{tableListIndex.user.nickname}}</p>
            <p><span>个人手机：</span>{{tableListIndex.phone}}</p>
            <p><span>资格证书：</span>{{tableListIndex.certification}}</p>
            <ul id="images_1">
              <li>照片：<img :src="tableListIndex.certificationPhoto" alt=""></li>
            </ul>
            <p><span>身份证号：</span>{{tableListIndex.idCard}}</p>
            <ul id="images_2">
              <li>照片：<img :src="tableListIndex.idCardPhoto" alt=""></li>
            </ul>
            <p><span>荣誉称号：</span>{{tableListIndex.honoraryname}}</p>
            <p><span>个人背景：</span>{{tableListIndex.intro}}</p>
            <p><span>个人专长：</span>{{tableListIndex.acaresearch}}</p>
            <p><span>研究领域：</span>{{tableListIndex.speintroduce}}</p>
            <span>生活风采：</span>
            <ul id='images'>
                  <li v-for="item in tableListIndex.lifestyle"><img class='photoImg' :src="item" alt=""></li>
            </ul>
          </div>
      </div>
  </div>

</div>
</template>
<script>
   import bootPage from './../../components/BootPage.vue';

   export default {
    data() {
        return {
          showEmptyTip: false,
          emptyTip: "暂时还没有鉴宝师申请",
          //分页相关
          lenArr: [10, 50, 100],
          pageLen: 5,
          param: {},
          url: commFun.apiRouter.appraiserApplyList,
          tableList: [],
          quitPath:require('../../assets/images/quit.png'),
          tableListIndex:{
              user:{nickname:'',avatar:''}
          },
          isshow:false
        }
    },
    components: {
        bootPage
    },
    ready(){

    },
    methods: {
        quitFn(){this.isshow = false},
        viewPhoto: function(photo1, photo2,index){
          let self = this;
          self.isshow = true;
          self.tableListIndex = self.tableList[index]
              self.tableListIndex.lifestyle.forEach((key,index,Arr)=>{
                  Arr[index] = "http://ow90m0wgs.bkt.clouddn.com/"+Arr[index]
              })
              // self.tableListIndex.photo2 = photo2
              self.$nextTick(()=>{
                  new Viewer(document.getElementById('images'),{});
                  new Viewer(document.getElementById('images_1'),{});
                  new Viewer(document.getElementById('images_2'),{});
              })
          let photoArr = [];
          // photoArr.push({text:'资格证照片', photo: photo1});
          // photoArr.push({text:'身份证照片', photo: photo2});
          // commFun.info_tip({title:'相关证件照', imgArr: photoArr});
      },
       // 拒绝申请
      disagreeApply: function(events){
          let self = this;
          let applyId = $(events.currentTarget).data('apply');
          commFun.warn_tip({
            text: '确定要拒绝该鉴宝师申请吗',
            okCallback:function(){
              self.commonApply(applyId,'refuse');
            }
          });
      },
      // 同意申请
      agreeApply: function(events) {
          let self = this;
          let applyId = $(events.currentTarget).data('apply');
          commFun.warn_tip({
            text: '确定要同意该鉴宝师申请吗',
            okCallback:function(){
              self.commonApply(applyId, 'agree');
            }
          });
      },
      // 申请
      commonApply: function(applyId, status){
          let self = this;
          commFun.request({
            url: commFun.apiRouter.apply,
            params: applyId,
            data: JSON.stringify({status: status}),
            type: "PUT",
            success: function (data) {
              if (data && data.isok) {
                // 成功
                commFun.tip({text:'审批成功',type:'showSuccessToast'});
                self.refresh();
              }else{
                commFun.tip({text:'无数据返回，稍后再试'});
              }
            },
            error: function (errData) {
                commFun.errorTip(errData);
            }
          });
      },
      //分页相关
      refresh() {
          this.$refs.page.refresh();
      }
    },
    //分页相关
    events: {
        // 分页组件传回的表格数据
        'data' (data) {
            console.log(data,"event接收的数据");
            // console.log(data,"分页组件传回的表格数据");
            this.tableList = data;
            console.log(this.tableList);
            this.showEmptyTip = data.length > 0 ? false : true;
        },
        // 刷新数据
        'refresh' () {
            this.refresh()
        },
    }

}
</script>