export const setupArabicSpeech = (text: string): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar';
  utterance.rate = 0.9;
  utterance.pitch = 1;

  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find an Arabic voice
  const arabicVoice = voices.find(voice => 
    voice.lang.includes('ar') || 
    voice.name.includes('Arabic') || 
    voice.name.includes('ar')
  );

  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }

  return utterance;
};

export const speakArabicText = (text: string, onStart?: () => void, onEnd?: () => void) => {
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = setupArabicSpeech(text);
  
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};