
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, HelpCircle, ArrowLeft } from 'lucide-react';

// Import all the components we created earlier
import CourseSidebar from '../../../components/course/CourseSideBar';
import VideoPlayer from '../../../components/course/VideoPlayer';
import NotesSection from '../../../components/course/NotesSection';
import PYQSection from '../../../components/course/PYQSection';

export default function UserCoursePage({ params }) {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  const [collapsedChapters, setCollapsedChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourse();
  }, [params.courseId]);

  const loadCourse = async () => {
    try {
        const paramsAfter=await params
      setLoading(true);
      setError(null);

      // Check enrollment first
      const enrollmentRes = await fetch('/api/user/enrollments');
      const enrollmentData = await enrollmentRes.json();
            console.log("enrollmentData",enrollmentData)
            console.log("enrollmentData",paramsAfter.courseId)
      if (enrollmentData.success) {
        const enrolled = enrollmentData.data.some(e => e.courseId === paramsAfter.courseId);
        setIsEnrolled(enrolled);

        if (!enrolled) {
          setLoading(false);
          return;
        }
      }

      // Fetch course data (this should be from user-facing API, not admin)
      const courseRes = await fetch(`/api/courses/${paramsAfter.courseId}`);
      const courseDataRes = await courseRes.json();

      if (!courseRes.ok) {
        throw new Error(courseDataRes.error || 'Failed to load course');
      }

      if (courseDataRes.success) {
        const course = courseDataRes.data;
        setCourseData(course);

        // Auto-select first video
        if (course.chapters && course.chapters.length > 0) {
          const firstChapter = course.chapters[0];
          if (firstChapter.videos && firstChapter.videos.length > 0) {
            setActiveVideo(firstChapter.videos[0]);
            // Expand first chapter by default
            setCollapsedChapters({ [firstChapter.id]: false });
          }
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading course:', error);
      setError(error.message);
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
    // Scroll to top smoothly
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Course</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Not Enrolled State
  if (!isEnrolled) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to enroll in this course to access its content.</p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  // Course Not Found State
  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with Course Content */}
      <CourseSidebar
        chapters={courseData.chapters || []}
        activeVideoId={activeVideo?.id}
        onVideoSelect={handleVideoSelect}
        collapsedChapters={collapsedChapters}
        toggleChapter={toggleChapter}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4  top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto">
         
            <h1 className="text-2xl font-bold text-gray-800">{courseData.title}</h1>
            {activeVideo && (
              <p className="text-gray-600 mt-1">{activeVideo.title}</p>
            )}
          </div>
        </div>

        {/* Video & Content Area */}
        <div className="max-w-6xl  mx-auto p-6">
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
                    {activeVideo.notes && activeVideo.notes.length > 0 && (
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                        {activeVideo.notes.length}
                      </span>
                    )}
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
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold">
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
                {activeTab === 'notes' && (
                  <NotesSection notes={activeVideo.notes || []} />
                )}
                {activeTab === 'pyqs' && (
                  <PYQSection pyqs={activeVideo.pyqs || []} />
                )}
              </div>
            </div>
          )}

          {/* No Video Selected State */}
          {!activeVideo && courseData.chapters && courseData.chapters.length > 0 && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to {courseData.title}
              </h3>
              <p className="text-gray-600">
                Select a video from the sidebar to start learning
              </p>
            </div>
          )}

          {/* No Content State */}
          {(!courseData.chapters || courseData.chapters.length === 0) && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Content Coming Soon
              </h3>
              <p className="text-gray-600">
                This course is being prepared. Please check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}