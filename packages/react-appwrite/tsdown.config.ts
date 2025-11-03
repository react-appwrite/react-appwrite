import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/**/*.{ts,tsx}'],
  dts: true,
  external: ['bun'],
  unbundle: true,

  exports: {
    devExports: '@react-appwrite/source',
  },
})
