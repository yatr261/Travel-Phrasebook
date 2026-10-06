import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { destination, language, situation, travellerType = 'Solo Traveller', difficulty = 'Beginner' } = await req.json();

    if (!destination || !language || !situation) {
      return NextResponse.json(
        { error: 'Missing required parameters: destination, language, situation' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured in .env.local. Serving smart curated phrases.');
      return NextResponse.json({
        phrases: getFallbackPhrases(destination, language),
        isFallback: true,
        notice: 'API Key not set in .env.local. Add GEMINI_API_KEY=your_key to enable live AI generations.'
      });
    }

    const prompt = `You are an expert native travel linguist assistant.
A traveler visiting ${destination} wants high-utility phrases in ${language} for a "${situation}" scenario.

Personalization Details:
- Traveller Type: ${travellerType} (tailor vocabulary, tone, and practical situations to a ${travellerType})
- Difficulty Level: ${difficulty} (for "Beginner": simple, short, essential polite phrases; for "Intermediate": standard full natural sentences; for "Advanced": native idiomatic expressions and formal nuances).

Generate 8 to 12 realistic, highly practical phrases that a ${travellerType} at ${difficulty} level would actually use.

Return strictly valid JSON matching this exact structure:
{
  "phrases": [
    {
      "originalPhrase": "Native script text in proper local alphabet/characters",
      "englishMeaning": "English translation",
      "pronunciation": "Clear phonetic pronunciation guide in Latin script",
      "formality": "polite",
      "usageContext": "When and how to use this phrase effectively for a ${travellerType}"
    }
  ]
}

Notes:
- "formality" must be one of: "polite", "casual", or "formal".
- "originalPhrase" must use proper native script (e.g. Gujarati script for Gujarati, Kanji/Hiragana for Japanese, Devanagari for Hindi/Marathi, Tamil script for Tamil, etc.).
- Output ONLY pure JSON. No markdown backticks, no markdown formatting.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return NextResponse.json(
        { 
          phrases: getFallbackPhrases(destination, language),
          isFallback: true,
          error: `Gemini API returned status ${response.status}. Using smart fallback.` 
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from Gemini API');
    }

    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    if (!parsedData.phrases || !Array.isArray(parsedData.phrases)) {
      throw new Error('Invalid JSON structure returned by Gemini');
    }

    const phrasesWithIds = parsedData.phrases.map((p: Record<string, string>, idx: number) => ({
      id: `ai-${Date.now()}-${idx}`,
      originalPhrase: p.originalPhrase || '',
      englishMeaning: p.englishMeaning || '',
      pronunciation: p.pronunciation || '',
      formality: p.formality || 'polite',
      usageContext: p.usageContext || '',
    }));

    return NextResponse.json({ phrases: phrasesWithIds, isFallback: false });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred while generating phrases.';
    console.error('API Error in /api/generate-phrases:', err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function getFallbackPhrases(destination: string, language: string) {
  const langLower = language.toLowerCase();
  
  if (langLower.includes('gujarati')) {
    return [
      { id: 'fb-gu-1', originalPhrase: 'આ કેટલાનું છે?', englishMeaning: 'How much does this cost?', pronunciation: 'Aa ketlaanu chhe?', formality: 'polite', usageContext: 'Essential shopping phrase at local Gujarati markets and bazaars.' },
      { id: 'fb-gu-2', originalPhrase: 'નમસ્તે / જય શ્રી કૃષ્ણ', englishMeaning: 'Greetings & Respectful Welcome', pronunciation: 'Namaste / Jai Shree Krishna', formality: 'polite', usageContext: 'Traditional warm greeting used across Gujarat.' },
      { id: 'fb-gu-3', originalPhrase: 'આભાર / ખુબ ખુબ આભાર', englishMeaning: 'Thank you very much', pronunciation: 'Aabhar / Khub khub aabhar', formality: 'polite', usageContext: 'Expressing sincere thanks.' },
      { id: 'fb-gu-4', originalPhrase: 'મેહરબાની કરીને મદદ કરો', englishMeaning: 'Please help me', pronunciation: 'Meherbani karine madad karo', formality: 'polite', usageContext: 'Urgent emergency assistance request.' },
      { id: 'fb-gu-5', originalPhrase: 'સ્વાઇપ / યુપીઆઈ સ્વીકારો છો?', englishMeaning: 'Do you accept UPI / card payment?', pronunciation: 'Swipe / UPI sweekaro chho?', formality: 'polite', usageContext: 'Asking about payment options at stores.' },
    ];
  }

  if (langLower.includes('japan')) {
    return [
      { id: 'fb-1', originalPhrase: 'こんにちは', englishMeaning: 'Hello / Good afternoon', pronunciation: 'Konnichiwa', formality: 'polite', usageContext: 'Standard greeting upon entering shops or meeting people.' },
      { id: 'fb-2', originalPhrase: 'すみません', englishMeaning: 'Excuse me / Sorry', pronunciation: 'Sumimasen', formality: 'polite', usageContext: 'Use to call a waiter, apologize, or navigate crowds.' },
      { id: 'fb-3', originalPhrase: 'お会計をお願いします', englishMeaning: 'The bill, please', pronunciation: 'O-kaikei o onegaishimasu', formality: 'polite', usageContext: 'Say when ready to pay at a restaurant or izakaya.' },
      { id: 'fb-4', originalPhrase: 'おすすめは何ですか？', englishMeaning: 'What do you recommend?', pronunciation: 'Osume wa nan desu ka?', formality: 'polite', usageContext: 'Great for asking chefs for house specials.' },
      { id: 'fb-5', originalPhrase: '英語のメニューはありますか？', englishMeaning: 'Do you have an English menu?', pronunciation: 'Eigo no menyū wa arimasu ka?', formality: 'polite', usageContext: 'Handy when visiting local eateries.' },
      { id: 'fb-6', originalPhrase: '助けてください！', englishMeaning: 'Please help me!', pronunciation: 'Tasukete kudasai!', formality: 'polite', usageContext: 'Emergency request for urgent aid.' },
    ];
  }

  if (langLower.includes('hindi') || destination.toLowerCase().includes('india')) {
    return [
      { id: 'fb-1', originalPhrase: 'नमस्ते!', englishMeaning: 'Greetings & Welcome', pronunciation: 'Namaste!', formality: 'polite', usageContext: 'Traditional respectful greeting with palms joined.' },
      { id: 'fb-2', originalPhrase: 'यह कितने का है?', englishMeaning: 'How much is this?', pronunciation: 'Yeh kitne ka hai?', formality: 'polite', usageContext: 'Essential for shopping at local bazaars.' },
      { id: 'fb-3', originalPhrase: 'कृपया मिर्च कम रखना', englishMeaning: 'Please keep it less spicy', pronunciation: 'Kripya mirch kam rakhna', formality: 'polite', usageContext: 'Must-know phrase when ordering food.' },
      { id: 'fb-4', originalPhrase: 'बिल ले आइए', englishMeaning: 'Please bring the bill', pronunciation: 'Bill le aaiye', formality: 'polite', usageContext: 'Requesting the check at dining places.' },
      { id: 'fb-5', originalPhrase: 'मदद चाहिए!', englishMeaning: 'I need help!', pronunciation: 'Madad chahiye!', formality: 'polite', usageContext: 'Emergency phrase for assistance.' },
    ];
  }

  return [
    { id: 'fb-1', originalPhrase: 'Bonjour / Hello', englishMeaning: 'Hello / Greetings', pronunciation: 'Bohn-zhoor', formality: 'polite', usageContext: 'Universal greeting for travelers.' },
    { id: 'fb-2', originalPhrase: 'Merci beaucoup', englishMeaning: 'Thank you very much', pronunciation: 'Mair-see boh-koo', formality: 'polite', usageContext: 'Expressing gratitude to locals.' },
    { id: 'fb-3', originalPhrase: 'S\'il vous plaît', englishMeaning: 'Please', pronunciation: 'Seel voo pleh', formality: 'polite', usageContext: 'Polite request suffix.' },
    { id: 'fb-4', originalPhrase: 'Où est...?', englishMeaning: 'Where is...?', pronunciation: 'Oo eh...?', formality: 'polite', usageContext: 'Asking for directions to landmarks or restrooms.' },
    { id: 'fb-5', originalPhrase: 'Au secours!', englishMeaning: 'Help!', pronunciation: 'Oh suh-koor!', formality: 'polite', usageContext: 'Urgent emergency call.' },
  ];
}
