import { ChatBot } from "@/components/ChatBot";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/0521ca68-3291-411e-b4ae-376e68abda36.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative min-h-[60vh] bg-gradient-to-b from-green-100 to-green-200 text-green-900 py-[5vh]">
      <div className="container mx-auto px-[4vw]">
        <h2 className="text-[5vmin] font-bold mb-[2vh]">جرين بوك</h2>
        <div className="flex flex-col-reverse md:flex-row items-center gap-[4vw]">
          <div className="w-full md:w-1/2 text-right">
            <h1 className="text-[8vmin] md:text-[6vmin] font-bold mb-[3vh]">الحصن والعلاج</h1>
            <p className="text-[4vmin] md:text-[2.5vmin] mb-[4vh] text-green-800">
              تعلم كيف تحصن نفسك وأهلك من الحسد والمس والسحر من القرآن والسنة النبوية
            </p>
            <ChatBot />
          </div>
          <div className="w-full md:w-1/2">
            {!imageLoaded && (
              <div className="w-full aspect-[3/4] bg-green-100/50 animate-pulse rounded-lg"></div>
            )}
            <img 
              src="/lovable-uploads/0521ca68-3291-411e-b4ae-376e68abda36.png"
              alt="كتاب الحصن والعلاج"
              className={`w-full max-w-[90%] mx-auto shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};