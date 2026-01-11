// app/admin/courses/[courseId]/page.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

export default function EditCoursePage({ params }) {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState({});
  
  // Modals
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState({ show: false, chapterId: null });

  useEffect(() => {
    fetchCourse();
  }, [params.courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${params.courseId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!confirm('Are you sure you want to delete this chapter?')) return;

    try {
      const response = await fetch(`/api/admin/chapters/${chapterId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600 mt-1">{course.description || 'No description'}</p>
            </div>
            <button
              onClick={() => setShowEditCourse(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit size={18} />
              Edit Details
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Chapter Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddChapter(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Add Chapter
          </button>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {course.chapters.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600 mb-4">No chapters added yet</p>
              <button
                onClick={() => setShowAddChapter(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add First Chapter
              </button>
            </div>
          ) : (
            course.chapters.map((chapter) => (
              <div key={chapter.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Chapter Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="flex items-center gap-3 flex-1"
                    >
                      {expandedChapters[chapter.id] ? (
                        <ChevronDown size={20} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-600" />
                      )}
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">
                          Chapter {chapter.order}: {chapter.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {chapter.videos.length} video{chapter.videos.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAddVideo({ show: true, chapterId: chapter.id })}
                        className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Plus size={16} />
                        Add Video
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(chapter.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Videos List */}
                {expandedChapters[chapter.id] && (
                  <div className="p-4">
                    {chapter.videos.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No videos in this chapter</p>
                    ) : (
                      <div className="space-y-2">
                        {chapter.videos.map((video) => (
                          <div
                            key={video.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {video.order}. {video.title}
                              </p>
                              {video.description && (
                                <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteVideo(video.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Course Modal */}
      {showEditCourse && (
        <EditCourseModal
          course={course}
          onClose={() => setShowEditCourse(false)}
          onSuccess={() => {
            fetchCourse();
            setShowEditCourse(false);
          }}
        />
      )}

      {/* Add Chapter Modal */}
      {showAddChapter && (
        <AddChapterModal
          courseId={course.id}
          onClose={() => setShowAddChapter(false)}
          onSuccess={() => {
            fetchCourse();
            setShowAddChapter(false);
          }}
        />
      )}

      {/* Add Video Modal */}
      {showAddVideo.show && (
        <AddVideoModal
          chapterId={showAddVideo.chapterId}
          onClose={() => setShowAddVideo({ show: false, chapterId: null })}
          onSuccess={() => {
            fetchCourse();
            setShowAddVideo({ show: false, chapterId: null });
          }}
        />
      )}
    </div>
  );
}

// Edit Course Modal Component
function EditCourseModal({ course, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description || '',
    imageUrl: course.imageUrl || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Add Chapter Modal Component
function AddChapterModal({ courseId, onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/courses/${courseId}/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add Chapter</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Introduction & Demo"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Adding...' : 'Add Chapter'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Add Video Modal Component
function AddVideoModal({ chapterId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/chapters/${chapterId}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add Video</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Course Overview"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Brief description of the video"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.youtube.com/embed/..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">Use YouTube embed URL format</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Adding...' : 'Add Video'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}