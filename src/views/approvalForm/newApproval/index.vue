<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column prop="id" label="申请id" width="100"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" fixed>
      </el-table-column>
      <el-table-column prop="number" label="学号" width="120">
      </el-table-column>
      <el-table-column prop="target" label="目的地/出发地" width="200">
      </el-table-column>
      <el-table-column prop="outOrBack" label="出校/返校" width="120">
      </el-table-column>
      <el-table-column prop="date" label="时间" width="120"> </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="pass(scope.$index, tableData)"
            type="success"
            size="small"
          >
            通过
          </el-button>
          <el-button
            @click.native.prevent="refuse(scope.$index, tableData)"
            type="danger"
            size="small"
          >
            不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { applyList, passOrRefuse, getNewApplyNumber } from "@/api/user";
export default {
  name: "newApproval",
  data() {
    return {
      historyList: "",
    };
  },
  async mounted() {
    let res = await applyList(false);
    if (res.code == 200) {
      res.data.user.forEach((e) => {
        e.outOrBack = e.outOrBack == "back" ? "返校" : "出校";
      });
      this.historyList = res.data;
    }
  },
  computed: {
    tableData() {
      return this.historyList.user || [];
    },
  },
  methods: {
    async pass(index, data) {
      let res = await passOrRefuse(data[index].id, 1);
      if (res.code == 200) {
        this.$message.success({ message: res.data.message });
        let ress = await applyList(false);
        if (ress.code == 200) {
          ress.data.user.forEach((e) => {
            e.outOrBack = e.outOrBack == "back" ? "返校" : "出校";
          });
          this.historyList = ress.data;
        }
        ress = await getNewApplyNumber();
        if (ress.code == 200) {
          console.log(ress.data.number);
          this.$store.dispatch("app/getNumber", ress.data.number);
        }
      }
    },
    async refuse(index, data) {
      let res = await passOrRefuse(data[index].id, 0);
      if (res.code == 200) {
        this.$message.success({ message: res.data.message });
        let ress = await applyList(false);
        if (ress.code == 200) {
          ress.data.user.forEach((e) => {
            e.outOrBack = e.outOrBack == "back" ? "返校" : "出校";
          });
          this.historyList = ress.data;
        }
        ress = await getNewApplyNumber();
        if (ress.code == 200) {
          console.log(ress.data.number);
          this.$store.dispatch("app/getNumber", ress.data.number);
        }
      }
    },
  },
};
</script>

<style>
</style>