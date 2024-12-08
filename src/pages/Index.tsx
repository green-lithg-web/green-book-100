import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { OrderSection } from "@/components/OrderSection";
import { TableOfContents } from "@/components/TableOfContents";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <OrderSection />
      <TableOfContents />
    </div>
  );
};

export default Index;