import { SpeechSettings } from "../types";

// Base64 to ArrayBuffer utility
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Convert raw 16-bit PCM buffer into standard WAV container
export function convertPcmToWav(pcmBuffer: ArrayBuffer, sampleRate: number): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + pcmBuffer.byteLength);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // "RIFF" chunk descriptor
  writeString(0, "RIFF");
  view.setUint32(4, 36 + pcmBuffer.byteLength, true);
  writeString(8, "WAVE");

  // "fmt " sub-chunk
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);           // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);            // AudioFormat (1 for PCM)
  view.setUint16(22, 1, true);            // NumChannels (1 for Mono)
  view.setUint32(24, sampleRate, true);   // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
  view.setUint16(32, 2, true);            // BlockAlign
  view.setUint16(34, 16, true);           // BitsPerSample (16-bit)

  // "data" sub-chunk
  writeString(36, "data");
  view.setUint32(40, pcmBuffer.byteLength, true);

  // Copy PCM audio payload
  const pcmView = new Uint8Array(pcmBuffer);
  const wavView = new Uint8Array(buffer, 44);
  wavView.set(pcmView);

  return buffer;
}

// Play WAV buffer payload
export function playWavBuffer(arrayBuffer: ArrayBuffer, rate: number) {
  try {
    const blob = new Blob([arrayBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.playbackRate = rate;
    audio.play().catch((e) => {
      console.warn("Audio play blocked or aborted by browser policy:", e);
    });
  } catch (e) {
    console.warn("Error playing audio wav buffer:", e);
  }
}

// Cache of generated WAV ArrayBuffers
const ttsWavCache: { [key: string]: ArrayBuffer } = {};

// Speak text using either Server-Side Gemini TTS or Browser SpeechSynthesis fallback
export async function speakPhrase(text: string, settings: SpeechSettings): Promise<void> {
  const { voice, speed, useGeminiTts } = settings;
  const cacheKey = `${text}::${voice}`;

  if (useGeminiTts && voice !== "native") {
    // 1. Check local memory cache first for 100% instant playback
    if (ttsWavCache[cacheKey]) {
      playWavBuffer(ttsWavCache[cacheKey], speed);
      return;
    }

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audio) {
          // Detect sample rate from mimeType if possible, default to 24000
          let sampleRate = 24000;
          const mimeType = data.mimeType || "";
          const rateMatch = mimeType.match(/rate=(\d+)/);
          if (rateMatch) {
            sampleRate = parseInt(rateMatch[1], 10);
          }

          const rawPcm = base64ToArrayBuffer(data.audio);
          const wavBuffer = convertPcmToWav(rawPcm, sampleRate);
          
          // Cache the synthesized WAV buffer
          ttsWavCache[cacheKey] = wavBuffer;
          
          playWavBuffer(wavBuffer, speed);
          return;
        } else if (data.fallback) {
          console.warn("Gemini TTS API returned fallback flag:", data.error);
        }
      } else {
        const errData = await response.json();
        console.warn("Gemini Server TTS failed, falling back to local Browser voice:", errData.error);
      }
    } catch (err) {
      console.warn("Network error during Gemini Server TTS; falling back to Browser voice:", err);
    }
  }

  // Fallback to Offline Native Web Speech Synthesis
  if (typeof window !== "undefined" && window.speechSynthesis) {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speed;

    const voices = synth.getVoices();
    let targetVoice: SpeechSynthesisVoice | undefined;

    const voiceLower = (voice || "Kore").toLowerCase();

    if (voiceLower === "aoede") {
      // Find a British en-GB voice
      targetVoice = voices.find((v) => v.lang.toLowerCase() === "en-gb") ||
                    voices.find((v) => v.lang.toLowerCase().startsWith("en-gb")) ||
                    voices.find((v) => v.name.toLowerCase().includes("gb") || v.name.toLowerCase().includes("uk") || v.name.toLowerCase().includes("british") || v.name.toLowerCase().includes("hazel") || v.name.toLowerCase().includes("daniel"));
    } else if (voiceLower === "charon") {
      // Find a deep/lower US accent (David, Microsoft David, Guy, Male, etc.)
      targetVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en-us") && (v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("guy") || v.name.toLowerCase().includes("male"))) ||
                    voices.find((v) => v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("george"));
    } else if (voiceLower === "zephyr") {
      // Find a bright US male/neutral accent
      targetVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en-us") && (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("guy") || v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("brian"))) ||
                    voices.find((v) => v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("male"));
    } else if (voiceLower === "puck") {
      // Cheerful US female/warm accent
      targetVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en-us") && (v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("nature") || v.name.toLowerCase().includes("google") || v.name.toLowerCase().includes("female"))) ||
                    voices.find((v) => v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("hazel"));
    } else if (voiceLower === "kore") {
      // Standard US female
      targetVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en-us") && (v.name.toLowerCase().includes("google") || v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("susan"))) ||
                    voices.find((v) => v.lang.toLowerCase().startsWith("en-us"));
    }

    // Default Fallback if no specific voice match succeeded
    if (!targetVoice) {
      targetVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en-us")) ||
                    voices.find((v) => v.lang.toLowerCase().startsWith("en-gb")) ||
                    voices.find((v) => v.lang.startsWith("en"));
    }

    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    synth.speak(utterance);
  }
}

// Prefetch disabled to respect free-tier rate limits (3 requests/minute). Only speak when clicked.
export async function prefetchPhrase(text: string, settings: SpeechSettings): Promise<void> {
  // Empty implementation to avoid rate limiting
}

// play sound effect chime
export function playSfx(type: "correct" | "incorrect"): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "correct") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";

      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === "incorrect") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";

      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (err) {
    // browser dynamic autoplay restrictions
  }
}
