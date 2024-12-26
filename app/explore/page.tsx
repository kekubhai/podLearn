import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ContentGrid } from './components/ContentGrid';
import { CategoryFilter } from './components/CategoryFilter';

export default async function ExplorePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: content } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Explore Content</h1>
      <CategoryFilter />
      <ContentGrid content={content || []} />
    </div>
  );
}