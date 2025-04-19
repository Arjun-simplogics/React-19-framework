import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig(() => {
	return {
		build: {
			outDir: "build",
		},
		plugins: [
			react(),
			checker({
				typescript: true,
				eslint: { lintCommand: "eslint 'src/**/*.{ts,tsx,scss}'" },
				overlay: {
					initialIsOpen: true,
				},
			}),
		],
		server: {
			port: 3000,
			host: true,
		},
	};
});
