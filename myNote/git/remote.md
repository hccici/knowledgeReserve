# 1、查看远程源名称
`git remote (-v)`
# 2、添加远程仓库
`git remote add <shortname> <url>`
# 3、第一次推送到新代码仓
`git push -u <remote shortname> <local branch name>`
# 4、拉取远程分支到本地新分支
`git checkout -b <local branch name> <remote name>/<remote branch name>`
# 5、查看本地分支追踪的远程分支
`git branch -vv`
# 6、更新远程仓库信息
`git fetch <remote name>`   
主要是知道哪些分支有了修改，新增了哪些分支，更新远程信息后可以进行merge操作   
`git merge <remote name>/<remote branch name>`   
将有更改的远程分支合并到当前分支，现在都用pull比较多了