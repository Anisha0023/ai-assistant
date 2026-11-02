import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import '@testing-library/jest-dom/vitest';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
	},
});
