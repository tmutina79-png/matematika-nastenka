// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { rehypeBaseUrl } from './src/plugins/rehype-base-url.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://tmutina79-png.github.io',
  base: process.env.CI ? '/matematika-nastenka' : '/',
  output: 'static',

  integrations: [
    svelte(),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeSlug, rehypeKatex, rehypeBaseUrl],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});