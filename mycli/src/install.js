const which = require("which");

/**
 * 找到当前环境变量中npm（可执行路径/usr/local/bin/npm）
 * @return {string} 返回npm可执行路径
 */
function findNpm() {
    var npms = process.platform === "win32" ? ["npm.cmd"] : ["npm"];
    for (var i = 0; i < npms.length; i++) {
        try {
            const npm = which.sync(npms[i]);
            return npm;
        } catch (e) {}
    }
    throw new Error("please install npm");
}

/**
 * 执行命令
 * @param {*} cmd
 * @param {*} args
 * @param {*} fn 子进程执行成功后的回调函数
 */
function runCmd(cmd, args, fn) {
    args = args || [];
    var runner = require("child_process").spawn(cmd, args, {
        stdio: "inherit",
    });
    runner.on("close", function (code) {
        if (fn) {
            fn(code);
        }
    });
}

module.exports = function (installArg = ["install"]) {
    const npm = findNpm();
    return function (done) {
        runCmd(npm, installArg, function () {
            done && done();
        });
    };
};
