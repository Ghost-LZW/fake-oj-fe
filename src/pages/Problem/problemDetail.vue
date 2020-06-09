<template>
    <div class="problem-detail" v-loading="loading" v-show="show">
        <h2 id="problem-detail-title">{{problem.title}}</h2>
        <div class="problem-metadata">
            <span id="problem-metadata-solve"><i class="el-icon-circle-check"></i>解决&nbsp; {{problem.solvedCount}}</span>&nbsp;|&nbsp;
            <span id="problem-metadata-submit"><i class="el-icon-notebook-2"></i>提交&nbsp; {{problem.submitCount}}</span>
        </div>

        <div class="problem-detail-main">
            <problem-info :problem="problem"/>
        </div>
        <div class="problem-submit">
            <problem-submit :pid="problem.id"/>
        </div>
    </div>
</template>

<script>
    import ProblemInfo from "../../components/Problem/ProblemInfo";
    import ProblemSubmit from "../../components/Problem/ProblemSubmit";
    import {Message} from "element-ui"
    export default {
        name: "problemDetail",
        components: {ProblemSubmit, ProblemInfo},
        data() {
            return {
                show: false,
                loading: true,
                problem: {
                    id: 1,
                    solvedCount: 0,
                    submitCount: 0,
                    title: ' ',
                    content: ' ',
                    hint: ' '
                }
            }
        },
        methods: {
            updatePro() {
                this.loading = true
                this.getRequest('/getProblem', {
                    id: this.$route.params.id
                }).then(resp => {
                    this.problem = resp
                    this.loading = false
                }).catch(error => {
                    this.loading = false
                    console.log(error)
                    Message.error("未登录或无权限查看")
                })
            }
        },
        created() {
            console.log("creat")
            this.updatePro()
        },
        mounted() {
            this.show = true
        }
    }
</script>

<style scoped>
    .problem-detail {
        width: 80%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    #problem-detail-title {
        text-align: center;
        font-weight: bold;
    }

    .problem-metadata {
        margin-bottom: 20px;
        font-size: 16px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    #problem-metadata-solve {
        color: #42b983;
    }

    #problem-metadata-submit {
        color: #6c682a;
    }

    .problem-detail-main {
        margin-top: 10px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }

    .problem-submit {
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
    }
</style>