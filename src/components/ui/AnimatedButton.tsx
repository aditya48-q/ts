import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';

type ButtonBaseProps = PropsWithChildren<{
  className?: string;
  href?: string;
  as?: 'button' | 'a';
}>;

type NativeButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type NativeAnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = NativeButtonProps | NativeAnchorProps;

export function AnimatedButton({ as = 'button', href, children, className = '', ...props }: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${(event.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--cursor-y', `${(event.clientY / window.innerHeight) * 100}%`);
    };

    node.addEventListener('pointermove', handlePointerMove);
    return () => node.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const currentTarget = event.currentTarget as HTMLElement;
    const rect = currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now() + Math.random();

    setRipples((currentRipples) => [...currentRipples, { id, x, y }]);

    window.setTimeout(() => {
      setRipples((currentRipples) => currentRipples.filter((ripple) => ripple.id !== id));
    }, 650);

    if (props.onClick) {
      props.onClick(event as never);
    }
  };

  const gradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #0ea5e9 100%)',
    backgroundSize: '200% 200%',
  } as const;

  const content = (
    <>
      <motion.span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.18), transparent 55%)' }}
      />
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 16,
            height: 16,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 650ms ease-out forwards',
          }}
        />
      ))}
    </>
  );

  const classNames =
    `relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40 ${className}`;

  if (as === 'a') {
    const MotionAnchor = motion.a as any;

    return (
      <MotionAnchor
        ref={ref as never}
        href={href}
        onClick={handleClick}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className={classNames}
        style={{ ...gradientStyle, ...(props.style ?? {}) }}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </MotionAnchor>
    );
  }

  const MotionButton = motion.button as any;
  const { type, ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <MotionButton
      ref={ref as never}
      type={type ?? 'button'}
      onClick={handleClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={classNames}
      style={{ ...gradientStyle, ...(props.style ?? {}) }}
      {...buttonProps}
    >
      {content}
    </MotionButton>
  );
}
