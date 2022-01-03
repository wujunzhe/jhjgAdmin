<template>
  <div class="home">
    <el-container>
      <el-aside>
        <logo-title></logo-title>
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ titleName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-card class="box-card">
          <div class="text item">
              <router-view></router-view>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import adminMenu from "../components/AdminMenu/index.vue";
import logoTitle from "../components/Logo/index.vue";
import {refreshAuth} from '../api/api.js';
export default {
  name: "Home",
  data() {
    return {
      titleName: "",
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    async refresh() {
      const res = await refreshAuth();
      if(res.code==="A0300" && res.msg === "访问权限异常") {
        this.$removeData('token');
        this.$router.push('/login');
      }
    }
  },
  components: {
    adminMenu,
    logoTitle,
  },
  watch:{
    $route(to,from){
      if(to.path !== from.path) {
        const {meta} = to;
        const {name} = meta;
        this.titleName = name;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  .el-container {
    height: 100%;
    .el-aside {
      width: 200px;
      background-color: #545c64;
    }
    .el-main {
      .el-breadcrumb {
        margin-top: 20px;
      }
      .box-card {
        margin-top: 50px;
      }
    }
  }
}
</style>