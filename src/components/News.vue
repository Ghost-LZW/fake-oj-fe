<template>
    <div class="new-course">
        <el-carousel class="news-carousel" element-loading-backgroud="#42b983" v-loading="loading">
            <el-carousel-item :key="item.id" class="carousel-item" v-for="item in data">
                <div class="carousel-item-container">
                    <div class="carousel-item-title">{{ item.title }}</div>
                    <div class="carousel-item-content">{{ item.content }}</div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "News",
        data() {
            return {
                loading: true,
                data: [{id: 1, title: "", content: ""}]
            }
        },
        methods: {
            getNews() {
                this.getRequest('/news').then(resp => {
                    this.data = resp
                    this.loading = false
                })
            }
        },
        created() {
            this.getNews()
        }
    }
</script>

<style scoped>
    .new-course {
        background-color: #42b983;
        border-radius: 10px;
        height: 100%;
    }

    .carousel-item {
        color: white;
        text-align: center;
    }

    .carousel-item-container {
        height: 100%;
        width: 80%;
        margin: auto;
    }

    .carousel-item-title {
        font-size: 40px;
        font-family: 幼圆,serif;
        color: #ffd300;
        margin-bottom: 40px;
        margin-top: 50px;
    }

    .carousel-item-content {
        margin-top: 40px;
        font-size: 30px;
    }
</style>