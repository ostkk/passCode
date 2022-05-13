<template>
  <div class="dashboard-container">
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
      <el-button
        v-show="!showChangePass"
        type="primary"
        round
        size="small"
        @click="showChangePass = true"
        style="margin-top: 20px"
        >修改密码</el-button
      >
      <el-form
        v-show="showChangePass"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oriPass">
          <el-input v-model.number="ruleForm.oriPass" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { changePassword } from "@/api/user";
import { createHash } from "crypto";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },

  data() {
    var checkOriPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原密码不能为空"));
      } else if (
        createHash("md5").update(value.toString()).digest("hex") !=
        this.name.password
      ) {
        return callback(new Error("密码有误"));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showChangePass: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        oriPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oriPass: [{ validator: checkOriPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await changePassword({
            number: this.name.number,
            password: this.ruleForm.pass,
          });
          if (res.code == 200) {
            this.$message.success({ message: res.message });
            this.resetForm(formName);
            this.logout();
            return true;
          } else {
            this.resetForm(formName);
            return false;
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.showChangePass = false;
      this.$refs[formName].resetFields();
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .el-input {
      width: 200px;
    }
  }
}

.container {
  width: 70%;
  margin: 0 auto;
}
</style>