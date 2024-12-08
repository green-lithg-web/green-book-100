import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "مرحباً! أنا هنا لمساعدتك في معرفة المزيد عن كتبنا المميزة. كيف يمكنني مساعدتك اليوم؟\n\nيمكنك اختيار أحد الخيارات التالية:\n1. معلومات عن الكتاب\n2. كيفية الطلب\n3. معلومات الشحن والدفع\n4. فهرس الكتاب\n5. هل يتوفر إصدار إلكتروني؟", isUser: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");

    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const getResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // معلومات عن الكتاب
    if (lowerQuestion.includes("معلومات") || lowerQuestion.includes("الكتاب") || lowerQuestion.includes("1")) {
      return `الكتاب بعنوان "الحصن والعلاج"

الكتاب مستند إلى أبحاث ومؤلفات علماء بارزين مثل:
• الشيخ ابن باز
• الشيخ ابن عثيمين
• الشيخ خالد الحبيشي

السعر: 399 جنيه مصري

الوصف:
يقدم هذا الكتاب دليلاً شاملاً ومبسطاً حول:
• عالم الجن ومفهوم الرقية
• الحسد، العين، السحر، وحالات المس
• كيفية تحصين المنازل
• حلول عملية للتعامل مع الوسواس القهري
• مناقشة موضوع الكهانة وادعاء علم الغيب

هل ترغب في معرفة المزيد عن كيفية طلب الكتاب أو تفاصيل إضافية؟`;
    }

    // كيفية الطلب
    if (lowerQuestion.includes("طلب") || lowerQuestion.includes("شراء") || lowerQuestion.includes("2")) {
      return `يمكنك طلب الكتاب بسهولة عبر:

1. الضغط على زر "طلب الكتاب الآن" في صفحتنا
2. التواصل معنا عبر رقم خدمة العملاء أو الواتساب

هل ترغب في معرفة طريقة الدفع والشحن؟`;
    }

    // معلومات الشحن والدفع
    if (lowerQuestion.includes("شحن") || lowerQuestion.includes("دفع") || lowerQuestion.includes("3")) {
      return `معلومات الشحن والدفع:

• الشحن مجاني لجميع المحافظات
• الدفع عند الاستلام

هل ترغب في معرفة فهرس الكتاب أو تفاصيل إضافية؟`;
    }

    // فهرس الكتاب
    if (lowerQuestion.includes("فهرس") || lowerQuestion.includes("محتويات") || lowerQuestion.includes("4")) {
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
الفصل العاشر: الكهانة وادعاء علم الغيب في الإسلام (من صفحة 196 إلى 203)

هل ترغب في معرفة المزيد عن إصدار إلكتروني للكتاب؟`;
    }

    // النسخة الإلكترونية
    if (lowerQuestion.includes("إلكتروني") || lowerQuestion.includes("5")) {
      return "نعم، تتوفر نسخة إلكترونية من الكتاب. يمكنك الحصول عليها من خلال الرابط المتاح في الموقع.\n\nهل تحتاج إلى مساعدة إضافية في شيء آخر؟";
    }

    return "يمكنك اختيار أحد الخيارات التالية:\n1. معلومات عن الكتاب\n2. كيفية الطلب\n3. معلومات الشحن والدفع\n4. فهرس الكتاب\n5. هل يتوفر إصدار إلكتروني؟";
  };

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
            <span>خدمة العملاء</span>
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
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[90%] whitespace-pre-wrap ${
                    message.isUser
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1"
              dir="rtl"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};