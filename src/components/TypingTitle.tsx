'use client';

import { useEffect, useState } from "react";

interface TextChunk {
  text: string;
  className: string;
}

export const TypingTitle = () => {
  const content: TextChunk[] = [
    { text: 'A Frontend Developer deeply focused on ', className: 'text-black' },
    { text: 'communication', className: 'text-[#BF092F]' },
    { text: ', ', className: 'text-black' },
    { text: '\n', className: '' },
    { text: 'interaction', className: 'text-[#BF092F]' },
    { text: ', and ', className: 'text-black' },
    { text: 'aesthetics', className: 'text-[#BF092F]' },
    { text: '.', className: 'text-black' },
  ];

  const [displayedContent, setDisplayedContent] = useState<TextChunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentChunkIndex >= content.length) return;
    const timeout = setTimeout(() => {
      const currentChunk = content[currentChunkIndex];
      const slicedText = currentChunk.text.slice(0, currentCharIndex + 1);
      setDisplayedContent((prev) => {
        const newContent = [...prev];
        if (newContent[currentChunkIndex]) {
          newContent[currentChunkIndex] = { ...currentChunk, text: slicedText };
        } else {
          newContent.push({ ...currentChunk, text: slicedText });
        }
        return newContent;
      });
      if (currentCharIndex < currentChunk.text.length - 1) {
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentChunkIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 40);
    return () => clearTimeout(timeout);
  }, [currentChunkIndex, currentCharIndex]);

  return (
    <div className="font-semibold text-[40px] md:text-[60px] leading-tight whitespace-pre-wrap">
      {displayedContent.map((chunk, index) => (
        <span key={index} className={chunk.className}>
          {chunk.text}
        </span>
      ))}
      <span className="animate-pulse ml-1 inline-block w-[4px] h-[50px] md:h-[70px] bg-black align-middle"></span>
    </div>
  );
};