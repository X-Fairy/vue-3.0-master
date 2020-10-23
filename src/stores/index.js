export default {
    state: {
        tableData: [
            {
                name: "王小虎",
                role: "导购",
                phone: "13185070875",
                status: "已验证",
            },
            {
                name: "刘洋",
                role: "导购",
                phone: "13185070875",
                status: "未验证",
            },
            {
                name: "晓明",
                role: "导购",
                phone: "13185070875",
                status: "未验证",
            },
        ],
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || ''
    },
    // 设置搜索框的值
    setuserInfo(value) {
        this.state.userInfo = value
    },
    // 获取搜索框的值
    getuserInfo() {
        return this.state.userInfo
    }
}