"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { 
  User, Briefcase, FileCode, Wrench, Mail, 
  Moon, Sun, FileText, 
  Monitor, TerminalSquare
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[20vh] bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <Command 
        className="w-full max-w-2xl bg-panel border border-border-primary rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        loop
      >
        <div className="flex items-center border-b border-border-primary px-3">
          <TerminalSquare className="w-5 h-5 text-muted mr-2" />
          <Command.Input 
            className="flex-1 h-14 bg-transparent outline-none text-text placeholder:text-muted" 
            placeholder="Type a command or search..." 
          />
          <div className="flex gap-1 ml-2">
            <kbd className="bg-background-secondary border border-border-primary rounded px-2 py-1 text-xs font-mono text-muted">ESC</kbd>
          </div>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
          <Command.Empty className="py-6 text-center text-muted">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="text-muted text-xs font-semibold px-2 py-1.5 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1">
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/#about"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-primary transition-colors text-sm text-text"
            >
              <User className="w-4 h-4" />
              <span>About Me</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/#experience"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-primary transition-colors text-sm text-text"
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/#projects"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-primary transition-colors text-sm text-text"
            >
              <FileCode className="w-4 h-4" />
              <span>Projects</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/#skills"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-primary transition-colors text-sm text-text"
            >
              <Wrench className="w-4 h-4" />
              <span>Skills</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/#contact"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-primary transition-colors text-sm text-text"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-border-primary my-2" />

          <Command.Group heading="Actions" className="text-muted text-xs font-semibold px-2 py-1.5 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1">
            <Command.Item 
              onSelect={() => runCommand(() => {
                navigator.clipboard.writeText("your.email@example.com");
                // Could add a toast here
              })}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-blue-accent transition-colors text-sm text-text"
            >
              <Mail className="w-4 h-4" />
              <span>Copy Email Address</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-warning transition-colors text-sm text-text"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-border-primary my-2" />

          <Command.Group heading="Theme" className="text-muted text-xs font-semibold px-2 py-1.5 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1">
            <Command.Item 
              onSelect={() => runCommand(() => setTheme("light"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-yellow-500 transition-colors text-sm text-text"
            >
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-indigo-400 transition-colors text-sm text-text"
            >
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => setTheme("system"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-text transition-colors text-sm text-text"
            >
              <Monitor className="w-4 h-4" />
              <span>System Theme</span>
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-border-primary my-2" />

          <Command.Group heading="Socials" className="text-muted text-xs font-semibold px-2 py-1.5 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-1">
            <Command.Item 
              onSelect={() => runCommand(() => window.open("https://github.com/yourusername", "_blank"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-success transition-colors text-sm text-text"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => window.open("https://linkedin.com/in/yourusername", "_blank"))}
              className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-background-secondary aria-selected:bg-background-secondary aria-selected:text-blue-500 transition-colors text-sm text-text"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="border-t border-border-primary p-2 flex justify-end">
           <div className="flex items-center gap-2 text-xs text-muted">
             <span>Navigate with</span>
             <kbd className="bg-background-secondary border border-border-primary rounded px-1.5 py-0.5">↑</kbd>
             <kbd className="bg-background-secondary border border-border-primary rounded px-1.5 py-0.5">↓</kbd>
             <span className="ml-2">Select with</span>
             <kbd className="bg-background-secondary border border-border-primary rounded px-1.5 py-0.5">Enter</kbd>
           </div>
        </div>
      </Command>
    </div>
  );
}
