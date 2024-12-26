import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function LiveSessionPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  // This is a placeholder for live session functionality
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Live Session</h1>
        <p className="text-gray-300">Live session functionality coming soon...</p>
      </div>
    </div>
  );
}