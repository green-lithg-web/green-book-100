import { Button } from "@/components/ui/button";
import { Book, ShoppingCart, Truck, List, Smartphone } from "lucide-react";

interface ChatOption {
  id: number;
  text: string;
  icon: JSX.Element;
}

interface ChatOptionsProps {
  options: ChatOption[];
  onOptionClick: (optionId: number) => void;
}

export const ChatOptions = ({ options, onOptionClick }: ChatOptionsProps) => {
  return (
    <div className="p-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 bg-gradient-to-r from-secondary/10 to-primary/5 rounded-b-2xl">
      {options.map((option) => (
        <Button
          key={option.id}
          onClick={() => onOptionClick(option.id)}
          variant="outline"
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-gray-800 bg-white hover:bg-primary/5 border-2 border-primary/20 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 min-h-[2.5rem] sm:min-h-[3rem]"
        >
          <span className="text-primary">{option.icon}</span>
          <span className="text-right line-clamp-2">{option.text}</span>
        </Button>
      ))}
    </div>
  );
};