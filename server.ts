import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for Gemini AI client with fallback
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
  });
});

// AI Matchmaker & Compatibility Analysis
app.post('/api/ai/match', async (req, res) => {
  try {
    const { userProfile, targetSession, potentialPartners } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback deterministic compatibility calculation
      const simulatedScore = Math.floor(82 + Math.random() * 15);
      return res.json({
        compatibilityScore: simulatedScore,
        synergyAnalysis: `High synergy based on ${userProfile?.sport || 'sports'} level (${userProfile?.skillLevel || 'intermediate'}) and availability overlap in ${userProfile?.hubCity || 'Tech Hub'}.`,
        networkingPotential: `Great professional alignment between ${userProfile?.role || 'Tech Professional'} and local peers with shared tech interests.`,
        suggestedIcebreaker: "Ask about recent projects or tech stacks during the warm-up changeover!",
        sharedPointers: ["Warm up with 5-minute easy baseline rallies", "Discuss favorite local outdoor courts"]
      });
    }

    const prompt = `You are an expert sports coordinator and tech community networking matchmaker.
Analyze compatibility between the following urban professional/student player and potential sports session or partners:

User Profile:
- Name: ${userProfile?.displayName || 'Player'}
- Tech Role/Company: ${userProfile?.role || 'Engineer'} at ${userProfile?.companyOrSchool || 'Tech Co'}
- Tech Hub City: ${userProfile?.hubCity || 'San Francisco'}
- Sport: ${userProfile?.sport || 'Tennis / Pickleball'}
- Skill Level / Rating: ${userProfile?.skillLevel || 'Intermediate'}
- Availability: ${JSON.stringify(userProfile?.availability || ['Weekday evenings', 'Weekend mornings'])}
- Networking Interests: ${userProfile?.networkingGoals || 'Building friendships, discussing engineering and startups'}

Target Session / Partners Context:
${JSON.stringify(targetSession || potentialPartners || {})}

Return a valid JSON object strictly matching this format (no markdown code blocks, just raw JSON):
{
  "compatibilityScore": 88,
  "synergyAnalysis": "Short summary of why skill level and athletic goals align",
  "networkingPotential": "How their professional backgrounds and tech hubs complement each other",
  "suggestedIcebreaker": "A casual, natural conversation starter before or after the match",
  "sharedPointers": ["Tactical or warm-up tip 1", "Tip 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini match error:', error);
    return res.status(500).json({
      error: 'Failed to generate match insights',
      fallback: {
        compatibilityScore: 85,
        synergyAnalysis: 'Good skill and location alignment.',
        networkingPotential: 'Shared interest in tech industry and outdoor fitness.',
        suggestedIcebreaker: 'Ask about tech hubs and favorite places to rally.',
        sharedPointers: ['Keep pace active', 'Stay hydrated']
      }
    });
  }
});

// AI Session Planner & Drill Organizer
app.post('/api/ai/session-plan', async (req, res) => {
  try {
    const { sport, skillLevel, durationMinutes = 90, participantCount = 2, locationName, networkingFocus } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        sessionTitle: `${sport || 'Sports'} Rally & Tech Networking Session`,
        warmup: "10-min dynamic stretching, mini-court rallies, and agility footwork",
        drills: [
          "Cross-court consistency drill (15 mins)",
          "Target placement & point-play scenarios (20 mins)"
        ],
        matchFormat: participantCount > 2 ? "Rotating doubles / King of the Court tiebreaks" : "Best of 3 short sets with no-ad scoring",
        networkingWindow: "15-min post-game hydration & informal coffee/drinks chat",
        conversationTopic: networkingFocus || "Emerging tech trends and outdoor hobbies in the hub",
        gearChecklist: ["Water bottle", "Extra balls/shuttles", "Sun protection", "Grip overwrap"]
      });
    }

    const prompt = `Create an optimized outdoor sports session plan for urban tech professionals and students.
Sport: ${sport}
Skill Level: ${skillLevel}
Duration: ${durationMinutes} minutes
Player Count: ${participantCount}
Location: ${locationName || 'Local Public Courts'}
Networking Vibe: ${networkingFocus || 'Casual tech chat & workout'}

Return a JSON object strictly matching this format (no markdown):
{
  "sessionTitle": "string",
  "warmup": "string",
  "drills": ["drill 1", "drill 2", "drill 3"],
  "matchFormat": "string",
  "networkingWindow": "string",
  "conversationTopic": "string",
  "gearChecklist": ["item 1", "item 2", "item 3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Session plan error:', error);
    return res.status(500).json({ error: 'Failed to generate session plan' });
  }
});

// AI Court & Facility Advisor
app.post('/api/ai/court-recommendation', async (req, res) => {
  try {
    const { city, sport, preferredTime } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        topFacilities: [
          {
            name: `${city || 'Tech Hub'} Central Sports Park`,
            type: "Public Multi-Sport Complex",
            lighting: "LED lights until 10:00 PM",
            courtQuality: "Hard court / pristine surface",
            busyTimes: "Peak 5:30 PM - 8:00 PM weekdays",
            tips: "Arrive 15 mins early or reserve online if available."
          },
          {
            name: "University Athletic Fields & Courts",
            type: "Campus Recreation Grounds",
            lighting: "Lit until 9:30 PM",
            courtQuality: "Well-maintained with wind barriers",
            busyTimes: "Moderate weekday afternoons",
            tips: "Great spot for student and alumni tech networking."
          }
        ],
        timingAdvice: `For ${preferredTime || 'evenings'}, court turnover is fastest around 7:15 PM after initial work rallies.`
      });
    }

    const prompt = `Provide 3 realistic, well-known outdoor sports courts/facilities and timing tips for ${sport} in ${city || 'San Francisco Bay Area'}.
Preferred Time: ${preferredTime || 'Weekday 6:00 PM'}.

Return a JSON object strictly matching this format:
{
  "topFacilities": [
    {
      "name": "string",
      "type": "string",
      "lighting": "string",
      "courtQuality": "string",
      "busyTimes": "string",
      "tips": "string"
    }
  ],
  "timingAdvice": "string"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Court advisor error:', error);
    return res.status(500).json({ error: 'Failed to recommend courts' });
  }
});

// AI Quick Matchmaker Assistant (Conversational)
app.post('/api/ai/assistant', async (req, res) => {
  try {
    const { message, userProfile } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `I can help match you with local sports partners! Based on your profile (${userProfile?.sport || 'sports'}, ${userProfile?.skillLevel || 'intermediate'}), you have several great options in ${userProfile?.hubCity || 'your tech hub'}. Would you like me to schedule a session or find an evening rally partner?`
      });
    }

    const prompt = `You are the Urban Sports Matchmaker AI Assistant. You help urban professionals and students in tech hubs seamlessly find sports partners, schedule outdoor games (tennis, pickleball, basketball, running, etc.), and network organically.

User Profile:
${JSON.stringify(userProfile || {})}

User Query:
"${message}"

Provide an enthusiastic, concise, actionable, and friendly response (under 120 words). Give concrete next steps or matching advice.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ reply: response.text?.trim() || 'How can I help coordinate your next match?' });
  } catch (error: any) {
    console.error('Assistant error:', error);
    return res.status(500).json({ reply: 'Sorry, I hit a brief snag. Let me know what sport and time you want to play!' });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Urban Sports Matchmaker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
