import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Remove existing live quizzes and their related data
  console.log("Cleaning up old dummy quizzes...");
  await prisma.liveQuiz.deleteMany({});
  
  // Find a user to act as the teacher.
  // We'll take the first user in the database. If none exists, we create a dummy one.
  let teacher = await prisma.user.findFirst();

  if (!teacher) {
    console.log("No users found. Creating a dummy teacher user...");
    teacher = await prisma.user.create({
      data: {
        clerkUserId: "seed_dummy_teacher",
        email: "teacher@example.com",
        name: "Admin Teacher",
        role: "ADMIN",
      }
    });
  } else {
    // Ensure the existing user is an admin so they can use the dashboard
    if (teacher.role !== "ADMIN") {
      console.log(`Promoting user ${teacher.name || teacher.email} to ADMIN...`);
      teacher = await prisma.user.update({
        where: { id: teacher.id },
        data: { role: "ADMIN" }
      });
    }
    console.log(`Using existing user ${teacher.name || teacher.email} as teacher.`);
  }

  // Quiz 1: General Knowledge
  console.log("Creating Quiz 1: General Knowledge...");
  await prisma.liveQuiz.create({
    data: {
      title: "General Knowledge Mastery",
      description: "Test your knowledge on world geography, history, and science.",
      teacherId: teacher.id,
      status: "LOBBY",
      joinCode: "123456",
      questions: {
        create: [
          {
            questionText: "What is the capital of France?",
            type: "MCQ",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAns: "Paris",
            timeLimitSeconds: 30,
            order: 0,
          },
          {
            questionText: "Which planet is known as the Red Planet?",
            type: "MCQ",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAns: "Mars",
            timeLimitSeconds: 30,
            order: 1,
          },
          {
            questionText: "Who wrote 'Romeo and Juliet'?",
            type: "MCQ",
            options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
            correctAns: "William Shakespeare",
            timeLimitSeconds: 30,
            order: 2,
          },
          {
            questionText: "What is the largest ocean on Earth?",
            type: "MCQ",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAns: "Pacific Ocean",
            timeLimitSeconds: 30,
            order: 3,
          },
          {
            questionText: "What is the chemical symbol for Gold?",
            type: "MCQ",
            options: ["Ag", "Au", "Fe", "Cu"],
            correctAns: "Au",
            timeLimitSeconds: 30,
            order: 4,
          }
        ]
      }
    }
  });

  // Quiz 2: Technology & Programming
  console.log("Creating Quiz 2: Technology & Programming...");
  await prisma.liveQuiz.create({
    data: {
      title: "Technology & Web Dev Quiz",
      description: "A quick quiz on modern web development tools and concepts.",
      teacherId: teacher.id,
      status: "LOBBY",
      joinCode: "654321",
      questions: {
        create: [
          {
            questionText: "What does HTML stand for?",
            type: "MCQ",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
            correctAns: "Hyper Text Markup Language",
            timeLimitSeconds: 30,
            order: 0,
          },
          {
            questionText: "Which language runs in a web browser?",
            type: "MCQ",
            options: ["Java", "C", "Python", "JavaScript"],
            correctAns: "JavaScript",
            timeLimitSeconds: 30,
            order: 1,
          },
          {
            questionText: "What is the purpose of React?",
            type: "MCQ",
            options: ["Database Management", "Building User Interfaces", "Server-side rendering", "Machine Learning"],
            correctAns: "Building User Interfaces",
            timeLimitSeconds: 30,
            order: 2,
          },
          {
            questionText: "Which company developed Next.js?",
            type: "MCQ",
            options: ["Facebook", "Google", "Vercel", "Microsoft"],
            correctAns: "Vercel",
            timeLimitSeconds: 30,
            order: 3,
          },
          {
            questionText: "What does CSS stand for?",
            type: "MCQ",
            options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
            correctAns: "Cascading Style Sheets",
            timeLimitSeconds: 30,
            order: 4,
          }
        ]
      }
    }
  });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
