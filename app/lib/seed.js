import prisma from "./prisma";

export async function seed() {
   try {
    const newUser= await prisma.user.create({
         data:{
             clerkUserId:"abcderfra",
             email:"rishabhkiemail.com"
         }
     })
     console.log(newUser)
   } catch (error) {
    console.log("error",error)
   }
}

//  id                   String   @id @default(cuid())
//   clerkUserId          String   @unique
//   email                String   @unique
//   name                 String?
//   phone                String?
//   onboardingCompleted  Boolean  @default(false)
//   role                 Role     @default(USER)

//   enrollments          Enrollment[]
//   testAttempts         TestAttempt[]

//   createdAt            DateTime @default(now())
//   updatedAt            DateTime @updatedAt