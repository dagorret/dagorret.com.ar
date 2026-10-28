import type { APIRoute } from 'astro';

// Alias disponible también en dev, donde la integración no escribe el índice.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('/sitemap-0.xml', site).href;
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${sitemapUrl}</loc></sitemap></sitemapindex>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
