import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  base:'./',
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.jpg', '**/*.png'],
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    splitChunks: { chunks: "all" }
  }
  
})
