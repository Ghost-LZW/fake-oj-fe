<template>
    <div class="problem-introduce" v-loading="loading">
        <h2>题目推荐，这些好玩的题目，不来玩玩吗(。・∀・)ノ</h2>
        <el-table :data="tableData" stripe>

            <el-table-column label="题目" prop="title">
                <template slot-scope="scope">
                    <span @click="showProblem(scope.row.id)" class="cursor-pointer">{{scope.row.title}}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "ProblemIntroduce",
        data() {
            return {
                loading: true,
                pageSize: 6,
                tableData: []
            }
        },
        methods: {
            getPage() {
                this.loading = true
                this.getRequest("/getIndexProblem", {
                    size: this.pageSize
                }).then(resp => {
                    console.log(resp)
                    this.tableData = resp
                    this.loading = false
                })
            },
            showProblem(id) {
                this.$router.push({name: 'problemDetail', params: {id: id}})
            }
        },
        created() {
            if (window.innerHeight > 1080) this.pageSize = 5
            this.getPage()
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>