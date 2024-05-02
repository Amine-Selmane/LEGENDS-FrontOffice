import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import 'global';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  define: {
global: {}},
});

