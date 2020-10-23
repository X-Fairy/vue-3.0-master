<template>
  <div class="content">
    <p>组织：{{ infos.org }}</p>
    <p>姓名：{{ infos.name }}</p>
    <p>门店：{{ infos.store }}</p>
    <p>手机：{{ infos.phone }}</p>
    <p>角色：{{ infos.role }}</p>
    <div class="action">
      <span>输入口令</span>
      <el-input v-model="input.Value" placeholder="请输入"></el-input>
    </div>
    <!-- <span class="msg">{{ msg }}</span> -->
    <el-button type="primary" @click="submit">保存</el-button>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";

export default {
  setup(props, { root }) {
    const input = reactive({
      value: "",
    });
    const msg = ref("信息准确");
    const infos = reactive({
      // 组织
      org: "杭州",
      // 门店
      store: "顾家家居",
      // 姓名
      name: "测试",
      // 手机
      phone: "13185070875",
      // 角色
      role: "店长",
    });
    // 加载信息
    const userInfo = () => {};
    // 保存
    const submit = () => {
      console.log(input.value);
      root.$store.state.userInfo=infos
      sessionStorage.setItem('userInfo', JSON.stringify(infos))
      root.$router.push({name:'home'});
    };
    // 修改
    const handleEdit = (index, row) => {
      console.log(index, row);
    };
    // 新增人员

    onMounted(() => {
      // 首屏加载的时候触发请求
      userInfo();
    });
    return {
      // 让数据保持响应式
      infos,
      input,
      msg,
      userInfo,
      submit,
      handleEdit,
    };
  },
};
</script>
<style scoped>
.content {
  width: 80%;
  margin: auto;
}
.action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
/deep/ .el-button--primary {
  margin-top: 40px;
  width: 100%;
}
/deep/ .el-input {
  width: 60%;
  margin-left: 20px;
}
.msg {
  font-size: 12px;
}
</style>