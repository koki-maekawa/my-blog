export type IdParams = {params: Promise<{id: string}>};

export type TagParams = {params: Promise<{tag: string}>};

export type SearchParams = {search?: string};

export type Breadcrumb = {
  path: string;
  label: string | undefined;
};
