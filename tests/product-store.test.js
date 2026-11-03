const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'product-store.js');
assert.ok(fs.existsSync(filePath), 'product-store.js should exist');

const source = fs.readFileSync(filePath, 'utf8');
assert.match(source, /databaseURL|localStorage|saveProducts|loadProducts/, 'product store should support shared storage and local fallback');

console.log('Product store checks passed.');
