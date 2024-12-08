import { TypewriterText } from "./TypewriterText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage = ({ text, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fade-in items-end gap-2`}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/lovable-uploads/0521ca68-3291-411e-b4ae-376e68abda36.png" />
          <AvatarFallback>
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-2xl p-4 max-w-[80%] whitespace-pre-wrap shadow-sm font-arabic ${
          isUser
            ? "bg-gradient-to-r from-primary to-accent text-white"
            : "bg-gradient-to-r from-secondary/20 to-secondary/10 text-gray-800"
        }`}
      >
        {isUser ? text : <TypewriterText text={text} />}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};