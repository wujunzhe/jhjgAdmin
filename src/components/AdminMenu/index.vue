<template>
  <div class="admin-menu">
    <el-menu
      :default-active="menuPath"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      style="border: none"
      router
      @open="handleOpen"
    >
      <el-menu-item
        :index="item.toPath"
        @click="handleOpen(item.toPath)"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "adminMenu",
  data() {
    return {
      menuPath: '',
      menuList: [
        {
          toPath: '/home/tableList',
          icon: 'el-icon-s-platform',
          title: '餐桌管理',
        },
        {
          toPath: "/home/orderList",
          icon: "el-icon-s-order",
          title: "订单管理",
        },
      ],
    };
  },
  methods: {
    handleOpen(path) {
      this.$setData("menuPath", path);
    },
  },
  created() {
    const menuPath = this.$getData("menuPath");
    if (!menuPath) {
      this.menuPath = "/home/tableList";
    } else {
      this.menuPath = menuPath;
    }
  },
};
</script>

<style>
</style>
