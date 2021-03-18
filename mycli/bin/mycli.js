#!/usr/bin/env node
"use strict";
const program = require("commander");
const { blue, green, yellow } = require("../utils/colorLog");
const inquirer = require("inquirer");
const { questions } = require("../src/config");
const create = require("../src/create");

program.version("0.0.1");

program
    .option("-d, --debug", "output extra debugging")
    .option("-s, --small", "small pizza size");

/* mycli create 创建项目 */
program
    .command("create")
    .description("create a project ")
    .action(function () {
        green("👽 👽 👽 " + "欢迎使用mycli,轻松构建react ts项目～🎉🎉🎉");
        inquirer.prompt(questions).then((answer) => {
            if (answer.conf) {
                /* 创建文件 */
                create(answer);
            }
        });
    });

/* mycli start 运行项目 */
program
    .command("start")
    .description("start a project")
    .action(function () {
        green("--------运行项目-------");
    });

/* mycli build 打包项目 */
program
    .command("build")
    .description("build a project")
    .action(function () {
        green("--------构建项目-------");
    });

program.parse(process.argv);

if (program.debug) {
    blue("option is debug");
} else if (program.small) {
    blue("option is small");
}
