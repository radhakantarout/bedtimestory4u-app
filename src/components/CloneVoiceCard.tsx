"use client";

import { useState, useRef } from "react";

export default function CloneVoiceCard() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [voiceId, setVoiceId] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const resetRecording = () => {
    setAudioUrl("");
    setAudioBlob(null);
  };

  const submitVoice = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob);

    const response = await fetch("/api/clone-voice", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setVoiceId(data.voiceId);
  };

  return (
    <div className="bg-purple-900 p-8 rounded-xl w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Clone Your Voice 🎙️
      </h1>

      {!recording && !audioUrl && (
        <button
          onClick={startRecording}
          className="bg-pink-500 px-6 py-3 rounded w-full"
        >
          Start Recording
        </button>
      )}

      {recording && (
        <button
          onClick={stopRecording}
          className="bg-red-500 px-6 py-3 rounded w-full"
        >
          Stop Recording
        </button>
      )}

      {audioUrl && (
        <>
          <audio controls className="mt-4 w-full">
            <source src={audioUrl} />
          </audio>

          <div className="flex gap-4 mt-4">
            <button
              onClick={resetRecording}
              className="bg-gray-600 px-4 py-2 rounded w-full"
            >
              Retake
            </button>

            <button
              onClick={submitVoice}
              className="bg-green-500 px-4 py-2 rounded w-full"
            >
              Confirm & Clone
            </button>
          </div>
        </>
      )}

      {voiceId && (
        <p className="mt-6 text-green-400">
          Voice successfully cloned! ID: {voiceId}
        </p>
      )}
    </div>
  );
}