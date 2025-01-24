import React, { useState, useRef } from "react";
import SpeechToText from './SpeechToText';

const App = () => {
  const [transcribedText, setTranscribedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const speechToTextInstance = useRef(null);
  
  const initializeSpeechToText = () => {
    speechToTextInstance.current = new SpeechToText(
      (finalText) => {
        setTranscribedText(finalText); 
      },
      () => {
        console.log("Speech recognition ended.");
        setIsListening(false); 
      },
      (interimText) => {
      }
    );
  };

  const startListening = () => {
    if (!speechToTextInstance.current) initializeSpeechToText();
    speechToTextInstance.current.startListening();
    setIsListening(true);
  };

  const stopListening = () => {
    if (speechToTextInstance.current) {
      speechToTextInstance.current.stopListening();
    }
    setIsListening(false);
  };

  const clearText = () => {
    setTranscribedText(""); // Clear the transcribed text
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcribedText); // Copy the transcribed text to clipboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Speech To Text Tool
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white p-8 rounded-xl shadow-xl">

          {/* Transcribed Text Section */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Transcribed Text
            </h2>
            <textarea
              value={transcribedText}
              onChange={(e) => setTranscribedText(e.target.value)} // Allow editing of text
              className="w-full h-64 border-2 border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 placeholder-gray-400"
              placeholder="Transcription will appear here."
            />
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center mt-4">
            {isListening ? (
              <button
                onClick={stopListening}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
              >
                Stop Listening
              </button>
            ) : (
              <button
                onClick={startListening}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                Start Listening
              </button>
            )}
            <button
              onClick={clearText}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all ml-4"
            >
              Clear Text
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all ml-4"
            >
              Copy Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
