<template>
    <div class="problem-add">
        <h2 id="problem-edit-title">题目添加</h2>

        <problem-manager :problem="problem" :operation="'添加'" />
    </div>
</template>

<script>
    import ProblemManager from "../../components/Problem/ProblemManager";
    export default {
        name: "problemAdd",
        components: {ProblemManager},
        data() {
            return {
                problem: {
                    id: '',
                    title: '',
                    content: '',
                    hint: '',
                    data: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>