import type { UserConfig, ConfigEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
  import viteCompression from "vite-plugin-compression";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command }: ConfigEnv): UserConfig => {
  console.log("command:", command);

  return {
    build: {
      target: "es2015",
      outDir: "dist",
      assetsDir: "assetsCDN",
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: [
        {
          // @/xxxx => src/xxxx
          find: /\@\//,
          replacement: `${pathResolve("src")}/`,
        },
      ],
    },
    plugins: [vue(), vueJsx(), viteCompression()],
  };
};
