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
    <div className="p-4 border-t grid grid-cols-2 gap-3 bg-gradient-to-r from-secondary/10 to-primary/5 rounded-b-2xl">
      {options.map((option) => (
        <Button
          key={option.id}
          onClick={() => onOptionClick(option.id)}
          variant="outline"
          className="text-right justify-start text-gray-900 hover:bg-white/50 border-primary/20 bg-white/80"
        >
          <span className="ml-2">{option.icon}</span>
          {option.text}
        </Button>
      ))}
    </div>
  );
};