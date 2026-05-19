import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  highlightWords: string[];
  speed?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, highlightWords, speed = 25, className = '' }) => {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setShowCursor(true);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cursor = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursor);
  }, []);

  const renderText = () => {
    if (!displayed) return null;
    
    const lower = displayed.toLowerCase();
    const ranges: { start: number; end: number; word: string }[] = [];

    for (const word of highlightWords) {
      const lowerWord = word.toLowerCase();
      let idx = 0;
      while (true) {
        const pos = lower.indexOf(lowerWord, idx);
        if (pos === -1 || pos >= displayed.length) break;
        ranges.push({ start: pos, end: pos + word.length, word });
        idx = pos + 1;
      }
    }

    ranges.sort((a, b) => a.start - b.start);

    const merged: { start: number; end: number }[] = [];
    for (const r of ranges) {
      if (r.end > displayed.length) continue;
      if (merged.length === 0 || r.start > merged[merged.length - 1].end) {
        merged.push({ start: r.start, end: r.end });
      } else {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, r.end);
      }
    }

    const parts: React.ReactNode[] = [];
    let last = 0;
    for (const m of merged) {
      if (m.start > last) {
        parts.push(<span key={`t-${last}`}>{displayed.slice(last, m.start)}</span>);
      }
      parts.push(
        <span key={`h-${m.start}`} className="text-[#ffffff] underline decoration-[#ffffff]/60 underline-offset-4 decoration-2 font-bold">
          {displayed.slice(m.start, m.end)}
        </span>
      );
      last = m.end;
    }
    if (last < displayed.length) {
      parts.push(<span key={`t-${last}`}>{displayed.slice(last)}</span>);
    }

    return parts;
  };

  return (
    <span className={className}>
      {renderText()}
      <span className={`inline-block w-[2px] h-[0.8em] bg-[#ffffff] ml-0.5 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};
