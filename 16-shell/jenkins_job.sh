#!/bin/bash
DATE=$(date "+%Y%m%d-%H%M%S")

# 备份目录
FileDir="$JENKINS_HOME/jobs/$JOB_NAME/builds/$BUILD_ID/dist"
# 回滚目录文件
ROLLBACK_FILEDIR="$JENKINS_HOME/jobs/$JOB_NAME/builds/$VERSION/dist"
rm -rf ./dist
export NODE_OPTIONS="--max-old-space-size=8192"
export code_version=master

case $METHOD in
deploy)
  echo "$DATE -- $JOB_NAME项目部署 - $METHOD"
  npm install
  npm run build:prod
  cp ./dist/$code_version/*.* ./dist && mv ./dist/modules.js ./dist/modules-$code_version.js
  mkdir $FileDir
  cp -rf ./dist/*.* $FileDir
  ;;
rollback)
  if [ -n "$VERSION" ]; then
    echo "$DATE -- $JOB_NAME项目回滚, 回滚版本: $VERSION"
    if [ -d $ROLLBACK_FILEDIR ]; then
      mkdir ./dist
      # 将备份拷贝到程序打包目录中，并覆盖之前的资源
      cp $ROLLBACK_FILEDIR/*.* ./dist/
    else
      echo "找不到备份目录, 请检查输入版本是否存在构建失败任务. tip: 设置保留备份个数最大值:10, 请检查恢复版本是否存在, 你只能恢复到一次正常的deploy构建，而非rollback构建!!!"
      exit 1
    fi
  else
    echo "当前回滚版本为空, 请输入需要回滚的版本号!!!"
    exit 1
  fi
  ;;
*)
  echo "请选择正确的操作项, 当前流程错误!!!"
  exit 1
  ;;
esac

echo "Completing!!!"
