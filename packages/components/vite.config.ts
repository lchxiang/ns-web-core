import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

import type { UserConfig } from 'vite'
const resolve = path.resolve
export default (): UserConfig => {
  const projectRoot = process.cwd()
  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(projectRoot, './src')
        }
      ]
    },
    build: {
      target: 'modules',
      //打包文件目录
      outDir: 'es',
      emptyOutDir: false,
      //压缩
      minify: true,
      //css分离
      //cssCodeSplit: true,
      rollupOptions: {
        //忽略打包vue文件
        external: [
          'vue',
          'ant-design-vue',
          'lodash-es',
          'vue-types',
          '@ant-design/icons-vue',
          /\.less/
        ],
        input: ['index.ts'],
        output: [
          {
            format: 'es',
            //不用打包成.es.js,这里我们想把它打包成.js
            entryFileNames: '[name].mjs',
            //让打包目录和我们目录对应
            preserveModules: true,
            preserveModulesRoot: resolve(__dirname),
            exports: 'named',
            //配置打包根目录
            dir: resolve(__dirname, './ns-ui/es')
          },
          {
            format: 'cjs',
            //不用打包成.cjs
            entryFileNames: '[name].js',
            //让打包目录和我们目录对应
            preserveModules: true,
            preserveModulesRoot: resolve(__dirname),
            exports: 'named',
            //配置打包根目录
            dir: resolve(__dirname, './ns-ui/lib')
          }
        ]
      },
      lib: {
        entry: './index.ts',
        name: 'ns-ui'
      }
    },

    plugins: [
      vue({
        reactivityTransform: true
      }),
      vueJsx(),
      dts({
        entryRoot: 'src',
        outputDir: [resolve(__dirname, './ns-ui/es/src'), resolve(__dirname, './ns-ui/lib/src')],
        //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
        tsConfigFilePath: '../../tsconfig.json'
      })
    ]
  }
}
