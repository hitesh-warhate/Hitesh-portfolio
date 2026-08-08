"use client";

import React, { useState } from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalCursor } from '@/components/terminal/TerminalCursor';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'initializing' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email address.";
    if (!formData.message.trim() || formData.message.length < 10) return "Message must be at least 10 characters long.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMsg(error);
      setStatus('error');
      return;
    }

    setStatus('initializing');
    setErrorMsg('');
    
    // Simulate initialization
    setTimeout(() => {
      setStatus('sending');
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStatus('success'), 500);
        }
      }, 150);
    }, 1000);
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Terminal title="bash">
          <TerminalPrompt command="./contact" />
          
          <div className="mt-6 font-mono">
            {status === 'idle' || status === 'error' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-primary mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-primary mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-primary mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-primary mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-primary transition-colors font-sans resize-none"
                    placeholder="Hello Hitesh..."
                  />
                </div>

                {status === 'error' && (
                  <div className="text-error mt-4">
                    ERROR: {errorMsg}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 bg-primary text-background font-bold hover:bg-primary/90 transition-colors rounded-sm terminal-border flex justify-center items-center gap-2"
                >
                  [ SEND MESSAGE ]
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {status === 'initializing' && (
                  <>
                    <p className="text-muted">Initializing secure connection...</p>
                    <p className="text-primary">[✓] Name</p>
                    <p className="text-primary">[✓] Email</p>
                    <p className="text-primary">[✓] Message</p>
                    <p className="text-text mt-4">All set!</p>
                    <div className="flex items-center gap-2 mt-4">
                      <TerminalCursor />
                    </div>
                  </>
                )}
                
                {status === 'sending' && (
                  <>
                    <p className="text-muted">Initializing secure connection...</p>
                    <p className="text-primary">[✓] Name</p>
                    <p className="text-primary">[✓] Email</p>
                    <p className="text-primary">[✓] Message</p>
                    <p className="text-text mt-4">All set!</p>
                    <p className="text-muted mt-4">Sending message...</p>
                    
                    <div className="flex items-center gap-2 text-primary mt-2">
                      <span>[</span>
                      <div className="w-full h-3 bg-panel border border-border-primary rounded-sm overflow-hidden flex-1">
                        <div 
                          className="h-full bg-primary transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span>] {progress}%</span>
                    </div>
                  </>
                )}
                
                {status === 'success' && (
                  <>
                    <p className="text-primary">[✓] Name</p>
                    <p className="text-primary">[✓] Email</p>
                    <p className="text-primary">[✓] Message</p>
                    <p className="text-text mt-4">All set!</p>
                    <p className="text-primary mt-4">Sending message... 100%</p>
                    <div className="mt-8 p-4 border border-primary/50 bg-primary/10 rounded-sm">
                      <p className="text-primary">✓ Message successfully transmitted.</p>
                      <p className="text-muted text-sm mt-2">I will get back to you as soon as possible.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="mt-6 px-4 py-2 border border-border-primary hover:border-primary text-muted hover:text-primary transition-colors text-sm"
                    >
                      [ SEND ANOTHER ]
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </Terminal>

        <div className="flex flex-col space-y-6">
          <Terminal title="socials">
            <div className="flex flex-col space-y-4 font-mono">
              <a href="mailto:contact@example.com" className="group flex items-center justify-between p-4 border border-border-primary hover:border-primary bg-panel rounded-sm transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                <div className="flex items-center gap-3">
                  <Mail className="text-muted group-hover:text-primary transition-colors" />
                  <span className="text-text">EMAIL</span>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              
              <a href="#" className="group flex items-center justify-between p-4 border border-border-primary hover:border-primary bg-panel rounded-sm transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                <div className="flex items-center gap-3">
                  <Linkedin className="text-muted group-hover:text-primary transition-colors" />
                  <span className="text-text">LinkedIn</span>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              
              <a href="https://github.com/hitesh-warhate" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 border border-border-primary hover:border-primary bg-panel rounded-sm transition-all hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                <div className="flex items-center gap-3">
                  <Github className="text-muted group-hover:text-primary transition-colors" />
                  <span className="text-text">GitHub</span>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </Terminal>
          
          <Terminal title="status">
            <div className="font-mono text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Availability</span>
                <span className="text-primary">Open to opportunities</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Response time</span>
                <span className="text-text">&lt; 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Timezone</span>
                <span className="text-text">IST (UTC+5:30)</span>
              </div>
            </div>
          </Terminal>
        </div>
      </div>
    </div>
  );
}
