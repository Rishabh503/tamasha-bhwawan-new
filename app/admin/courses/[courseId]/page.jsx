"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
   FileText,  // Add this
  Book,  
} from "lucide-react";

export default function EditCoursePage({ params }) {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [showEditVideo, setShowEditVideo] = useState({
    show: false,
    video: null,
  });

  // Modals
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState({
    show: false,
    chapterId: null,
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {

    try {
      const paramsAfter=await params
      const response = await fetch(`/api/admin/courses/${paramsAfter.courseId}`);
      const data = await response.json();

      if (data.success) {
        setCourse(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!confirm("Are you sure you want to delete this chapter?")) return;

    try {
      const response = await fetch(`/api/admin/chapters/${chapterId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch(`/api/admin/videos/${videoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error("Error deleting video:", error);
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
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {course.title}
              </h1>
              <p className="text-gray-600 mt-1">
                {course.description || "No description"}
              </p>
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
              <div
                key={chapter.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
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
                          {chapter.videos.length} video
                          {chapter.videos.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setShowAddVideo({ show: true, chapterId: chapter.id })
                        }
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
                      <p className="text-gray-500 text-center py-4">
                        No videos in this chapter
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {chapter.videos.map((video) => (
                          <div
                            key={video.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {video.order}. {video.title}
                              </p>
                              {video.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {video.description}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                {video.notes?.length || 0} note
                                {video.notes?.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setShowEditVideo({ show: true, video })
                                }
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteVideo(video.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
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
      {showEditVideo.show && (
  <EditVideoModal
    video={showEditVideo.video}
    onClose={() => setShowEditVideo({ show: false, video: null })}
    onSuccess={() => {
      fetchCourse();
      setShowEditVideo({ show: false, video: null });
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
    description: course.description || "",
    imageUrl: course.imageUrl || "",
    price: course.price?.toString() || "0",
    qrCodeId: course.qrCodeId || ""
  });
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingQRs, setLoadingQRs] = useState(true);

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      const response = await fetch('/api/admin/qr-codes?status=ACTIVE');
      const data = await response.json();
      
      if (data.success) {
        setQrCodes(data.data);
      }
      setLoadingQRs(false);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
      setLoadingQRs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          qrCodeId: formData.qrCodeId || null
        }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedQR = qrCodes.find(qr => qr.id === formData.qrCodeId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment QR Code
              </label>
              {loadingQRs ? (
                <div className="text-sm text-gray-500">Loading QR codes...</div>
              ) : (
                <div>
                  <select
                    value={formData.qrCodeId}
                    onChange={(e) =>
                      setFormData({ ...formData, qrCodeId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                  >
                    <option value="">No QR Code (Free Course)</option>
                    {qrCodes.map((qr) => (
                      <option key={qr.id} value={qr.id}>
                        {qr.name} - {qr.upiId}
                      </option>
                    ))}
                  </select>

                  {selectedQR && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Selected QR Code Preview:
                      </p>
                      <img
                        src={selectedQR.qrImageUrl}
                        alt={selectedQR.name}
                        className="w-48 h-48 object-contain mx-auto rounded border border-gray-300"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium text-gray-900">{selectedQR.name}</p>
                        <p className="text-xs text-gray-600">{selectedQR.upiId}</p>
                      </div>
                    </div>
                  )}

                  {qrCodes.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      No active QR codes available. Create one in QR Code Management.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Changes"}
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
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/courses/${courseId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating chapter:", error);
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapter Title
            </label>
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
              {loading ? "Adding..." : "Add Chapter"}
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
    title: "",
    description: "",
    youtubeUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/chapters/${chapterId}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating video:", error);
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Course Overview"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Brief description of the video"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.youtube.com/embed/..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Use YouTube embed URL format
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add Video"}
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

// Edit Video & Manage Notes Modal Component
function EditVideoModal({ video, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    title: video.title,
    description: video.description || '',
    youtubeUrl: video.youtubeUrl,
    order: video.order
  });
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(video.notes || []);
  const [showAddNote, setShowAddNote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Video</h2>
          <p className="text-sm text-gray-600 mt-1">{video.title}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Video Details
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'notes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Notes ({notes.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Video Details Tab */}
          {activeTab === 'details' && (
            <form onSubmit={handleSubmit}>
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
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
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
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <NotesManagement
              videoId={video.id}
              initialNotes={notes}
              onNotesChange={setNotes}
              onSuccess={onSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Notes Management Component
function NotesManagement({ videoId, initialNotes, onNotesChange, onSuccess }) {
  const [notes, setNotes] = useState(initialNotes);
  const [showAddNote, setShowAddNote] = useState(false);

  const handleDeleteNote = async (noteId) => {
    if (!confirm('Delete this note?')) return;

    try {
      const response = await fetch(`/api/admin/notes/${noteId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedNotes = notes.filter(n => n.id !== noteId);
        setNotes(updatedNotes);
        onNotesChange(updatedNotes);
        onSuccess();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Manage Notes</h3>
        <button
          onClick={() => setShowAddNote(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-4">No notes added yet</p>
          <button
            onClick={() => setShowAddNote(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add First Note
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {note.content && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Text Note</p>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-4">{note.content}</p>
                </div>
              )}
              {note.pdfUrl && (
  <div className="mb-3">
    <p className="text-xs font-medium text-gray-500 uppercase mb-2">PDF Note</p>
    
      href={note.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
    <a>
      <Book size={16} />
      View PDF
    </a>
  </div>
)}
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="mt-2 flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddNote && (
        <AddNoteModal
          videoId={videoId}
          onClose={() => setShowAddNote(false)}
          onSuccess={(newNote) => {
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            onNotesChange(updatedNotes);
            setShowAddNote(false);
            onSuccess();
          }}
        />
      )}
    </div>
  );
}

// Add Note Modal Component
function AddNoteModal({ videoId, onClose, onSuccess }) {
  const [noteType, setNoteType] = useState('text');
  const [content, setContent] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return;
      }
      
      setPdfFile(file);
      setPdfPreview(file.name);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let pdfUrl = null;

      if (noteType === 'pdf' && pdfFile) {
        setUploading(true);
        const uploadForm = new FormData();
        uploadForm.append('file', pdfFile);

        const uploadRes = await fetch('/api/admin/upload-pdf', {
          method: 'POST',
          body: uploadForm
        });

        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          throw new Error(uploadData.error || 'PDF upload failed');
        }

        pdfUrl = uploadData.url;
        setUploading(false);
      }

      const response = await fetch(`/api/admin/videos/${videoId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: noteType === 'text' ? content : null,
          pdfUrl: pdfUrl
        })
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.data);
      } else {
        throw new Error(data.error || 'Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add Note</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Note Type</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setNoteType('text')}
                className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                  noteType === 'text'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText size={24} className={`mx-auto mb-2 ${noteType === 'text' ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className={`font-medium ${noteType === 'text' ? 'text-blue-600' : 'text-gray-700'}`}>Text Note</p>
                <p className="text-xs text-gray-500 mt-1">Paste or type notes</p>
              </button>
              <button
                type="button"
                onClick={() => setNoteType('pdf')}
                className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                  noteType === 'pdf'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Book size={24} className={`mx-auto mb-2 ${noteType === 'pdf' ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className={`font-medium ${noteType === 'pdf' ? 'text-blue-600' : 'text-gray-700'}`}>PDF Upload</p>
                <p className="text-xs text-gray-500 mt-1">Upload PDF file</p>
              </button>
            </div>
          </div>

          {noteType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                rows={12}
                placeholder="Paste your notes here...

You can use markdown formatting:
# Heading
## Subheading
**Bold text**
- List item"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Supports basic markdown formatting</p>
            </div>
          )}

          {noteType === 'pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {pdfPreview ? (
                  <div className="space-y-2">
                    <FileText size={48} className="mx-auto text-blue-600" />
                    <p className="text-sm font-medium text-gray-900">{pdfPreview}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfFile(null);
                        setPdfPreview('');
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Book size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload PDF</p>
                    <p className="text-xs text-gray-500">PDF files up to 10MB</p>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {uploading ? 'Uploading PDF...' : loading ? 'Adding Note...' : 'Add Note'}
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