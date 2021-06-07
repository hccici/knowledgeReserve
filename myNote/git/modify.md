# 1、查看工作区和仓库的差异文件有哪些
`git status`
# 2、指定一个文件，查看它在工作区中与仓库（or缓存）的不同
`git diff <path/file>`
# 3、查看提交记录
`git log`
# 4、回退到之前版本
注意，回退时如果工作区和缓存区的内容没有提交到仓库，会被永久删除，不能恢复了   
`git reset --hard <commit id>`
# 5、回到最新的版本
因为log没有回退到节点以后的数据了，所以可使用命令log来取得最新的版本号
`git reflog`
# 6、指定文件撤销回最近一次commit或者add的状态
`git checkout -- <path/file>`
