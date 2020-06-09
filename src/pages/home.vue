<template>
    <div class="home">
        <el-container>
            <el-main>
                <div class="home-main">
                    <div class="home-title">
                        <p class="home-title-h">Welcome to <b class="home-title-oj">Fake OJ</b></p>
                    </div>
                    <div>
                        <News></News>
                    </div>
                    <div class="home-problem">
                        <problem-introduce/>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import News from "../components/News";
    import ProblemIntroduce from "../components/ProblemIntroduce";
    export default {
        name: "home",
        components: {ProblemIntroduce, News}
    }
</script>

<style scoped>
    .home {
        background-color: #52abff;
        border-radius: 10px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }

    .home-title {
        font-size: 26px;
    }
</style>