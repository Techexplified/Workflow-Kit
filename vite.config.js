import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'choose-workflow': resolve(__dirname, 'choose-workflow.html'),
        authorized: resolve(__dirname, 'authorized.html'),
      },
    },
  },
});
