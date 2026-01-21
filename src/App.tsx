import { useState } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlogForm } from '@/components/CreateBlogForm';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Blog } from '@/types/blog';

function App() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowCreateForm(false);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
    setSelectedBlog(null);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">CA Monk Blog</h1>
            <Button onClick={handleCreateClick} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              New Blog
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Latest Articles</h2>
            <BlogList onSelectBlog={handleSelectBlog} selectedBlogId={selectedBlog?.id || null} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 overflow-hidden">
            {showCreateForm ? (
              <div className="h-full overflow-y-auto">
                <CreateBlogForm onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
              </div>
            ) : (
              <BlogDetail blogId={selectedBlog?.id || null} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
