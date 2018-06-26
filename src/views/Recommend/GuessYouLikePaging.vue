<!-- 表格分页组件 -->
<template>
    <nav class="boot-nav">
        <ul class="pagination boot-page">
            <li>
                <a href="javascript:void(0)" aria-label="Previous" @click="onFirstClick()">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" @click="onPrevClick()">
                    <span aria-hidden="true">‹</span>
                </a>
            </li>
            <li v-for="page in pages" :class="activeNum === $index ? 'active' : ''">
                <a href="javascript:void(0)" v-text="page" @click="onPageClick($index)"></a>
            </li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" @click="onNextClick()">
                    <span aria-hidden="true">›</span>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" aria-label="Next" @click="onLastClick()">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        <div class="page-total">
            共 <span v-text="pageTotal"></span> 页
        </div>
    </nav>
    <select class="form-control boot-select" v-model="len">
        <option v-for="arr in lens" :value="arr" v-text="arr" :selected="$index === 0 ? true : false"></option>
    </select>
</template>

<script>
export default {
    props: {
        // 页码
        pages: {
            type: Array,
            default: function () {
                return [1]
            }
        },
        // 是否请求服务器端数据
        async: {
            type: Boolean,
            default: false
        },
        // 每页显示个数
        len: {
            type: Number,
            default: 10
        },
        // 显示个数数组
        lens: {
            type: Array,
            default: function () {
                return [10, 50, 100]
            }
        },
        // 表格数据（数组）
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        // AJAX地址
        url: {
            type: String,
            default: ''
        },
        // 显示页数
        pageLen: {
            type: Number,
            default: 5
        },
        // 总页数 
        pageTotal: {
            type: Number,
            default: 1
        },
        // 参数内容
        param: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        //修改分页
        var url = location.href;
        var start = url.indexOf('/#!'), end = url.indexOf('?'), last ='';
        if(end === -1){
            last = url.substring(start);
        }else {
            last = url.substring(start,end);
        }
        this.lastUrl = last.substring(4).toLowerCase();
        this.sessionStorageAcctive = commFun.data(this.lastUrl) || 0;
        this.sessionStorageLength = commFun.data(this.lastUrl+'Len') || this.lens[0];

        commFun.data('listActiveLen',10);
        return {
            //activeNum: 0
            activeNum: this.sessionStorageAcctive,
            isFlag:true,
        }
    },
    methods: {
        // 点击页码刷新数据
        onPageClick (index) {
            this.isFlag = true;
            this.activeNum = index
        },

        // 上一页
        onPrevClick () {
            this.isFlag = true;
            // 当前页是否为当前最小页码
            if (this.activeNum > 0) {
                this.activeNum = this.activeNum - 1
            } else {
                if (this.pages[0] !== 1) {
                    let newPages = []

                    for (let i = 0; i < this.pages.length; i++) {
                        newPages[i] = this.pages[i] - 1
                    }
                    this.pages = newPages
                    this.getData()
                }
            }
        },

        // 下一页
        onNextClick () {
            this.isFlag = true;
            // 当前页是否为当前最大页码
            if (this.activeNum < this.pages.length - 1) {
                this.activeNum = this.activeNum + 1
            } else {
                if (this.pages[this.pages.length - 1] < this.pageTotal) {
                    let newPages = []

                    for (let i = 0; i < this.pages.length; i++) {
                        newPages[i] = this.pages[i] + 1
                    }

                    this.pages = newPages

                    this.getData()
                }
            }
        },

        // 第一页
        onFirstClick () {
            this.isFlag = true;
            if (this.pages[0] === 1) {
                this.activeNum = 0
            } else {
                let originPage = []

                for (let i = 1; i <= this.pageLen; i++) {
                    originPage.push(i)
                }

                this.pages = originPage
                this.activeNum === 0 ? this.getData() : this.activeNum = 0
            }
        },

        // 最后一页
        onLastClick () {
            this.isFlag = true;
            if (this.pageTotal <= this.pageLen) {
                this.activeNum = this.pages.length - 1
            } else {
                let lastPage = []

                for (let i = this.pageLen - 1; i >= 0; i--) {
                    lastPage.push(this.pageTotal - i)
                }

                this.pages = lastPage
                this.activeNum === this.pages.length - 1 ? this.getData() : this.activeNum = this.pages.length - 1
            }
        },

        // 获取页码
        getPages () {
            this.pages = []

            if (!this.async) {
                this.pageTotal = Math.ceil(this.data.length / this.len)
            }

            // 比较总页码和显示页数
            if (this.pageTotal <= this.pageLen) {
                for (let i = 1; i <= this.pageTotal; i++) {
                    this.pages.push(i)
                }
            } else {
                for (let i = 1; i <= this.pageLen; i++) {
                    this.pages.push(i)
                }
            }
        },

        // 页码变化获取数据
        getData () {
            var self = this;
            if (!this.async) {
                let len = this.len,
                    pageNum = this.pages[this.activeNum] - 1,
                    newData = [];

                for (let i = pageNum * len; i < (pageNum * len + len); i++) {
                    this.data[i] !== undefined ? newData.push(this.data[i]) : ''
                }
                console.log(newData,"BootPage打印的数据-下");
                this.$dispatch('data_', newData)
            } else {
                if (!this.url){
                    return;
                }
                if(this.activeNum != -1){
                    commFun.data('listActiveNum', this.activeNum);
                }
                //todo 这个有问题啊有问题有问题
                commFun.data(this.lastUrl, 0);
                commFun.data(this.lastUrl+'Len',10);

                this.param.pageIndex = this.pages[this.activeNum] || this.sessionStorageAcctive+1;
                //this.param.currentPage = this.pages[this.activeNum] || 1
                this.param.pageSize = this.len;

                commFun.request({
                    url: this.url,
                    data: this.param,
                    success: function (response) {
                        self.pageTotal = Math.ceil(response.data.total / response.data.pageSize);
                        if (self.pages.length !== self.pageLen || self.pageTotal < self.pageLen) {
                            self.getPages()
                        }
                        if (!response.data.objects.length) {
                            //搜索数据时，数据变少不走watch重新查询数据，所有加一个参数isFlag判断
                            self.activeNum = self.pageTotal - 1;
                            self.isFlag = false;
                        }else if(self.activeNum === -1){
                            //返回有值，且activeNum为-1的时候，需要修改activeNum为-1；
                            self.activeNum = self.sessionStorageAcctive;
                            self.isFlag = false;
                        }
                        console.log("BootPage打印的数据-上");
                        self.$dispatch('data_', response.data.objects)
                        self.$dispatch('total_', response.data.total)
                    },
                    error: function (errData) {
                        commFun.tip({text:errData.responseText || '系统繁忙，稍后再试！'});
                    }
                });
            }
        },

        // 当前页发生改变的时候，刷新表格
        refresh () {
            //刷新表格的时候，当前也是为第一页,下面两行代码是后来添加的
            this.isFlag = false;
            this.activeNum = 0;
            this.getData();
        },

        // 当前每页显示的条数发生变化的时候，重置并刷新表格
        refresh2 () {
            //下面这个两行是后面加上的
            commFun.data(this.lastUrl, 0);
            this.sessionStorageAcctive = 0;

            this.pages = [1];
                        
            //this.activeNum === 0 ? this.getData() : this.activeNum = 0

            this.activeNum === this.sessionStorageAcctive ? this.getData() : this.activeNum = this.sessionStorageAcctive;
        }
    },
    ready () {
        this.len = this.sessionStorageLength;
        if (!this.async) {
            this.getPages()
        } 
        
        //this.getData();
        if(this.len === 10){
            this.getData();
        }
        
    },
    watch: {

        // 监听显示数量
        'len' (newVal, oldVal) {
            commFun.data('listActiveLen',newVal);
            if (!this.async) {
                this.getPages()

                if (this.activeNum + 1 > this.pages.length) {
                    this.activeNum = this.pages.length - 1
                }

                this.getData()
            } else {
                this.refresh2()
            }
        },

        // 监测当前页变化
        'activeNum' (newVal, oldVal) {
            if(this.isFlag){
                this.getData();
            }
        }
    },
    events: {
        'refresh_::page_' () {
            this.refresh()
        }
    }
}
</script>

<style scoped>
.boot-select {
    float: right;
    width: 80px;
}

.boot-nav {
    float: right;
}

.boot-page {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
}

.page-total {
    display: inline-block;
    vertical-align: middle;
}
</style>