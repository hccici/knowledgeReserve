/**
 * 创建 prompts 配置
 */
const questions = [
    {
        name: "conf" /* key */,
        type: "confirm" /* 确认 */,
        message: "是否创建新的项目？" /* 提示 */,
    },
    {
        name: "name",
        message: "请输入项目名称？",
        when: (res) => Boolean(res.conf) /* 是否进行 */,
    },
    {
        name: "author",
        message: "请输入作者？",
        when: (res) => Boolean(res.conf),
    },
    {
        type: "list" /* 选择框 */,
        message: "请选择公共管理状态？",
        name: "state",
        choices: ["mobx", "redux"] /* 选项*/,
        filter: function (val) {
            /* 过滤 */
            return val.toLowerCase();
        },
        when: (res) => Boolean(res.conf),
    },
];
const config = {
    questions
}
module.exports = config;
