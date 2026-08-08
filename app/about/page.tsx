import React from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';

export const metadata = {
  title: 'About | Hitesh Warhate',
  description: 'About Hitesh Warhate - Software Developer & AI/ML Enthusiast',
};

export default function About() {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Terminal title="bash">
        <TerminalPrompt command="cat about.md" />
        
        <div className="mt-6 prose prose-invert prose-p:text-text prose-headings:text-primary max-w-none font-mono">
          <h1 className="text-2xl font-bold border-b border-border-primary pb-2 mb-4"># Hitesh Warhate</h1>
          
          <h2 className="text-xl text-text mt-4 mb-2">Software Developer</h2>
          <h3 className="text-lg text-muted mb-6">Information Technology Student</h3>
          
          <p className="mb-4 text-text">
            I am a developer focused on building
            real-world software applications,
            backend systems and intelligent solutions.
          </p>

          <p className="mb-2 text-text">My primary interests include:</p>
          <ul className="list-none space-y-1 mb-8 pl-0">
            <li><span className="text-primary mr-2">→</span> Backend Development</li>
            <li><span className="text-primary mr-2">→</span> Full-Stack Development</li>
            <li><span className="text-primary mr-2">→</span> Artificial Intelligence</li>
            <li><span className="text-primary mr-2">→</span> Machine Learning</li>
            <li><span className="text-primary mr-2">→</span> Cloud & DevOps</li>
            <li><span className="text-primary mr-2">→</span> Data Structures & Algorithms</li>
          </ul>

          <h2 className="text-xl font-bold border-b border-border-primary pb-2 mb-4 mt-8">## Education</h2>
          <div className="mb-8">
            <h3 className="text-lg text-text mb-1">B.Tech in Information Technology</h3>
            <p className="text-muted mb-2">St. Vincent Pallotti College of Engineering & Technology, Nagpur</p>
            <div className="flex flex-col sm:flex-row sm:gap-8 text-sm">
              <p><span className="text-muted">CGPA:</span> <span className="text-primary">8.04</span></p>
              <p><span className="text-muted">Graduation:</span> <span className="text-primary">May 2027</span></p>
            </div>
          </div>

          <h2 className="text-xl font-bold border-b border-border-primary pb-2 mb-4 mt-8">## Interests</h2>
          <ul className="list-none space-y-1 mb-4 pl-0 grid sm:grid-cols-2 gap-x-4">
            <li><span className="text-primary mr-2">→</span> Full-Stack Development</li>
            <li><span className="text-primary mr-2">→</span> Backend Engineering</li>
            <li><span className="text-primary mr-2">→</span> AI / ML</li>
            <li><span className="text-primary mr-2">→</span> Cloud Computing</li>
            <li><span className="text-primary mr-2">→</span> DevOps</li>
            <li><span className="text-primary mr-2">→</span> Problem Solving</li>
          </ul>
        </div>
      </Terminal>
    </div>
  );
}
