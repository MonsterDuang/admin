<template>
<div>
    <section class="content-header">
        <h1>
            推荐行家
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="javascript:;"> 首页推荐</a></li>
            <li class="active"> 推荐行家</li>
        </ol>
    </section>
    <section class="content">
        <div class='class="row" box box-primary clearfix'>
            <div class="box-header with-border">
                <h3 class="box-title">行家列表</h3>
            </div>

            <div style="width:49.5%;float:left;border-right: 1px solid rgb(244,244,244);padding: 0 5px">

                <div class='UserList_A box-body no-padding'>
                    <div class="mailbox-controls box-tools">
                        <!--刷新-->
                        <div class="pull-left">
                            <button class="btn btn-default btn-sm" data-toggle="tooltip" data-original-title="刷新列表" @click="refresh"><i class="fa fa-refresh"></i></button>
                        </div>
                        <!--选择-->
                        <div class="form-group pull-left">
                            <div class="col-sm-12">
                                <select class="form-control" v-model="role" v-on:change="searchByRole()">
                                    <option value="all">全部</option>
                                    <option value="appraiser">鉴定师</option>
                                    <option value="artist">艺术家</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group pull-left">
                            <div class="col-sm-12" style="padding-left:0">
                                <select class="form-control" v-model="role_" v-on:change="searchByRole()">
                                    <option value="all">全部</option>
                                    <option value="1">推荐</option>
                                    <option value="2">未推荐</option>
                                </select>
                            </div>
                        </div>
                        <!--搜索-->
                        <div class="col-sm-6" style="margin-bottom:15px;padding-left:0">
                            <div class="col-sm-8" style="padding-left:0">
                                <input v-model="searchWord" type="text" class="form-control" placeholder="请输入专家昵称或手机号" @keyup.13="search">
                            </div>
                            <button type="button" class="btn btn-primary" @click="search">搜索</button>
                        </div>
                    </div>
                </div>
                <div style="padding: 0 5px">行家列表</div>

                <table id="" class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>专家名字</th>
                        <th>称号</th>
                        <th>专家详情</th>
                        <th>类型</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index, item) in tableList" :key='item.id'>
                            <!-- <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.nickname }}详情" class="detail" v-page-keys:userList v-link="{name:'userInfo', query:{ userId:item.id }}">{{ item.nickname }}</a>               -->
                            <td>{{item.realname}}
                                <span style="display:inline-block;width:30px;height:30px;border-radius:50%;overflow:hidden;vertical-align:middle">
                                    <img style="width:100%;" :src="item.avatar" alt="">
                                </span>
                            </td>
                            <td>{{item.honoraryname}}</td>
                            <td><button class='btn btn-success btn-xs' v-link="{name:'expertDetails', query: {speid: item.id, type: item.type}}">查看详情</button></td>
                            <td>{{item.type == 'appraiser' ? '鉴定师' : '艺术家'}}</td>
                            <td><button class="btn btn-danger btn-xs" @click='addRecom(index, item.id)'>添加</button></td>
                        </tr>
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

            <div style="width:49.5%;float:left;padding:0 5px">

                <!-- <div class='UserList_A box-body no-padding'>
                    <div class="mailbox-controls box-tools">
                        <div class="col-sm-6" style="margin-bottom:15px;">
                            <div class="col-sm-8">
                                <input v-model="searchWord_" type="text" class="form-control" placeholder="请输入手机号或昵称">
                            </div>
                            <button type="button" class="btn btn-primary" @click="search_">搜索</button>
                        </div>
                    </div>
                </div> -->
                <p style="margin: 59px 0"></p>
                <div style="padding: 0 5px">推荐行家列表</div>

                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>专家名字</th>
                            <th>称号</th>
                            <th>专家详情</th>
                            <th>类型</th>
                            <th>排序</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index, item) in tableList_" :key='item.id'>
                            <!-- <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.nickname }}详情" class="detail" v-page-keys:userList v-link="{name:'userInfo', query:{ userId:item.id }}">{{ item.nickname }}</a>               -->
                            <td><input type="checkbox" name='check' v-model="batchRemovalArr" :value="item.id"></td>
                            <td>{{item.realname}}
                                <span style="display:inline-block;width:30px;height:30px;border-radius:50%;overflow:hidden;vertical-align:middle">
                                    <img style="width:100%;" :src="item.avatar" alt="">
                                </span>
                            </td>
                            <td>{{item.honoraryname}}</td>
                            <td><button class='btn btn-success btn-xs' v-link="{name:'expertDetails', query: {'speid': item.id, 'type': item.type}}">查看详情</button></td>
                            <td>{{item.type == 'appraiser' ? '鉴定师' : '艺术家'}}</td>
                            <td><input type="text" v-model='item.sort' @keyup.13="inputFunc($event, index)" style="width:30px;"></td>
                            <td><button class="btn btn-danger btn-xs" @click="delRecom(index)">移除</button></td>
                        </tr>
                        <tr v-show="showEmptyTip_">
                            <td colspan="20">{{ emptyTip }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="8">
                                &nbsp;&nbsp;<button class="btn btn-default btn-xs" @click="confirm()">确认排序</button>&nbsp;&nbsp;
                                <button class="btn btn-danger btn-xs" @click="batchRemoval()">批量移除</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </div>


        </div>
    </section>
</div>
</template>

<script>
    import bootPage from './paging.vue';
    export default {
        name: "RExpert",
        ready(){
            let self = this;
        },
        data(){
            return{
                role:"all",
                role_:"all",
                lenArr: [10, 30, 60],
                pageLen: 5,
                param: {},
                url: commFun.apiRouter.speRecomList,
                tableList:[],
                showEmptyTip:false,
                showEmptyTip_:false,
                emptyTip:"暂无数据",
                tableList_:[],
                searchWord:"",
                searchWord_:"",
                batchRemovalArr: [],
                total: ''
            }
        },
        components:{
            bootPage
        },
        created(){
            this.getRecomExpert()
            this.param = { type: this.role, isRecommed: this.role_, words: this.searchWord, pageIndex: 1 };
            this.url = commFun.apiRouter.speRecomList;
        },
         watch:{
            searchWord(newVal) {
                if (newVal == '') {
                    this.search()
                }
            }
        },
        methods:{
            searchByRole(){
                this.param = { type: this.role, isRecommed: this.role_, words: this.searchWord, pageIndex: 1 };
                this.url = commFun.apiRouter.speRecomList;
                setTimeout(() => { this.refresh(); }, 100);
            },
            refresh(){
                this.$refs.page.refresh();
            },
            search(){
                this.param = { type: this.role, isRecommed: this.role_, words: this.searchWord, pageIndex: 1 };
                this.url = commFun.apiRouter.speRecomList;
                setTimeout(() => { this.refresh(); }, 100);
            },
            getRecomExpert(){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.speRecom,
                    success: function (data) {
                        if (data) {
                            // 成功
                            self.tableList_ = data.data
                        }else{
                            commFun.tip({text:'无数据返回，稍后再试'});
                        }
                    },
                    error: function (errData) {
                        commFun.errorTip(errData);
                    }
                })
            },
            addRecom(index, id) {
                var flag
                for (let item of this.tableList_) {
                    if (item.id == id) {
                        flag = true
                    }
                }
                if (!flag) {
                    this.tableList_.push(this.tableList[index]);
                    for (let i = 0; i < this.tableList_.length; i++) {
                        if (!this.tableList_[i].sort) {
                            this.tableList_[i].sort = i + 1
                        }
                    }
                }
            },
            delRecom(index) {
                this.tableList_.splice(index,1)
            },
            batchRemoval(){
                this.batchRemovalArr.forEach((key, index, Arr)=>{
                    this.tableList_.forEach((key_, index_, Arr_)=>{
                        if (key == key_.id) {
                            this.tableList_.splice(index_, 1)
                        }
                    })
                })
            },
            inputFunc(e, index){
                this.tableList_[index].sort = e.target.value
                if (e.target.value >= this.tableList_.length) {
                    for (let i = (index+1); i < this.tableList_.length; i++) {
                        this.tableList_[i].sort = i
                    }
                    if (e.target.value != '') {
                        this.tableList_.sort(this.compare('sort'))
                    }
                } else if (index < e.target.value && e.target.value < this.tableList_.length) {
                    for (let i = (index+1); i < e.target.value; i++) {
                        this.tableList_[i].sort = i
                    }
                    if (e.target.value != '') {
                        this.tableList_.sort(this.compare('sort'))
                    }
                } else {
                    for (let i = (Number(e.target.value)-1); i < index; i++) {
                        this.tableList_[i].sort = i + 2
                    }
                    if (e.target.value != '') {
                        this.tableList_.sort(this.compare('sort'))
                    }
                }
            },
            compare(property){
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            },
            confirm() {
                let self = this,Arr_ = [];
                self.tableList_.forEach((key, index, Arr)=>{
                    Arr_.push({
                        id: Arr[index].id,
                        type: Arr[index].type,
                        sort: index + 1
                    })
                })
                commFun.request({
                    url: commFun.apiRouter.modifyData,
                    type:'POST',
                    data:JSON.stringify({type: 1, content: Arr_}),
                    success(data) {
                        if(data.code==200){
                            commFun.tip({ text: "排序成功" });
                            self.getRecomExpert()
                        }else {
                            commFun.tip({ text: "无数据返回，稍后再试" });
                        }
                    },
                    error(errData) {
                        commFun.errorTip(errData || "获取专家列表失败");
                    }
                });
            }
        },
        //分页相关
        events: {
            // 分页组件传回的表格数据
            'data' (data) {
                this.tableList = data;
                this.showEmptyTip = data.length > 0 ? false : true;
            },
            'total' (data) {
                this.total = data
            },
            // 刷新数据
            'refresh' () {
                this.refresh()
            }
        }
    }
</script>

<style scoped>

button{
    margin-bottom: 5px;
}

</style>