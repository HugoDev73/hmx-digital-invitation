// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Deployed on Vercel (domain root). Astro.site is used for the absolute
  // og:image URL that WhatsApp needs (docs/spec-project.md section 11).
  site: 'https://xv-areli-edith.vercel.app',
});
