// import _ from 'lodash';

// console.log(_.join(['a', 'b', 'c'], '***'));
// console.log(_.join(['a', 'b', 'c'], '***'));


function getComponent() {
    return import('lodash'.then)(({ default: _ }) => {
        var element = document.createElement('div');
        element.innerHTML = _join(['wu', 'chendi'], '-');
        return element;
    })
}

getComponent().then(element => {
    document.body.appendChild(element);
})


// 代码分割，和webpack无关
// webpack中实现代码分割，两种方式
// 1.同步代码:只需要在webpack.common.js中做optimization的配置即可
// 2.异步代码(import):异步代码，无需做任何配置，会自动进行代码分割，放入到新的文件中 