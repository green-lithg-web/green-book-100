const chapters = [
  { title: "عالم الجن", pages: "3-35" },
  { title: "مفهوم الرقية", pages: "36-47" },
  { title: "كيف تكون معالج بالقرآن والسنة", pages: "48-63" },
  { title: "السحر", pages: "64-100" },
  { title: "العين", pages: "101-117" },
  { title: "الحسد", pages: "118-135" },
  { title: "المس (حالات المس والسحر)", pages: "136-171" },
  { title: "الوسواس القهري", pages: "172-182" },
  { title: "تحصين البيت", pages: "183-195" },
  { title: "الكهانة وادعاء علم الغيب في الإسلام", pages: "196-203" }
];

export const TableOfContents = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">محتويات الكتاب</h2>
        <div className="max-w-2xl mx-auto bg-muted rounded-lg p-8">
          {chapters.map((chapter, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
              <span className="text-gray-600 ltr">{chapter.pages}</span>
              <h3 className="text-lg font-medium">{chapter.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};