import React, { useEffect, useRef } from 'react';

interface CountUpProps {
  value: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1600 }) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const match = value.match(/([\d,]+(?:\.\d+)?)/);
    if (!match) return;

    const target = Number(match[0].replace(/,/g, ''));
    if (!Number.isFinite(target)) return;

    const decimals = (match[0].split('.')[1] || '').length;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index || 0) + match[0].length);
    const formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    const renderCount = (number: number) => {
      if (countRef.current) {
        countRef.current.textContent = `${prefix}${formatter.format(number)}${suffix}`;
      }
    };

    const startAnimation = () => {
      const startTime = performance.now();
      let frameId = 0;
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        renderCount(target * easedProgress);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(animate);
        }
      };

      frameId = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(frameId);
    };

    renderCount(0);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window) || !countRef.current) {
      renderCount(target);
      return;
    }

    const element = countRef.current;
    let stopAnimation = () => {};
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      stopAnimation = startAnimation();
    }, { threshold: 0.3 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [duration, value]);

  const numericPart = value.match(/([\d,]+(?:\.\d+)?)/)?.[0];
  const decimalPlaces = (numericPart?.split('.')[1] || '').length;
  const initialText = numericPart
    ? value.replace(numericPart, new Intl.NumberFormat(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      }).format(0))
    : value;

  return (
    <span ref={countRef} aria-label={value} aria-live="off">
      {initialText}
    </span>
  );
};
