<template>
  <div>
    <p>组织：{{ infos.value.org }}</p>
    <p>姓名：{{ infos.value.name }}</p>
    <p>门店：{{ infos.value.store }}</p>
    <p>手机：{{ infos.value.phone }}</p>
    <p>角色：{{ infos.value.role }}</p>
    <div class="action">
      <el-button size="small" @click="$router.push('/addCustomer')"
        >新增人员</el-button
      >
      <el-button type="primary" size="small" @click="submit"
        >发起验证</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" > </el-table-column>
      <el-table-column fixed="left" prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="role" label="角色"  > </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" > </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope" v-if="scope.row.status == '未验证'">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改导购信息 -->
    <el-dialog title="修改导购信息" :visible.sync="dialogFormVisible">
      <el-form :model="form.value" label-position="left" label-width="90px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.value.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.value.phone"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="获取验证码" prop="pass">
          <el-input v-model="form.value.pass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handeleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";

export default {
  setup(props, { root }) {
    const tableData = ref('');
    const infos = reactive({
      value:{}
    });
    // 修改用户信息表单
    const form = reactive({
      value: {
        name: "",
        phone: "",
        pass: "",
      },
    });
    // 选中的导购信息
    const customers = reactive({
      value: {},
    });
    // 是否弹出修改框
    const dialogFormVisible = ref(false);

    // 发起验证
    const submit = () => {
      console.log(customers.value);
      if (customers.value.length > 0) {
        root.$message.success("发送成功！");
      } else {
        root.$message.success("请先选择行！");
      }
    };
    // 修改导购信息
    const handleEdit = (index, row) => {
      form.value.name = row.name;
      form.value.phone = row.phone;
      form.value.pass = "";
      dialogFormVisible.value = true;
    };
    // 手机号验证
    function getPhone() {
      if (!/^1[3456789]\d{9}$/.test(form.value.phone)) {
        root.$message.error("手机号格式错误！");
        return false;
      } else {
        return true;
      }
    }
    // 确定修改导购信息
    function handeleSubmit() {
      if (form.value.name == "") {
        root.$message.error("姓名不能为空!");
        return;
      }
      if (!getPhone()) {
        root.$message.error("手机号格式错误！");
        return;
      }
      if (form.value.pass == "") {
        root.$message.error("验证码不能为空！");
        return;
      }
      // dialogFormVisible.value = false;
      let params = {
        usercode: "kukasys",
        passwd: "acf5ae977f8f26ee2b84022974441d0c",
        securitycode: "",
        macAddress: "",
        telephone: "kukasys",
      };
      root.$http.post("apis/phoneLogin?_t=1603431226878", params).then((res) => {
        console.log(res)
      });
      // root.$message.success("修改成功！");
    }
    // 选中导购
    function handleSelectionChange(val) {
      customers.value = val;
    }

    onMounted(() => {
      // 获取表格数据
      console.log(root.$store.state)
      tableData.value=root.$store.state.tableData
      // 获取用户信息
      infos.value=root.$store.state.userInfo
    });
    return {
      // 数据
      tableData, //导购列表数据
      infos, //用户信息
      customers, //选中的导购信息
      dialogFormVisible, //是否弹出修改框
      form, //修改用户信息表单
      // 方法
      submit, //发起验证
      handleEdit, //修改导购信息
      handleSelectionChange, //选中的导购
      handeleSubmit, //确定修改导购信息
      getPhone, //验证手机号
    };
  },
};
</script>
<style scoped>
.action {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  margin-bottom: 20px;
}
.ele-button {
  padding: 6px 10px;
}
/deep/ .el-dialog {
  width: 80%;
}
</style>