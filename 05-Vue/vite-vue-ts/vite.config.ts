import path from "path";
import { defineConfig } from "vite";
import type { UserConfig, UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// function pathResolve(pathStr: string) {
//   return path.resolve(process.cwd(), ".", pathStr);
// }

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     assetsDir: "assetsCDN",
//   },
//   resolve: {
//     alias: {
//       "@": pathResolve("./src"),
//     },
//   },
// });

export default ({ command }: ConfigEnv): UserConfig => {
  console.log("command:", command);

  return {
    build: {
      assetsDir: "assetsCDN",
    },
    resolve: {
      alias: {
        "@": pathResolve("./src"),
      },
    },
    plugins: [vue(), viteCompression()],
  };
};
