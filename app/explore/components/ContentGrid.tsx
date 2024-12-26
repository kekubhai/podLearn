import { Content } from '@/types/database.types';
import Link from 'next/link';

interface ContentGridProps {
  content: Content[];
}

export function ContentGrid({ content }: ContentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item) => (
        <Link 
          key={item.id} 
          href={`/content/${item.id}`}
          className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 ring-blue-500"
        >
          {item.youtube_thumbnail && (
            <img 
              src={item.youtube_thumbnail} 
              alt={item.title}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
            <p className="text-gray-400 line-clamp-2">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}