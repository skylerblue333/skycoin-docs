export interface DeveloperResourceInput {
  resourceId: string;
  title: string;
  kind: 'guide' | 'reference' | 'sdk' | 'example';
  path: string;
  tags?: string[];
}

export interface DeveloperResource {
  resourceId: string;
  title: string;
  kind: DeveloperResourceInput['kind'];
  path: string;
  tags: string[];
}

function bounded(value: string, field: string, max = 200): string {
  const v = value.trim();
  if (!v || v.length > max) throw new Error(`invalid_${field}`);
  return v;
}

export function normalizeDeveloperResource(input: DeveloperResourceInput): DeveloperResource {
  const tags = [...new Set((input.tags ?? []).map((tag) => bounded(tag, 'tag', 48).toLowerCase()))].sort();
  if (tags.length > 32) throw new Error('too_many_tags');
  const path = bounded(input.path, 'path', 300);
  if (!path.startsWith('/')) throw new Error('invalid_path');
  return {
    resourceId: bounded(input.resourceId, 'resource_id', 120),
    title: bounded(input.title, 'title'),
    kind: input.kind,
    path,
    tags,
  };
}

export function buildDeveloperIndex(resources: readonly DeveloperResourceInput[]): DeveloperResource[] {
  const seen = new Set<string>();
  return resources.map(normalizeDeveloperResource).sort((a, b) => a.resourceId.localeCompare(b.resourceId)).map((resource) => {
    if (seen.has(resource.resourceId)) throw new Error('duplicate_resource_id');
    seen.add(resource.resourceId);
    return resource;
  });
}

export const SKY_DEVELOPER_HUB_CONTRACT = {
  register: 'sky.developer.resource.register.v1',
  index: 'sky.developer.resource.index.v1',
  hostsPortal: false,
  issuesCredentials: false,
} as const;
