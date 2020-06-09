<template>
    <div class="footer-bar">

        <el-menu mode="horizontal" background-color="black">
            <el-menu-item class="footer-show">Created By:</el-menu-item>

            <el-menu-item class="footer-show"><a class="no-decoration" href="https://cn.vuejs.org/index.html">vue</a></el-menu-item>

            <el-menu-item class="footer-show"><a class="no-decoration" href="https://element.eleme.cn">element-ui</a></el-menu-item>

            <el-menu-item class="footer-show"><a class="no-decoration" href="https://github.com/Ghost-LZW">lzw</a></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "SidBar"
    }
</script>

<style scoped>
    .footer-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: black;
        text-align: center;
        color: #52abff;
        font-weight: bold;
    }

    .footer-show {
        text-align: left;
    }

    .no-decoration {
        text-decoration: none;
    }
</style>