import React from 'react';
import { ChevronDown, ChevronRight, PlayCircle } from 'lucide-react';

const CourseSidebar = ({ chapters, activeVideoId, onVideoSelect, collapsedChapters, toggleChapter }) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto h-screen">
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="font-bold text-lg text-gray-800">Course Content</h2>
      </div>
      
      <div className="p-2">
        {chapters.map((chapter) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            activeVideoId={activeVideoId}
            onVideoSelect={onVideoSelect}
            isCollapsed={collapsedChapters[chapter.id]}
            onToggle={() => toggleChapter(chapter.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ChapterItem = ({ chapter, activeVideoId, onVideoSelect, isCollapsed, onToggle }) => {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
          <span className="font-semibold text-sm">{chapter.title}</span>
        </div>
        {chapter.isFree && (
          <span className="text-xs bg-green-500 px-2 py-1 rounded">Free</span>
        )}
      </button>
      
      {!isCollapsed && (
        <div className="ml-2 mt-1 space-y-1">
          {chapter.videos.map((video, index) => (
            <VideoItem
              key={video.id}
              video={video}
              index={index}
              isActive={activeVideoId === video.id}
              onSelect={() => onVideoSelect(video)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const VideoItem = ({ video, index, isActive, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
        isActive
          ? 'bg-blue-100 border-l-4 border-blue-600'
          : 'bg-white hover:bg-gray-100 border-l-4 border-transparent'
      }`}
    >
      <PlayCircle size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
          {index + 1}. {video.title}
        </p>
      </div>
    </button>
  );
};

export default CourseSidebar;