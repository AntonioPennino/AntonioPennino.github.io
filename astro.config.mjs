// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; // Importa sitemap

// https://astro.build/config
export default defineConfig({
  site: 'https://antoniopennino.github.io', // SOSTITUISCI CON IL TUO DOMINIO FINALE
  integrations: [sitemap()] // Aggiungi sitemap alle integrazioni
});
