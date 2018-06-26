
<style scoped>
.userSpan{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
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
    background: white;
}
.table-bordered[_v-3086a230]{
    background: white;
}
</style>
<template>
    <div style="margin-left:10px">
        <section class="content-header">
            <h1>
                寄送鉴定列表
            </h1>
        </section>
        <section class="content">
            <div>

                <table id="userTable" class="table table-bordered table-hover">
                    <tr>
                        <th>用户</th>
                        <!--<th>用户留言</th>-->
                        <th>价格</th>
                        <!--<th>时间</th>-->
                        <!--<th>指定专家</th>-->
                    </tr>
                    <tr v-for="(index,item) in list">
                        <td>
                            <span class="userSpan">
                                <img class='userAvatar' :src="item.apply.avatar" alt="">
                                {{item.apply.realname}}
                            </span>
                        </td>
                        <!--<td>-->
                            <!--<ul :id="'images'+index" class='userPhotos'>-->
                                <!--<li v-for="item_ in item.photos"><img :src="item_" alt=""></li>-->
                            <!--</ul>-->
                            <!--<span>-->
                                <!--{{item.remark}}-->
                            <!--</span>-->
                        <!--</td>-->
                        <td>
                            <span style="display:inline-block;min-width:60px" v-if='globalIndex===""||globalIndex!==index'>{{item.sendCharge}}</span>
                            <input v-if='globalIndex===index' type="number" v-model="ModifyText">
                            <button v-if='globalIndex===""||globalIndex!==index' @click='modify(index,item.id)' class="btn btn-warning btn-xs">修改</button>
                            <button v-if='globalIndex===index' @click='confirmFn(index)' class="btn btn-success btn-xs">确认</button>
                            <button v-if='globalIndex===index' @click='cancelFn(index)' class="btn btn-danger btn-xs">取消</button>
                        </td>
                        <!--<td>-->
                            <!--<span class="userSpan">-->
                                <!--{{item.createdAt}}-->
                            <!--</span>-->
                        <!--</td>-->
                        <!--<td>-->
                            <!--<span class="userSpan">-->
                                <!--<img class='userAvatar' :src="item.appraiserId.apply.avatar" alt="">-->
                                <!--{{item.appraiserId.apply.realname}}-->
                            <!--</span>-->
                        <!--</td>-->
                    </tr>
                </table>

            </div>
        </section>
    </div>
</template>
<script>
    export default {
        name: "send-appraisal",
        data(){
            return{
                list:[],
                ModifyText:'',
                id:'',
                globalIndex:''
            }
        },
        watch:{},
        ready(){
            var self = this
            self.getList();
        },
        methods:{
            confirmFn(){
                let self = this,obj;
                if(self.ModifyText<0){
                    commFun.tip({text:'价格不能小于0'});
                    return;
                }
                obj = {
                    id:self.id,
                    charge:self.ModifyText
                }
                commFun.request({
                    url: commFun.apiRouter.cutId,
                    params:self.id,
                    type:"POST",
                    data: JSON.stringify(obj),
                    success(data){
                        if(data.code==200){
                            commFun.tip({text:data.message,type:'showSuccessToast'})
                            self.getList()
                            self.globalIndex = ""
                        }else {
                            commFun.errorTip("暂无数据");
                        }
                    },
                    error(errData){
                        commFun.errorTip(errData||"服务器繁忙");
                    }
                });
            },
            cancelFn(){
                this.globalIndex = ""
            },
            modify(index,id){
                let self = this;
                self.ModifyText = self.list[index].sendCharge;
                self.id = id;
                self.globalIndex = index;
            },
            getList(cb){
                let self = this,LG;
                commFun.request({
                    url: commFun.apiRouter.platAppraiser,
                    // data: {
                    //     categoryId:'all',
                    //     status:'all',
                    //     pageIndex:1,
                    //     pageSize:1500
                    // },
                    type:"GET",
                    success(data){
                        console.log(data);
                        // if(data.code==200){
                        // .data.objects
                            self.list = data;
                            // self.list.forEach(function (key,index,Arr) {
                            //     if(Arr[index].createdAt.indexOf('.')>-1){
                            //         Arr[index].createdAt = Arr[index].createdAt.split('.')[0].replace("T",' ')
                            //     }
                            // })
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
