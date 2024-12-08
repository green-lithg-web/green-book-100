import { Button } from "@/components/ui/button";

interface ChatOption {
  id: number;
  text: string;
}

interface ChatOptionsProps {
  options: ChatOption[];
  onOptionClick: (optionId: number) => void;
}

export const ChatOptions = ({ options, onOptionClick }: ChatOptionsProps) => {
  return (
    <div className="p-4 border-t grid grid-cols-2 gap-3 bg-gray-50/50 rounded-b-2xl">
      {options.map((option) => (
        <Button
          key={option.id}
          onClick={() => onOptionClick(option.id)}
          variant="outline"
          className="text-right justify-start hover:bg-primary/5 border-primary/20"
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
};