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
    <div className="p-3 border-t grid grid-cols-2 gap-2">
      {options.map((option) => (
        <Button
          key={option.id}
          onClick={() => onOptionClick(option.id)}
          variant="outline"
          className="text-right justify-start"
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
};