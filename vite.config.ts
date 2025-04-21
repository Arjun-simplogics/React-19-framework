import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig(() => {
	return {
		build: {
			outDir: "build",
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							if (id.includes("antd")) {
								return "antd";
							}
						}
					},
				},
			},
		},
		plugins: [
			react(),
			checker({
				typescript: true,
				eslint: { lintCommand: "eslint \"src/**/*.{ts,tsx,scss}\"" },
				overlay: {
					initialIsOpen: true,
				},
			}),
		],
		server: {
			hmr: { overlay: false },
		},
	};
});
