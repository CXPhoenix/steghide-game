const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "img-download-area": resolve(__dirname, "img-download-area.html"),
      },
      output: {
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
