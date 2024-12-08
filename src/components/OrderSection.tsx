import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const OrderSection = () => {
  const { toast } = useToast();

  const handleOrder = () => {
    toast({
      title: "تم استلام طلبك",
      description: "سنتواصل معك قريباً لتأكيد الطلب",
    });
  };

  return (
    <section id="order" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">اطلب نسختك الآن</h2>
        <div className="max-w-md mx-auto bg-muted p-8 rounded-lg shadow-lg">
          <div className="text-4xl font-bold text-primary mb-4">399 جنيه</div>
          <ul className="text-right mb-8 space-y-2">
            <li className="flex items-center justify-end gap-2">
              <span>توصيل مجاني لجميع المحافظات</span>
              <span className="text-green-500">✓</span>
            </li>
            <li className="flex items-center justify-end gap-2">
              <span>الدفع عند الاستلام</span>
              <span className="text-green-500">✓</span>
            </li>
            <li className="flex items-center justify-end gap-2">
              <span>نسخة إلكترونية مجانية</span>
              <span className="text-green-500">✓</span>
            </li>
          </ul>
          <Button 
            onClick={handleOrder}
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 text-xl"
          >
            اطلب الآن
          </Button>
        </div>
      </div>
    </section>
  );
};