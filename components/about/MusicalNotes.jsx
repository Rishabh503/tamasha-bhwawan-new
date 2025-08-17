"use client";
import { useEffect, useState } from 'react';

export const MusicalNotes = () => {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const notesCount = 30;
    const noteSymbols = ['♪', '♫', '♩', '♬', '𝄞'];
    const generatedNotes = [];
    
    for (let i = 0; i < notesCount; i++) {
      const symbol = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
      const size = Math.floor(Math.random() * 24) + 16;
      const duration = Math.floor(Math.random() * 20) + 15;
      const delay = Math.random() * 10;
      
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${size}px`,
        opacity: Math.random() * 0.7 + 0.3,
        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate, 
                    fade ${duration/2}s ease-in-out ${delay}s infinite alternate`
      };
      
      generatedNotes.push({ id: i, symbol, style });
    }
    
    setNotes(generatedNotes);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, -20px) rotate(20deg); }
        }
        @keyframes fade {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
      {notes.map(note => (
        <div 
          key={note.id} 
          className="absolute text-amber-100 pointer-events-none transform rotate-12"
          style={note.style}
        >
          {note.symbol}
        </div>
      ))}
    </div>
  );
};