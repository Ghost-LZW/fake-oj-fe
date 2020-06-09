<template>
    <div class="status-list" v-loading="loading">
        <el-table :data="tableData" stripe>
            <el-table-column align="center" label="提交ID" prop="id" width="76px">
                <template slot-scope="scope">
                    <span @click="showStatus(scope.row.id, scope.row.author)" class="cursor-pointer">{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="题目ID" prop="pid" width="76px">
                <template slot-scope="scope">
                    <span @click="showProblem(scope.row.pid)" class="cursor-pointer">{{scope.row.pid}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="用户名" prop="author"/>

            <el-table-column align="center" label="结果" prop="status">
                <template slot-scope="scope">
                    <span @click="showStatus(scope.row.id, scope.row.author)" class="cursor-pointer" :style="GetColor(scope.row.status)">{{ statusResult(scope.row.status) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="长度" prop="answerLength" width="90xp"/>
            <el-table-column align="center" label="提交时间" prop="submitTime" width="100px"/>

        </el-table>

        <el-pagination :page-size="pageSize" :total="itemCount"
                       @current-change="getPage" background
                       element-loading-spinner="el-icon-more-outline"
                       class="status-list-pagination"
                       layout="prev, pager, next" v-show="itemCount > pageSize">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "statue",
        data() {
            return {
                loading: true,
                itemCount: 10,
                pageSize: 10,
                tableData: []
            }
        },
        methods: {
            getPage(index) {
                this.loading = true
                this.getRequest('/statusList', {
                    index: index,
                    size: this.pageSize
                }).then(resp => {
                    this.tableData = resp
                    this.loading = false
                })
            },
            getPageInfo() {
                this.getRequest('/getStatusInfo').then(resp => {
                    this.itemCount = resp.itemCount
                    this.getPage(1);
                })
            },
            statusResult(sta) {
                if (sta === 0) return "WA"
                else return "AC"
            },
            GetColor(sta) {
                if (sta === 0) return "color: darkred"
                else return "color: green"
            },
            showProblem(pid) {
                this.$router.push({name: 'problemDetail', params: {id: pid}})
            },
            showStatus(id, author) {
                if (!this.$store.state.status.isAdmin && author !== this.$store.state.status.username) return
                this.$router.push({name: 'statusDetail', params: {id: id}})
            }
        },
        created() {
            this.getPageInfo()
        }
    }
</script>

<style scoped>
    .status-list {
        font-weight: bold;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .status-list-pagination {
        margin-top: 30px;
    }
</style>