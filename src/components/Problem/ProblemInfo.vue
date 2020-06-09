<template>
    <div class="problem-info">
        <el-collapse v-model="activeName">
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="collapse-title">题目描述</div>
                </template>
                <el-card class="box-card" shadow="hover">
                    <div class="collapse-content" v-html="problem.content">{{problem.content}}</div>
                </el-card>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="collapse-hint">提示</div>
                </template>
                <el-card class="box-card" shadow="hover">
                    <div class="collapse-content" v-html="problem.hint">{{problem.hint}}</div>
                </el-card>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "ProblemInfo",
        props: ['problem'],
        data() {
            return {
                activeName: ['1']
            }
        }
    }
</script>

<style scoped>
    .problem-info {
        height: 100%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .collapse-title {
        font-size: 25px;
        font-weight: bold;
        color: #2c3e50;
    }

    .collapse-hint {
        font-size: 20px;
        font-weight: bold;
    }

    .collapse-content {
        text-align: left;
    }

    .box-card {
        margin-top: 30px;
        border: 1px solid #52abff;
    }

    .collapse-content {
        font-size: 14px;

    }

</style>