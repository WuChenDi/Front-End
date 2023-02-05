#!/bin/bash

# 将当前目录设为git存储库
cd /path/to/your/git/repository

# 获取所有提交的作者
authors=$(git log --pretty=format:"%an")

# 创建一个空字典，用于存储每个用户的代码数量
declare -A lines_of_code

# 初始化字典中的每个用户
for author in $(echo "$authors" | sort | uniq); do
  lines_of_code["$author"]=0
done

# 对每个提交统计行数
while read -r commit; do
  author=$(echo "$commit" | awk '{print $2}')
  lines=$(echo "$commit" | awk '{print $5}')
  lines_of_code["$author"]=$((${lines_of_code["$author"]} + $lines))
done < <(git log --pretty=format:"%h %an %ad %s" --numstat)

# 打印结果
for author in "${!lines_of_code[@]}"; do
  echo "$author: ${lines_of_code[$author]} lines"
done
