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
      <el-table-column fixed="right" label="操作" width="400" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTable(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="tableOn(scope.row)"
            >上架</el-button
          >
          <el-button type="text" size="small" @click="del(scope.row)"
            >下架</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="showDisableTableDialog(scope.row)"
            >禁用</el-button
          >
          <el-button type="text" size="small" @click="queryOffList(scope.row)"
            >查询一周内禁用情况</el-button
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
    <el-dialog
      title="餐桌信息"
      width="30%"
      :show-close="false"
      :visible="addTableDialogVisible"
    >
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
    <el-dialog
      title="餐桌信息"
      width="30%"
      :show-close="false"
      :visible="editTableDialogVisible"
    >
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

    <!-- 禁用餐桌对话框 -->
    <el-dialog
      title="按时间禁用"
      width="50%"
      :show-close="false"
      :visible="disableTableDialogVisible"
    >
      <el-form :model="disableTableForm">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="disableTableForm.offDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间段" :label-width="formLabelWidth">
          <el-radio-group v-model="disableTableForm.offTypeId">
            <el-radio :label="2">中午</el-radio>
            <el-radio :label="3">下午</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disableTableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDisableTable">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看一周内禁用对话框 -->
    <el-dialog
      title="餐桌信息"
      width="30%"
      :show-close="false"
      :visible="offListDialogVisible"
    >
      <el-card class="box-card">
        <div v-for="item in offTableForm" :key="item.id" class="text item">
          <el-col :span="8">
            <span>日期</span>
            <span>{{ item.orderDate }}</span>
          </el-col>
          <el-col :span="8">
            <span>时间段</span>
            <span>{{ item.orderTypeId | getTimeType }}</span></el-col
          >
          <el-col :span="8">
            <span>
              <el-button type="text" @click="enableTable(item)"
                >启用餐桌</el-button
              >
            </span>
          </el-col>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="offListDialogVisible = false"
          >关 闭</el-button
        >
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
  useTable,
  disableTable,
  getTableOffList,
  enableTable
} from "../../api/api";
export default {
  name: "tableManage",

  data() {
    return {
      tableData: [],
      addTableDialogVisible: false,
      editTableDialogVisible: false,
      disableTableDialogVisible: false,
      offListDialogVisible: false,
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
      disableTableForm: {
        tableId: "",
        offDate: "",
        offTypeId: "",
      },
      offTableForm: [],
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

    async tableOn(table) {
      const ids = [table.id];
      const res = await useTable({ ids });
      if (res.code === "00000") {
        this.$message.success("上架成功");
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

    /** 删除餐桌 */
    async delTable(tId) {
      const ids = [tId];
      const res = await deleteTable({ ids });
      if (res.code === "00000") {
        this.$message.success("删除成功");
        this.getTableList();
      } else {
        return this.$message.error(res.msg);
      }
    },

    /** 监听点击禁用事件 */
    showDisableTableDialog(row) {
      this.disableTableForm.tableId = row.id;
      this.disableTableDialogVisible = true;
    },

    /** 提交禁用餐桌 */
    async submitDisableTable() {
      const { tableId } = this.disableTableForm;
      const params = {
        tableId,
        timeList: [this.disableTableForm],
      };
      const res = await disableTable(params);
      if (res.code === "00000") {
        this.$message.success("禁用成功");
        this.disableTableDialogVisible = false;
      } else {
        return this.$message.error(res.msg);
      }
    },

    /** 查询一周内禁用情况 */
    async queryOffList(row) {
      const res = await getTableOffList({ tableId: row.id });
      if (res.code === "00000") {
        const { data } = res;
        const offItems = data.filter((item) => item.isOff === 1);
        this.offTableForm = offItems;
        if(this.offTableForm.length > 0){
        this.offListDialogVisible = true
        }else {
          return this.$message.info('近一周暂无禁用')
        }
      }
    },

    async enableTable(item) {
      const params = {
        tableId: item.tableId,
        timeList: [
          {
            offDate: item.orderDate,
            offTypeId: item.orderTypeId,
          },
        ],
      };
      const res = await enableTable(params);
      if(res.code === "00000"){
        this.$message.success("启用成功");
        this.offListDialogVisible = false;
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
  filters: {
    getTimeType(value) {
      return value === 2 ? "中午" : "晚上";
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
  .item {
    display:flex;
    align-items: center;
  }
}
</style>