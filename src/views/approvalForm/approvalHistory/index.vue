<template>
  <div>
    <div class="search">
      <el-cascader
        :options="areaSelectData"
        @change="handleChange"
        class="full-width"
        size="large"
        v-model="selectedOptions"
        placeholder="请选择目的地"
      />
      <el-button style="margin-left: 20px" type="success" @click="searchTarget"
        >查询</el-button
      >
      <el-button style="margin-left: 20px" type="danger" @click="resetData"
        >重置</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 20px"
      height="250"
    >
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
    </el-table>
  </div>
</template>

<script>
import { applyList } from "@/api/user";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "approvalHistory",
  data() {
    return {
      historyList: "",
      originData: "",
      selectedOptions: "",
      areaSelectData: regionData,
    };
  },
  async mounted() {
    let res = await applyList(true);
    if (res.code == 200) {
      res.data.user.forEach((e) => {
        e.outOrBack = e.outOrBack == "back" ? "返校" : "出校";
      });
      this.historyList = res.data.user;
      this.originData = res.data.user;
    }
  },
  computed: {
    tableData() {
      return this.historyList || [];
    },
  },
  methods: {
    searchTarget() {
      if (this.selectedOptions) {
        let area = [];
        this.selectedOptions.forEach((e) => {
          area.push(CodeToText[e]);
        });
        area = area.join(",");
        this.historyList = [];
        this.originData.forEach((e) => {
          if (e.target == area) {
            this.historyList.push(e);
          }
        });
      }
    },
    resetData() {
      this.historyList = this.originData;
      this.selectedOptions = "";
    },
    handleChange(value) {
      if (value[2] == undefined) {
        this.selectedOptions = [value[0], value[1]];
      } else {
        this.selectedOptions = [value[0], value[1], value[2]];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 500px;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
</style>