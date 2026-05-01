import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('three')) {
                            return 'three-vendor';
                        }
                        if (id.includes('@react-three/fiber')) {
                            return 'r3f-vendor';
                        }
                        if (id.includes('react-dom')) {
                            return 'react-dom-vendor';
                        }
                        if (id.includes('react')) {
                            return 'react-vendor';
                        }
                    }
                },
            },
        },
    },
});
