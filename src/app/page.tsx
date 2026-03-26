// app/page.tsx
import { Suspense } from "react";
import HomePage from "./component/HomePage";

export default function Page() {
  return (
    // The fallback is what shows for a split second while Next.js 
    // prepares the client-side search params.
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white animate-pulse">Initializing Space Search...</p>
      </div>
    }>
      <HomePage />
    </Suspense>
  );
}