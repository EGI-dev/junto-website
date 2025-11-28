import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: The line below must match your GitHub repository name exactly.
  // If your repo is named "junto-website", keep it as is.
  // If you named it something else, change "/junto-website/" to "/your-repo-name/".
  base: "/junto-website/", 
})