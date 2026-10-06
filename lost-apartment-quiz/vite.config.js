import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" 讓網站不管放在 https://帳號.github.io/任何倉庫名稱/ 底下都能正常載入
export default defineConfig({
  base: "./",
  plugins: [react()],
});
