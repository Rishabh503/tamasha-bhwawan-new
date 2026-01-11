import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0f0f] via-[#4a1c1c] to-[#2b0f0f] px-4">
      
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-6">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-[#4a1c1c]">
            Welcome to Tamasha Bhawan
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign in to continue your musical journey
          </p>
        </div>

        {/* Clerk Sign In */}
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none p-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",

              socialButtonsBlockButton:
                "border border-gray-300 rounded-lg hover:bg-gray-100 transition",

              formButtonPrimary:
                "bg-[#4a1c1c] hover:bg-[#3a1515] text-white rounded-lg",

              formFieldInput:
                "rounded-lg border-gray-300 focus:border-[#4a1c1c] focus:ring-[#4a1c1c]",

              footerActionLink:
                "text-[#4a1c1c] hover:underline",
            },
          }}
        />
      </div>
    </div>
  );
}
