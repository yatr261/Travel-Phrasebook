import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { destination = 'Japan', language = 'Japanese', category = 'Business Cards' } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY missing. Returning fallback business etiquette guide.');
      return NextResponse.json({
        data: getFallbackBusinessGuide(destination, language),
        isFallback: true,
      });
    }

    const prompt = `You are a corporate cross-cultural communications expert.
Provide a complete Business Etiquette Guide for a business professional visiting ${destination} who needs to speak in ${language} for the "${category}" category.

Return strictly valid JSON matching this exact structure:
{
  "phrases": [
    {
      "originalPhrase": "Native script text in proper local characters",
      "englishMeaning": "English translation",
      "pronunciation": "Phonetic pronunciation guide",
      "formalVersion": "Highly formal business phrasing",
      "casualVersion": "Casual internal colleague phrasing",
      "usageNote": "When to say this during business meetings"
    }
  ],
  "etiquetteTips": [
    "Practical business custom or ritual tip for ${destination}"
  ],
  "thingsToAvoid": [
    "Critical corporate taboo or mistake to avoid in ${destination}"
  ]
}

Output ONLY pure JSON. No markdown backticks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Business API Error:', errorText);
      return NextResponse.json({
        data: getFallbackBusinessGuide(destination, language),
        isFallback: true,
      });
    }

    const resData = await response.json();
    const candidateText = resData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) throw new Error('Empty response from Gemini');

    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    return NextResponse.json({ data: parsed, isFallback: false });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error generating business guide';
    console.error('Business API Error:', err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function getFallbackBusinessGuide(destination: string, language: string) {
  const langLower = language.toLowerCase();

  if (langLower.includes('japan')) {
    return {
      phrases: [
        {
          originalPhrase: 'はじめまして。よろしくお願いいたします。',
          englishMeaning: 'Nice to meet you. I look forward to working with you.',
          pronunciation: 'Hajimemashite. Yoroshiku onegai itashimasu.',
          formalVersion: '大変お世話になります (Taihen osewa ni narimasu)',
          casualVersion: 'よろしく！ (Yoroshiku!)',
          usageNote: 'Essential formal greeting when meeting Japanese executives for the first time.'
        },
        {
          originalPhrase: '名刺を頂戴いたします',
          englishMeaning: 'Thank you for your business card.',
          pronunciation: 'Meishi o choudai itashimasu',
          formalVersion: '頂戴いたします (Choudai itashimasu)',
          casualVersion: '名刺どうも (Meishi doumo)',
          usageNote: 'Receive business cards (Meishi) with both hands, bow slightly, and study it respectfully before placing it on the table.'
        }
      ],
      etiquetteTips: [
        'Always present and receive business cards (Meishi) using BOTH hands, holding the top corners without covering company logos.',
        'Never write notes on a received business card or put it directly into a back pants pocket.',
        'Bowing depth signifies respect: a 30° bow is standard for business meetings; 45° for senior dignitaries.'
      ],
      thingsToAvoid: [
        'Avoid interrupting senior members during presentations; silence signifies contemplation and respect in Japanese meetings.',
        'Never slide or toss business cards across the meeting table.'
      ]
    };
  }

  return {
    phrases: [
      {
        originalPhrase: 'Pleased to meet you, thank you for your time.',
        englishMeaning: 'Pleased to meet you, thank you for your time.',
        pronunciation: 'Pleased to meet you',
        formalVersion: 'It is a true honor to meet with your delegation today.',
        casualVersion: 'Great meeting you!',
        usageNote: 'Opening formal business greeting.'
      }
    ],
    etiquetteTips: [
      'Maintain steady eye contact and offer a firm handshake.',
      'Address partners by formal titles (Dr., Director, Director General) until invited to use first names.'
    ],
    thingsToAvoid: [
      'Avoid checking mobile devices or arriving late to scheduled meetings.'
    ]
  };
}
