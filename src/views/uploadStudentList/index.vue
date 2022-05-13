<template>
  <div>
    <div class="container">
      <el-upload
        class="upload-demo"
        drag
        action="http://110.42.157.26:3000/api/uploadStudentList"
        multiple
        :on-success="
          (res) => {
            success(res);
          }
        "
        :on-error="
          (err) => {
            failed(err);
          }
        "
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
      </el-upload>
    </div>
    <div class="formButton">
      <el-button type="text" @click="dialogFormVisible = true"
        >手动上传单条信息</el-button
      >

      <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="学生姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学生学号" :label-width="formLabelWidth">
            <el-input v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="upload()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { uploadData } from "@/api/user";
export default {
  name: "uploadStudentList",
  methods: {
    success(response) {
      if (response.code == "200")
        this.$message({
          message: response.message,
          type: "success",
        });
      else if (response.code == "201") {
        this.$message.error(response.message);
      }
    },
    failed(err) {
      this.$message.error(err.message);
    },
    cancel() {
      this.dialogFormVisible = false;
      this.form.name = "";
      this.form.number = "";
    },
    async upload() {
      this.dialogFormVisible = false;
      if (this.form.name == "" || this.form.number == "") {
        this.$message.error({ message: "姓名学号不能为空" });
        this.form.name = "";
        this.form.number = "";
        return;
      }
      let regex = /^2[0-9]{11}$/;
      if (!regex.test(this.form.number)) {
        this.$message.error({ message: "请输入正确格式的学号" });
        this.form.name = "";
        this.form.number = "";
        return;
      }
      regex = /^[\u4e00-\u9fa5]{1,10}$/;
      if (!regex.test(this.form.name)) {
        let regxx = /^[a-zA-Z ]{1,19}[a-z]$/;
        if (!regxx.test(this.form.name)) {
          this.$message.error({ message: "姓名中包含非法字符" });
          this.form.name = "";
          this.form.number = "";
          return;
        }
      }
      try {
        let res = await uploadData(this.form);
        if (res.code == 200) {
          this.$message.success({ message: res.message });
        }
      } catch (err) {}
      this.form.name = "";
      this.form.number = "";
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        number: "",
      },
      formLabelWidth: "120px",
    };
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.formButton {
  width: 80%;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: center;
}
</style>