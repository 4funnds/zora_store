import fs from "fs";
import path from "path";

const generateSitemap = (pages, products) => {
  const baseUrl = "https://zora-fashion.com";
  const date = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page.path}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>${page.changefreq || "weekly"}</changefreq>
      <priority>${page.priority || "0.8"}</priority>
    </url>
  `
    )
    .join("")}
  ${products
    .map(
      (product) => `
    <url>
      <loc>${baseUrl}/products/${product.id}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

  fs.writeFileSync(
    path.join(process.cwd(), "public", "sitemap.xml"),
    sitemap,
    "utf8"
  );
};

// Example usage (would be called during build process)
const pages = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/products", changefreq: "daily" },
  { path: "/about" },
  { path: "/contact" },
];

// This would come from your product data
const products = [
  { id: "1", lastmod: "2023-06-01" },
  { id: "2", lastmod: "2023-06-01" },
];

generateSitemap(pages, products);
