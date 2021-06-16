import user from "./modules/user";
import wechat from "./modules/wechat";

// interface storeListType {
//   key: string;
//   value: string;
// }

// // webpack require.context("./modules", true, /\index.ts$/);
// const storeModules = import.meta.globEager("./modules/**/index.ts");

// let storeList: storeListType[] = [];
// Object.keys(storeModules).forEach((value) => {
//   const key = value.match(/[^./]+/g)?.[1] ?? "";
//   storeList.push({ key, value });
// });
// console.log(storeList);

// // let modulesObj: storeListType = {};
// let modules = {};
// storeList.forEach(({ key, value }) => {
//   // console.log(import(/* @vite-ignore */ value).then((res) => res.default));
//   (modules as any)[key] = import(/* @vite-ignore */ value);
// });

const modules = {
  user,
  wechat,
};
console.log(modules);

export { modules };
