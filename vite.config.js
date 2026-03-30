import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        proxy: {
            '/api': 'http://localhost:3001'
        }
    },
    build: {
        assetsInlineLimit: 20480,
        sourcemap: false,
        target: 'esnext',
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react-quill') || id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('rehype-raw')) {
                            return 'rich-text';
                        }
                        if (id.includes('three') || id.includes('@react-three')) {
                            return 'vendor-three';
                        }
                        if (id.includes('gsap') || id.includes('lenis')) {
                            return 'vendor-animation';
                        }
                        if (id.includes('lucide-react')) {
                            return 'vendor-ui';
                        }
                        return 'vendor';
                    }
                    if (id.includes('pages/dash') || id.includes('components/dash')) {
                        return 'dashboard';
                    }
                }
            }
        }
    }
})
