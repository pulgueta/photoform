// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      BETTER_AUTH_SECRET: envField.string({
        access: 'secret',
        context: 'server',
      }),
      BETTER_AUTH_URL: envField.string({
        access: 'secret',
        context: 'server',
        url: true,
      }),
      DATABASE_URL: envField.string({ access: 'secret', context: 'server', url: true }),
      GOOGLE_CLIENT_ID: envField.string({
        access: 'secret',
        context: 'server',
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        access: 'public',
        context: 'client',
      }),
      POLAR_ACCESS_TOKEN: envField.string({
        access: 'secret',
        context: 'server',
      }),
      POLAR_ORGANIZATION_ID: envField.string({
        access: 'secret',
        context: 'server',
      }),
      POLAR_WEBHOOK_SECRET: envField.string({
        access: 'secret',
        context: 'server',
      }),
    },
  },
  integrations: [react()],
});
