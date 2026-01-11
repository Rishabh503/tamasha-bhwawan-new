import React from 'react';
import { Book, FileText } from 'lucide-react';

const NotesSection = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Book size={48} className="mx-auto mb-3 opacity-50" />
        <p className="text-lg">No notes available for this video</p>
      </div>
    );
  }

  // Simple markdown-like parser for basic formatting
  const formatContent = (content) => {
    if (!content) return '';
    
    let formatted = content;
    
    // Headers
    formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold mb-2 mt-3">$1</h3>');
    formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mb-2 mt-4">$1</h2>');
    formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold mb-3 mt-2">$1</h1>');
    
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Lists
    formatted = formatted.replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>');
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    
    // Wrap lists
    formatted = formatted.replace(/(<li.*?<\/li>)/s, '<ul class="list-disc ml-4 mb-3">$1</ul>');
    
    return formatted;
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {note.content && (
            <div className="p-6">
              <div 
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContent(note.content) }} 
              />
            </div>
          )}
          {note.pdfUrl && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <FileText size={20} />
                Download PDF Notes
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotesSection;