const assert = require('node:assert/strict');
const {
  SKY_DEVELOPER_HUB_CONTRACT,
  buildDeveloperIndex,
  normalizeDeveloperResource,
} = require('../dist/developerHub.js');

const resource = normalizeDeveloperResource({
  resourceId: ' api-guide ',
  title: ' API Guide ',
  kind: 'guide',
  path: '/docs/api',
  tags: ['API', 'typescript', 'api'],
});
assert.deepEqual(resource, {
  resourceId: 'api-guide',
  title: 'API Guide',
  kind: 'guide',
  path: '/docs/api',
  tags: ['api', 'typescript'],
});

const index = buildDeveloperIndex([
  { resourceId: 'z-sdk', title: 'SDK', kind: 'sdk', path: '/sdk' },
  { resourceId: 'a-ref', title: 'Reference', kind: 'reference', path: '/reference' },
]);
assert.deepEqual(index.map((item) => item.resourceId), ['a-ref', 'z-sdk']);
assert.throws(() => buildDeveloperIndex([
  { resourceId: 'dup', title: 'One', kind: 'guide', path: '/one' },
  { resourceId: 'dup', title: 'Two', kind: 'example', path: '/two' },
]), /duplicate_resource_id/);
assert.throws(() => normalizeDeveloperResource({ resourceId: 'x', title: 'X', kind: 'guide', path: 'relative' }), /invalid_path/);
assert.equal(SKY_DEVELOPER_HUB_CONTRACT.hostsPortal, false);
assert.equal(SKY_DEVELOPER_HUB_CONTRACT.issuesCredentials, false);
console.log('SkyDeveloperHub tests passed');
