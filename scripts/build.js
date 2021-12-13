import esbuild from 'esbuild'
import glob from 'tiny-glob'

(async () => {
  esbuild.build({
    entryPoints: await glob('./src/**/*.ts'),
    outdir: 'dist',
    minify: process.argv.includes('production'),
    watch: process.argv.includes('watch') && {
      onRebuild(error, result) {
        if (error) console.error('build failed', error)
        else console.log('build succeeded')
      },
    }
  }).catch(e => {
    console.error(e)
    process.exit(1)
  })
})()