'use client';

import YouTube from 'react-youtube';

export function YouTubeEmbed({ url }: { url: string }) {
  const videoId = url.split('v=')[1]?.split('&')[0];

  if (!videoId) return null;

  return (
    <div className="aspect-video w-full">
      <YouTube
        videoId={videoId}
        className="w-full h-full"
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
          },
        }}
      />
    </div>
  );
}