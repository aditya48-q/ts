import type { HTMLAttributes, PropsWithChildren } from 'react';

export function GlassCard({ className = '', children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`glass-panel accent-border rounded-3xl ${className}`} {...props}>
      {children}
    </div>
  );
}
