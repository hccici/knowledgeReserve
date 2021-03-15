# 上传空文件夹，它下面的文件不上传
1、在该文件夹下创建.gitkeep文件。   
2、在.gitignore中配置：
```
文件名/*
!.gitkeep
```