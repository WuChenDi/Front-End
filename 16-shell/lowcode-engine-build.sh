#!/usr/bin/env bash

lerna run build \
  --scope @alilc/lowcode-types \
  --scope @alilc/lowcode-utils \
  --scope @alilc/lowcode-shell \
  --scope @alilc/lowcode-editor-core \
  --scope @alilc/lowcode-editor-skeleton \
  --scope @alilc/lowcode-designer \
  --scope @alilc/lowcode-plugin-designer \
  --scope @alilc/lowcode-plugin-outline-pane \
  --scope @alilc/lowcode-rax-renderer \
  --scope @alilc/lowcode-rax-simulator-renderer \
  --scope @alilc/lowcode-react-renderer \
  --scope @alilc/lowcode-react-simulator-renderer \
  --scope @alilc/lowcode-renderer-core \
  --scope @alilc/lowcode-workspace \
  --scope @alilc/lowcode-engine \
  --stream

lerna run build:umd \
  --scope @alilc/lowcode-engine \
  --scope @alilc/lowcode-rax-simulator-renderer \
  --scope @alilc/lowcode-react-simulator-renderer \
  --scope @alilc/lowcode-react-renderer \
  --stream

# cp ./packages/react-simulator-renderer/dist/js/* ./packages/engine/dist/js/
# cp ./packages/react-simulator-renderer/dist/css/* ./packages/engine/dist/css/

# cp ./packages/rax-simulator-renderer/dist/js/* ./packages/engine/dist/js/
# cp ./packages/rax-simulator-renderer/dist/css/* ./packages/engine/dist/css/

get_version() {
  local packageJsonPath="$1"

  if [ -f "$packageJsonPath" ]; then
    # 读取文件内容，并使用 grep 命令匹配 version 属性
    local version=$(grep -Eo '"version": ?"[^"]+"' "$packageJsonPath" | cut -d'"' -f4)

    if [ -z "$version" ]; then
      # 如果版本号为空，则返回 latest
      version="latest"
    fi

    echo "$version"

  else
    echo "package.json 文件不存在"
    return 1
  fi
}
# version=$(get_version "./package.json")
# echo "版本号为: $version"

ensure_dirs_exist() {
  local dir_type="$1"
  local file_type="$2"
  local version=$(get_version "./packages/$dir_type/package.json")
  local lib_version_dir="./lib/$dir_type/$version/$file_type/"
  local lib_latest_dir="./lib/$dir_type/latest/$file_type/"

  printf "创建新版本目录：%s\n" "$lib_version_dir"
  mkdir -p "$lib_version_dir"

  printf "创建最新版本目录：%s\n" "$lib_latest_dir"
  mkdir -p "$lib_latest_dir"
}

# 处理产物, 更新至 CDN
echo "构建完成, 文件执行cp操作..."
# 配置需要处理包文件
packages=(
  "engine"
  "react-simulator-renderer"
  "rax-simulator-renderer"
)

for package in "${packages[@]}"; do
  version=$(get_version "./packages/$package/package.json")
  echo "执行 $package, version: $version"

  ensure_dirs_exist "$package" "js"
  ensure_dirs_exist "$package" "css"

  # 添加版本号
  cp "./packages/$package/dist/js/"* "./lib/$package/$version/js/"
  cp "./packages/$package/dist/css/"* "./lib/$package/$version/css/"
  # 默认最新版本
  cp "./packages/$package/dist/js/"* "./lib/$package/latest/js/"
  cp "./packages/$package/dist/css/"* "./lib/$package/latest/css/"
  echo "$package, done"
done

echo "cp完成, 执行 tar 操作..."
tar -czvf lib.tar.gz lib

echo "Completing!!!"

# more is https://github.com/cdLab996/lowcode-engine/blob/main/scripts/build.sh
