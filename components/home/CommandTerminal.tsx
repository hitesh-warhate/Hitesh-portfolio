"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal } from '../terminal/Terminal';
import { TerminalPrompt } from '../terminal/TerminalPrompt';
import { TerminalCursor } from '../terminal/TerminalCursor';
import { cn } from '@/lib/utils';
import { User, Code, Terminal as TerminalIcon, Briefcase, FileText, Mail } from 'lucide-react';
import { Github } from '@/components/icons';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function CommandTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd) {
      setCommandList(prev => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
    }

    let output: React.ReactNode = null;

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="space-y-2 mb-4">
            <p>Available commands:</p>
            <div className="grid grid-cols-[140px_1fr] gap-2 text-muted">
              <span className="text-blue-accent flex items-center gap-1.5"><User size={14}/> about</span><span>→ About me</span>
              <span className="text-warning flex items-center gap-1.5"><Code size={14}/> projects</span><span>→ View projects</span>
              <span className="text-cyan-accent flex items-center gap-1.5"><TerminalIcon size={14}/> skills</span><span>→ Technical skills</span>
              <span className="text-pink-accent flex items-center gap-1.5"><Briefcase size={14}/> experience</span><span>→ Experience</span>
              <span className="text-primary flex items-center gap-1.5"><Mail size={14}/> contact</span><span>→ Contact me</span>
              <span className="text-yellow-accent flex items-center gap-1.5"><FileText size={14}/> resume</span><span>→ Download resume</span>
              <span className="text-success flex items-center gap-1.5"><Github size={14}/> github</span><span>→ Open GitHub</span>
              <span className="text-text flex items-center gap-1.5">clear</span><span>→ Clear terminal</span>
            </div>
          </div>
        );
        break;
      case 'about':
      case 'projects':
      case 'skills':
      case 'experience':
      case 'contact':
      case 'resume':
      case 'github':
        output = <div className="mb-4 text-cyan-accent">Executing {trimmedCmd}.exe...</div>;
        setTimeout(() => {
          const el = document.getElementById(trimmedCmd);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else if (trimmedCmd === 'resume') {
            window.open('https://drive.google.com/file/d/1pyZzi4_JEAEqgWv2NvAe7AqQzsm5nYIz/view?usp=sharing', '_blank');
          }
        }, 300);
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = null;
        break;
      case 'sudo hire hitesh':
        output = <div className="mb-4 text-primary">[sudo] authentication successful.<br/>Excellent choice. 😎</div>;
        break;
      case 'coffee':
        output = <div className="mb-4 text-warning">☕ Brewing developer fuel...</div>;
        break;
      case 'sudo rm -rf /life':
        output = <div className="mb-4 text-error">Permission denied.<br/>Nice try.</div>;
        break;
      default:
        output = (
          <div className="mb-4">
            <span className="text-error">command not found: {trimmedCmd}</span>
            <br />
            Type 'help' to see available commands.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIndex = historyIndex + 1 < commandList.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandList[commandList.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandList[commandList.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="w-full mt-12 mb-24">
      <Terminal title="bash" className="min-h-[120px]" onClick={focusInput}>
        <div 
          ref={scrollRef}
          className="w-full flex flex-col font-mono text-sm"
        >
          <div className="mb-4 text-muted">
            <span className="text-primary">hitesh@portfolio:~$</span> help
            <div className="mt-4 flex flex-col gap-2 max-w-sm">
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-blue-accent flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('about')}><User size={14}/> about</span>
                <span>about me</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-warning flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('projects')}><Code size={14}/> projects</span>
                <span>my work</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-cyan-accent flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('skills')}><TerminalIcon size={14}/> skills</span>
                <span>technologies</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-pink-accent flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('experience')}><Briefcase size={14}/> experience</span>
                <span>journey</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-success flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('github')}><Github size={14}/> github</span>
                <span>live stats</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-yellow-accent flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('resume')}><FileText size={14}/> resume</span>
                <span>my resume</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] group">
                <span className="text-primary flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCommand('contact')}><Mail size={14}/> contact</span>
                <span>get in touch</span>
              </div>
            </div>
          </div>
          
          {history.map((item, i) => (
            <div key={i} className="mb-2">
              <TerminalPrompt command={item.command} />
              <div className="mt-1">{item.output}</div>
            </div>
          ))}
          
          <div className="mt-auto flex items-center">
            <TerminalPrompt />
            <div className="flex-1 relative ml-1.5 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-text absolute inset-0 opacity-0 cursor-text"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="text-text whitespace-pre relative pointer-events-none">
                {input}
                <TerminalCursor />
              </span>
            </div>
          </div>
        </div>
      </Terminal>
    </div>
  );
}
