import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    vite: {
        site: 'https://corteswork.github.io',
        plugins: [tailwindcss()],
    },
});
