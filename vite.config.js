import { resolve } from 'path';
import { defineConfig } from 'vite';

const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://p.trellocdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' ws: wss: https://api.trello.com https://p.trellocdn.com; frame-ancestors 'self' https://trello.com https://*.trello.com; object-src 'none'; base-uri 'self';",
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

export default defineConfig({
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
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
