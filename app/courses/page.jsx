
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Users, Play } from 'lucide-react';

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'enrolled'

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Fetch all published courses
      const coursesRes = await fetch('/api/courses');
      const coursesData = await coursesRes.json();
      console.log("coruses",coursesData)
      if (coursesData.success) {
        setCourses(coursesData.data);
      }

      // Fetch user's enrolled courses
      const enrolledRes = await fetch('/api/user/enrollments');
      const enrolledData = await enrolledRes.json();
      
      if (enrolledData.success) {
        setEnrolledCourses(enrolledData.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(e => e.courseId === courseId);
  };

  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });

      if (response.ok) {
        fetchCourses(); // Refresh
      }
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const filteredCourses = activeTab === 'enrolled' 
    ? courses.filter(c => isEnrolled(c.id))
    : courses;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Explore Courses</h1>
          <p className="text-gray-600 mt-2">Start learning and enhance your skills</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-4 font-medium transition-colors relative ${
              activeTab === 'all' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All Courses ({courses.length})
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`pb-4 px-4 font-medium transition-colors relative ${
              activeTab === 'enrolled' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            My Courses ({enrolledCourses.length})
            {activeTab === 'enrolled' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {activeTab === 'enrolled' ? 'No enrolled courses yet' : 'No courses available'}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'enrolled' 
                ? 'Start by enrolling in a course from all courses' 
                : 'Check back later for new courses'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled(course.id)}
                onEnroll={() => handleEnroll(course.id)}
                onView={() => router.push(`/courses/${course.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, isEnrolled, onEnroll, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen size={64} className="text-white opacity-50" />
          </div>
        )}
        {isEnrolled && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Enrolled
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        {course.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{course._count?.chapters || 0} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course._count?.enrollments || 0} students</span>
          </div>
        </div>

        {/* Action Button */}
        {isEnrolled ? (
          <button
            onClick={onView}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Play size={18} />
            Continue Learning
          </button>
        ) : (
          <button
            onClick={onEnroll}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
}