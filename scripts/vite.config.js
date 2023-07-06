import { defineConfig } from 'vite'
import { rimraf } from 'rimraf'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default defineConfig({

  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        dir: 'docs',
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    plugins: [
      {
        apply: (compiler) => {
          rimraf.sync(compiler.options.output.path)
        }
      },
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '',
            globOptions: {
              ignore: ['**/index.html']
            }
          }
        ]
      })
    ]
  }

})