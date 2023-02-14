/*
 * @Author: xiewenhao
 * @Date: 2023-02-13 11:12:07
 * @LastEditTime: 2023-02-14 14:53:03
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [VantResolver({ importStyle: false })],
      dts: false,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/style/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      static: resolve("public/static"),
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
