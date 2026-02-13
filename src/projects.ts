export const PROJECT_IDS = [
  'gym',
  'facturacion',
  'pos',
  'nutri',
  'ecommerce',
  'advisory',
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const isProjectId = (value: string): value is ProjectId =>
  PROJECT_IDS.includes(value as ProjectId);
