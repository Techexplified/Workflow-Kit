import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'choose-workflow': resolve(__dirname, 'choose-workflow.html'),
        cardTemplates: resolve(__dirname, 'card-templates.html'),
        cardBackSection: resolve(__dirname, 'card-back-section.html'),
        authorized: resolve(__dirname, 'authorized.html'),
      },
    },
  },
});
