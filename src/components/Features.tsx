import { BookOpen, Shield, Brain, Home, Eye, Wand2 } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "دليل شامل",
    description: "يغطي جميع جوانب الرقية والعلاج بالقرآن"
  },
  {
    icon: Shield,
    title: "الحماية والتحصين",
    description: "طرق فعالة لتحصين النفس والأهل"
  },
  {
    icon: Brain,
    title: "الصحة النفسية",
    description: "علاج الوسواس القهري والمشاكل النفسية"
  },
  {
    icon: Home,
    title: "حماية المنزل",
    description: "طرق تحصين المنزل من العين والحسد"
  },
  {
    icon: Eye,
    title: "العين والحسد",
    description: "كيفية الوقاية والعلاج من العين والحسد"
  },
  {
    icon: Wand2,
    title: "علاج السحر",
    description: "طرق التعامل مع السحر والمس"
  }
];

export const Features = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">مميزات الكتاب</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};