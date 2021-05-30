import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  alias: {
    "@": pathResolve("./src"),
  },
});
