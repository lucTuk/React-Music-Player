import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import observerPlugin from "mobx-react-observer/babel-plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    observerPlugin({ exclude: ["src/ui-components/**"] }),
                ],
            },
        }),
        tailwindcss(),
    ],
});
