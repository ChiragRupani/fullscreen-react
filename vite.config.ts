import { defineConfig } from "vite";

export default defineConfig({
  experimental: { enableNativePlugin: true },
  build: {
    lib: {
      entry: ["src/index.ts"],
      name: "@chiragrupani/fullscreen-react",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        dir: "build",
        globals: {
          react: "react",
          "react-dom": "react-dom",
        },
        codeSplitting: {
          groups: [{ name: "vendor", test: /react(?:-dom)/ }],
        },
      },
    },
    sourcemap: true,
  },
});
