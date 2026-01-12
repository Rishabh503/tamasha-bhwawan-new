'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, Users, Check, Upload, AlertCircle } from 'lucide-react';

export default function CourseEnrollPage({ params }) {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    transactionId: '',
    amount: '',
    paymentScreenshot: null
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const { courseId } =await params;

      const courseRes = await fetch(`/api/courses/${courseId}`);
      const courseData = await courseRes.json();

      if (courseData.success) {
        setCourse(courseData.data);
        setFormData(prev => ({
          ...prev,
          amount: courseData.data?.price?.toString() || "",
        }));
      }

      const userRes = await fetch("/api/user/profile");
      const userData = await userRes.json();

      if (userData.success) {
        setUser(userData.data);
        setFormData(prev => ({
          ...prev,
          studentName: userData.data.name || "",
          studentEmail: userData.data.email || "",
          studentPhone: userData.data.phone || "",
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load course details");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      
      setFormData({ ...formData, paymentScreenshot: file });
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const uploadToImageKit = async (file) => {
    try {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');

      // Upload via your API route
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      const uploadRes = await fetch("/api/upload-payment-screenshot", {
        method: "POST",
        body: uploadForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Image upload failed");
      }

      return uploadData.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Validate
      if (!formData.studentName || !formData.studentEmail || !formData.studentPhone) {
        setError('Please fill all required fields');
        setSubmitting(false);
        return;
      }

      if (!formData.paymentScreenshot) {
        setError('Please upload payment screenshot');
        setSubmitting(false);
        return;
      }

      // Upload screenshot to ImageKit
      setUploadProgress(true);
      const screenshotUrl = await uploadToImageKit(formData.paymentScreenshot);
      setUploadProgress(false);

      // Submit payment request
      const { courseId } = await params;
      const response = await fetch('/api/admin/payment-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: courseId,
          studentName: formData.studentName,
          studentEmail: formData.studentEmail,
          studentPhone: formData.studentPhone,
          transactionId: formData.transactionId,
          amount: parseFloat(formData.amount),
          paymentScreenshot: screenshotUrl
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/courses');
        }, 3000);
      } else {
        setError(data.error || 'Failed to submit payment request');
      }

      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting payment:', error);
      setError('An error occurred while submitting payment');
      setSubmitting(false);
      setUploadProgress(false);
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

  if (course.price === 0) {
    router.push(`/courses/${course.id}`);
    return null;
  }

  if (enrollmentStatus?.isEnrolled) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Already Enrolled</h2>
          <p className="text-gray-600 mb-6">You already have access to this course</p>
          <button
            onClick={() => router.push(`/courses/${course.id}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Course
          </button>
        </div>
      </div>
    );
  }

  if (enrollmentStatus?.hasPendingRequest) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Under Review</h2>
          <p className="text-gray-600 mb-6">
            Your payment request is being reviewed by admin. You'll be notified once approved.
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your payment is under review. You'll receive access once admin approves it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            
            {course.imageUrl && (
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <BookOpen size={20} className="text-blue-600" />
                <span>{course._count?.chapters || 0} Chapters</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Users size={20} className="text-blue-600" />
                <span>{course._count?.enrollments || 0} Students Enrolled</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-blue-600">₹{course.price}</span>
                <span className="text-gray-500">one-time payment</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>Lifetime access to course content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>Video lectures and notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>Practice questions and tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>24x7 doubt solving support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Payment</h2>

            {/* UPI Details */}
            {course.upiId && (
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">UPI ID:</span>
                    <p className="font-mono font-semibold text-gray-900">{course.upiId}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Amount to Pay:</span>
                    <p className="text-2xl font-bold text-blue-600">₹{course.price}</p>
                  </div>
                </div>
                
                {course.upiQrCode && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Scan QR Code:</p>
                    <img
                      src={course.upiQrCode}
                      alt="UPI QR Code"
                      className="w-48 h-48 mx-auto border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.studentPhone}
                  onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID / UTR
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Paid *
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {previewUrl ? (
                    <div className="space-y-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl('');
                          setFormData({ ...formData, paymentScreenshot: null });
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload screenshot</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || uploadProgress}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploadProgress ? 'Uploading Screenshot...' : submitting ? 'Submitting...' : 'Submit Payment Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}