
<style scoped>
    .userSpan{
        /*display: inline-block;*/
        /*height: 50px;*/
        /*line-height: 50px;*/
        /*vertical-align: middle;*/
    }
    .userAvatar{
        display: inline-block;
        width: 37px;
        height: 37px;
        border-radius: 50%;
        overflow: hidden;
    }
    .userAvatar img{
        width: 100%;
    }
    .userPhotos{
        margin: 0;
        padding: 0;
    }
    .userPhotos li{
        display: inline-block;
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin-right: 5px;
        list-style: none;
    }
    .userPhotos img{
        width: 100%;
        float: left;
    }
    #images img{
        width: 100px;
    }
    input{
        width: 80px;
    }
    .table-bordered{
        border: 1px solid #ccc;
    }
    .table-bordered[_v-3086a230]{
         background: white;
     }
</style>
<template>
    <div style="margin-left:10px">
        <section class="content-header box">
            <h1>
                寄送鉴定订单
            </h1>
        </section>
        <section class="content box">
            <div>

                <div class="mailbox-controls box-tools">
                    <div class="pull-left">
                        <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
                    </div>
                    <div class="form-group pull-left">
                        <div class="col-sm-12">
                            <select class="form-control" v-model="type" @change="searchCommon(type)">
                                <option value="all">全部状态</option>
                                <option value="did">已鉴定</option>
                                <option value="did-not">未鉴定</option>
                            </select>
                        </div>
                    </div>
                    <!--<div class="form-group pull-left" style="width:20%">-->
                        <!--<div class="col-sm-12">-->
                            <!--<select class="form-control" style="width:100%;" v-model="areaId" @change="selectChange(areaId)">-->
                                <!--<option value="all">全部分类</option>-->
                                <!--<template v-for="item in areaList">-->
                                    <!--<option value="{{ item.id }}">{{ item.name }}</option>-->
                                <!--</template>-->
                            <!--</select>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>

                <table id="userTable" class="table table-bordered table-hover">
                    <tr>
                        <th>用户</th>
                        <th>用户留言</th>
                        <th>价格</th>
                        <th>时间</th>
                        <th>指定专家</th>
                        <th>状态</th>
                        <!--<th>结果</th>-->
                        <th>操作</th>
                    </tr>
                    <tr v-for="(index,item) in list">
                        <td>
                            <span class="userSpan">
                                <img class='userAvatar' :src="item.user.avatar" alt="">
                                {{item.user.nickname}}
                            </span>
                        </td>
                        <td>
                            <ul :id="'images'+index" class='userPhotos'>
                                <li v-for="item_ in item.photos"><img :src="item_" alt=""></li>
                            </ul>
                            <span>
                                {{item.remark}}
                            </span>
                        </td>
                        <td>
                            <span style="display:inline-block;min-width:60px" v-if='globalIndex===""||globalIndex!==index'>{{item.money}}</span>
                            <!--<input v-if='globalIndex===index' type="number" v-model="ModifyText">-->
                            <!--<button v-if='globalIndex===""||globalIndex!==index' @click='modify(index,item.id)' class="btn btn-warning btn-xs">修改</button>-->
                            <!--<button v-if='globalIndex===index' @click='confirmFn(index)' class="btn btn-success btn-xs">确认</button>-->
                            <!--<button v-if='globalIndex===index' @click='cancelFn(index)' class="btn btn-danger btn-xs">取消</button>-->
                        </td>
                        <td>
                            <span class="userSpan">
                                {{item.createdAt}}
                            </span>
                        </td>
                        <td>
                            <span class="userSpan">
                            <img class='userAvatar' :src="item.appraiserId.apply.avatar" alt="">
                            {{item.appraiserId.apply.realname}}
                            </span>
                        </td>
                        <td v-if="item.status=='did'"> <button disabled="true" class="btn btn-success btn-xs">{{item.status=="did"?"已鉴定":"未鉴定"}}</button></td>
                        <td v-if="item.status=='did-not'" @click="statusfn(item.status,item.id)"> <button class="btn btn-warning btn-xs">{{item.status=="did"?"已鉴定":"未鉴定"}}</button></td>
                        <!--<td>真品</td>-->
                        <td>
                            <button class="btn btn-default btn-xs" v-link="{ name: 'sendOrderDetail', query: { appraisalId: item.id } }" @click="getDetail(item.id)">查看详情</button>
                            <button class="btn btn-danger btn-xs" @click="deleteAppraisal(item.id)">删除</button>
                        </td>
                    </tr>
                </table>

            </div>
        </section>
    </div>
