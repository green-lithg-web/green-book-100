import { TypewriterText } from "./TypewriterText";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage = ({ text, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"} mb-4 animate-fade-in`}>
      <div
        className={`rounded-2xl p-4 max-w-[90%] whitespace-pre-wrap shadow-sm ${
          isUser
            ? "bg-gradient-to-r from-primary to-accent text-white"
            : "bg-gradient-to-r from-secondary/20 to-secondary/10 text-gray-800"
        }`}
      >
        {isUser ? text : <TypewriterText text={text} />}
      </div>
    </div>
  );
};