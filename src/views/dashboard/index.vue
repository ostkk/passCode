<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">
      姓名: {{ name.name }} 账号:{{ name.number }} 当前状态:{{
        name.status == "in" ? "在校" : "离校"
      }}
    </div> -->
    <div class="container">
      <el-descriptions title="用户信息" :column="1" border>
        <el-descriptions-item
          label="姓名"
          :labelStyle="{ 'text-align': 'center', width: '100px' }"
          >{{ name.name }}</el-descriptions-item
        >
        <el-descriptions-item
          label="账号"
          :labelStyle="{ 'text-align': 'center' }"
          >{{ name.number }}</el-descriptions-item
        >
        <el-descriptions-item
          label="是否在校"
          :labelStyle="{ 'text-align': 'center' }"
        >
          {{ name.status == "in" ? "在校" : "离校" }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}

.container {
  width: 70%;
  margin: 0 auto;
}
</style>
