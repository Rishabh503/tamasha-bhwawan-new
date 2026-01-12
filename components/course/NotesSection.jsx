import React from 'react';
import { Book, FileText } from 'lucide-react';

const NotesSection = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <FileText size={48} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600">No notes available for this video</p>
      </div>
    );
  }

  const formatContent = (content) => {
    if (!content) return '';
    
    let formatted = content;
    
    // Headers
    formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 mt-4 mb-2">$1</h3>');
    formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h2>');
    formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1>');
    
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
    
    // Lists
    formatted = formatted.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>');
    formatted = formatted.replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>');
    
    // Wrap consecutive list items
    formatted = formatted.replace(/(<li class="ml-4">.*<\/li>\n?)+/gs, '<ul class="list-disc list-inside space-y-1 my-3 text-gray-700">$&</ul>');
    
    // Paragraphs
    formatted = formatted.split('\n\n').map(para => {
      if (!para.match(/<h[123]|<ul|<li/)) {
        return `<p class="text-gray-700 leading-relaxed my-3">${para.replace(/\n/g, '<br>')}</p>`;
      }
      return para;
    }).join('');
    
    return formatted;
  };

  return (
    <div className="space-y-6">
      {notes.map((note, index) => (
        <div key={note.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              {note.pdfUrl ? (
                <Book size={20} className="text-blue-600" />
              ) : (
                <FileText size={20} className="text-blue-600" />
              )}
              <h3 className="font-semibold text-gray-900">
                {note.pdfUrl ? 'PDF Notes' : 'Notes'} {notes.length > 1 && `#${index + 1}`}
              </h3>
            </div>
          </div>

          <div className="p-6">
            {note.content && (
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formatContent(note.content) }}
              />
            )}
            
            {note.pdfUrl && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={note.pdfUrl}
                  className="w-full h-[700px]"
                  title="PDF Viewer"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesSection;