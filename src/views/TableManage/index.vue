<template>
  <div class="manage">
    <div class="btn">
      <el-button type="primary" class="add-btn" @click="showAddTableDialog"
        >添加餐桌</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="房间号" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="personNum"
        label="容纳人数"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="address" label="备注"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTable(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="del(scope.row)"
            >删除</el-button
          >
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

    <!-- 添加餐桌对话框 -->
    <el-dialog title="餐桌信息" width="30%" :visible="addTableDialogVisible">
      <el-form :model="addTableForm">
        <el-form-item label="桌名" :label-width="formLabelWidth">
          <el-input v-model="addTableForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="容纳人数" :label-width="formLabelWidth">
          <el-input
            v-model="addTableForm.personNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddTable">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改餐桌对话框 -->
    <el-dialog title="餐桌信息" width="30%" :visible="editTableDialogVisible">
      <el-form :model="editTableForm">
        <el-form-item label="桌名" :label-width="formLabelWidth">
          <el-input v-model="editTableForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="容纳人数" :label-width="formLabelWidth">
          <el-input
            v-model="editTableForm.personNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditTable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryTableList,
  addTable,
  editTable,
  queryOrderList,
  deleteTable,
} from "../../api/api";
export default {
  name: "tableManage",

  data() {
    return {
      tableData: [],
      addTableDialogVisible: false,
      editTableDialogVisible: false,
      addTableForm: {
        name: "",
        personNum: "",
        img: "https://cdn.segmentfault.com/r-753f514f/static/bg-219.7a1acf4f.svg",
        isDel: 0,
      },
      editTableForm: {
        name: "",
        personNum: "",
        img: "https://cdn.segmentfault.com/r-753f514f/static/bg-219.7a1acf4f.svg",
        isDel: 0,
      },
      formLabelWidth: "120px",
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const res = await queryTableList({
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

    showAddTableDialog() {
      this.addTableDialogVisible = true;
    },

    async submitAddTable() {
      const res = await addTable(this.addTableForm);
      if (res.code === "00000") {
        this.$message.success("添加成功");
        this.addTableDialogVisible = false;
        this.getTableList();
      } else {
        this.$message.error(res.msg);
      }
    },

    editTable(table) {
      this.editTableForm = { ...table };
      this.editTableDialogVisible = true;
    },

    async submitEditTable() {
      const res = await editTable(this.editTableForm);
      if (res.code === "00000") {
        this.$message.success("修改成功");
        this.editTableDialogVisible = false;
        this.getTableList();
      } else {
        this.$message.error(res.msg);
      }
    },

    async del(table) {
      // 查询是否有订单
      const { data: orderList } = await queryOrderList();
      const { rows } = orderList;
      const hasOrderTable = rows.some((item) => item.tableId === table.id);
      if (hasOrderTable) {
        return this.$message.warning("该餐桌尚有未完成订单，禁止删除");
      } else {
        this.delTable(table.id);
      }
    },

    async delTable(tId) {
      const ids = [tId];
      const res = await deleteTable({ ids });
      if (res.code === "00000") {
        this.$message.success("删除成功");
        this.getTableList();
      } else {
        this.$message.error(res.msg);
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableList();
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  .btn {
    margin-bottom: 15px;
    width: 100%;
    text-align: right;
  }
  .page-nation {
    margin-top: 20px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>