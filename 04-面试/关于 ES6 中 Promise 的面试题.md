# 说明
最近在复习 Promise 的知识，所以就做了一些题，这里挑出几道题，大家一起看看吧。

1. 题目一
    ```js
    const promise = new Promise((resolve, reject) => {
        console.log(1);
        resolve();
        console.log(2);
    })

    promise.then(() => {
        console.log(3);
    })

    console.log(4);
    ```

    解析：

    首先 Promise 新建后立即执行，所以会先输出 1，2，而 Promise.then() 内部的代码在 当次 事件循环的 结尾 立刻执行 ，所以会继续输出4，最后输出3。

    答案
    ```
    1
    2
    4
    3
    ```