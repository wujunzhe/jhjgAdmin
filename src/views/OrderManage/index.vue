<template>
  <div class="order-manage">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="tableName" label="桌名" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="orderDate"
        label="预定日期"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderType"
        label="预定时段"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column label="订单创建时间" width="240" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | getTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单支付状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isPay === 1">已支付</el-tag>
          <el-tag type="info" v-if="scope.row.isPay === 0">待支付</el-tag>
          <el-tag type="warning" v-if="scope.row.isPay === 2">退款处理中</el-tag>
        </template>
      </el-table-column>
            <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="page-nation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { queryOrderList } from "../../api/api";
export default {
  name: "tableManage",

  data() {
    return {
      tableData: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const res = await queryOrderList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      });
      if (res.code === "00000") {
        const { total, rows } = res.data || {};
        this.tableData = rows;
        this.pageTotal = total;
      } else {
        this.$message.error(res.msg);
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    },
  },
  filters: {
    getTime(val) {
      return new Date(val).toLocaleString();
    },
  },
};
</script>

<style lang="less" scoped>
.order-manage {
  .page-nation {
    margin-top: 20px;
  }
}
</style>