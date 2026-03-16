import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log("\n🛑 === VITE ENV DEBUG START === 🛑")
  console.log("Loaded API URL:", env.VITE_API_BASE_URL)
  console.log("Loaded BASE URL:", env.VITE_BASE_URL)
  console.log("🛑 === VITE ENV DEBUG END === 🛑\n")

  return {
    plugins: [react()],
    
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      
      allowedHosts: [
        env.VITE_BASE_URL
      ],
      proxy: {
      '/api': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
      '/static': {
        target: env.API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
      '/results': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    }
    }
  };
});
