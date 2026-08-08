import React from 'react';

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)]" />
    </div>
  );
}
