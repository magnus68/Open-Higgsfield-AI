import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// VERSIONE DI PROVA: solo proxy verso kie.ai, nessun server di terzi.
export default defineConfig({
    base: './',
    plugins: [
        tailwindcss(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.kie.ai',
                changeOrigin: true,
                secure: true
            }
        }
    }
});
