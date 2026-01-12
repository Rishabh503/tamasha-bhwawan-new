// app/admin/payments/page.js
// Admin dashboard to review and approve/reject payment requests

'use client';

import { useState, useEffect } from 'react';
import { Clock, Check, X, Eye, User, CreditCard, Calendar, AlertCircle } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING'); // PENDING, APPROVED, REJECTED, ALL
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionModal, setActionModal] = useState({ show: false, type: null, request: null });
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchPaymentRequests();
  }, [filter]);

  const fetchPaymentRequests = async () => {
    try {
      setLoading(true);
      const url = filter === 'ALL' 
        ? '/api/admin/payment-requests'
        : `/api/admin/payment-requests?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setPaymentRequests(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment requests:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`/api/admin/payment-requests/${requestId}/approve`, {
        method: 'POST'
      });

      const data = await response.json();
      
      if (data.success) {
        fetchPaymentRequests();
        setActionModal({ show: false, type: null, request: null });
        setSelectedRequest(null);
      } else {
        alert(data.error || 'Failed to approve payment');
      }
    } catch (error) {
      console.error('Error approving payment:', error);
      alert('An error occurred');
    }
  };

  const handleReject = async (requestId) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      const response = await fetch(`/api/admin/payment-requests/${requestId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectionReason })
      });

      const data = await response.json();
      
      if (data.success) {
        fetchPaymentRequests();
        setActionModal({ show: false, type: null, request: null });
        setSelectedRequest(null);
        setRejectionReason('');
      } else {
        alert(data.error || 'Failed to reject payment');
      }
    } catch (error) {
      console.error('Error rejecting payment:', error);
      alert('An error occurred');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800'
    };

    const icons = {
      PENDING: <Clock size={14} />,
      APPROVED: <Check size={14} />,
      REJECTED: <X size={14} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Payment Requests</h1>
          <p className="text-gray-600 mt-1">Review and manage student payment requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['PENDING', 'APPROVED', 'REJECTED', 'ALL'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                filter === status ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {status}
              {filter === status && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Payment Requests List */}
        {paymentRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment requests</h3>
            <p className="text-gray-600">No {filter.toLowerCase()} payment requests at the moment</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{request.studentName}</p>
                        <p className="text-sm text-gray-500">{request.studentEmail}</p>
                        <p className="text-sm text-gray-500">{request.studentPhone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{request.course.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">₹{request.amount}</p>
                      {request.transactionId && (
                        <p className="text-xs text-gray-500">TXN: {request.transactionId}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={18} />
                  Student Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedRequest.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedRequest.studentEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedRequest.studentPhone}</span>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard size={18} />
                  Course & Payment
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{selectedRequest.course.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-blue-600">₹{selectedRequest.amount}</span>
                  </div>
                  {selectedRequest.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm">{selectedRequest.transactionId}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium">
                      {new Date(selectedRequest.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Screenshot */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment Screenshot</h3>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedRequest.paymentScreenshot}
                    alt="Payment Screenshot"
                    className="w-full"
                  />
                </div>
                <a
                  href={selectedRequest.paymentScreenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  View Full Size →
                </a>
              </div>

              {/* Review Info */}
              {selectedRequest.status !== 'PENDING' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar size={18} />
                    Review Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviewed At:</span>
                      <span className="font-medium">
                        {new Date(selectedRequest.reviewedAt).toLocaleString()}
                      </span>
                    </div>
                    {selectedRequest.status === 'REJECTED' && selectedRequest.rejectionReason && (
                      <div>
                        <span className="text-gray-600 block mb-1">Rejection Reason:</span>
                        <p className="text-red-600 bg-red-50 p-2 rounded">{selectedRequest.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {selectedRequest.status === 'PENDING' && (
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => setActionModal({ show: true, type: 'approve', request: selectedRequest })}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Approve Payment
                  </button>
                  <button
                    onClick={() => setActionModal({ show: true, type: 'reject', request: selectedRequest })}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve/Reject Confirmation Modal */}
      {actionModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {actionModal.type === 'approve' ? 'Approve Payment' : 'Reject Payment'}
            </h3>

            {actionModal.type === 'approve' ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to approve this payment? The student will be enrolled in the course.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(actionModal.request.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Confirm Approval
                  </button>
                  <button
                    onClick={() => setActionModal({ show: false, type: null, request: null })}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Please provide a reason for rejection:
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 mb-4"
                  rows={4}
                  placeholder="e.g., Payment amount doesn't match, Invalid transaction, etc."
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => handleReject(actionModal.request.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Confirm Rejection
                  </button>
                  <button
                    onClick={() => {
                      setActionModal({ show: false, type: null, request: null });
                      setRejectionReason('');
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}