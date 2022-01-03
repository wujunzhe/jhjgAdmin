<template>
  <div class="login">
    <div class="login-box">
      <div class="title">管理系统</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-width="100px"
        inline
        class="login-form"
      >
        <el-form-item label="用户名" prop="usrName">
          <el-input v-model="loginForm.usrName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" clearable show-password></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginReq } from "../../api/api";
import { mapMutations } from "vuex";
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
    ...mapMutations(["setToken"]),
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
            this.$store.commit("setToken", token);
            this.$router.push("/home/tableList");
          } else {
            this.$message.error(res.msg);
            return false;
          }
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
  &::before {
    content: "";
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: url("../../assets/login.jpg") no-repeat;
    background-size: cover;
    filter: blur(5px);
  }
  .title {
    text-align: center;
    position: absolute;
    left: 50%;
    top: -80px;
    transform: translateX(-50%);
    font-size: 36px;
    font-weight: 700;
    color: #f7f7f7;
  }
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 300px;
    background-color: rgba(25, 12, 14, 0.5);
    border-radius: 20px;
    box-shadow: 15px 5px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    .el-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      /deep/ .el-form-item {
        width: 100%;
        text-align: center;
        .el-form-item__label {
          text-align-last: left;
          color: #f7f7f7;
        }
        .el-form-item__content {
          width: 50%;
        }
      }
    }
    .el-button {
      width: 80%;
      margin-left: 20px;
    }
  }
}
</style>