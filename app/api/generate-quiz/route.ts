import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { language, situation } = await req.json();

    const lang = language || 'Japanese';
    const sit = situation || 'Dining & Essentials';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing. Serving smart fallback quiz questions.');
      return NextResponse.json({
        questions: getFallbackQuizQuestions(lang),
        isFallback: true,
      });
    }

    const prompt = `You are a travel language quiz master.
Create 5 to 7 interactive, high-quality quiz questions for a traveler practicing ${lang} phrases for a "${sit}" scenario.

Include a mix of 4 question types:
1. Multiple Choice (vocabulary)
2. Translation (English to target language script)
3. Meaning (Target language phrase to English meaning)
4. Situation-based ("What phrase should you say when...?")

Return strictly valid JSON matching this exact structure:
{
  "questions": [
    {
      "id": "q1",
      "englishPrompt": "Question text asking about a phrase or meaning",
      "correctAnswer": "Exact matching option string",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "phonetic": "Phonetic pronunciation guide for the phrase",
      "explanation": "Clear explanation of why this answer is correct and etiquette tip."
    }
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
            temperature: 0.4,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Quiz API Error:', errorText);
      return NextResponse.json({
        questions: getFallbackQuizQuestions(lang),
        isFallback: true,
      });
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from Gemini API');
    }

    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
      throw new Error('Invalid JSON format returned by Gemini');
    }

    return NextResponse.json({ questions: parsedData.questions, isFallback: false });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to generate dynamic quiz';
    console.error('Quiz Generation Error:', err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function getFallbackQuizQuestions(language: string) {
  const langLower = language.toLowerCase();

  if (langLower.includes('japan')) {
    return [
      {
        id: 'q-ja-1',
        englishPrompt: 'What does "Arigatou gozaimasu" mean when speaking to locals in Japan?',
        correctAnswer: 'Thank you very much',
        options: ['Hello', 'Thank you very much', 'Goodbye', 'Sorry'],
        phonetic: 'Arigatou gozaimasu',
        explanation: 'Arigatou gozaimasu is the polite, respectful form of thank you in Japanese.'
      },
      {
        id: 'q-ja-2',
        englishPrompt: 'Which phrase should you use to call a waiter or excuse yourself in a crowd?',
        correctAnswer: 'Sumimasen (すみません)',
        options: ['Sayounara', 'Sumimasen (すみません)', 'Konnichiwa', 'Oishii'],
        phonetic: 'Sumimasen',
        explanation: 'Sumimasen is an essential Japanese phrase used for "excuse me", "sorry", or getting attention.'
      },
      {
        id: 'q-ja-3',
        englishPrompt: 'How do you politely ask for the check/bill at a restaurant in Tokyo?',
        correctAnswer: 'O-kaikei o onegaishimasu',
        options: ['Eigo no menu', 'O-kaikei o onegaishimasu', 'Omizu kudasai', 'Tasukete'],
        phonetic: 'O-kaikei o onegaishimasu',
        explanation: 'Saying "O-kaikei o onegaishimasu" notifies staff you are ready to pay.'
      },
      {
        id: 'q-ja-4',
        englishPrompt: 'Situation: You need an ambulance in Japan. What emergency number do you call?',
        correctAnswer: '119',
        options: ['911', '110', '119', '112'],
        phonetic: 'Hyaku-jyuu-kyuu',
        explanation: 'In Japan, dial 119 for medical/ambulance emergencies, and 110 for police.'
      },
      {
        id: 'q-ja-5',
        englishPrompt: 'What does "Konnichiwa" mean?',
        correctAnswer: 'Hello / Good afternoon',
        options: ['Good morning', 'Good night', 'Hello / Good afternoon', 'Delicious'],
        phonetic: 'Konnichiwa',
        explanation: 'Konnichiwa is the standard daytime greeting across Japan.'
      }
    ];
  }

  if (langLower.includes('hindi') || langLower.includes('india')) {
    return [
      {
        id: 'q-hi-1',
        englishPrompt: 'What is the traditional respectful Indian greeting accompanied by folded hands?',
        correctAnswer: 'Namaste (नमस्ते)',
        options: ['Namaste (नमस्ते)', 'Shukriya', 'Alvida', 'Haan'],
        phonetic: 'Namaste',
        explanation: 'Namaste is used to greet elders, peers, and guests respectfully across India.'
      },
      {
        id: 'q-hi-2',
        englishPrompt: 'Situation: When ordering street food in India, how do you ask for less spice?',
        correctAnswer: 'Kripya mirch kam rakhna',
        options: ['Bill le aaiye', 'Kripya mirch kam rakhna', 'Kitna hua?', 'Pani dijiye'],
        phonetic: 'Kripya mirch kam rakhna',
        explanation: 'This phrase asks the chef to reduce chili spice in your dish.'
      },
      {
        id: 'q-hi-3',
        englishPrompt: 'What is the nationwide emergency helpline number in India?',
        correctAnswer: '112',
        options: ['911', '112', '100', '119'],
        phonetic: 'Ek ek do',
        explanation: '112 is the single emergency number in India for Police, Fire, and Ambulance.'
      },
      {
        id: 'q-hi-4',
        englishPrompt: 'How do you ask "How much is this?" at an Indian market?',
        correctAnswer: 'Yeh kitne ka hai?',
        options: ['Yeh kahan hai?', 'Yeh kitne ka hai?', 'Aap kaise hain?', 'Shukriya'],
        phonetic: 'Yeh kitne ka hai?',
        explanation: 'Standard phrase for price inquiry at bazaars.'
      },
      {
        id: 'q-hi-5',
        englishPrompt: 'What does "Dhanyavaad" or "Shukriya" mean?',
        correctAnswer: 'Thank you',
        options: ['Please', 'Thank you', 'Welcome', 'Excuse me'],
        phonetic: 'Dhanyavaad',
        explanation: 'Dhanyavaad and Shukriya express gratitude in Hindi.'
      }
    ];
  }

  return [
    {
      id: 'q-gen-1',
      englishPrompt: 'What does "Bonjour" mean in French?',
      correctAnswer: 'Hello / Good morning',
      options: ['Goodbye', 'Hello / Good morning', 'Please', 'Thank you'],
      phonetic: 'Bohn-zhoor',
      explanation: 'Bonjour is the universal daytime greeting in French.'
    },
    {
      id: 'q-gen-2',
      englishPrompt: 'How do you ask for the bill at a restaurant in Paris?',
      correctAnswer: 'L\'addition, s\'il vous plaît',
      options: ['Merci beaucoup', 'L\'addition, s\'il vous plaît', 'Au revoir', 'S\'il vous plaît'],
      phonetic: 'Lah-dee-syon, seel voo pleh',
      explanation: 'L\'addition is the bill in French dining culture.'
    },
    {
      id: 'q-gen-3',
      englishPrompt: 'What does "Gracias" mean in Spanish?',
      correctAnswer: 'Thank you',
      options: ['Hello', 'Thank you', 'Please', 'Sorry'],
      phonetic: 'Grah-see-ahs',
      explanation: 'Gracias expresses thanks in Spanish.'
    },
    {
      id: 'q-gen-4',
      englishPrompt: 'What is the universal European Union emergency phone number?',
      correctAnswer: '112',
      options: ['911', '112', '999', '119'],
      phonetic: 'One-one-two',
      explanation: '112 works free of charge across all EU member states.'
    },
    {
      id: 'q-gen-5',
      englishPrompt: 'What does "Ciao" mean in Italian?',
      correctAnswer: 'Hello & Goodbye',
      options: ['Thank you', 'Hello & Goodbye', 'Water', 'Bill'],
      phonetic: 'Chow',
      explanation: 'Ciao is used for both casual arrival and departure greetings in Italian.'
    }
  ];
}
