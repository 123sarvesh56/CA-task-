import { useBlog } from '@/hooks/useBlogs';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface BlogDetailProps {
  blogId: number | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a blog to view details</p>
      </div>
    );
  }

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
        <p className="text-red-500">Error loading blog: {(error as Error).message}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <article className="max-w-4xl mx-auto">
        {blog.coverImage && (
          <div className="w-full h-96 mb-8 overflow-hidden rounded-lg">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.category.map((cat) => (
            <Badge key={cat} variant="default">
              {cat}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6 font-medium">{blog.description}</p>
          <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </div>
        </div>
      </article>
    </div>
  );
}
