export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
  created_at?: string;
}

export interface CreateBlogInput {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}
