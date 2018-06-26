<!--推荐专家-->
<style scoped>
html,body{
    height: 100%;
}
.ListAdd{
    width: 49%;
    border: 1px solid rgb(102,102,102);
    margin-bottom: 2px;
    float: left;
    height: 100%;
}
.ListAdd img,.ListDel img{
    width: 50px;
}
.ListAdd button,.ListDel button{
    float: right;
    margin-top: 12px;
    margin-right: 5px;
}
.ListDel {
    width: 49%;
    float: right;
    border: 1px solid rgb(102,102,102);
    margin-bottom: 2px;
    height: 100%;
}
.clearfix:after,.clearfix:before{content:"";height:0;line-height:0;display:block;clear:both;visibility:hidden}
.content_{}
.content_ div:nth-child(1){
    width: 49%;
    float: left;
    height: 300px;
    background: red;
}
.content_ div:nth-child(2){
    width: 49%;
    float: right;
    height: 300px;
    background: black;
}
</style>
<template>
    <section class="content-header">
        <h1>
            推荐专家
        </h1>
    </section>
    <section class="content">
        <!--<div class='clearfix'>-->
            <!--<div class="ListAdd clearfix" v-for="(index,item) in platAppraiserList">-->
                <!--<div>-->
                    <!--<img :src="item.apply.avatar" alt=""> {{item.apply.realname}} <button @click="AddFn(index)">添加</button>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="ListDel clearfix" v-for="(index,item) in platAppraiserList_">-->
                <!--<div>-->
                    <!--<img :src="item.apply.avatar" alt=""> {{item.apply.realname}} <button @click="DelFn(index)">移除</button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class='content_'>
            <div></div>
            <div></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "recommended-experts",
        data(){
            return{
                platAppraiserList:[],
                platAppraiserList_:[],
            }
        },
        ready(){
            let self = this
            // self.getPlatformAppraiser()
        },
        methods:{
            AddFn(index){
                console.log(index);
                let self = this
                self.platAppraiserList_.push(self.platAppraiserList.splice(index,1)[0])
            },
            DelFn(index){
                console.log(index);
                let self = this
                self.platAppraiserList.push(self.platAppraiserList_.splice(index,1)[0])
            },
            getPlatformAppraiser(){
                var self = this;
                commFun.request({
                    url: commFun.apiRouter.platformAppraiser,
                    data: {},
                    success(data) {
                        console.log(data,"----鉴定师列表----");
                        self.platAppraiserList = data || [];
                    },
                    error(errData) {
                        commFun.errorTip(errData);
                    }
                });
            }
        },
        watch:{
            "platAppraiserList"(newV){
                console.log(newV,"上");
            },
            "platAppraiserList_"(newV){
                console.log(newV,'下');
            }
        },
        events:{

        }
    }
</script>
