export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isPublic: boolean;
  technology?: string[];
  argument?: string;
  attributes?: { url: string; caption: string }[];
  docsUrl?: string;
  readmeUrl?: string;
  repoUrl?: string;
}
