import { NextRequest, NextResponse } from 'next/server';
import { getOfflineEmergencyPhrases } from '../../../lib/data/emergencyPhrases';

export async function POST(req: NextRequest) {
  try {
    const { languageCode, languageName, nativeName } = await req.json();

    const targetLangCode = (languageCode || 'ja').toLowerCase();
    const targetLangName = languageName || 'Japanese';
    const targetNativeName = nativeName || '';

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY missing. Using offline emergency dictionary.');
      const offlinePhrases = getOfflineEmergencyPhrases(targetLangCode);
      return NextResponse.json({
        success: true,
        isFallback: true,
        languageCode: targetLangCode,
        languageName: targetLangName,
        phrases: offlinePhrases,
      });
    }

    const systemPrompt = `You are an expert linguistic translator generating emergency travel phrases for safety and urgent communication.
Translate each of the 10 standard English emergency phrases into EXACTLY ${targetLangName} (${targetNativeName}).
Language code: ${targetLangCode}.

CRITICAL REQUIREMENTS:
1. Translate specifically into ${targetLangName}. Do NOT output Japanese, Hindi, or English unless ${targetLangName} is that language.
2. Provide the original native script in "translation".
3. Provide a clear Romanized phonetic pronunciation guide in "pronunciation".
4. Return strictly valid JSON only without markdown formatting.

Phrases to translate:
1. "I need help."
2. "Call the police."
3. "I need a doctor."
4. "Call an ambulance."
5. "I lost my passport."
6. "I am lost."
7. "I don't understand."
8. "Where is the nearest hospital?"
9. "Please help me."
10. "Please call my embassy."

Required JSON Schema:
{
  "language": "${targetLangName}",
  "languageCode": "${targetLangCode}",
  "phrases": [
    {
      "id": "em-1",
      "english": "I need help.",
      "translation": "<native script in ${targetLangName}>",
      "pronunciation": "<romanized phonetic>"
    }
  ]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn('Gemini Emergency API request failed. Falling back to offline dictionary.');
      const offlinePhrases = getOfflineEmergencyPhrases(targetLangCode);
      return NextResponse.json({
        success: true,
        isFallback: true,
        languageCode: targetLangCode,
        languageName: targetLangName,
        phrases: offlinePhrases,
      });
    }

    const geminiRes = await response.json();
    const rawText = geminiRes.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Empty response from Gemini Emergency API');
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.warn('Failed to parse JSON from Gemini. Using offline dictionary.');
      const offlinePhrases = getOfflineEmergencyPhrases(targetLangCode);
      return NextResponse.json({
        success: true,
        isFallback: true,
        languageCode: targetLangCode,
        languageName: targetLangName,
        phrases: offlinePhrases,
      });
    }

    // Validate that phrases are non-empty and language code matches target
    const validPhrases = (parsed.phrases || []).filter(
      (p: { english?: string; translation?: string; pronunciation?: string }) =>
        p.english && p.translation && p.pronunciation
    );

    if (validPhrases.length === 0) {
      console.warn('Gemini returned 0 valid phrases. Using offline dictionary.');
      const offlinePhrases = getOfflineEmergencyPhrases(targetLangCode);
      return NextResponse.json({
        success: true,
        isFallback: true,
        languageCode: targetLangCode,
        languageName: targetLangName,
        phrases: offlinePhrases,
      });
    }

    return NextResponse.json({
      success: true,
      isFallback: false,
      languageCode: targetLangCode,
      languageName: targetLangName,
      phrases: validPhrases.map(
        (p: { id?: string; english: string; translation: string; pronunciation: string }, idx: number) => ({
          id: p.id || `em-${idx + 1}`,
          english: p.english,
          translation: p.translation,
          pronunciation: p.pronunciation,
          languageCode: targetLangCode,
        })
      ),
    });
  } catch (err: unknown) {
    console.error('Emergency API Error:', err);
    return NextResponse.json(
      { error: (err as Error)?.message || 'Failed to generate emergency phrases' },
      { status: 500 }
    );
  }
}
