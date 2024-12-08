export const setupArabicSpeech = (text: string): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // تعيين اللغة العربية
  utterance.lang = 'ar-SA';  // تجربة اللهجة السعودية بدلاً من المصرية
  utterance.rate = 0.8;      // إبطاء السرعة أكثر للوضوح
  utterance.pitch = 1;
  utterance.volume = 1;

  // تحميل الأصوات المتاحة بشكل متزامن
  let voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    // إذا لم يتم تحميل الأصوات بعد، انتظر حتى يتم تحميلها
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
    };
  }
  
  // البحث عن صوت عربي
  const arabicVoice = voices.find(voice => 
    voice.lang.includes('ar') || 
    voice.name.toLowerCase().includes('arabic') ||
    voice.name.includes('ar')
  );

  if (arabicVoice) {
    console.log('تم العثور على صوت عربي:', arabicVoice.name);
    utterance.voice = arabicVoice;
  } else {
    console.log('لم يتم العثور على صوت عربي، استخدام الصوت الافتراضي');
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

  console.log('النص المنظف:', cleanText);

  const utterance = setupArabicSpeech(cleanText);
  
  if (onStart) {
    utterance.onstart = () => {
      console.log('بدأ النطق');
      onStart();
    };
  }
  
  if (onEnd) {
    utterance.onend = () => {
      console.log('انتهى النطق');
      onEnd();
    };
  }
  
  utterance.onerror = (event) => {
    console.error('خطأ في النطق:', event);
    if (onEnd) onEnd();
  };

  // محاولة النطق
  try {
    // تأكد من أن النص غير فارغ
    if (cleanText.trim()) {
      window.speechSynthesis.speak(utterance);
      console.log('تم بدء عملية النطق');
    } else {
      console.warn('النص فارغ، تم تخطي النطق');
      if (onEnd) onEnd();
    }
  } catch (error) {
    console.error('خطأ في بدء النطق:', error);
    if (onEnd) onEnd();
  }
};