// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://vyfoo.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Only canonical, indexable URLs belong in the sitemap. /contact/sales is a
      // redirect stub (noindex, canonical -> /contact/enterprise); /404 is an error page.
      filter: (page) => !/\/(contact\/sales|404)\/?$/.test(page),
    }),
  ],
  build: {
    format: 'directory',
  },
});
