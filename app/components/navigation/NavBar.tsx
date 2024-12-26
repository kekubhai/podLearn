import Link from 'next/link';
import { UserNav } from './UserNav';

export function NavBar() {
  return (
    <nav className="border-b bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          PodLearn
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/explore" className="text-gray-300 hover:text-white">
            Explore
          </Link>
          <UserNav />
        </div>
      </div>
    </nav>
  );
}