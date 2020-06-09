<template>
    <div class="problem-edit">
        <h2 id="problem-edit-title">题目编辑</h2>

        <problem-manager :problem="problem" :operation="'更新'" />
    </div>
</template>

<script>
    import ProblemManager from "../../components/Problem/ProblemManager";
    export default {
        name: "problemEdit",
        components: {ProblemManager},
        data() {
            return {
                problem: {}
            }
        },
        created() {
            this.getRequest("/getProblem", {
                id: this.$route.params.id
            }).then(resp => {
                resp.data = ''
                //console.log(resp)
                this.problem = resp
            })
        }
    }
</script>

<style scoped>

</style>