export const setupArabicSpeech = (text: string): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // تعيين اللغة العربية
  utterance.lang = 'ar-EG';  // استخدام اللهجة المصرية
  utterance.rate = 0.9;      // إبطاء سرعة النطق قليلاً
  utterance.pitch = 1;
  utterance.volume = 1;      // رفع مستوى الصوت

  // الحصول على الأصوات المتاحة
  const voices = window.speechSynthesis.getVoices();
  
  // البحث عن صوت عربي
  const arabicVoice = voices.find(voice => 
    voice.lang.includes('ar') || 
    voice.name.toLowerCase().includes('arabic') ||
    voice.name.includes('ar')
  );

  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }

  return utterance;
};

export const speakArabicText = (text: string, onStart?: () => void, onEnd?: () => void) => {
  // إلغاء أي نطق جارٍ
  window.speechSynthesis.cancel();

  // تنظيف النص من الرموز غير المرغوب فيها
  const cleanText = text
    .replace(/[^\u0600-\u06FF\s]/g, ' ')  // الاحتفاظ فقط بالحروف العربية والمسافات
    .replace(/\s+/g, ' ')                  // تقليل المسافات المتعددة إلى مسافة واحدة
    .trim();                               // إزالة المسافات من البداية والنهاية

  const utterance = setupArabicSpeech(cleanText);
  
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  
  utterance.onerror = (event) => {
    console.error('خطأ في النطق:', event);
    if (onEnd) onEnd();
  };

  // محاولة النطق
  try {
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('خطأ في بدء النطق:', error);
    if (onEnd) onEnd();
  }
};