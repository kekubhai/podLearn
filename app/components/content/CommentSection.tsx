'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Comment } from '@/types/database.types';

export function CommentSection({ contentId }: { contentId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          content_id: contentId,
          user_id: session.user.id,
          message: newComment
        }
      ])
      .select()
      .single();

    if (!error && data) {
      setComments([...comments, data]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          rows={3}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-gray-800 rounded-lg">
            <p>{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}