<template>
    <div class="login" :style="backgroundStyle" >
        <div style="height: 20%">.</div>
        <div style="width:300px;margin-left: auto;margin-right: auto;">
            <el-form :model="loginForm" :rules="rules" ref="loginForm"
                     v-loading="loading"
                     element-loading-text="正在登录..."
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                     class="loginContainer">
                <h3 class="loginTitle">Fake Oj 登录</h3>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" placeholder="密码" v-model="loginForm.pwd"  @keydown.enter.native="submitForm('loginForm')" prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" size="medium">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { Message } from "element-ui";

    export default {
        name: 'login',
        data() {
            return {
                loading: false,
                loginForm: {
                    username: '',
                    pwd: '',
                    remember: '1'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: true}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: true}
                    ]
                }
            }
        },
        computed: {
            backgroundStyle : function () {
                let high = window.innerHeight - 110;
                let img = ["/image/0_0.jpg", "/image/0_1.jpg", '/image/0_2.jpg']
                return "background-image:url('" + img[Math.floor(Math.random() * 3)] + "'); background-repeat: no-repeat; background-size: cover; height:" + high + "px;"
            }
        },
        created() {
            document.title = "Fake OJ"
        },
        methods:{
            submitForm(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.postRequest('/login', this.loginForm).then(resp => {
                            this.loading = false
                            //console.log(resp)
                            if (resp.statue === 0) {
                                this.$db.save("USER", resp.data)
                                this.$db.save("LOGIN", "1")
                                this.$store.commit('login', resp.data)
                                this.$router.replace('/home')
                            } else {
                                Message.error(resp.message)
                            }
                        })
                    } else {
                        //console.log('error submit')
                        Message.error('error submit')
                        return false
                    }
                });
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
    }

    .login {
        width: 100%;
    }

    .loginContainer {
        border-radius: 5px;
        background-clip: padding-box;
        width: 260px;
        padding: 5px 40px 5px 40px;
    }

    .loginTitle {
        margin: 20px auto 20px auto;
        text-align: center;
        color: #52abff;
        font-size: 26px;
    }

</style>