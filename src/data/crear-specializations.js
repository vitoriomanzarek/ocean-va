// Script para crear specializations faltantes en Webflow
// Ejecutar con: node src/data/crear-specializations.js

const specializationsToCreate = [
  // Individuales
  { name: "Protocol Development", slug: "protocol-development" },
  { name: "With Mortgage And Lead-Gen Experience", slug: "with-mortgage-and-lead-gen-experience" },
  { name: "Calendar Management", slug: "calendar-management" },
  { name: "Administrative Support", slug: "administrative-support" },
  
  // Herramientas/Plataformas
  { name: "Shopify", slug: "shopify" },
  { name: "Amazon", slug: "amazon" },
  { name: "Wordpress", slug: "wordpress" },
  { name: "Mailchimp", slug: "mailchimp" },
  { name: "Semrush", slug: "semrush" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "Asana", slug: "asana" },
  { name: "SEO", slug: "seo" },
  { name: "Javascript", slug: "javascript" },
  { name: "Google Ads", slug: "google-ads" },
  { name: "Meta Business Suite", slug: "meta-business-suite" },
  { name: "Meta Ads", slug: "meta-ads" },
  { name: "AWS", slug: "aws" },
  { name: "Customer Service", slug: "customer-service" },
  { name: "Funnel", slug: "funnel" },
  { name: "Social Media", slug: "social-media" },
  { name: "Hubspot", slug: "hubspot" },
  { name: "Figma", slug: "figma" },
  { name: "Wix", slug: "wix" },
  { name: "Zendesk", slug: "zendesk" },
  { name: "Quickbooks", slug: "quickbooks" },
  { name: "Photoshop", slug: "photoshop" },
  { name: "Ring Central", slug: "ring-central" }
];

console.log(`Total de specializations a crear: ${specializationsToCreate.length}`);
console.log('\nLista de specializations:');
specializationsToCreate.forEach((spec, index) => {
  console.log(`${index + 1}. ${spec.name} (${spec.slug})`);
});

// Este script solo muestra la lista
// La creación se hará usando la API de Webflow MCP

