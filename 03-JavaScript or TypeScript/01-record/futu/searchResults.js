// topic
// https://cdn.jsdelivr.net/gh/cdLab996/picture-lib/wudi/Front-End/interview/futu/image.jpg

const test_data = [
  'test',
  'testflight',
  'alxlfs',
  'abctest5343',
  'test123',
  't123',
  'te342',
  'test789',
  'test654',
];

// function debounce(fn, delay) {
//   let timer = null;

//   return function (...args) {
//     const context = this;
//     clearTimeout(timer);

//     timer = setTimeout(() => {
//       fn.apply(context, args);
//     }, delay);
//   };
// }

function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    const context = this;
    clearTimeout(timer);

    return new Promise((resolve) => {
      timer = setTimeout(() => {
        const result = fn.apply(context, args);
        resolve(result);
      }, delay);
    });
  };
}

function search(keyword) {
  // function search(keyword, callback) {
  const result = test_data.filter((item) => item.includes(keyword));
  return result;
  // const result = test_data.filter((item) => {
  //   const regex = new RegExp(keyword, 'i');
  //   return regex.test(item);
  // });
  // // return result;
  // callback(result);
}

const debouncedSearch = debounce(search, 300);

const keyword = 'test';

// debouncedSearch(keyword, (result) => {
//   console.log(result);
// });

debouncedSearch(keyword).then((result) => {
  console.log(result);
});
