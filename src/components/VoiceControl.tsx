import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceControlProps {
  onSpeechResult: (text: string) => void;
  isProcessing: boolean;
}

export function VoiceControl({ onSpeechResult, isProcessing }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        setRecognition(recognition);
      }

      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

      if (event.results[0].isFinal) {
        onSpeechResult(transcript);
        stopListening();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopListening();
    };

    return () => {
      stopListening();
    };
  }, [recognition, onSpeechResult, stopListening]);

  const speak = useCallback((text: string) => {
    if (synthesis && !isMuted) {
      // Cancel any ongoing speech
      synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;

      // Get all available voices
      const voices = synthesis.getVoices();
      // Try to find a female voice
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('samantha')
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      synthesis.speak(utterance);
    }
  }, [synthesis, isMuted]);

  // Listen for new messages to speak
  useEffect(() => {
    if (!isProcessing) {
      const messages = document.querySelectorAll('.ai-message');
      const lastMessage = messages[messages.length - 1];
      if (lastMessage) {
        speak(lastMessage.textContent || '');
      }
    }
  }, [isProcessing, speak]);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => isListening ? stopListening() : startListening()}
        className={`p-3 rounded-xl transition-all duration-300 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isListening ? (
          <MicOff className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-white" />
        )}
      </button>
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`p-3 rounded-xl transition-all duration-300 ${
          isMuted
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}