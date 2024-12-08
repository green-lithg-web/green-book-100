import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
}

export const TypewriterText = ({ text, onComplete }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 15); // تم تقليل وقت التأخير لجعل الكتابة أسرع

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span className="font-arabic text-base">{displayedText}</span>;
};