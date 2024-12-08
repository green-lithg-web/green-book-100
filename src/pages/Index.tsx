import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { OrderSection } from "@/components/OrderSection";
import { TableOfContents } from "@/components/TableOfContents";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <OrderSection />
      <TableOfContents />
      <ChatBot />
    </div>
  );
};

export default Index;