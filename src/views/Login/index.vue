<template>
  <div class="login">
    <div class="login-box">
      <div class="title">Login</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-width="100px"
        inline
        class="login-form"
      >
        <el-form-item label="用户名" prop="usrName">
          <el-input v-model="loginForm.usrName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginReq } from "../../api/api";
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      loginForm: {
        usrName: "",
        password: "",
      },
      rules: {
        usrName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          const { usrName, password } = this.loginForm;
          const md5Password = this.$md5(password);
          const reqParams = {
            loginName: usrName,
            password: md5Password,
          };
          const res = await loginReq(reqParams);
          if (res.code === "00000") {
            const { data } = res;
            const { token } = data;
            this.$setData("token", token);
            this.$store.commit('setToken',token)
            this.$router.push('/home/tableList');
          }
        } else {
          this.$message.error(res.message);
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  .title {
    text-align: center;
    position: absolute;
    left: 50%;
    top: -80px;
    transform: translateX(-50%);
    font-size: 36px;
    font-weight: 700;
    color: #6f86d6
  }
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 15%;
    background-color: rgba(93, 90, 91, 0.1);
    border-radius: 20px;
    box-shadow: 15px 5px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    .el-button {
      width: 120px;
      margin-left: 20px;
    }
  }
}
</style>