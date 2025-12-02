import { Header } from "@/components/header";
import HomeHero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import { LightRays } from "@/components/ui/light-rays";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      <Header />

      {/* Background light rays - white/ambient for dark mode, green for light mode */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <LightRays
          count={6}
          color="rgba(255, 255, 255, 0.35)"
          blur={40}
          speed={25}
          length="60vh"
          className="dark:block hidden"
        />
        <LightRays
          count={6}
          color="rgba(34, 197, 94, 0.28)"
          blur={40}
          speed={25}
          length="60vh"
          className="dark:hidden block"
        />
      </div>

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          <HomeHero />
          <Features />
        </div>
      </main>
    </div>
  );
}
