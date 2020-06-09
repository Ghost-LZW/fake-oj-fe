<template>
    <div>
        <div class="problem-list">
            <el-table :data="tableData" v-loading="loading" stripe style="height: 100%">
                <el-table-column label="ID" prop="id" width="76px"></el-table-column>
                <el-table-column label="题目" prop="title">
                    <template slot-scope="scope">
                        <span @click="showProblem(scope.row.id)" class="cursor-pointer">{{scope.row.title}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="AC" prop="solvedCount" width="76px"></el-table-column>
                <el-table-column label="提交" prop="submitCount" width="76px"></el-table-column>
                <el-table-column label="通过率" prop="ratio" width="76px"></el-table-column>

                <el-table-column label="操作" v-if="this.$store.state.status.isAdmin" width="76px">
                    <template slot-scope="scope">
                        <span @click="editProblem(scope.row.id)" class="problem-edit">编辑</span>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination class="problem-pagination" :page-size="pageSize" :total="itemCount"
                            @current-change="getPage" background
                            layout="prev, pager, next" v-show="itemCount > pageSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "problems",
        data() {
            return {
                loading: true,
                itemCount: 15,
                pageSize: 15,
                tableData: []
            }
        },
        methods: {
            getPage(index) {
                this.loading = true
                this.getRequest("/problemList", {
                    index: index,
                    size: this.pageSize
                }).then(resp => {
                    for (let i = 0; i < resp.length; i++) {
                        if (resp[i].submitCount === 0) resp[i].ratio = 0 + '%'
                        else resp[i].ratio = Math.round(resp[i].solvedCount / resp[i].submitCount * 100 * 100) / 100 + '%'
                    }
                    this.tableData = resp
                    this.loading = false
                })
            },
            showProblem(id) {
                this.$router.push({name: 'problemDetail', params: {id: id}})
            },
            editProblem(id) {
                this.$router.push({name: 'problemEdit', params: {id: id}})
            },
            getPageInfo() {
                this.getRequest("/problemPageInfo").then(resp => {
                    this.itemCount = resp.itemCount
                    this.getPage(1)
                })
            }
        },
        created() {
            this.getPageInfo()
        }
    }
</script>

<style scoped>
    .problem-list {
        width: 90%;
        height: 100%;
        margin: auto;
        font-weight: bold;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .problem-edit {
        cursor: pointer;
        color: #52abff;
    }

    .problem-pagination {
        margin-top: 40px;
    }
</style>