</template>
<script>
    export default {
        name: "sendOrder",
        data(){
            return{
                list:[],
                ModifyText:'',
                id:'',
                globalIndex:'',
                type:'all',
                areaId:'all',
                areaList:[]
            }
        },
        watch:{},
        ready(){
            var self = this
            self.getCategoryList()
            self.getList("all");
        },
        methods:{
            // confirmFn(){
            //     let self = this,obj;
            //     if(self.ModifyText<0){
            //         commFun.tip({text:'价格不能小于0'});
            //         return;
            //     }
            //     obj = {
            //         id:self.id,
            //         charge:self.ModifyText
            //     }
            //     commFun.request({
            //         url: commFun.apiRouter.cutId,
            //         params:self.id,
            //         type:"POST",
            //         data: JSON.stringify(obj),
            //         success(data){
            //             if(data.code==200){
            //                 commFun.tip({text:data.message,type:'showSuccessToast'})
            //                 self.getList()
            //                 self.globalIndex = ""
            //             }else {
            //                 commFun.errorTip("暂无数据");
            //             }
            //         },
            //         error(errData){
            //             commFun.errorTip(errData||"服务器繁忙");
            //         }
            //     });
            // },
            // cancelFn(){
            //     this.globalIndex = ""
            // },
            modify(index,id){
                let self = this;
                self.ModifyText = self.list[index].sendCharge;
                self.id = id;
                self.globalIndex = index;
            },
            deleteAppraisal: function(events){
                var self = this;
                var deleteCallback = function(){
                    commFun.request({
                        url: commFun.apiRouter.oldAppraisal,
                        // params: events,
                        type: "POST",
                        data:JSON.stringify({
                            type:"AppraisalSend",
                            orderId:events
                        }),
                        success: function (data) {
                            if (data && data.isok) {
                                //删除成功
                                commFun.tip({text:'删除鉴宝需求成功',type:'showSuccessToast'});
                                self.getList();
                            }
                            else{
                                commFun.tip({text:'无数据返回，稍后再试'});
                            }
                        },
                        error: function (errData) {
                            commFun.errorTip(errData);
                        }
                    });
                };

                commFun.warn_tip({
                    text: '确定删除该鉴宝需求吗？',
                    okCallback:deleteCallback
                });
            },
            statusfn(s,id){
                let self = this
                if(s=="did-not"){
                    commFun.request({
                        url: commFun.apiRouter.sendOrderUpdate,
                        type:"POST",
                        data: JSON.stringify({
                            orderId:id,
                            status:"did",
                        }),
                        success: function (data) {
                            if(data.code==200){
                                self.getList();
                                commFun.tip({
                                    text:data.message
                                });
                            }
                        },
                        error: function (errData) {
                            commFun.errorTip(errData);
                        }
                    });
                }
            },
            getCategoryList: function(){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.category,
                    data: {},
                    success: function (data) {
                        self.areaList = data || [];
                    },
                    error: function (errData) {
                        commFun.errorTip(errData);
                    }
                });
            },
            refresh(){
                let self = this
                self.type='all';
                self.areaId='all';
                self.getList()
            },
            selectChange(Val){

            },
            searchCommon(Val){
                this.getList(Val)
                // sendOrderUpdate

            },

            getList(status){
                let self = this,LG;
                commFun.request({
                    url: commFun.apiRouter.sendlist,
                    data: {
                        // categoryId:'all',
                        status:status,
                        pageIndex:1,
                        pageSize:1500
                    },
                    type:"GET",
                    success(data){
                        console.log(data,"打印的数据");
                        // if(data.code==200){
                        self.list = data.data;
                        self.list.forEach(function (key,index,Arr) {
                            if(Arr[index].createdAt.indexOf('.')>-1){
                                Arr[index].createdAt = Arr[index].createdAt.split('.')[0].replace("T",' ')
                            }
                        })
                        // LG = self.list.length
                        // if(LG!=0)cb(LG)
                        // }else{
                        //     commFun.tip({text:'无数据返回，稍后再试'});
                        // }
                    },
                    error(errData){
                        commFun.errorTip(errData);
                    }
                });
            }
        },
        mounted(){
            let self = this;
        }
    }
</script>
