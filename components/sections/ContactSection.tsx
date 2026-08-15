"use client";

import React, { useState } from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalCursor } from '@/components/terminal/TerminalCursor';
import { Github, Linkedin } from '@/components/icons';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Submission failed:', data.message);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="w-full scroll-mt-24 flex flex-col space-y-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-text">CONTACT</h2>
        <div className="h-[1px] flex-1 bg-border-primary/50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <Terminal title="socials.exe" titleClassName="text-pink-accent" className="h-full border-pink-accent/30 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <TerminalPrompt command="./contact --socials" />
            
            <div className="mt-8 font-mono space-y-6">
              <h3 className="text-4xl font-bold text-text">Let's build something useful.</h3>
              
              <p className="text-muted leading-relaxed max-w-md">
                I'm currently looking for new opportunities, internships, and freelance projects. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="pt-8 border-t border-border-primary/50 flex flex-col gap-4">
                <div className="text-sm text-pink-accent mb-2">Connect with me:</div>
                <div className="flex items-center gap-6">
                  <a href="https://github.com/hitesh-warhate" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-pink-accent transition-colors flex items-center gap-2 group">
                    <Github size={24} />
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">GitHub</span>
                  </a>
                  <a href="#" className="text-muted hover:text-cyan-accent transition-colors flex items-center gap-2 group">
                    <Linkedin size={24} />
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">LinkedIn</span>
                  </a>
                  <a href="mailto:hiteshwarhate@example.com" className="text-muted hover:text-pink-accent transition-colors flex items-center gap-2 group">
                    <Mail size={24} />
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </Terminal>
        </div>
        
        <div className="flex flex-col">
          <Terminal title="message.exe" titleClassName="text-cyan-accent" className="h-full border-cyan-accent/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 font-mono h-full">
              <div className="flex flex-col space-y-1">
                <label htmlFor="name" className="text-xs text-cyan-accent">NAME</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-background-secondary border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-cyan-accent transition-colors font-sans"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-xs text-cyan-accent">EMAIL</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="bg-background-secondary border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-cyan-accent transition-colors font-sans"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex flex-col space-y-1">
                <label htmlFor="subject" className="text-xs text-cyan-accent">SUBJECT</label>
                <input 
                  id="subject"
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="bg-background-secondary border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-cyan-accent transition-colors font-sans"
                  placeholder="Freelance Project"
                />
              </div>
              
              <div className="flex flex-col space-y-1 flex-1">
                <label htmlFor="message" className="text-xs text-cyan-accent">MESSAGE</label>
                <textarea 
                  id="message"
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="bg-background-secondary border border-border-primary rounded-sm p-3 text-text focus:outline-none focus:border-cyan-accent transition-colors min-h-[120px] resize-none flex-1 font-sans"
                  placeholder="Hello Hitesh, I'd like to discuss..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className={cn(
                  "mt-4 w-full py-3 px-4 font-bold rounded-sm border transition-all flex items-center justify-center gap-2",
                  status === 'success' ? "bg-success text-background border-success" : 
                  status === 'error' ? "bg-red-500 text-white border-red-500" :
                  status === 'sending' ? "bg-panel text-muted border-border-primary" : 
                  "bg-pink-accent text-background border-pink-accent hover:bg-pink-accent/90 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                )}
              >
                {status === 'idle' && <span>[ SEND MESSAGE ]</span>}
                {status === 'sending' && <span className="flex items-center gap-2">TRANSMITTING <TerminalCursor /></span>}
                {status === 'success' && <span>✓ MESSAGE SENT SUCCESSFULLY</span>}
                {status === 'error' && <span>✕ FAILED TO SEND MESSAGE</span>}
              </button>
            </form>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
