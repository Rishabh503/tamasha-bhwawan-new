// app/courses/[courseId]/page.js
// This is the main course page that brings everything together

'use client';

import { useState, useEffect } from 'react';
import { FileText, HelpCircle } from 'lucide-react';
import CourseSidebar from '../../components/course/CourseSideBar';
import VideoPlayer from '../../components/course/VideoPlayer';
import NotesSection from '../../components/course/NotesSection';
import PYQSection from '../../components/course/PYQSection';
import { getCourseById, checkEnrollment } from "../../data/mockCourseData";

export default function CoursePage({ params }) {
  const [courseData, setCourseData] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  const [collapsedChapters, setCollapsedChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [params.courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      
      // Check enrollment (replace with actual user ID from Clerk)
      const enrolled = await checkEnrollment('user_id', params.courseId);
      setIsEnrolled(enrolled);

      if (!enrolled) {
        // Redirect to course detail or enrollment page
        // router.push(`/courses/${params.courseId}/enroll`);
        return;
      }

      // Fetch course data
      const data = await getCourseById(params.courseId);
      setCourseData(data);

      // Auto-select first video
      if (data.chapters.length > 0 && data.chapters[0].videos.length > 0) {
        setActiveVideo(data.chapters[0].videos[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading course:', error);
      setLoading(false);
    }
  };

  const toggleChapter = (chapterId) => {
    setCollapsedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleVideoSelect = (video) => {
    setActiveVideo(video);
    setActiveTab('notes');
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need to enroll in this course to access it.</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <CourseSidebar
        chapters={courseData.chapters}
        activeVideoId={activeVideo?.id}
        onVideoSelect={handleVideoSelect}
        collapsedChapters={collapsedChapters}
        toggleChapter={toggleChapter}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">{courseData.title}</h1>
            {activeVideo && (
              <p className="text-gray-600 mt-1">{activeVideo.title}</p>
            )}
          </div>
        </div>

        {/* Video & Content Area */}
        <div className="max-w-6xl mx-auto p-6">
          {/* Video Player */}
          <VideoPlayer video={activeVideo} />

          {/* Tabs & Content */}
          {activeVideo && (
            <div className="mt-6">
              {/* Tab Navigation */}
              <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 px-4 font-medium transition-colors relative ${
                    activeTab === 'notes'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={20} />
                    <span>Notes</span>
                  </div>
                  {activeTab === 'notes' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('pyqs')}
                  className={`pb-3 px-4 font-medium transition-colors relative ${
                    activeTab === 'pyqs'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle size={20} />
                    <span>Practice Questions</span>
                    {activeVideo.pyqs && activeVideo.pyqs.length > 0 && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                        {activeVideo.pyqs.length}
                      </span>
                    )}
                  </div>
                  {activeTab === 'pyqs' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'notes' && <NotesSection notes={activeVideo.notes} />}
                {activeTab === 'pyqs' && <PYQSection pyqs={activeVideo.pyqs} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}