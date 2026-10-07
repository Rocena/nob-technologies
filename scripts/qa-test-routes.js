const http = require('http');

const routes = [
  '/',
  '/a-propos',
  '/services',
  '/services/cybersecurite',
  '/services/reseaux-telecoms',
  '/services/cloud-virtualisation',
  '/services/developpement-erp',
  '/services/videosurveillance',
  '/services/infogerance',
  '/realisations',
  '/tarifs',
  '/articles',
  '/carrieres',
  '/contact',
  '/faq',
  '/certifications',
  '/confidentialite',
  '/mentions-legales',
  '/login',
  '/admin/aide',
  '/admin/collections/contact-messages',
  '/admin/collections/quotes',
  '/admin/collections/invoices',
  '/admin/collections/customers',
  '/admin/collections/pages',
  '/admin/collections/services',
  '/admin/collections/pricing-plans',
  '/admin/collections/projects',
  '/admin/collections/media',
  '/admin/collections/articles',
  '/admin/collections/job-offers',
  '/admin/globals/site-settings',
];

async function checkRoute(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ path: urlPath, status: res.statusCode, length: data.length });
      });
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, status: 0, error: err.message });
    });
    req.setTimeout(12000, () => {
      req.destroy();
      resolve({ path: urlPath, status: 408, error: 'Timeout' });
    });
  });
}

async function run() {
  console.log(`=== AUDIT QA SUITE NOB TECHNOLOGIES ===`);
  console.log(`Audit de ${routes.length} routes...`);
  const results = [];
  for (const r of routes) {
    const res = await checkRoute(r);
    const pass = res.status >= 200 && res.status < 400;
    console.log(`${pass ? '✓ [PASS]' : '✗ [FAIL]'} ${res.status} : ${res.path} ${res.error ? '(' + res.error + ')' : ''}`);
    results.push(res);
  }
  const failed = results.filter((r) => r.status < 200 || r.status >= 400);
  console.log(`\n=== BILAN ===`);
  console.log(`Total: ${results.length} | Réussis: ${results.length - failed.length} | Échecs: ${failed.length}`);
}

run();
