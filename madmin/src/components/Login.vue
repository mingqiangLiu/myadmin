<template lang="html">
  <div class="">
    <el-row>
      <el-col :span="10" :offset="7">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户登录" name="first">
            <el-col >
              <el-form :model="dynamicValidateForm" label-width="100px" ref="dynamicValidateForm">
                    <el-form-item
                      prop="name"
                      label="邮箱"
                      :rules="rules.name"
                    >
                      <el-input v-model="dynamicValidateForm.name"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="pwd"
                    label="密码"
                    :rules = "rules.pwd"
                    >
                      <el-input type="password" v-model="dynamicValidateForm.pwd"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
              </el-form>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <Register></Register>
          </el-tab-pane>
      </el-tabs>
    </el-col>
    </el-row>

        
  </div>
</template>

<script>
import Register from '@/components/Register.vue'
import * as types from '../store/types'
import api from '../axios'
export default {
    name: 'login',
    data() {
        return {
            dynamicValidateForm: {
                name: '',
                pwd: '',

            },
            authToken:'',
            activeName: this.$store.state.activeName,
            // 输入校验
            rules: {
                name: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    }
                ],
                pwd: {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }
            }
        }
    },
    components: {
        Register
    },
    
    methods: {
        handleClick(tab, event) {},
        // 重置
        resetForm(formName) {
            //this.$refs[formName].resetFields();
              console.log(22223333333)
        api.getUser({name:"1222"}).then(({
                    data
                }) => {
                    console.log(data)
                    if (data.code == 401) {
                        console.log('token')
                        this.$router.push('/login')
                        this.$store.dispatch('UserLogout')
                        console.log(localStorage.token)
                    } else {
                        this.user = data
                    }
                })
        },
        // 登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let opt = this.dynamicValidateForm;
                  //  opt.loginToken = this.authToken;
                        console.log(opt)
                    api.UserLogin(opt).then(({
                        data
                    }) => {
                        console.log(data);
                        //将opt发送到后台做判断并返回
                       
                        if (data.status == "ok") {
                           // console.log(data.userinfo.name)
                             
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                })
                                this.$store.dispatch('UserLogin', data.resultString)
                                this.$store.dispatch('UserName', this.dynamicValidateForm.name)
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirect
                                })
                            
                            
                        } else {
                            this.$message({
                                type: 'info',
                                message: '密码错误'
                            })
                        }
                    })
                } else {
                    console.log('Error Submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style>

</style>
