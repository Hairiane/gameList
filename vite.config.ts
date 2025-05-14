import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env);

  return {
    base: 'https://hairiane.github.io/gameList',
    plugins: [react()],
    define: {
      'process.env.APIKEY_RAWG': JSON.stringify(env.APIKEY_RAWG)
    }
  }
})
