import esbuild from 'esbuild'
import glob from 'tiny-glob'
// rm -rf dist && tsc && esbuild src/index.ts src/account/index.ts src/database/index.ts src/functions/index.ts --bundle --outdir=dist

(async () => {
  esbuild.build({
    entryPoints: await glob('./src/**/*.ts'),
    // entryPoints: ['src/index.ts', 'src/account/index.ts', 'src/database/index.ts', 'src/functions/index.ts'],
    // bundle: true,
    outdir: 'dist',
  }).catch(e => {
    console.error(e)
    process.exit(1)
  })
})()