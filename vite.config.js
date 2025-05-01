import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },build:{
    emptyOutDir:true,
    outDir:"/Users/som/studentProject/spring_boot_study/tj703_spring_login/src/main/resources/static"
  }
})
