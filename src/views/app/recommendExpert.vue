<style scoped>
.row{
    margin-left: 15px;
}
td{
    border: 1px solid #ccc;
}
th{
    height: 25px;
}
.content_{
    float: left;
    width: 50%;
}
button{
    float: right;
    margin-right: 5px;
}
.table-bordered[_v-3086a230]{
     background: white;
 }
.table-bordered{
    border: 1px solid #ccc;
    background: white;
}
.content_{
    width: 49%;
    margin-right: 1%;
}
.spanLogo{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
}
.spanLogo img{
    width: 100%;
}
</style>

<template>
    <section class="content-header">
        <h1>
            推荐专家列表
        </h1>
    </section>
    <section class="content">
        <div class="row">
            <div class='content_'>
                <h3>平台鉴定师</h3>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>专家姓名：</th>
                            <th>荣誉称号：</th>
                            <th><button class="btn btn-default btn-xs"  @click='renovate()'>刷新</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(index,item) in recommendExpert' track-by="$index">
                            <td><span class="spanLogo"><img :src="item.apply.avatar" alt=""></span> {{item.apply.realname}}</td>
                            <td>{{item.apply.honoraryname}}</td>
                            <td><button class="btn btn-warning btn-xs" @click='add(index,item.id)'>添加</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class='content_'>
                <h3>推荐专家</h3>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>专家姓名：</th>
                            <th>荣誉称号：</th>
                            <th><button class="btn btn-warning btn-xs" v-if='recommendExpert_.length>0' @click="confirm()"> 确定排序 </button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(index,item) in recommendExpert_' track-by="$index">
                            <td>{{item.apply.realname}}</td>
                            <td>{{item.apply.honoraryname}}</td>
                            <td>
                                <button class="btn btn-danger btn-xs" @click='del(index,item.id)'>移除</button>
                                <button class="btn btn-success btn-xs" @click='shiftUp(index)'>置顶</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style="float:right;padding-right: 10px">
                    &nbsp;&nbsp;
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        name: "recommendExpert",
        ready() {
            var self = this
            self.getList()
            self.platAppraiser()
        },
        data() {
            return {
                recommendExpert:[],
                recommendExpert_:[],
            }
        },
        methods: {
            renovate(){
                this.getList()
            },
            confirm(){
                let self = this,Arr_=[];
                self.recommendExpert_.forEach((key,index,Arr)=>{
                    Arr_.push({
                        id:Arr[index].id,
                        sort:index-0+1
                    })
                })
                commFun.request({
                    url: commFun.apiRouter.recomExpertsMdf,
                    type:'POST',
                    data:JSON.stringify({expertsArr:Arr_}),
                    success(data) {
                        if(data.code==200){
                            commFun.tip({ text: "排序成功" });
                            self.getList()
                            self.platAppraiser()
                        }else {
                            commFun.tip({ text: "无数据返回，稍后再试" });
                        }
                    },
                    error(errData) {
                        commFun.errorTip(errData || "获取专家列表失败");
                    }
                });
            },
            add(idnex,id){
                let self = this,flag;
                self.recommendExpert_.forEach((key,index,Arr)=>{
                    console.log(Arr[index].id);
                    if(Arr[index].id == id){
                        flag = true
                    }
                })
                if(!flag){
                    self.recommendExpert_.unshift(self.recommendExpert[idnex]);
                }
            },
            del(idnex,id){
                let self = this,flag;
                self.recommendExpert.forEach((key,index,Arr)=>{
                    if(Arr[index].id == id){
                        flag = true
                    }
                })
                flag?
                    self.recommendExpert_.splice(idnex,1):
                    self.recommendExpert.unshift(self.recommendExpert_.splice(idnex,1)[0]);
            },
            shiftUp(idnex){
                let self = this;
                if(self.recommendExpert_.length>1){
                    let i = self.recommendExpert_.splice(idnex,1)[0];
                    self.recommendExpert_.unshift(i);
                }
            },
            back(){
                this.$route.router.go({name:"index"});
            },
            getList(){
                let self = this;
                commFun.request({
                    url: commFun.apiRouter.recomExperts,
                    type:'POST',
                    success(data) {
                        console.log(data,"1111111111111");
                        if(data.code==200){
                            self.recommendExpert_ = data.data;
                        }else {
                            commFun.tip({ text: "推荐专家无数据返回，稍后再试" });
                        }
                    },
                    error(errData) {
                        commFun.errorTip(errData || "获取专家列表失败");
                    }
                });
            },
            platAppraiser(){
                let self = this;
                commFun.request({
                    url: commFun.apiRouter.platAppraiser,
                    success(data){
                        console.log(data,"22222222222222");
                        self.recommendExpert = data || [];
                    },
                    error(errData) {
                        commFun.errorTip(errData);
                    }
                });
            }
        }
    }
</script>