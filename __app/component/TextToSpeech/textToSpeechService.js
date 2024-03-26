/* eslint-disable consistent-return */
let cachedVoices = null;

export const getVoices = () => new Promise((resolve) => {
  const voicesInterval = setInterval(() => {
    const voices = speechSynthesis.getVoices();
    if (voices.length !== 0) {
      clearInterval(voicesInterval);
      cachedVoices = voices;
      resolve(voices);
    }
  }, 300);
});

export default async function textToSpeech(text) {
  // Create a new SpeechSynthesisUtterance object
  // debugger;
  if ('speechSynthesis' in window) {
    const voicesList = await (cachedVoices || getVoices());
    const voice = voicesList.find((item) => item.lang.toLowerCase() === 'en-in' || item.lang.toLowerCase() === 'en_in');

    // Removes previous utterance
    globalThis.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance();

    // Set the text and voice of the utterance
    utterance.lang = 'en-IN';
    utterance.voiceURI = 'native';
    utterance.text = text;
    utterance.voice = voice;

    // Speak the utterance
    // Need to put set timeout coz we need to add pause before starting the new
    // If we remove it the new utterance will be in the queue
    setTimeout(() => {
      globalThis.speechSynthesis.speak(utterance);
    }, 300);
    return utterance;
  }
}
