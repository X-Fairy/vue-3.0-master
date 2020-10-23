<template>
  <div>
    <h3 style="text-align: center">快速入职</h3>
    <el-form
      style="width: 90%; margin: auto"
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="门店" prop="store">
        <el-input v-model="ruleForm.store"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-input v-model="ruleForm.role"></el-input>
      </el-form-item>
      <el-form-item label="发起验证码" prop="pass">
        <el-input v-model="ruleForm.pass"></el-input>
        <el-button
          @click.prevent="removeDomain(domain)"
          size="small"
          style="margin-left: 15px"
          >获取验证码</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
// import axios from "axios";
export default {
  setup(props, { refs, root }) {
    const ruleForm = reactive({
      name: "",
      phone: "",
      store: "",
      role: "",
      pass: "",
    });
    const rules = reactive({
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
        { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
      ],
      store: [{ required: true, message: "请输入门店", trigger: "blur" }],
      role: [{ required: true, message: "请输入角色", trigger: "blur" }],
      pass: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    });
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          root
            .$prompt("备注", "", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPlaceholder: "请输入",
              inputType: "textarea",
              inputErrorMessage: "邮箱格式不正确",
            })
            .then(({ value }) => {
              console.log(value);
              if (value == null) {
                root.$message.error("备注不能为空！");
              } else {
                root.$message.success("创建成功！");
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    const resetForm = (formName) => {
      refs[formName].resetFields();
    };
    return {
      ruleForm,
      rules,
      submitForm,
      resetForm,
    };
  },
};
</script>
<style scoped>
/deep/.el-form-item__content {
  display: flex;
}
/deep/.el-message-box {
  width: 80%;
}
</style>