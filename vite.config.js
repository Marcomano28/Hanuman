import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
      },
      publicDir: 'public',
      assetsInclude: ['**/*.jpeg', '**/*.JPG', '**/*.ttf'],
      server: {
        open: true
      }
});
