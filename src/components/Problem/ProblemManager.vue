<template>
    <div class="problem-manager" v-loading="loading">
        <el-form :model="problem" label-position="right" label-width="auto" ref="form">
            <el-form-item label="题目ID" prop="id">
                <el-input v-model="problem.id" :disabled="!this.$store.state.status.isAdmin"
                placeholder="不填则自动生成(推荐)"></el-input>
            </el-form-item>

            <el-form-item label="标题" prop="title">
                <el-input v-model="problem.title"></el-input>
            </el-form-item>

            <el-form-item label="题目" prop="content">
                <el-input v-model="problem.content" :autosize="{ minRows: 12, maxRows: 25 }" type="textarea"
                          placeholder="可使用html标签"></el-input>
            </el-form-item>

            <el-form-item label="提示" prop="hint">
                <el-input v-model="problem.hint" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="数据" prop="data">
                <el-input v-model="problem.data" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" placeholder="无需修改则无需填写.若有多个答案,用;分割">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="update" type="primary">{{ operation }}题目</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ProblemManager",
        props: ['problem', 'operation'],
        data() {
            return {
                loading: true
            }
        },
        methods: {
            update() {
                this.$refs['form'].validate(v => {
                    if (v) {
                        this.postRequest('/updateProblem', this.problem).then(resp => {
                            //console.log(resp)
                            this.$message({ showClose: true, duration: 2000, message: '更新成功', type: 'success' })
                            this.$router.push({name: "problemDetail", params: {id: resp.data}})
                        })
                    }
                })
            }
        },
        mounted() {
            this.loading = false
        }
    }
</script>

<style scoped>
    .problem-manager {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
</style>