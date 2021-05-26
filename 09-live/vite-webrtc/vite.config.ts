import path from 'path';
import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport from 'vite-plugin-style-import';

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

// export default (): UserConfigExport => {
//   return {
//     css: {
//       preprocessorOptions: {
//         less: {
//           javascriptEnabled: true,
//         },
//       },
//     },
//     plugins: [
//       vue(),
//       vueJsx(),
//       styleImport({
//         libs: [
//           {
//             libraryName: 'ant-design-vue',
//             esModule: true,
//             resolveStyle: (name) => {
//               return `ant-design-vue/es/${name}/style/index`;
//             },
//           },
//         ],
//       }),
//     ],
//   };
// };
module.exports = defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  alias: {
    '@': pathResolve('./src'),
  },
});
