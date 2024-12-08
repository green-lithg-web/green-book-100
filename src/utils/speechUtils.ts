export const setupArabicSpeech = (text: string): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // تعيين اللغة العربية والإعدادات الأساسية
  utterance.lang = 'ar';  // استخدام اللغة العربية بشكل عام
  utterance.rate = 0.8;   // سرعة النطق
  utterance.pitch = 1;    // درجة الصوت
  utterance.volume = 1;   // مستوى الصوت

  // محاولة تحميل الأصوات المتاحة
  const voices = speechSynthesis.getVoices();
  
  // البحث عن صوت عربي متاح
  const arabicVoice = voices.find(voice => 
    voice.lang.startsWith('ar') || 
    voice.name.toLowerCase().includes('arabic')
  );

  if (arabicVoice) {
    console.log('تم العثور على صوت عربي:', arabicVoice.name);
    utterance.voice = arabicVoice;
  } else {
    console.log('جاري استخدام الصوت الافتراضي');
  }

  return utterance;
};

export const speakArabicText = (text: string, onStart?: () => void, onEnd?: () => void) => {
  // إيقاف أي نطق حالي
  speechSynthesis.cancel();

  // تنظيف النص
  const cleanText = text
    .replace(/[^\u0600-\u06FF\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    console.warn('النص فارغ');
    if (onEnd) onEnd();
    return;
  }

  // إنشاء كائن النطق
  const utterance = setupArabicSpeech(cleanText);

  // تعيين معالجات الأحداث
  utterance.onstart = () => {
    console.log('بدأ النطق:', cleanText);
    if (onStart) onStart();
  };

  utterance.onend = () => {
    console.log('انتهى النطق');
    if (onEnd) onEnd();
  };

  utterance.onerror = (event) => {
    console.error('خطأ في النطق:', event);
    if (onEnd) onEnd();
  };

  // بدء النطق
  try {
    speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('خطأ في تشغيل النطق:', error);
    if (onEnd) onEnd();
  }
};