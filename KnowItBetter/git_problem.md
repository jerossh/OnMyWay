### Q:
```
git .gitignore忽略了文件,每次提交还是会变更这个文件
.gitignore文件内容:
java/.idea/workspace.xml doc/*.tmp *.xml
每次commit都会有workspace.xml这个文件.
```
### A:
```
因为你已经把他加到tracked file里了 用
git rm --cached java/.idea/workspace.xml
把他移除

.gitignore这个文件是用于 untracked 文件的忽略列表
你用add将文件标记为 tracked 状态 .gitignore就对其无效了
```
