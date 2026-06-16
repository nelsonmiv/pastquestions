import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom User-Agent for AI Studio Build
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API endpoint for High-Fi Text-To-Speech with local Browser TTS fallback
app.post("/api/tts", async (req, res) => {
  const { text, voice } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required for TTS rendering." });
  }

  if (!ai) {
    return res.status(200).json({
      fallback: true,
      error: "Gemini AI is not configured. Falling back to local offline Browser TTS.",
    });
  }

  try {
    const selectedVoice = voice || "Kore";
    // Construct instructions to read naturally
    const cleanText = `Say naturally and slow: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const part = candidate?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data;
    const mimeType = part?.inlineData?.mimeType || "audio/L16;rate=24000";

    if (!base64Audio) {
      return res.status(200).json({
        fallback: true,
        error: "Failed to render TTS. No audio data generated.",
      });
    }

    return res.json({
      audio: base64Audio,
      mimeType: mimeType,
    });
  } catch (err: any) {
    console.warn("Handled Gemini TTS generation error, falling back:", err.message || err);
    return res.status(200).json({
      fallback: true,
      error: err.message || "An error occurred during voice synthesis generation.",
    });
  }
});

// Server-side health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!ai });
});

// Vite & Static file serving middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Quest-Buddy] Fullstack server listening on http://localhost:${PORT}`);
  });
}

startServer();
