<template>
    <div class="status-detail" v-loading="loading" v-show="show">
        <h2 id="solution-title">代码查看 - {{ solution.title }}</h2>

        <div class="metadata">
            <span><i class="el-icon-timer"></i>提交时间&nbsp;{{solution.submitTime}}</span>&nbsp;|&nbsp;
            <span :style="gao(solution.status)"><i class="el-icon-hot-water"></i>状态&nbsp;{{solution.status}}</span>
        </div>

        <el-button id="clip-button" size="largs" v-clipboard:copy="solution.answer"
                   v-clipboard:error="onCopyError" v-clipboard:success="onCopySuccess"
                    type="primary">复制
        </el-button>

        <el-card class="solution-answer" shadow="always">
            <pre>
                {{solution.answer}}
            </pre>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "statusDetail",
        data() {
            return {
                loading: true,
                show: false,
                solution: {}
            }
        },
        methods: {
            gao(status) {
                if (status === "AC") return "color: green"
                else return "color: darkred"
            },
            getSolution() {
                this.loading = true
                this.postRequest('/getSolution', {
                    id: this.$route.params.id
                }).then(resp => {
                    //console.log(resp)
                    this.solution = resp
                    this.loading = false
                }).catch(error => {
                    console.log(error)
                    this.loading = false
                    this.$message.error("无权限访问")
                })
            },
            onCopyError() {
                this.$message.error("复制失败")
            },
            onCopySuccess() {
                this.$message.success("复制成功")
            }
        },
        created() {
            this.getSolution()
        },
        mounted() {
            this.show = true
        }
    }
</script>

<style scoped>
    .status-detail {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .metadata {
        margin-top: 20px;
        margin-bottom: 30px;
    }

    #clip-button {
        margin-bottom: 30px;
    }

    .solution-answer {
        text-align: left;
    }
</style>