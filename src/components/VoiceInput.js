import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';

function VoiceInput({ onTaskAdded }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunksRef.current.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          sendAudioToGroq(audioBlob);
        });

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(err => {
        console.error("Error accessing the microphone", err);
        setError("Impossible d'accéder au microphone. Veuillez vérifier les permissions.");
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToGroq = useCallback(async (blob) => {
    if (!blob) {
      console.error('No audio file to send');
      return;
    }

    try {
      setIsLoading(true);
      console.log("Sending audio to Groq...");

      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');
      formData.append('model', 'whisper-large-v3');

      if (!process.env.REACT_APP_GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not defined");
      }

      const response = await axios.post('https://api.groq.com/openai/v1/audio/transcriptions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
        }
      });

      console.log('API Response:', response.data);

      const text = response.data.text;
      console.log('Transcription:', text);
      onTaskAdded(text);
    } catch (error) {
      console.error('Failed to transcribe audio', error.response ? error.response.data : error.message);
      setError('Échec de la transcription audio: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    } finally {
      setIsLoading(false);
    }
  }, [onTaskAdded]);

  return (
    <div className="mb-4">
      {!isRecording ? (
        <button 
          onClick={startRecording}
          disabled={isLoading}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Commencer l'enregistrement
        </button>
      ) : (
        <button 
          onClick={stopRecording}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Arrêter l'enregistrement
        </button>
      )}
      {isLoading && <p className="mt-2 text-center">Traitement en cours...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default VoiceInput;