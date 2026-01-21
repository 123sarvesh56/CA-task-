import { useBlogs } from '@/hooks/useBlogs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { Blog } from '@/types/blog';

interface BlogListProps {
  onSelectBlog: (blog: Blog) => void;
  selectedBlogId: number | null;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error loading blogs: {(error as Error).message}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No blogs found. Create your first blog!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedBlogId === blog.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onSelectBlog(blog)}
        >
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {blog.category.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-xl">{blog.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 line-clamp-2">{blog.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
