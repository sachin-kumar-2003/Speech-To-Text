class SpeechToText {
  constructor(onFinalText, onEnd, onInterimText) {
    this.onFinalText = onFinalText;
    this.onEnd = onEnd;
    this.onInterimText = onInterimText;
    this.recognition = null;
    this.init();
  }

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      if (event.results[0].isFinal) {
if (!event.results[0].isFinal) {
  this.onInterimText(transcript);
} else {
  this.onFinalText(transcript);
}

      } else {
        this.onInterimText(transcript);
      }
    };

    this.recognition.onend = this.onEnd;
  }

  startListening() {
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
  }
}

export default SpeechToText;
