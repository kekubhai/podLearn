import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function UserNav() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return (
      <Link 
        href="/auth/login"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link 
        href={`/${session.user.user_metadata.role || 'viewer'}/dashboard`}
        className="text-gray-300 hover:text-white"
      >
        Dashboard
      </Link>
      <form action="/auth/signout" method="post">
        <button className="text-gray-300 hover:text-white">
          Sign Out
        </button>
      </form>
    </div>
  );
}