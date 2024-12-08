import { TypewriterText } from "./TypewriterText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage = ({ text, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-[1em] animate-fade-in items-end gap-[0.5em]`}>
      {!isUser && (
        <Avatar className="h-[2em] w-[2em]">
          <AvatarImage src="/lovable-uploads/0654bb37-4204-44f1-a06e-5211a731cbee.png" alt="Bot Avatar" />
          <AvatarFallback>
            <Bot className="w-[1em] h-[1em]" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-2xl p-[1em] max-w-[80%] whitespace-pre-wrap shadow-sm font-arabic ${
          isUser
            ? "bg-gradient-to-r from-primary to-accent text-white"
            : "bg-gradient-to-r from-white to-gray-50 text-gray-900 border border-gray-100"
        }`}
      >
        {isUser ? text : <TypewriterText text={text} />}
      </div>
      {isUser && (
        <Avatar className="h-[2em] w-[2em]">
          <AvatarFallback>
            <User className="w-[1em] h-[1em]" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};