// const asyncStoreModule = async () => {
//   const storeModules = import.meta.globEager("./modules/**/index.ts");

//   let _modules = {};
//   for (const item of Object.keys(storeModules)) {
//     const key = item.match(/[^./]+/g)?.[1] ?? "";
//     const { default: value } = await import(/* @vite-ignore */ item);
//     (_modules as any)[key] = value;
//   }
//   return _modules;
// };

// const modules = await asyncStoreModule();

import user from "./modules/user";
import wechat from "./modules/wechat";

const modules = {
  user,
  wechat,
};

export { modules };
