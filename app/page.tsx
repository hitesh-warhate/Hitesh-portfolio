import { Hero } from "@/components/home/Hero";
import { CommandTerminal } from "@/components/home/CommandTerminal";
import { GithubSection } from "@/components/sections/GithubSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col items-center">
      <Hero />
      <CommandTerminal />
      
      {/* 
        The components below are wrapped in a flex column with large gaps 
        to ensure the requested 80-120px section spacing. 
      */}
      <div className="w-full flex flex-col gap-24 md:gap-32 pb-24">
        <GithubSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </div>
  );
}
