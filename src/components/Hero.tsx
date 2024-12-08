import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-teal-900 to-teal-800 text-white py-24">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-right">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">الحصن والعلاج</h1>
          <p className="text-xl mb-8 text-teal-100">
            تعلم كيف تحصن نفسك وأهلك من الحسد والمس والسحر من القرآن والسنة النبوية
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-xl"
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
          >
            اطلب الكتاب الآن
          </Button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/lovable-uploads/0521ca68-3291-411e-b4ae-376e68abda36.png"
            alt="كتاب الحصن والعلاج"
            className="w-full max-w-md mx-auto shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};