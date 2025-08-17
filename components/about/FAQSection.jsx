"use client";
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "What Makes Learning at Tamasha Bhawan Comprehensive?",
    answer: "At Tamasha Bhawan, students will have access to both practical and theoretical knowledge of Hindustani classical music. This means that in addition to learning the technical aspects of music, students will also gain an understanding of the cultural and historical context in which the music was created. By providing a comprehensive education that includes both practical and theoretical knowledge, Tamasha Bhawan ensures that students are equipped with the skills and knowledge needed to become well-rounded and accomplished musicians."
  },
  {
    question: "How Can You Get Admission to Tamasha Bhawan?",
    answer: "To get admission to Tamasha Bhawan, interested individuals must submit an audio recording of their voice and fill out a registration form. This ensures that the institution can properly evaluate the participant's skills and provide them with the appropriate level of training. By requiring these steps, Tamasha Bhawan is able to maintain a high level of quality in its students and ensure that everyone has the opportunity to excel in their musical journey."
  },
  {
    question: "Does Tamasha Bhawan Offer Both Online and Offline Classes?",
    answer: "Yes! Tamasha Bhawan offers both online and offline classes for students interested in learning Hindustani classical music. This means that regardless of your location and schedule, you can still have access to the institution's exceptional teaching and resources. Whether you prefer the convenience of online classes or the immersive experience of in-person classes, Tamasha Bhawan has something to offer for everyone."
  },
  {
    question: "How Does Tamasha Bhawan Make Learning Fun and Engaging?",
    answer: "Tamasha Bhavan is a vibrant institution that offers a unique and engaging approach to learning Hindustani classical music. With a focus on providing a fun and entertaining experience, students are able to learn about the rich tradition and history of classical music in an exciting and dynamic way. The institution is named after the word 'tamasha', which means entertainment, and it certainly lives up to its name by providing an enjoyable and stimulating environment for students to learn and grow."
  },
  {
    question: "How Does Tamasha Bhawan Help Students Get Certified?",
    answer: "At Tamasha Bhawan, individuals who get admission have the opportunity to take exams from Gandharva Mahavidyalaya Pune of vocal. This provides students with an additional level of recognition and certification that can help them advance their careers in music. By partnering with Gandharva Mahavidyalaya Pune, Tamasha Bhawan is able to provide students with access to a wide range of resources and opportunities that can help them achieve their goals in music."
  }
];

export const FAQSection = () => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleFAQ = (index) => {
    if (isOpen === index) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-amber-100 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <MessageSquare className="inline-block text-amber-600 mb-2" size={32} />
          <h2 className="text-4xl font-bold text-amber-800 mb-4">Frequently Asked Questions</h2>
          <div className="h-1 w-24 bg-amber-600 mx-auto"></div>
        </div>
        
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div 
              key={index} 
              className="border border-amber-300 rounded-lg overflow-hidden bg-amber-50 shadow-md"
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none hover:bg-amber-100/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-amber-800">{faq.question}</span>
                <span className="text-amber-600 text-2xl flex-shrink-0 ml-4">
                  {isOpen === index ? '−' : '+'}
                </span>
              </button>
              
              {isOpen === index && (
                <div className="p-4 bg-amber-100/50 border-t border-amber-300">
                  <p className="text-amber-800">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};