<template>
    <div class="nav-bar">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <el-row>
            <el-col :span="2">
                <div class="nav_bar_name">
                    <a :href="'/home'" class="no-decoration">Fake OJ</a>
                </div>
            </el-col>
            <el-col :span="14">
                <el-menu :default-active="activeIndex" mode="horizontal" ref="rootMenu" router>
                    <el-menu-item index="/home"><i class="el-icon-house"></i>首页</el-menu-item>
                    <el-menu-item index="/problems"><i class="el-icon-files"></i>题目</el-menu-item>
                    <el-menu-item index="/status"><i class="el-icon-coffee-cup"></i>状态</el-menu-item>
                    <el-menu-item index="/rank"><i class="el-icon-trophy"></i>排名</el-menu-item>
                    <el-menu-item index="/contest"><i class="el-icon-s-flag"></i>比赛</el-menu-item>
                </el-menu>
            </el-col>

            <el-col :span="8">
                <UserBar></UserBar>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import UserBar from "./UserBar";
    export default {
        name: "HeaderBar",
        components: {UserBar},
        methods: {
            handleSelect(key, value) {
                console.log(key, value)
            }
        },
        data() {
            return {
                activeIndex: this.$route.path
            }
        },
        watch: {
            $route (to) {
                this.$refs.rootMenu.activeIndex = to.path
            }
        }
    }
</script>

<style scoped>
    .nav-bar {
        height: 60px;
        border-bottom: solid 1px #52abff;
    }

    .nav_bar_name {
        text-align: left;
        color: #52abff;
        font-size: 22px;
        margin-top: 21px;
        margin-left: 30%;
    }

    .no-decoration {
        text-decoration: none;
        color: #52abff;
    }
</style>