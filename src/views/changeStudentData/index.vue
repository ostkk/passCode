<template>
  <div>
    <div class="ipt">
      <el-input
        v-model="ipt"
        placeholder="请输入学生学号"
        size="small"
        :disabled="showTable"
      ></el-input>
    </div>
    <div class="button">
      <el-button
        type="primary"
        size="medium"
        @click="search"
        :disabled="showTable"
        >搜索</el-button
      >
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-show="showTable"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="number">
        <el-input
          type="text"
          v-model="ruleForm.number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="text"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否在校">
        <el-radio v-model="radio" label="1">在校</el-radio>
        <el-radio v-model="radio" label="2">不在校</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { searchStudent, updateStudentData } from "@/api/user";
export default {
  name: "changeStudentData",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else if (value.length > 20) {
        callback(new Error("姓名过长"));
      } else {
        let regx = /^[\u4e00-\u9fa5]{1,10}$/;
        if (regx.test(value)) {
          callback();
        } else {
          let regxx = /^[a-zA-Z ]{1,19}[a-z]$/;
          if (regxx.test(value)) {
            callback();
          } else {
            callback(new Error("姓名中包含非法字符"));
          }
        }
      }
    };
    var validateNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("学号不为空"));
      } else {
        let regex = /^2[0-9]{11}$/;
        if (!regex.test(value)) {
          callback(new Error("学号格式不正确"));
        } else {
          callback();
        }
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 10) {
        callback(new Error("密码应为6至10位"));
      } else {
        let regx = /^[^\u4e00-\u9fa5 ]{6,10}$/;
        if (regx.test(value)) {
          callback();
        } else {
          callback(new Error("密码不能包含中文和空格"));
        }
      }
    };
    return {
      ipt: "",
      showTable: false,
      ruleForm: { number: "", status: "", name: "", password: "" },
      rules: {
        name: [{ validator: validateName, trigger: "change" }],
        number: [{ validator: validateNumber, trigger: "change" }],
        password: [{ validator: validatePassword, trigger: "change" }],
      },
    };
  },
  methods: {
    async search() {
      this.showTable = false;
      let regex = /^2[0-9]{11}$/;
      if (!regex.test(this.ipt)) {
        this.$message.error({ message: "请输入正确格式的学号" });
        this.ipt = "";
        return;
      }
      try {
        let res = await searchStudent({ number: this.ipt });
        if (res.code == 200) {
          this.ruleForm.status = res.data.status;
          this.ruleForm.name = res.data.name;
          this.ruleForm.password = res.data.password;
          this.ruleForm.number = res.data.number;
          this.showTable = true;
        }
      } catch (err) {}
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            let res = await updateStudentData({
              name: this.ruleForm.name,
              status: this.ruleForm.status,
              number: this.ruleForm.number,
              password: this.ruleForm.password,
              prenumber: this.ipt,
            });
            if (res.code == 200) {
              this.$message.success({ message: res.message });
            }
            this.resetForm();
          } catch (err) {}
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.ruleForm.number = "";
      this.ruleForm.status = "";
      this.ruleForm.name = "";
      this.ruleForm.password = "";
      this.showTable = false;
    },
  },
  computed: {
    radio: {
      get() {
        if (!this.ruleForm.status) {
          return "0";
        } else if (this.ruleForm.status == "in") {
          return "1";
        } else if (this.ruleForm.status == "out") {
          return "2";
        }
      },
      set(val) {
        if (val == "1") {
          this.ruleForm.status = "in";
        } else if (val == "2") {
          this.ruleForm.status = "out";
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.ipt {
  display: inline-block;
  width: 85%;
  margin-top: 30px;
}

.button {
  display: inline-block;
  width: 10%;
  margin-left: 40px;
  margin-top: 30px;
}
</style>