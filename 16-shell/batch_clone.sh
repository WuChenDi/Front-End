#!/bin/bash

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 检查是否提供了仓库列表文件
if [ "$#" -ne 1 ]; then
    echo "使用方法: $0 repos.txt"
    echo "repos.txt 文件格式示例:"
    echo ".,https://github.com/user/repo1.git"
    echo "frontend,https://github.com/user/repo2.git"
    echo "backend/api,https://github.com/user/repo3.git"
    exit 1
fi

# 检查输入文件是否存在
if [ ! -f "$1" ]; then
    echo "错误: 文件 $1 不存在"
    exit 1
fi

# 创建日志目录
LOG_DIR="${SCRIPT_DIR}/clone_logs"
mkdir -p "$LOG_DIR"

# 获取当前时间戳
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 创建目录函数
create_directory() {
    local dir="$1"
    # 如果目录是 . 则跳过创建
    if [ "$dir" = "." ]; then
        return 0
    fi

    if [ ! -d "$dir" ]; then
        echo "创建目录: $dir"
        mkdir -p "$dir"
        if [ $? -ne 0 ]; then
            echo "错误: 无法创建目录 $dir"
            return 1
        fi
    else
        echo "目录已存在: $dir"
    fi
    return 0
}

# 主函数：克隆仓库
clone_repositories() {
    local success_count=0
    local failed_count=0

    # 保存初始工作目录
    local initial_pwd="$PWD"

    # 读取仓库列表并克隆
    while IFS=, read -r target_dir repo || [ -n "$repo" ]; do
        # 跳过空行和注释
        [[ -z "$target_dir" || "$target_dir" =~ ^#.*$ ]] && continue

        # 去除可能的空格
        target_dir=$(echo "$target_dir" | tr -d '[:space:]')
        repo=$(echo "$repo" | tr -d '[:space:]')

        echo "处理: $repo -> $target_dir"

        # 创建目标目录（如果不是当前目录）
        if ! create_directory "$target_dir"; then
            ((failed_count++))
            continue
        fi

        # 提取仓库名称
        repo_name=$(basename "$repo" .git)

        # 切换到目标目录
        cd "$target_dir" || {
            echo "错误: 无法进入目录 $target_dir"
            ((failed_count++))
            cd "$initial_pwd"
            continue
        }

        # 克隆仓库并记录日志
        if git clone "$repo" 2>> "$LOG_DIR/clone_${TIMESTAMP}.log"; then
            echo "✓ 成功克隆到 $target_dir: $repo_name"
            ((success_count++))
        else
            echo "✗ 克隆失败 $target_dir: $repo_name"
            ((failed_count++))
        fi

        # 返回初始目录
        cd "$initial_pwd"
        
        echo "----------------------------------------"
    done < "$1"

    # 打印总结
    echo "克隆完成!"
    echo "成功: $success_count"
    echo "失败: $failed_count"
    echo "详细日志已保存到: $LOG_DIR/clone_${TIMESTAMP}.log"
}

# 执行主函数
clone_repositories "$1"
