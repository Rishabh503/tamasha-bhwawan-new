import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targetEmail = "rishabhtripathi2022@gmail.com";
  
  // 1. Find the target user
  let user = await prisma.user.findUnique({
    where: { email: targetEmail }
  });

  if (!user) {
    console.log(`User ${targetEmail} not found in database. Please log in once first!`);
    return;
  }

  // 2. Make them an admin
  if (user.role !== "ADMIN") {
    user = await prisma.user.update({
      where: { email: targetEmail },
      data: { role: "ADMIN" }
    });
    console.log(`Updated ${targetEmail} to ADMIN role.`);
  } else {
    console.log(`${targetEmail} is already an ADMIN.`);
  }

  // 3. Re-assign all quizzes to this user so they show up on the dashboard
  const updatedQuizzes = await prisma.liveQuiz.updateMany({
    data: { teacherId: user.id }
  });

  console.log(`Re-assigned ${updatedQuizzes.count} quizzes to ${targetEmail}.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
