interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage = ({ text, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg p-3 max-w-[90%] whitespace-pre-wrap ${
          isUser
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};