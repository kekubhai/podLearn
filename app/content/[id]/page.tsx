import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { YouTubeEmbed } from '../../components/content/YouTubeEmbed';
import { CommentSection } from '../../components/content/CommentSection';

export default async function ContentPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: content } = await supabase
    .from('content')
    .select(`
      *,
      profiles:creator_id (username),
      challenges (*)
    `)
    .eq('id', params.id)
    .single();

  if (!content) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <div className="mb-6">
          {content.type === 'youtube' && content.youtube_url && (
            <YouTubeEmbed url={content.youtube_url} />
          )}
        </div>
        <p className="text-gray-300 mb-8">{content.description}</p>
        <CommentSection contentId={content.id} />
      </div>
    </div>
  );
}