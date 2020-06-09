<template>
    <div class="problem-submit">
        <div class="problem-submit-answer">
            <el-input
                :rows="5"
                type="textarea"
                placeholder="请输入答案"
                v-model="answer">
            </el-input>
            <el-button @click="submitAnswer" id="submit-button" type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProblemSubmit",
        props: ['pid'],
        data() {
            return {
                answer: ''
            }
        },
        methods: {
            submitAnswer() {
                if (!this.$store.state.status.isLogin) {
                    this.$message.error("请登录！")
                    return
                }
                this.postRequest('/submitAnswer', {
                    pid: this.pid,
                    answer: this.answer
                }).then(resp => {
                    if (resp.statue !== 0) {
                        this.$message.error("未登录或无提交权限")
                    }
                    this.$router.push({name: 'status'})
                }).catch((error) => {
                    console.log(error)
                    this.$message.error("未登录或无提交权限")
                })
            }
        }
    }
</script>

<style scoped>
    .problem-submit {
        text-align: center;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    .problem-submit-answer {
        margin-top: 40px;
    }

    #submit-button {
        margin-top: 20px;
    }
</style>