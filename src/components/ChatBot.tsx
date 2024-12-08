import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Book, ShoppingCart, Truck, List, Smartphone, Bot, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatOptions } from "./ChatOptions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const INITIAL_MESSAGE = "مرحباً! أنا هنا لمساعدتك في معرفة المزيد عن كتبنا المميزة. كيف يمكنني مساعدتك اليوم؟";

const OPTIONS = [
  { id: 1, text: "معلومات الكتاب", icon: <Book className="w-[1.25em] h-[1.25em]" /> },
  { id: 2, text: "طلب الكتاب", icon: <ShoppingCart className="w-[1.25em] h-[1.25em]" /> },
  { id: 3, text: "الشحن والدفع", icon: <Truck className="w-[1.25em] h-[1.25em]" /> },
  { id: 4, text: "فهرس الكتاب", icon: <List className="w-[1.25em] h-[1.25em]" /> },
  { id: 5, text: "النسخة الإلكترونية", icon: <Smartphone className="w-[1.25em] h-[1.25em]" /> }
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: INITIAL_MESSAGE, isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const getResponse = (userMessage: string) => {
    // تحويل النص إلى أحرف صغيرة للمقارنة
    const message = userMessage.toLowerCase();
    
    if (message.includes("سعر") || message.includes("كم سعر") || message.includes("التكلفة")) {
      return "سعر الكتاب 399 جنيه مصري. يمكنك طلبه الآن عبر واتساب.";
    }
    
    if (message.includes("شحن") || message.includes("توصيل") || message.includes("دفع")) {
      return "الشحن مجاني لجميع المحافظات والدفع عند الاستلام.";
    }
    
    if (message.includes("محتوى") || message.includes("فهرس") || message.includes("موضوع")) {
      return `الكتاب يحتوي على عشرة فصول تشمل:
• عالم الجن ومفهوم الرقية
• الحسد، العين، السحر، وحالات المس
• كيفية تحصين المنازل
• حلول عملية للتعامل مع الوسواس القهري
• مناقشة موضوع الكهانة وادعاء علم الغيب`;
    }
    
    if (message.includes("طلب") || message.includes("شراء") || message.includes("اشتري")) {
      return "يمكنك طلب الكتاب عبر واتساب على الرقم 01030435987";
    }

    return "شكراً لتواصلك معنا. هل يمكنني مساعدتك في معرفة المزيد عن الكتاب أو طريقة الطلب؟";
  };

  const handleOptionClick = (option: number) => {
    const response = getResponse(OPTIONS[option - 1].text);
    setMessages(prev => [...prev, 
      { text: OPTIONS[option - 1].text, isUser: true },
      { text: response, isUser: false }
    ]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const response = getResponse(inputMessage);
      setMessages(prev => [...prev,
        { text: inputMessage, isUser: true },
        { text: response, isUser: false }
      ]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-[4vh] right-[4vw] z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-[4em] h-[4em] bg-teal-600 hover:bg-teal-700 shadow-lg animate-bounce"
        >
          <MessageCircle className="w-[2em] h-[2em]" />
        </Button>
      ) : (
        <Card className="w-[90vw] sm:w-[24em] h-[80vh] flex flex-col rounded-2xl shadow-xl border-0 animate-scale-in">
          <div className="p-[1em] bg-teal-600 text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-[0.5em]">
              <Avatar className="h-[2em] w-[2em] border-2 border-white/20">
                <AvatarImage src="/lovable-uploads/0654bb37-4204-44f1-a06e-5211a731cbee.png" alt="Bot Avatar" />
                <AvatarFallback>
                  <Bot className="w-[1em] h-[1em]" />
                </AvatarFallback>
              </Avatar>
              <span className="text-[1.125em] font-semibold">خدمة العملاء</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-teal-700 text-white"
            >
              <X className="w-[1.25em] h-[1.25em]" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-[1em] space-y-[1em] bg-white">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
          <div className="p-[1em] bg-gray-50 border-t">
            <div className="flex gap-[0.5em]">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 text-right"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Send className="w-[1.25em] h-[1.25em]" />
              </Button>
            </div>
            <ChatOptions options={OPTIONS} onOptionClick={handleOptionClick} />
          </div>
        </Card>
      )}
    </div>
  );
};