import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { OrderSection } from "@/components/OrderSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <OrderSection />
      <ChatBot />
    </div>
  );
};

export default Index;