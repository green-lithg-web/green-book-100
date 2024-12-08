import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, VolumeX, Volume2 } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatOptions } from "./ChatOptions";
import { speakArabicText } from "../utils/speechUtils";

const INITIAL_MESSAGE = "مرحباً! أنا هنا لمساعدتك في معرفة المزيد عن كتبنا المميزة. كيف يمكنني مساعدتك اليوم؟";

const OPTIONS = [
  { id: 1, text: "معلومات عن الكتاب" },
  { id: 2, text: "كيفية الطلب" },
  { id: 3, text: "معلومات الشحن والدفع" },
  { id: 4, text: "فهرس الكتاب" },
  { id: 5, text: "هل يتوفر إصدار إلكتروني؟" }
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: INITIAL_MESSAGE, isUser: false }
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getResponse = (option: number) => {
    switch (option) {
      case 1:
        return `الكتاب بعنوان "الحصن والعلاج"

الكتاب مستند إلى أبحاث ومؤلفات علماء بارزين مثل:
• الشيخ ابن باز
• الشيخ ابن عثيمين
• الشيخ خالد الحبيشي

السعر: 399 جنيه مصري

الوصف:
يقدم هذا الكتاب دليلاً شاملاً ومبسطًا حول:
• عالم الجن ومفهوم الرقية
• الحسد، العين، السحر، وحالات المس
• كيفية تحصين المنازل
• حلول عملية للتعامل مع الوسواس القهري
• مناقشة موضوع الكهانة وادعاء علم الغيب`;

      case 2:
        return `يمكنك طلب الكتاب بسهولة عبر:

1. الضغط على زر "طلب الكتاب الآن" في صفحتنا
2. التواصل معنا عبر رقم خدمة العملاء أو الواتساب`;

      case 3:
        return `معلومات الشحن والدفع:

• الشحن مجاني لجميع المحافظات
• الدفع عند الاستلام`;

      case 4:
        return `فهرس الكتاب:

الفصل الأول: عالم الجن (من صفحة 3 إلى 35)
الفصل الثاني: مفهوم الرقية (من صفحة 36 إلى 47)
الفصل الثالث: كيف تكون معالجاً بالقرآن والسنة (من صفحة 48 إلى 63)
الفصل الرابع: السحر (من صفحة 64 إلى 100)
الفصل الخامس: العين (من صفحة 101 إلى 117)
الفصل السادس: الحسد (من صفحة 118 إلى 135)
الفصل السابع: المس (حالات المس والسحر) (من صفحة 136 إلى 171)
الفصل الثامن: الوسواس القهري (من صفحة 172 إلى 182)
الفصل التاسع: تحصين البيت (من صفحة 183 إلى 195)
الفصل العاشر: الكهانة وادعاء علم الغيب في الإسلام (من صفحة 196 إلى 203)`;

      case 5:
        return "نعم، تتوفر نسخة إلكترونية من الكتاب. يمكنك الحصول عليها من خلال الرابط المتاح في الموقع.";

      default:
        return INITIAL_MESSAGE;
    }
  };

  const handleOptionClick = (option: number) => {
    const response = getResponse(option);
    setMessages(prev => [...prev, 
      { text: OPTIONS[option - 1].text, isUser: true },
      { text: response, isUser: false }
    ]);
    
    if (!isMuted) {
      speakArabicText(response, 
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  useEffect(() => {
    // Load voices when component mounts
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };

    if (isOpen && !isMuted) {
      speakArabicText(INITIAL_MESSAGE,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isOpen, isMuted]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[600px] flex flex-col">
          <div className="p-3 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>خدمة العملاء</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="hover:bg-primary/90 text-white"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/90 text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-right">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
          <ChatOptions options={OPTIONS} onOptionClick={handleOptionClick} />
        </Card>
      )}
    </div>
  );
};
