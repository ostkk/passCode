<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名">
        <el-input
          type="text"
          v-model="name.name"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input
          type="text"
          v-model="name.number"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="出校时间" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="选择出校时间"
          :picker-options="pickerDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="目的地" prop="selectedOptions">
        <el-cascader
          :options="areaSelectData"
          @change="handleChange"
          class="full-width"
          size="large"
          v-model="ruleForm.selectedOptions"
          placeholder="请选择目的地"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :disabled="name.status == 'out'"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { applyOut } from "@/api/user";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "applyOut",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    var checkDate = (rule, value, callback) => {
      if (value != "") {
        callback();
      } else {
        callback(new Error("日期不为空"));
      }
    };
    var checkOptions = (rule, value, callback) => {
      if (value != "") {
        callback();
      } else {
        callback(new Error("目的地不能为空"));
      }
    };
    return {
      ruleForm: {
        date: "",
        selectedOptions: [],
      },
      rules: {
        date: [{ validator: checkDate, trigger: "blur" }],
        selectedOptions: [{ validator: checkOptions, trigger: "blur" }],
      },
      pickerDate: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      areaSelectData: regionData,
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let area = [];
          this.ruleForm.selectedOptions.forEach((e) => {
            area.push(CodeToText[e]);
          });
          area = area.join(",");
          let data = {
            number: this.name.number,
            date:
              this.ruleForm.date.getFullYear() +
              "-" +
              (this.ruleForm.date.getMonth() + 1) +
              "-" +
              this.ruleForm.date.getDate(),
            area,
          };
          let res = await applyOut(data);
          if (res.code == 200) {
            console.log(res.message);
            this.$message.success({ message: res.message });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      if (value[2] == undefined) {
        this.ruleForm.selectedOptions = [value[0], value[1]];
      } else {
        this.ruleForm.selectedOptions = [value[0], value[1], value[2]];
      }
    },
  },
};
</script>

<style>
</style>