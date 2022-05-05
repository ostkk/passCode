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
      <el-button style="margin-left: 20px" type="success" @click="addTarget">
        添加
      </el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        height="250"
      >
        <el-table-column prop="target" label="城市" width="100">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="tableData[scope.$index].auto"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeAuto(tableData[scope.$index])"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="删除" width="120">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="mydelete(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getCity,
  addCity,
  deleteCity,
  switchAuto,
  getNewApplyNumber,
} from "@/api/user";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "autoApproval",
  data() {
    return {
      cityList: [],
      selectedOptions: "",
      areaSelectData: regionData,
    };
  },
  computed: {
    tableData() {
      return this.cityList || [];
    },
  },
  async mounted() {
    this.myGetCity();
  },
  methods: {
    async changeAuto(data) {
      let res = await switchAuto(data);
      if (res.code == 200) {
        await this.myGetCity();
        let n = await getNewApplyNumber();
        this.$store.dispatch("app/getNumber", n.data.number);
        this.$message.success({ message: res.message });
      }
    },
    handleChange(value) {
      if (value[2] == undefined) {
        this.selectedOptions = [value[0], value[1]];
      } else {
        this.selectedOptions = [value[0], value[1], value[2]];
      }
    },
    async addTarget() {
      if (this.selectedOptions) {
        let area = [];
        this.selectedOptions.forEach((e) => {
          area.push(CodeToText[e]);
        });
        area = area.join(",");
        let res = await addCity({ area });
        if (res.code == 200) {
          await this.myGetCity();
          this.$message.success({ message: res.message });
        }
      }
    },
    async myGetCity() {
      let res = await getCity();
      if (res.code == 200) {
        this.cityList = res.data;
      }
    },
    async mydelete(index, data) {
      let res = await deleteCity(data[index]);
      if (res.code == 200) {
        await this.myGetCity();
        this.$message.success({ message: res.message });
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