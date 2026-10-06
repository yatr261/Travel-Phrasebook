import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query, destination, language } = await req.json();

    if (!query || !destination || !language) {
      return NextResponse.json(
        { error: 'Missing required parameters: query, destination, language' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        result: {
          originalPhrase: getFallbackCustomPhrase(query, language),
          englishMeaning: query,
          pronunciation: 'Phonetic guide available when GEMINI_API_KEY is configured',
          formalVersion: 'Formal version',
          casualVersion: 'Casual version',
          usageTip: 'Tip: Add GEMINI_API_KEY to .env.local to get live AI generated phrase variations!'
        },
        isFallback: true
      });
    }

    const prompt = `You are an expert travel linguist.
A traveller visiting ${destination} who wants to speak in ${language} asks:
"${query}"

Provide the exact native translation and travel advice.

Return strictly valid JSON matching this exact structure:
{
  "originalPhrase": "Native language text in proper script",
  "englishMeaning": "Clear English translation",
  "pronunciation": "Phonetic pronunciation in Latin script",
  "formalVersion": "Formal/polite phrasing version",
  "casualVersion": "Casual/friendly phrasing version",
  "usageTip": "Practical etiquette or cultural tip for using this phrase"
}

Output ONLY pure JSON. No markdown formatting backticks.`;

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
      return NextResponse.json({
        result: {
          originalPhrase: getFallbackCustomPhrase(query, language),
          englishMeaning: query,
          pronunciation: 'Phonetic guide',
          formalVersion: 'Polite version',
          casualVersion: 'Casual version',
          usageTip: 'AI generated response fallback.'
        },
        isFallback: true
      });
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from Gemini API');
    }

    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json({ result: parsedData, isFallback: false });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to process custom AI phrase request.';
    console.error('API Error in /api/custom-phrase:', err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function getFallbackCustomPhrase(query: string, language: string) {
  const langLower = language.toLowerCase();
  if (langLower.includes('japan')) return 'チェックアウトの延長は可能ですか？ (Chekkuauto no entchō wa kanō desu ka?)';
  if (langLower.includes('hindi')) return 'क्या मैं देरी से चेक-आउट कर सकता हूँ? (Kya main deri se check-out kar sakta hoon?)';
  if (langLower.includes('french')) return 'Puis-je avoir un départ tardif s\'il vous plaît ?';
  if (langLower.includes('spanish')) return '¿Puedo solicitar un check-out tardío, por favor?';
  return 'Could I request a late check-out, please?';
}
