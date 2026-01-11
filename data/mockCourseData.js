// Mock data structure matching your Prisma schema
// Use this for testing or replace with actual API calls

export const mockCourseData = {
  id: "course_1",
  title: "UGC-NET Paper 1 Full Course",
  description: "Complete preparation course for UGC-NET Paper 1",
  isPublished: true,
  chapters: [
    {
      id: "ch_1",
      title: "Introduction & Demo",
      order: 1,
      isFree: true,
      videos: [
        {
          id: "vid_1",
          title: "Course Overview",
          description: "Introduction to the complete course structure",
          youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          order: 1,
          notes: [
            {
              id: "note_1",
              content: "# Course Introduction\n\nWelcome to UGC-NET Paper 1 preparation course. This comprehensive course covers all topics required for the exam.\n\n## Key Topics:\n- Teaching Aptitude\n- Research Aptitude\n- Communication\n- Logical Reasoning\n- Mathematical Reasoning\n- Data Interpretation\n\n## Course Structure\nThe course is divided into multiple chapters, each focusing on a specific topic. Each chapter contains multiple video lectures with notes and practice questions.",
              pdfUrl: null
            }
          ],
          pyqs: [
            {
              id: "pyq_1",
              question: "What is the primary purpose of teaching?",
              options: [
                "To facilitate learning",
                "To discipline students",
                "To complete syllabus",
                "To evaluate students"
              ],
              correctIndex: 0,
              solution: "The primary purpose of teaching is to facilitate learning. Teaching is a process that helps students acquire knowledge, skills, and values through various instructional methods and strategies."
            }
          ]
        }
      ]
    },
    {
      id: "ch_2",
      title: "Teaching Aptitude",
      order: 2,
      isFree: false,
      videos: [
        {
          id: "vid_2",
          title: "Whats New for Dec 2025",
          description: "Latest updates and pattern changes",
          youtubeUrl: "https://www.youtube.com/embed/pBj9ziOE8OQ",
          order: 1,
          notes: [
            {
              id: "note_2",
              content: "# Latest Updates for December 2025\n\n## New Pattern Changes\n- Updated question format\n- New marking scheme\n- Additional topics added\n\n## Important Points\n- Focus on conceptual understanding\n- Practice previous year questions\n- Time management is crucial",
              pdfUrl: "https://example.com/notes.pdf"
            }
          ],
          pyqs: []
        },
        {
          id: "vid_3",
          title: "Teaching Aptitude Basics",
          description: "Fundamental concepts of teaching aptitude",
          youtubeUrl: "https://www.youtube.com/embed/pBj9ziOE8OQ",
          order: 2,
          notes: [
            {
              id: "note_3",
              content: "# Teaching Aptitude Fundamentals\n\nTeaching aptitude refers to the ability and skills required for effective teaching.\n\n## Core Components\n- **Understanding Learners**: Recognizing individual differences\n- **Communication Skills**: Clear and effective expression\n- **Subject Knowledge**: Deep understanding of content\n- **Pedagogical Skills**: Methods and techniques of teaching",
              pdfUrl: null
            }
          ],
          pyqs: [
            {
              id: "pyq_2",
              question: "Which of the following is NOT a characteristic of good teaching?",
              options: [
                "Student-centered approach",
                "Rigid methodology",
                "Clear communication",
                "Proper assessment"
              ],
              correctIndex: 1,
              solution: "Rigid methodology is NOT a characteristic of good teaching. Good teaching requires flexibility and adaptation to student needs, learning styles, and contextual factors. A teacher must be able to modify their approach based on the situation."
            },
            {
              id: "pyq_3",
              question: "Bloom's Taxonomy primarily deals with:",
              options: [
                "Teaching methods",
                "Learning objectives",
                "Classroom management",
                "Student behavior"
              ],
              correctIndex: 1,
              solution: "Bloom's Taxonomy is a framework for categorizing educational learning objectives into levels of complexity and specificity. It helps teachers design instruction and assessment that targets different cognitive levels from remembering to creating."
            }
          ]
        },
        {
          id: "vid_4",
          title: "Teaching Competencies",
          description: "Essential competencies for effective teaching",
          youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          order: 3,
          notes: [
            {
              id: "note_4",
              content: "# Teaching Competencies\n\n## Professional Competencies\n- Subject matter expertise\n- Pedagogical knowledge\n- Assessment skills\n\n## Personal Competencies\n- Empathy and patience\n- Communication skills\n- Problem-solving ability",
              pdfUrl: "https://example.com/competencies.pdf"
            }
          ],
          pyqs: [
            {
              id: "pyq_4",
              question: "Which teaching method promotes maximum student participation?",
              options: [
                "Lecture method",
                "Discussion method",
                "Demonstration method",
                "Tutorial method"
              ],
              correctIndex: 1,
              solution: "The discussion method promotes maximum student participation as it encourages students to actively engage, share ideas, question, and collaborate with peers. It fosters critical thinking and communication skills."
            }
          ]
        }
      ]
    },
    {
      id: "ch_3",
      title: "Research Aptitude",
      order: 3,
      isFree: false,
      videos: [
        {
          id: "vid_5",
          title: "Introduction to Research",
          description: "Basics of research methodology",
          youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          order: 1,
          notes: [
            {
              id: "note_5",
              content: "# Research Methodology\n\nResearch is a systematic investigation to establish facts and reach new conclusions.\n\n## Types of Research\n- **Basic Research**: Theoretical knowledge\n- **Applied Research**: Practical problems\n- **Quantitative Research**: Numerical data\n- **Qualitative Research**: Non-numerical data",
              pdfUrl: null
            }
          ],
          pyqs: [
            {
              id: "pyq_5",
              question: "What is the first step in the research process?",
              options: [
                "Data collection",
                "Identifying the problem",
                "Literature review",
                "Hypothesis formulation"
              ],
              correctIndex: 1,
              solution: "Identifying the research problem is the first and most crucial step in the research process. A well-defined problem guides all subsequent research activities and determines the methodology, data collection, and analysis methods."
            },
            {
              id: "pyq_6",
              question: "Which of the following is a characteristic of good research?",
              options: [
                "Biased approach",
                "Systematic and logical",
                "Based on personal opinions",
                "Unverifiable results"
              ],
              correctIndex: 1,
              solution: "Good research is systematic and logical. It follows a structured methodology, uses scientific methods, is objective, replicable, and produces verifiable results that can be validated by other researchers."
            }
          ]
        },
        {
          id: "vid_6",
          title: "Research Methods",
          description: "Different research methodologies",
          youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          order: 2,
          notes: [],
          pyqs: []
        }
      ]
    },
    {
      id: "ch_4",
      title: "Communication",
      order: 4,
      isFree: false,
      videos: [
        {
          id: "vid_7",
          title: "Communication Basics",
          description: "Fundamentals of effective communication",
          youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          order: 1,
          notes: [
            {
              id: "note_6",
              content: "# Communication Fundamentals\n\n## Elements of Communication\n- Sender\n- Message\n- Channel\n- Receiver\n- Feedback\n\n## Types of Communication\n- Verbal communication\n- Non-verbal communication\n- Written communication\n- Visual communication",
              pdfUrl: "https://example.com/communication.pdf"
            }
          ],
          pyqs: [
            {
              id: "pyq_7",
              question: "Which is the most important element of communication?",
              options: [
                "Sender",
                "Message",
                "Feedback",
                "Channel"
              ],
              correctIndex: 2,
              solution: "Feedback is considered the most important element of communication as it completes the communication cycle and ensures that the message has been understood correctly. It allows for clarification and adjustment of the message if needed."
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to fetch course by ID
export const getCourseById = async (courseId) => {
  // In real app, this would be an API call to your backend
  // Example: const response = await fetch(`/api/courses/${courseId}`);
  // return response.json();
  
  return mockCourseData;
};

// Helper function to check if user is enrolled
export const checkEnrollment = async (userId, courseId) => {
  // In real app, check from database
  // const enrollment = await prisma.enrollment.findUnique({
  //   where: { userId_courseId: { userId, courseId } }
  // });
  
  return true; // Assuming enrolled for demo
};