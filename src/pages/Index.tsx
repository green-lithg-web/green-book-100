import { Hero } from "@/components/Hero";
import { OrderSection } from "@/components/OrderSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <OrderSection />
      <ChatBot />
    </div>
  );
};

export default Index;