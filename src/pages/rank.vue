<template>
    <div class="rank-list" v-loading="loading" v-show="show">
        <el-table :data="tableData" stripe style="height: 100%">
            <el-table-column label="排名" prop="rank" width="80px"></el-table-column>

            <el-table-column label="用户名" prop="username"></el-table-column>

            <el-table-column label="正确" prop="solvedCount" width="100px"></el-table-column>

            <el-table-column label="提交" prop="submitCount" width="100px"></el-table-column>

            <el-table-column label="正确率" prop="ratio" width="100px"></el-table-column>

            <el-table-column label="创建题目" prop="problemCount" width="100px"></el-table-column>

            <el-table-column label="操作" v-if="this.$store.state.status.isAdmin" width="100px">
                <template slot-scope="scope">
                    <span @click="lockOrUnlock(scope.row)" class="cursor-pointer"
                          :style="block(scope.row.locked)">{{scope.row.locked ? "解禁" : "封禁"}}</span>
                </template>
            </el-table-column>

            <el-table-column label="添加题目" v-if="this.$store.state.status.isAdmin" width="60px">
                <template slot-scope="scope">
                    <span @click="addOrCanNot(scope.row)" class="cursor-pointer"
                    :style="block(!scope.row.canAdd)">{{scope.row.canAdd ? "禁止" : "允许"}}</span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination :page-size="pageSize" :total="itemCount"
                       @current-change="getPage" background
                       element-loading-spinner="el-icon-more-outline"
                       id="rank-list-pagination" layout="prev, pager, next" v-show="itemCount > pageSize">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "rank",
        data() {
            return {
                loading: true,
                tableData: [],
                pageSize: 14,
                pageIndex: 1,
                itemCount: 14,
                show: false
            }
        },
        methods: {
            getPage(index) {
                this.loading = true
                this.pageIndex = index
                this.getRequest("/rankList", {
                    index: index,
                    size: this.pageSize
                }).then(resp => {
                    for (let i = 0; i < resp.length; i++) {
                        resp[i].rank = this.pageSize * (this.pageIndex - 1) + i + 1;
                        if (resp[i].submitCount === 0) resp[i].ratio = 0 + '%'
                        else resp[i].ratio = Math.round(resp[i].solvedCount / resp[i].submitCount * 100 * 100) / 100 + '%'
                    }
                    this.tableData = resp
                    this.loading = false
                })
            },
            getPageInfo() {
                this.getRequest("/rankInfo").then(resp => {
                    this.itemCount = resp.itemCount;
                    this.getPage(1);
                })
            },
            lockOrUnlock(info) {
                this.postRequest("/lockOrUnlock", {
                    id: info.id,
                    opt: info.locked
                }).then(resp => {
                    info.locked = resp === 'locked'
                    if (info.locked) this.$message.success("封禁成功")
                    else this.$message.success("解禁成功")
                })
            },
            addOrCanNot(info) {
                console.log(info)
                this.postRequest("/addOrCanNot", {
                    id: info.id,
                    opt: info.canAdd
                }).then(resp => {
                    //console.log(resp)
                    info.canAdd = resp === 'canAdd'
                    if (info.canAdd) this.$message.success("添加权限成功")
                    else this.$message.success("去除权限成功")
                })
            },
            block(aim) {
                if (aim) return "color: #52abff"
                else return "color: red"
            }
        },
        created() {
            this.getPageInfo()
        },
        mounted() {
            this.show = true
        }
    }
</script>

<style scoped>
    .rank-list {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-weight: bold;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    #rank-list-pagination {
        margin-top: 30px;
    }
</style>