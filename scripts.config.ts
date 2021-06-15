import { DenonConfig } from 'https://deno.land/x/denon@2.4.7/mod.ts'

const config: DenonConfig = {
  allow: [
    'net',
    'read',
    'run',
    'write',
  ],
  watch: false,
  unstable: true,

  scripts: {
    dev: {
      cmd: 'deno run --no-check src/app.ts',
      desc: 'Run dev-server',
      watch: true,
    },
  },
}

export default config
