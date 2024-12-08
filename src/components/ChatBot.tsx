import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "مرحباً! كيف يمكنني مساعدتك اليوم؟", isUser: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");

    // إضافة رد افتراضي بسيط
    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const getResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("سعر") || lowerQuestion.includes("ثمن")) {
      return "سعر الكتاب 399 جنيه، متوفر للشحن لجميع المحافظات مجاناً مع الدفع عند الاستلام.";
    }
    if (lowerQuestion.includes("شحن") || lowerQuestion.includes("توصيل")) {
      return "نوفر خدمة الشحن مجاناً لجميع المحافظات مع إمكانية الدفع عند الاستلام.";
    }
    if (lowerQuestion.includes("محتوى") || lowerQuestion.includes("فهرس")) {
      return "الكتاب يحتوي على عشرة فصول تتناول مواضيع مثل عالم الجن، الرقية، السحر، العين، الحسد، المس، الوسواس القهري، وتحصين البيت.";
    }
    return "يمكنك التواصل مع خدمة العملاء للحصول على مزيد من المعلومات. هل لديك أسئلة أخرى؟";
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
        <Card className="w-80 h-96 flex flex-col">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
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