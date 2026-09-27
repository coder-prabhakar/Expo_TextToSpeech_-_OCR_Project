import React, { useState, useRef, useEffect } from 'react';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';


export const useSpeechToText = ({ speechLang }) => {
    const [error, setError] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [liveTranscript, setLiveTranscript] = useState('');
    const [fullTranscript, setFullTranscript] = useState('');

    const isManuallyStopped = useRef(true);

    useSpeechRecognitionEvent('start', () => setIsListening(true));

    useSpeechRecognitionEvent('end', () => {
        setIsListening(false);

        if (!isManuallyStopped.current) {
            ExpoSpeechRecognitionModule.start({
                lang: speechLang,
                interimResults: true,
                continuous: false,
            });
        }
    });

    useSpeechRecognitionEvent('result', (event) => {
        const text = event.results[0]?.transcript ?? '';

        if (event.isFinal) {
            setLiveTranscript('');
            setFullTranscript((prev) => (prev.trim() + ' ' + text.trim()).trim());
        } else {
            setLiveTranscript(text);
        }
    });

    useSpeechRecognitionEvent('error', (event) => {
        const fatalErrors = ['not-allowed', 'audio-capture', 'service-not-allowed'];

        if (fatalErrors.includes(event.error)) {
            isManuallyStopped.current = true;
            setIsListening(false);
            setError(event.error);
        }
    });

    const startTranscript = async () => {
        if(isListening) return;
        setError('');

        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
            setError('Microphone permission denied.');
            return;
        }

        setLiveTranscript('');
        isManuallyStopped.current = false;

        ExpoSpeechRecognitionModule.start({
            lang: speechLang,
            interimResults: true,
            continuous: false,
        });
    };

    const stopTranscript = () => {
        if(!isListening && isManuallyStopped.current) return;

        isManuallyStopped.current = true;
        ExpoSpeechRecognitionModule.stop();
    };

    const clearTranscript = () => {
        if (isListening || !isManuallyStopped.current) {
            ExpoSpeechRecognitionModule.abort();
        }
        isManuallyStopped.current = true;

        setError('');
        setLiveTranscript('');
        setFullTranscript('');
    };

    useEffect(() => {
        return () => {
            ExpoSpeechRecognitionModule.abort();
        };
    }, []);

    const transcript = `${fullTranscript} ${liveTranscript}`.trim();
    const editTranscript = (newText) => {
        if (isListening) {
            isManuallyStopped.current = true;
            ExpoSpeechRecognitionModule.stop();
        }
        setLiveTranscript('');
        setFullTranscript(newText);
    };

    const isError = !!error.trim();
    const clearError = () => setError('');

    return { 
        isListening, 
        transcript, 
        startTranscript, 
        stopTranscript, 
        clearTranscript,
        editTranscript, 
        isError,
        error,
        clearError
    };
}