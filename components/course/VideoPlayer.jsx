import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center rounded-lg">
        <p className="text-white text-lg">Select a video to start learning</p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={video.youtubeUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default VideoPlayer;