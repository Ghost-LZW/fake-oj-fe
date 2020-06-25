<template>
    <div class="register" :style="backgroundStyle" >
        <div style="height: 20%">.</div>
        <div style="width:300px;margin-left: auto;margin-right: auto;">

            <el-form :model="registerForm" :rules="rules" ref="registerForm"
                     v-loading="loading"
                     element-loading-text="正在提交信息..."
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                     class="registerContainer">

                <h3 class="registerTitle">Fake Oj 注册</h3>

                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="用户名" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>

                <el-form-item prop="email">
                    <el-input type="email" v-model="registerForm.email" placeholder="邮箱" prefix-icon="el-icon-message"></el-input>
                </el-form-item>

                <el-form-item prop="pwd">
                    <el-input type="password" placeholder="密码" v-model="registerForm.pwd"
                              prefix-icon="el-icon-key"></el-input>
                </el-form-item>

                <el-form-item prop="repwd">
                    <el-input type="password" placeholder="确认密码" v-model="registerForm.repwd"
                              @keydown.enter.native="submitForm('registerForm')" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>

                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="submitForm('registerForm')"
                               class="submit_btn" size="medium">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui";

    export default {
        name: "register",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.repwd !== '') {
                        this.$refs.registerForm.validateField('repwd');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let validateName = async (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (!await this.ckName(value)) {
                    callback(new Error('用户名已存在!'));
                } else {
                    callback();
                }
            };

            return {
                loading: false,
                registerForm: {
                    username: '',
                    pwd: '',
                    email: '',
                    repwd: ''
                },
                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'},
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    pwd: [
                        {validator: validatePass, trigger: 'blur'},
                        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
                    ],
                    repwd: [
                        {validator: validatePass2, trigger: 'blur'},
                        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
                    ],
                    email: [
                        {type: 'email', required: true, message: '请输入邮箱', trigger: 'change'},
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
            document.title = "Fake OJ 注册"
        },
        methods:{
            async ckName(name) {
                this.flag = false
                return await this.getRequest("/ckName", {
                    name: name
                }).then(resp => {
                    return resp === 1;
                })
            },
            submitForm(registerForm) {
                this.$refs[registerForm].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.postRequest('/register', this.registerForm).then(resp => {
                            this.loading = false
                            //console.log(resp)
                            if (resp.statue === 0) {
                                this.$router.replace('/home')
                            } else {
                                Message.error(resp.message)
                            }
                        })
                    } else {
                        console.log('error submit')
                        Message.error('error submit')
                        return false
                    }
                });
            }
        }
    }
</script>

<style scoped>
    body {
        margin: 0;
    }

    .register {
        width: 100%;
    }

    .registerContainer {
        border-radius: 5px;
        background-clip: padding-box;
        width: 260px;
        padding: 5px 40px 5px 40px;
    }

    .registerTitle {
        margin: 20px auto 20px auto;
        text-align: center;
        color: #0f9037;
        font-size: 26px;
    }

</style>