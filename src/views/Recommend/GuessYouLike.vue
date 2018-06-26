<template>
<div>
    <section class="content-header">
        <h1>
            猜你喜欢
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 主页</a></li>
            <li><a href="javascript:;"> 首页推荐</a></li>
            <li class="active"> 猜你喜欢</li>
        </ol>
    </section>
    <section class="content">
        <div class='class="row" box box-primary clearfix'>
            <div class="box-header with-border">
                <h3 class="box-title">猜你喜欢</h3>
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
                                    <option value="1">推荐</option>
                                    <option value="2">未推荐</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group pull-left">
                            <div class="col-sm-12" style="padding: 0">
                                <select class="form-control" v-model="role_" v-on:change="searchByRole()">
                                    <option value="all">全部</option>
                                    <option :value="item.id" v-for="item in categoryList" :key="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group pull-left">
                            <div class="col-sm-12" style="padding-right:0">
                                <select class="form-control" v-model="role__" v-on:change="searchByRole()">
                                    <option value="goods">藏品</option>
                                    <option value="shop">店铺</option>
                                </select>
                            </div>
                        </div>
                        <!--搜索-->
                        <div class="col-sm-6" style="margin-bottom:15px;padding-left:0 ">
                            <div class="col-sm-8" style="padding-left:0 ">
                                <input v-model="searchWord" type="text" class="form-control" placeholder="请输入藏品名称\店铺" @keyup.13="search">
                            </div>
                            <button type="button" class="btn btn-primary" @click="search">搜索</button>
                        </div>
                    </div>
                </div>
                <div style="padding: 0 5px">藏品列表</div>

                <table id="" class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>藏品名称</th>
                        <th>所属店铺</th>
                        <th>分类</th>
                        <th>藏品规格说明</th>
                        <th>藏品图片</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index, item) in tableList" :key='item.goodsId'>
                            <!-- <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.nickname }}详情" class="detail" v-page-keys:userList v-link="{name:'userInfo', query:{ userId:item.id }}">{{ item.nickname }}</a>               -->
                            <td>{{item.name}}</td>
                            <td>{{item.shopName}}
                                <span style="display:inline-block;width:30px;height:30px;border-radius:50%;overflow:hidden;vertical-align:middle">
                                    <img style="width:100%;" :src="item.avatar" alt="">
                                </span>
                            </td>
                            <td>{{item.className}}</td>
                            <td><pre>{{item.props_}}邮费：{{item.postage}}元</pre></td>
                            <td>
                                <img :src="img" v-for="img in item.photoKeys" :key="img" width="50" height='50' style="padding:1px">
                            </td>
                            <td><button class="btn btn-danger btn-xs" @click="addRecom(index, item.goodsId)">添加</button></td>
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
                                <input v-model="searchWord_" type="text" class="form-control" placeholder="请输入藏品名称\店铺">
                            </div>
                            <button type="button" class="btn btn-primary" @click="search_">搜索</button>
                        </div>
                    </div>
                </div> -->
                <p style="margin: 59px 0"></p>
                <div style="padding: 0 5px">推荐藏品列表</div>

                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>藏品名称</th>
                            <th>所属店铺</th>
                            <th>分类</th>
                            <th>藏品规格说明</th>
                            <th>藏品图片</th>
                            <th>排序</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index, item) in tableList_" :key='item.goodsId'>
                            <!-- <a href="javascript:;" data-toggle="tooltip" data-original-title="查看{{ item.nickname }}详情" class="detail" v-page-keys:userList v-link="{name:'userInfo', query:{ userId:item.id }}">{{ item.nickname }}</a>               -->
                            <td><input type="checkbox" name='check' v-model="batchRemovalArr" :value="item.goodsId"></td>
                            <td>{{item.name}}</td>
                            <td>{{item.shopName}}
                                <span style="display:inline-block;width:30px;height:30px;border-radius:50%;overflow:hidden;vertical-align:middle">
                                    <img style="width:100%;" :src="item.avatar" alt="">
                                </span>
                            </td>
                            <td>{{item.className}}</td>
                            <td><pre>{{item.props_}}邮费：{{item.postage}}元</pre></td>
                            <td>
                                <img :src="img" v-for="img in item.photoKeys" :key="img" width="50" height='50' style="padding:1px">
                            </td>
                            <td><input type="text" v-model='item.sort' @keyup.13="inputFunc($event, index)" style="width:30px;"></td>
                            <td><button class="btn btn-danger btn-xs" @click='delRecom(index)'>移除</button></td>
                        </tr>
                        <tr v-show="showEmptyTip_">
                            <td colspan="20">{{ emptyTip }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="8">
                                &nbsp;&nbsp;<button class="btn btn-default btn-xs" @click="confirm()">确认排序</button>&nbsp;&nbsp;
                                <button class="btn btn-danger btn-xs" @click="batchRemoval()">批量移除</button> <br>
                                <div class="pull-left" style="margin-top: 10px">
                                    <guess-page v-ref:page_ :async="true" :lens="lenArr_" :url="url_" :page-len="pageLen_" :param="param_"></guess-page>
                                </div>
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
    import guessPage from './GuessYouLikePaging.vue';
    export default {
        name: "RExpert",
        ready(){
            let self = this;
        },
        data(){
            return{
                role:"all",
                role_:"all",
                role__:'goods',
                lenArr: [10, 30, 60],
                pageLen: 5,
                param: {},
                url: commFun.apiRouter.goodsList,
                tableList:[],
                showEmptyTip:false,
                showEmptyTip_:false,
                emptyTip:"暂无数据",
                lenArr_: [10, 30, 60],
                pageLen_: 5,
                param_: {},
                url_: commFun.apiRouter.likeRecom,
                tableList_:[],
                searchWord:"",
                searchWord_:"",
                categoryList: [],
                batchRemovalArr: [],
                totalLikeRecom: [],
                likeTotal: '',
                newRecom: []
            }
        },
        components:{
            bootPage,
            guessPage
        },
        created(){
            this.getCategoryList()
            this.getTotalLikeRecom()
            this.param = { isRecommed: this.role, classId: this.role_, type: this.role__, words: this.searchWord, pageIndex: 1 };
            this.url = commFun.apiRouter.goodsList
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
                this.param = { isRecommed: this.role, classId: this.role_, type: this.role__, words: this.searchWord, pageIndex: 1 };
                this.url = commFun.apiRouter.goodsList;
                setTimeout(() => { this.refresh(); }, 100);
            },
            refresh(){
                this.$refs.page.refresh();
            },
            refresh_(){
                this.$refs.page_.refresh();
            },
            search(){
                this.param = { isRecommed: this.role, classId: this.role_, type: this.role__, words: this.searchWord, pageIndex: 1 };
                this.url = commFun.apiRouter.goodsList;
                setTimeout(() => { this.refresh(); }, 100);
            },
            getCategoryList(){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.categoryList,
                    success: function (res) {
                        if (res) {
                            self.categoryList = res.objects
                        }
                        else{
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
                for (let item of this.totalLikeRecom) {
                    if (item.id == id) {
                        flag = true
                        commFun.tip({text: "该藏品已添加"});
                    }
                }
                if (!flag) {
                    this.tableList_.unshift(this.tableList[index]);
                    this.tableList[index].id = this.tableList[index].goodsId
                    this.newRecom.unshift(this.tableList[index])
                }
            },
            delRecom(index) {
                for (let i = 0; i < this.totalLikeRecom.length; i++) {
                    if (this.totalLikeRecom[i].id == this.tableList_[index].goodsId) {
                        this.totalLikeRecom.splice(i, 1)
                    }
                }
                for (let i = 0; i < this.newRecom.length; i++) {
                    if (this.newRecom[i].id == this.tableList_[index].goodsId) {
                        this.newRecom.splice(i, 1)
                    }
                }
                this.tableList_.splice(index, 1)
            },
            batchRemoval(){
                this.batchRemovalArr.forEach((key, index, Arr)=>{
                    this.tableList_.forEach((key_, index_, Arr_)=>{
                        if (key == key_.goodsId) {
                            this.tableList_.splice(index_, 1)
                        }
                    })
                })
                this.batchRemovalArr.forEach((key1, index1, Arr1)=>{
                    this.totalLikeRecom.forEach((key1_, index1_, Arr1_)=>{
                        if (key1 == key1_.id) {
                            this.totalLikeRecom.splice(index1_, 1)
                        }
                    })
                })
                this.batchRemovalArr.forEach((key1, index1, Arr1)=>{
                    this.newRecom.forEach((key1_, index1_, Arr1_)=>{
                        if (key1 == key1_.id) {
                            this.totalLikeRecom.splice(index1_, 1)
                        }
                    })
                })
            },
            inputFunc(e, index){
                var Index = Number(this.param_.pageIndex-1) * 10 + index
                this.totalLikeRecom[Index].sort = e.target.value
                if (e.target.value >= this.totalLikeRecom.length) {
                    for (let i = (Index+1); i < this.totalLikeRecom.length; i++) {
                        this.totalLikeRecom[i].sort = Number(this.totalLikeRecom[i].sort) - 1
                    }
                    if (e.target.value != '') {
                        this.tableList_.sort(this.compare('sort'))
                        this.totalLikeRecom.sort(this.compare('sort'))
                    }
                } else if (Index < e.target.value && e.target.value < this.totalLikeRecom.length) {
                    for (let i = (Index+1); i < e.target.value; i++) {
                        this.totalLikeRecom[i].sort = Number(this.totalLikeRecom[i].sort) - 1
                    }
                    if (e.target.value != '') {
                        this.tableList_.sort(this.compare('sort'))
                        this.totalLikeRecom.sort(this.compare('sort'))
                    }
                } else {
                    for (let i = (Number(e.target.value)-1); i < Index; i++) {
                        this.totalLikeRecom[i].sort = Number(this.totalLikeRecom[i].sort) + 1
                    }
                    if (e.target.value != '') {
                        this.tableList_.sort(this.compare('sort'))
                        this.totalLikeRecom.sort(this.compare('sort'))
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
                var newArr = self.newRecom.concat(self.totalLikeRecom)
                self.newRecom = []
                console.log(newArr, self.newRecom)
                newArr.forEach((key, index, Arr)=>{
                    Arr_.push({
                        id: Arr[index].id,
                        sort: index + 1
                    })
                })
                commFun.request({
                    url: commFun.apiRouter.modifyData,
                    type:'POST',
                    data:JSON.stringify({type: 3, pageIndex: this.param_.pageIndex, content: Arr_}),
                    success(data) {
                        if(data.code==200){
                            commFun.tip({ text: "排序成功" });
                            self.refresh_()
                            self.getTotalLikeRecom()
                        }else {
                            commFun.tip({ text: "无数据返回，稍后再试" });
                        }
                    },
                    error(errData) {
                        commFun.errorTip(errData || "获取藏品列表失败");
                    }
                });
            },
            getTotalLikeRecom(){
                var self = this
                commFun.request({
                    url: commFun.apiRouter.totalLikeRecom,
                    success(data) {
                        if(data.code==200){
                            commFun.tip({ text: "获取所有推荐数据成功" });
                            self.totalLikeRecom = data.data
                            for (var i = 0; i < self.totalLikeRecom.length; i++) {
                                self.totalLikeRecom[i].i = self.totalLikeRecom[i].sort
                            }
                        }else {
                            commFun.tip({ text: "无数据返回，稍后再试" });
                        }
                    },
                    error(errData) {
                        commFun.errorTip(errData || "获取藏品列表失败");
                    }
                });
            }
        },
        //分页相关
        events: {
            // 分页组件传回的表格数据
            'data' (data) {
                for (let j = 0; j < data.length; j++) {
                    let photo = data[j].photoKeys
                    for (let i = 0; i < photo.length; i++) {
                        photo[i] = 'http://img.aworld.cn/' + photo[i]
                    } 
                }
                for (let n = 0; n < data.length; n++) {
                    let props_ = ''
                    for (let k = 0; k < data[n].props.length; k++) {
                        props_ += data[n].props[k].name + ': ' + data[n].props[k].val + ' \n'
                        data[n].props_ = props_
                    }
                }
                this.tableList = data;
                this.showEmptyTip = data.length > 0 ? false : true;
            },
            // 刷新数据
            'refresh' () {
                this.refresh()
            },
            'data_' (data) {
                for (let j = 0; j < data.length; j++) {
                    let photo = data[j].photoKeys
                    for (let i = 0; i < photo.length; i++) {
                        photo[i] = 'http://img.aworld.cn/' + photo[i]
                    } 
                }
                for (let n = 0; n < data.length; n++) {
                    let props_ = ''
                    for (let k = 0; k < data[n].props.length; k++) {
                        props_ += data[n].props[k].name + ': ' + data[n].props[k].val + ' \n'
                        data[n].props_ = props_
                    }
                }
                this.tableList_ = data;
                this.showEmptyTip = data.length > 0 ? false : true;
            },
            'total_' (data) {
                this.likeTotal = data
            },
            // 刷新数据
            'refresh_' () {
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