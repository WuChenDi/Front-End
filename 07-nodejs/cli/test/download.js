import download from 'download-git-repo'

download('direct:https://gitee.com/beiyaoyaoyao/egg-template.git', './xxx', { clone: true }, (err) => {
  console.log(err);
})
