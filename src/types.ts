export interface PracticePrompt {
  id: number;
  answer: string;
  correctQuestion: string;
  clue: string;
  translation: string;
  explanation: string;
}

export interface ShadowPrompt {
  text: string;
  translation: string;
}

export interface SpeechSettings {
  voice: string; // "Kore" | "Zephyr" | "Puck" | "Aoede" | "Charon" | "native"
  speed: number; // 0.75 or 1.00
  useGeminiTts: boolean;
}
