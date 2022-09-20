import download from 'download-git-repo'

download('direct:https://github.com/WuChenDi/vite-vue2-template.git', './download', { clone: true }, (err) => {
  console.log(err);
})
