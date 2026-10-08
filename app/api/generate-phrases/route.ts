import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      destination,
      language,
      languageCode = 'en',
      situation,
      travellerType = 'Solo Traveller',
      difficulty = 'Beginner',
    } = body;

    if (!destination || !language || !situation) {
      return NextResponse.json(
        { error: 'Missing required parameters: destination, language, situation' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyConfigured = Boolean(
      apiKey &&
      apiKey !== 'your_gemini_api_key_here' &&
      apiKey.trim() !== '' &&
      !apiKey.includes('your_')
    );

    const sitLower = situation.toLowerCase();
    const isRestaurant = sitLower.includes('restaurant') || sitLower.includes('dining');
    const isMedical = sitLower.includes('medical') || sitLower.includes('doctor') || sitLower.includes('pharmacy') || sitLower.includes('health');

    if (!isApiKeyConfigured) {
      console.warn(`GEMINI_API_KEY not configured. Serving curated fallback phrases for ${destination} + ${language} + ${situation}.`);
      const fallbackResult = getFallbackResponse(destination, language, languageCode, situation);
      return NextResponse.json({
        ...fallbackResult,
        isFallback: true,
        notice: 'API Key not set in .env.local. Add GEMINI_API_KEY=your_key to enable live AI generations.',
      });
    }

    let prompt = '';

    if (isMedical) {
      prompt = `You are an expert native travel linguist assistant creating a MEDICAL SURVIVAL PHRASEBOOK.

A traveler visiting ${destination} needs practical, highly realistic medical communication phrases in ${language} (Code: ${languageCode}).

CRITICAL MEDICAL SAFETY & PHRASE INSTRUCTION:
Generate between 30 and 40 useful medical communication phrases covering ALL 9 REQUIRED CATEGORIES:

1. "Finding Medical Help":
   - "Where is the nearest hospital?", "Where is the nearest clinic?", "Where is the nearest pharmacy?", "I need medical help.", "Can you help me find a doctor?", "Is there a doctor nearby?", "Is there a 24-hour pharmacy nearby?", "How can I get to the hospital?"
2. "Doctor & Consultation":
   - "I need to see a doctor.", "I would like to see a doctor.", "Can I see a doctor now?", "Do I need an appointment?", "Is the doctor available?", "Please speak slowly.", "I don't understand.", "Can you write it down for me?"
3. "Symptoms & Problems":
   - "I have a fever.", "I have a headache.", "I have a stomachache.", "My stomach hurts.", "My throat hurts.", "I have a cough.", "I have a cold.", "I feel dizzy.", "I feel sick.", "I have difficulty breathing.", "I have chest pain.", "I have been vomiting.", "I have diarrhea.", "I have a rash.", "I injured my leg.", "I have pain here."
4. "Pharmacy & Medicine":
   - "Where is the nearest pharmacy?", "Do you have this medicine?", "Is this medicine available?", "I need medicine for a headache.", "I need medicine for a fever.", "I need medicine for a cold.", "Do you have a pain reliever?", "Is this available without a prescription?", "Can I speak to a pharmacist?"
5. "Allergies & Medical Conditions":
   - "I am allergic to this medicine.", "I have a food allergy.", "I am allergic to peanuts.", "I am allergic to penicillin.", "I have asthma.", "I have diabetes.", "I have high blood pressure.", "I take regular medication."
6. "Prescription & Medication Questions":
   - "Do I need a prescription?", "I have a prescription.", "Here is my prescription.", "How should I take this medicine?", "How often should I take it?", "Should I take it before or after food?", "Are there any side effects?", "Can you write the instructions down?"
7. "Medical Emergency":
   - "I need help.", "This is an emergency.", "Call an ambulance.", "Please call a doctor.", "I need to go to the hospital.", "I cannot breathe properly.", "Where is the emergency department?"
8. "Medical Payment & Insurance":
   - "How much does the consultation cost?", "How much does this medicine cost?", "Do you accept my insurance?", "Do you accept international insurance?", "Can I pay by card?", "Can I get a receipt?", "Can I get a medical bill?"
9. "Useful Communication":
   - "Please speak slowly.", "I don't understand.", "Can you repeat that?", "Can you write it down?", "Can you speak English?", "I need an interpreter.", "Can you show me where to go?"

RULES:
- DO NOT generate medical diagnoses or treatment advice.
- ONLY generate communication phrases that help a traveler ask medical staff.
- Emergency phrases should have priority "high".
- "originalPhrase" MUST be in proper native script of ${language}.
- "pronunciation" MUST be a clear, phonetic romanized guide in Latin script.
- "englishMeaning" MUST be natural English.
- "usageContext" MUST explain when to use the phrase.

Return strictly JSON:
{
  "destination": "${destination}",
  "language": "${language}",
  "languageCode": "${languageCode}",
  "situation": "Medical",
  "culturalTip": "A short practical medical advice note for ${destination}",
  "phrases": [
    {
      "category": "Symptoms & Problems",
      "originalPhrase": "Native script text",
      "englishMeaning": "English phrase",
      "pronunciation": "Romanized pronunciation in Latin script",
      "formality": "polite",
      "usageContext": "When to use this phrase",
      "priority": "normal"
    }
  ]
}`;
    } else if (isRestaurant) {
      prompt = `You are an expert native travel linguist assistant creating a RESTAURANT SURVIVAL PHRASEBOOK.

A traveler visiting ${destination} needs practical dining phrases in ${language} (Code: ${languageCode}).

Generate between 30 and 40 useful restaurant phrases covering ALL 9 REQUIRED CATEGORIES:
1. "Menu & Ordering", 2. "Special & Recommendations", 3. "Waiter & Service", 4. "Water & Table Requests", 5. "Food & Customization", 6. "Dietary & Ingredients", 7. "Plate & Cutlery", 8. "Bill & Payment", 9. "Feedback & Compliments"

RULES:
- "originalPhrase" MUST be in proper native script of ${language}.
- "pronunciation" MUST be a clear, phonetic romanized pronunciation guide.
- "englishMeaning" MUST be natural English.
- "usageContext" MUST explain when and how to use this phrase.

Return strictly JSON:
{
  "destination": "${destination}",
  "language": "${language}",
  "languageCode": "${languageCode}",
  "situation": "Restaurant",
  "culturalTip": "A short practical local dining & tipping etiquette tip for ${destination}",
  "phrases": [
    {
      "category": "Menu & Ordering",
      "originalPhrase": "Native script text",
      "englishMeaning": "English phrase",
      "pronunciation": "Romanized pronunciation in Latin script",
      "formality": "polite",
      "usageContext": "When to use this phrase"
    }
  ]
}`;
    } else {
      prompt = `You are an expert native travel linguist assistant creating a High-Quality Travel Phrasebook for a traveler visiting ${destination}.

Selected Parameters:
- DESTINATION: ${destination}
- LANGUAGE: ${language} (Code: ${languageCode})
- SITUATION: ${situation}
- TRAVELLER PERSONA: ${travellerType}
- DIFFICULTY LEVEL: ${difficulty}

CRITICAL RULES:
1. Generate between 25 and 40 practical, authentic, non-generic phrases ONLY for the "${situation}" scenario in ${destination}.
2. DO NOT include generic phrases belonging to other situations (e.g. no restaurant/menu phrases in Airport; no hotel phrases in Transport; no shopping phrases in Business).
3. Group each phrase under relevant sub-categories specific to "${situation}".
   - For Transport: "Bus & Train", "Taxi & Cab", "Tickets & Fares", "Stops & Stations", "Getting Around", "Payment"
   - For Airport: "Check-in & Gate", "Baggage & Drop", "Immigration & Customs", "Security", "Arrivals & Flight Info", "Lost Luggage", "Help"
   - For Shopping: "Finding Products", "Price & Discounts", "Size & Color", "Trying Products", "Payment & UPI", "Receipt & Refund"
   - For Directions: "Finding Places", "Asking Directions", "Left & Right", "Distance & Time", "Public Transport", "Maps"
   - For Business: "Greetings & Courtesy", "Introductions", "Business Meetings", "Business Cards", "Scheduling & Time", "Negotiation", "Follow-up"
   - For Emergency: "Immediate SOS", "Police", "Ambulance", "Personal Safety", "Passport & Embassy", "Emergency Communication"
   - For Money & Payment: "Cash & ATM", "Card & Digital Payment", "Currency Exchange", "Receipts & Refunds", "Pricing"
   - For Social: "Introductions", "Small Talk", "Travel & Interests", "Photos & Socializing", "Polite Expressions"
   - For Local Travel: "Attractions & Landmarks", "Local Food", "Tickets & Hours", "Local Transport", "Culture & Tips"
   - For Greetings: "Basic Greetings", "Morning & Evening", "Introductions", "Polite Expressions", "Friendly Conversation", "Goodbyes"
4. "originalPhrase" MUST be in the proper native script of ${language} (Devanagari for Gujarati/Hindi/Marathi, Gurmukhi for Punjabi, Bengali script for Bengali, Tamil script for Tamil, Telugu script for Telugu, Kannada script for Kannada, Malayalam script for Malayalam, Kanji/Hiragana for Japanese, Arabic script for Arabic, Cyrillic, Latin, etc.).
5. "pronunciation" MUST be a clear, phonetic romanized pronunciation guide in Latin script.
6. "englishMeaning" MUST be natural English.
7. "usageContext" MUST explain when and how to use this phrase effectively.
8. Include a top-level "culturalTip" summarizing local etiquette or advice for ${situation} in ${destination}.

Return strictly valid JSON matching this structure:
{
  "destination": "${destination}",
  "language": "${language}",
  "languageCode": "${languageCode}",
  "situation": "${situation}",
  "culturalTip": "A short practical local etiquette tip for ${situation} in ${destination}",
  "phrases": [
    {
      "category": "Sub-category Name",
      "originalPhrase": "Native script text",
      "englishMeaning": "English translation",
      "pronunciation": "Phonetic romanized pronunciation in Latin script",
      "formality": "polite",
      "usageContext": "When to use this phrase",
      "priority": "normal"
    }
  ]
}

Formality MUST be one of: "polite", "casual", or "formal".
Output ONLY pure valid JSON. No markdown backticks.`;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error status:', response.status, errorText);
        const fallbackResult = getFallbackResponse(destination, language, languageCode, situation);
        return NextResponse.json({
          ...fallbackResult,
          isFallback: true,
          notice: `Gemini API returned status ${response.status}. Served smart fallback phrases.`,
        });
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
        category: p.category || situation,
        originalPhrase: p.originalPhrase || p.translation || '',
        englishMeaning: p.englishMeaning || p.english || '',
        pronunciation: p.pronunciation || '',
        formality: p.formality || 'polite',
        usageContext: p.usageContext || '',
        culturalTip: p.culturalTip || '',
        priority: p.priority || (p.category?.toLowerCase().includes('emergency') || situation.toLowerCase().includes('emergency') ? 'high' : 'normal'),
      }));

      return NextResponse.json({
        destination: parsedData.destination || destination,
        language: parsedData.language || language,
        languageCode: parsedData.languageCode || languageCode,
        situation: parsedData.situation || situation,
        culturalTip: parsedData.culturalTip || '',
        phrases: phrasesWithIds,
        isFallback: false,
      });

    } catch (geminiError: unknown) {
      console.warn('Network or parsing error connecting to Gemini API, serving smart fallback:', geminiError);
      const fallbackResult = getFallbackResponse(destination, language, languageCode, situation);
      return NextResponse.json({
        ...fallbackResult,
        isFallback: true,
        notice: 'Gemini request could not complete. Served smart fallback phrases.',
      });
    }

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    console.error('API Error in /api/generate-phrases:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Multilingual Situation Fallback Engine for ALL 16 Languages
function getFallbackResponse(destination: string, language: string, languageCode: string, situation: string) {
  const langLower = language.toLowerCase();
  const codeLower = languageCode.toLowerCase();
  const sitLower = situation.toLowerCase();

  const isGujarati = langLower.includes('gujarati') || codeLower === 'gu';
  const isHindi = langLower.includes('hindi') || codeLower === 'hi';
  const isMarathi = langLower.includes('marathi') || codeLower === 'mr';
  const isPunjabi = langLower.includes('punjabi') || codeLower === 'pa';
  const isBengali = langLower.includes('bengali') || codeLower === 'bn';
  const isTamil = langLower.includes('tamil') || codeLower === 'ta';
  const isTelugu = langLower.includes('telugu') || codeLower === 'te';
  const isKannada = langLower.includes('kannada') || codeLower === 'kn';
  const isMalayalam = langLower.includes('malayalam') || codeLower === 'ml';
  const isJapanese = langLower.includes('japan') || codeLower === 'ja';
  const isFrench = langLower.includes('french') || codeLower === 'fr';
  const isGerman = langLower.includes('german') || codeLower === 'de';
  const isItalian = langLower.includes('italian') || codeLower === 'it';
  const isSpanish = langLower.includes('spanish') || codeLower === 'es';
  const isArabic = langLower.includes('arabic') || codeLower === 'ar';

  let culturalTip = `When traveling in ${destination}, polite expressions and respecting local customs in ${situation} situations will make your journey smooth.`;

  interface PhraseMap {
    gu?: [string, string];
    hi?: [string, string];
    mr?: [string, string];
    pa?: [string, string];
    bn?: [string, string];
    ta?: [string, string];
    te?: [string, string];
    kn?: [string, string];
    ml?: [string, string];
    ja?: [string, string];
    it?: [string, string];
    de?: [string, string];
    fr?: [string, string];
    ar?: [string, string];
    es?: [string, string];
    en?: [string, string];
  }

  function getPhraseForLang(map: PhraseMap): [string, string] {
    if (isGujarati && map.gu) return map.gu;
    if (isHindi && map.hi) return map.hi;
    if (isMarathi && map.mr) return map.mr;
    if (isPunjabi && map.pa) return map.pa;
    if (isBengali && map.bn) return map.bn;
    if (isTamil && map.ta) return map.ta;
    if (isTelugu && map.te) return map.te;
    if (isKannada && map.kn) return map.kn;
    if (isMalayalam && map.ml) return map.ml;
    if (isJapanese && map.ja) return map.ja;
    if (isItalian && map.it) return map.it;
    if (isGerman && map.de) return map.de;
    if (isFrench && map.fr) return map.fr;
    if (isArabic && map.ar) return map.ar;
    if (isSpanish && map.es) return map.es;
    if (map.en) return map.en;

    const firstAvailable = Object.values(map)[0];
    return firstAvailable || ['Hello', 'Hello'];
  }

  let phrases: Array<{
    id: string;
    category: string;
    originalPhrase: string;
    englishMeaning: string;
    pronunciation: string;
    formality: 'polite' | 'casual' | 'formal';
    usageContext: string;
    priority?: string;
  }> = [];

  // 1. EMERGENCY
  if (sitLower.includes('emergency') || sitLower.includes('help') || sitLower.includes('sos')) {
    culturalTip = `Emergency in ${destination}: Keep police & medical contacts stored in your phone and call for help clearly.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['મદદ કરો! / મને મદદની જરૂર છે.', 'Madad karo! / Mane madad ni jarur chhe.'],
      hi: ['मदद कीजिए! / मुझे मदद चाहिए।', 'Madad keejiye! / Mujhe madad chahiye.'],
      mr: ['मदत करा! / मला मदतीची गरज आहे.', 'Madat kara! / Mala madatichi garaj aahe.'],
      pa: ['ਮਦਦ ਕਰੋ! / ਮੈਨੂੰ ਮਦਦ ਦੀ ਲੋੜ ਹੈ।', 'Madad karo! / Mainu madad di lod hai.'],
      bn: ['সাহায্য করুন! / আমার সাহায্য দরকার।', 'Sahajjo korun! / Amar sahajjo dorkar.'],
      ta: ['உதவி செய்யுங்கள்! / எனக்கு உதவி தேவை.', 'Udhavi seyyungal! / Enakku udhavi thevai.'],
      te: ['సహాయం చేయండి! / నాకు సహాయం కావాలి.', 'Sahaayam cheyandi! / Naaku sahaayam kaavali.'],
      kn: ['ಸಹಾಯ ಮಾಡಿ! / ನನಗೆ ಸಹಾಯ ಬೇಕು.', 'Sahaaya maadi! / Nanage sahaaya beku.'],
      ml: ['സഹായിക്കൂ! / എനിക്ക് സഹായം വേണം.', 'Sahaayikkoo! / Enikku sahaayam venam.'],
      ja: ['助けてください！', 'Tasukete kudasai!'],
      it: ['Aiuto! Ho bisogno di aiuto.', 'Ah-yoo-toh! Oh bee-zohn-yoh dee ah-yoo-toh.'],
      de: ['Hilfe! Ich brauche Hilfe.', 'Hil-feh! Ich brow-cheh Hil-feh.'],
      fr: ['Aidez-moi ! J\'ai besoin d\'aide.', 'Ay-day mwah! Zhay buh-zwahn dede.'],
      ar: ['مساعدة! أحتاج إلى مساعدة.', 'Musa\'adah! Ahtaj ila musa\'adah.'],
      es: ['¡Ayuda! Necesito ayuda.', 'Ah-yoo-dah! Neh-seh-see-toh ah-yoo-dah.'],
      en: ['Help! I need help.', 'Help! I need help.']
    });
    const [p2Orig, p2Pron] = getPhraseForLang({
      gu: ['તરત જ પોલીસને ફોન કરો!', 'Tarat ja police ne phone karo!'],
      hi: ['तुरंत पुलिस को फोन कीजिए!', 'Turant police ko phone keejiye!'],
      mr: ['त्वरित पोलिसांना फोन करा!', 'Tvarit polisanna phone kara!'],
      pa: ['ਤੁਰੰਤ ਪੁਲਿਸ ਨੂੰ ਫੋਨ ਕਰੋ!', 'Turant police nu phone karo!'],
      bn: ['מיד পুলিশে ফোন করুন!', 'Mide police-e phone korun!'],
      ta: ['உடனே காவல் துறையை அழையுங்கள்!', 'Udane kaaval thuraiyai azhaithungal!'],
      te: ['వెంటనే పోలీసులకు ఫోన్ చేయండి!', 'Ventane polisulaku phone cheyandi!'],
      kn: ['ತಕ್ಷಣ ಪೋಲಿಸರಿಗೆ ಕರೆ ಮಾಡಿ!', 'Takshana policerige kare maadi!'],
      ml: ['ഉടൻ തന്നെ പോലീസിനെ വിളിക്കൂ!', 'Udan thanne polisine vilikkoo!'],
      ja: ['すぐに警察を呼んでください！', 'Suguni keisatsu wo yonde kudasai!'],
      it: ['Chiami subito la polizia!', 'Kyah-mee soo-bee-toh lah poh-lee-tsee-ah!'],
      de: ['Rufen Sie sofort die Polizei!', 'Roo-fen zee zoh-fort dee Poh-leet-sy!'],
      fr: ['Appelez la police immédiatement !', 'Ah-play lah poh-lees ee-may-dyaht-mahn!'],
      ar: ['اتصل بالشرطة فوراً!', 'Ittasil bi-al-shurtah fawran!'],
      es: ['¡Llame a la policía inmediatamente!', 'Yah-meh ah lah poh-lee-see-ah een-meh-dyah-tah-men-teh!'],
      en: ['Call the police immediately!', 'Call the police immediately!']
    });
    phrases = [
      { id: 'fb-e-1', category: 'Immediate SOS', originalPhrase: p1Orig, englishMeaning: 'Help! I need help.', pronunciation: p1Pron, formality: 'polite', usageContext: 'Urgent call for help in an emergency.', priority: 'high' },
      { id: 'fb-e-2', category: 'Police Emergency', originalPhrase: p2Orig, englishMeaning: 'Call the police immediately!', pronunciation: p2Pron, formality: 'formal', usageContext: 'Reporting crime or safety issue.', priority: 'high' }
    ];
  }

  // 2. TRANSPORT
  else if (sitLower.includes('transport') || sitLower.includes('bus') || sitLower.includes('train') || sitLower.includes('taxi')) {
    culturalTip = `Transit in ${destination}: Keep exact fare or card ready and double-check route numbers before boarding.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['બસ સ્ટેન્ડ / રેલ્વે સ્ટેશન ક્યાં છે?', 'Bus stand / Railway station kyaan chhe?'],
      hi: ['बस स्टैंड / रेलवे स्टेशन कहाँ है?', 'Bus stand / Railway station kahan hai?'],
      mr: ['बस स्थानक / रेल्वे स्टेशन कुठे आहे?', 'Bus sthanak / Railway station kuthe aahe?'],
      pa: ['ਬੱਸ ਅੱਡਾ / ਰੇਲਵੇ ਸਟੇਸ਼ਨ ਕਿੱਥੇ ਹੈ?', 'Bus adda / Railway station kitthe hai?'],
      bn: ['বাস স্টপ / রেলওয়ে স্টেশন কোথায়?', 'Bus stop / Railway station kothay?'],
      ta: ['பேருந்து நிறுத்தம் / ரயில் நிலையம் எங்கே?', 'Perundhu niruttham / Railway nilayam enge?'],
      te: ['బస్ స్టాప్ / రైల్వే స్టేషన్ ఎక్కడ ఉంది?', 'Bus stop / Railway station ekkada undi?'],
      kn: ['ಬಸ್ ನಿಲ್ದಾಣ / ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', 'Bus nildana / Railway nildana ellide?'],
      ml: ['ബസ് സ്റ്റോപ്പ് / റെയിൽവേ സ്റ്റേഷൻ എവിടെയാണ്?', 'Bus stop / Railway station evideyanu?'],
      ja: ['バス停／駅はどこですか？', 'Basutei / Eki wa doko desu ka?'],
      it: ['Dov\'è la fermata dell\'autobus / stazione?', 'Doh-veh lah fehr-mah-tah dehl ow-toh-boos / stah-tsyo-neh?'],
      de: ['Wo ist die Bushaltestelle / der Bahnhof?', 'Vo ist dee Boos-hal-teh-shtel-leh / der Bahn-hof?'],
      fr: ['Où est l\'arrêt de bus / la gare ?', 'Oo eh lah-ray duh boos / lah gar?'],
      ar: ['أين موقف الحافلات / محطة القطار؟', 'Ayna mawqif al-hafilat / mahattat al-qitar?'],
      es: ['¿Dónde está la parada de autobús / estación de tren?', 'Don-deh es-tah lah pah-rah-dah deh ow-toh-boos / es-tah-syohn deh tren?'],
      en: ['Where is the bus stop / train station?', 'Where is the bus stop / train station?']
    });
    const [p2Orig, p2Pron] = getPhraseForLang({
      gu: ['મને આ સરનામે લઈ જાઓ.', 'Mane aa sarname lai jao.'],
      hi: ['मुझे इस पते पर ले चलिए।', 'Mujhe is pate par le chaliye.'],
      mr: ['मला या पत्त्यावर घेऊन जा.', 'Mala ya pattyavar gheun ja.'],
      pa: ['ਮੈਨੂੰ ਇਸ ਪਤੇ ਤੇ ਲੈ ਚੱਲੋ।', 'Mainu is pate te lai challo.'],
      bn: ['আমাকে এই ঠিকানায় নিয়ে যান।', 'Amake ei thikanay niye jan.'],
      ta: ['என்னை இந்த முகவரிக்கு அழைத்துச் செல்லுங்கள்.', 'Ennai indha mugavariukku azhaithu chellungal.'],
      te: ['నన్ను ఈ చిరునామాకు తీసుకువెళ్లండి.', 'Nannu ee chirunaamaaku teesukellandi.'],
      kn: ['ನನ್ನನ್ನು ಈ ವಿಳಾಸಕ್ಕೆ ಕರೆದೊಯ್ಯಿರಿ.', 'Nannannu ee vilasakke karedoyyiri.'],
      ml: ['എന്നെ ഈ വിലാസത്തിലേക്ക് കൊണ്ടുപോകൂ.', 'Enne ee vilasathilekku kondupokoo.'],
      ja: ['この住所までお願いします。', 'Kono jusho made onegaishimasu.'],
      it: ['Mi porti a questo indirizzo, per favore.', 'Mee pohr-tee ah kweh-stoh een-dee-reet-soh, pehr fah-voh-reh.'],
      de: ['Fahren Sie mich bitte zu dieser Adresse.', 'Fah-ren zee mich bit-teh tzoo dee-zer Ah-dres-seh.'],
      fr: ['Emmenez-moi à cette adresse, s\'il vous plaît.', 'Ahn-mun-yay mwah ah set ah-dress seel voo play.'],
      ar: ['خذني إلى هذا العنوان من فضلك.', 'Khudhni ila hadha al-\'unwan min fadlik.'],
      es: ['Lléveme a esta dirección, por favor.', 'Yeh-veh-meh ah es-tah dee-rek-syohn por fah-vor.'],
      en: ['Please take me to this address.', 'Please take me to this address.']
    });
    phrases = [
      { id: 'fb-tr-1', category: 'Stops & Stations', originalPhrase: p1Orig, englishMeaning: 'Where is the bus stop / train station?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Asking station location.' },
      { id: 'fb-tr-2', category: 'Taxi & Navigation', originalPhrase: p2Orig, englishMeaning: 'Please take me to this address.', pronunciation: p2Pron, formality: 'polite', usageContext: 'Instructing taxi driver.' }
    ];
  }

  // 3. AIRPORT
  else if (sitLower.includes('airport') || sitLower.includes('flight') || sitLower.includes('gate')) {
    culturalTip = `At ${destination} airports, keep boarding pass and passport handy for security checks.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['ચેક-ઈન કાઉન્ટર ક્યાં છે?', 'Check-in counter kyaan chhe?'],
      hi: ['चेक-इन काउंटर कहाँ है?', 'Check-in counter kahan hai?'],
      mr: ['चेक-इन काउंटर कुठे आहे?', 'Check-in counter kuthe aahe?'],
      pa: ['ਚੈੱਕ-ਇਨ ਕਾਊਂਟਰ ਕਿੱਥੇ ਹੈ?', 'Check-in counter kitthe hai?'],
      bn: ['চেক-ইন কাউন্টার কোথায়?', 'Check-in counter kothay?'],
      ta: ['செக்-இன் கவுண்டர் எங்கே?', 'Check-in counter enge?'],
      te: ['చెక్-ఇన్ కౌంటర్ ఎక్కడ ఉంది?', 'Check-in counter ekkada undi?'],
      kn: ['ಚೆಕ್-ಇನ್ ಕೌಂಟರ್ ಎಲ್ಲಿದೆ?', 'Check-in counter ellide?'],
      ml: ['ചെക്ക്-ഇൻ കൗണ്ടർ എവിടെയാണ്?', 'Check-in counter evideyanu?'],
      ja: ['チェックインカウンターはどこですか？', 'Chekkuin kauntā wa doko desu ka?'],
      it: ['Dov\'è il banco del check-in?', 'Doh-veh eel bahn-koh dehl chehk-een?'],
      de: ['Wo ist der Check-in-Schalter?', 'Vo ist der Check-in-Shal-ter?'],
      fr: ['Où est le comptoir d\'enregistrement ?', 'Oo eh luh kohn-twahr dahn-ruh-zhees-truh-mahn?'],
      ar: ['أين مكتب التسجيل؟', 'Ayna maktab al-tasjeel?'],
      es: ['¿Dónde está el mostrador de facturación?', 'Don-deh es-tah el mos-trah-dor deh fak-too-rah-syohn?'],
      en: ['Where is the check-in counter?', 'Where is the check-in counter?']
    });
    const [p2Orig, p2Pron] = getPhraseForLang({
      gu: ['સામાન મેળવવાની જગ્યા ક્યાં છે?', 'Saman melvavani jagya kyaan chhe?'],
      hi: ['सामान मिलने की जगह कहाँ है?', 'Saman milne ki jagah kahan hai?'],
      mr: ['सामान घेण्याची जागा कुठे आहे?', 'Samaan ghenyachi jaaga kuthe aahe?'],
      pa: ['ਸਾਮਾਨ ਲੈਣ ਦੀ ਜਗ੍ਹਾ ਕਿੱਥੇ ਹੈ?', 'Samaan lain di jagha kitthe hai?'],
      bn: ['লগেজ পাওয়ার জায়গা কোথায়?', 'Luggage paowar jaaga kothay?'],
      ta: ['பொருட்கள் வாங்கும் இடம் எங்கே?', 'Porutkal vaangum idam enge?'],
      te: ['లగేజ్ క్లెయిమ్ ఎక్కడ ఉంది?', 'Luggage claim ekkada undi?'],
      kn: ['ಲಗೇಜ್ ಪಡೆಯುವ ಸ್ಥಳ ಎಲ್ಲಿದೆ?', 'Luggage padeyuva sthala ellide?'],
      ml: ['ലഗേജ് ലഭിക്കുന്ന സ്ഥലം എവിടെയാണ്?', 'Luggage labhikkunna sthalam evideyanu?'],
      ja: ['手荷物受け取り所はどこですか？', 'Tenimotsu uketorijo wa doko desu ka?'],
      it: ['Dov\'è il ritiro bagagli?', 'Doh-veh eel ree-tee-roh bah-gahl-yee?'],
      de: ['Wo ist die Gepäckausgabe?', 'Vo ist dee Geh-peck-ows-gah-beh?'],
      fr: ['Où est la livraison des bagages ?', 'Oo eh lah lee-vray-zohn day bah-gahzh?'],
      ar: ['أين استلام الأمتعة؟', 'Ayna istilam al-amti\'ah?'],
      es: ['¿Dónde está la recogida de equipajes?', 'Don-deh es-tah lah reh-koh-hee-dah deh eh-kee-pah-hes?'],
      en: ['Where is baggage claim?', 'Where is baggage claim?']
    });
    phrases = [
      { id: 'fb-ap-1', category: 'Check-in & Gate', originalPhrase: p1Orig, englishMeaning: 'Where is the check-in counter?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Locating check-in counter.' },
      { id: 'fb-ap-2', category: 'Baggage Claim', originalPhrase: p2Orig, englishMeaning: 'Where is baggage claim?', pronunciation: p2Pron, formality: 'polite', usageContext: 'Finding luggage belt after arrival.' }
    ];
  }

  // 4. DIRECTIONS
  else if (sitLower.includes('direction') || sitLower.includes('location') || sitLower.includes('where')) {
    culturalTip = `Asking locals for directions in ${destination} is easy when showing landmarks or maps on your phone.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['આ જગ્યા ક્યાં છે?', 'Aa jagya kyaan chhe?'],
      hi: ['यह जगह कहाँ है?', 'Yeh jagah kahan hai?'],
      mr: ['ही जागा कुठे आहे?', 'Hee jaaga kuthe aahe?'],
      pa: ['ਇਹ ਜਗ੍ਹਾ ਕਿੱਥੇ ਹੈ?', 'Eh jagha kitthe hai?'],
      bn: ['এই জায়গাটি কোথায়?', 'Ei jaigati kothay?'],
      ta: ['இந்த இடம் எங்கே இருக்கிறது?', 'Indha idam enge irukkiradhu?'],
      te: ['ఈ స్థలం ఎక్కడ ఉంది?', 'Ee sthalam ekkada undi?'],
      kn: ['ಈ ಸ್ಥಳ ಎಲ್ಲಿದೆ?', 'Ee sthala ellide?'],
      ml: ['ഈ സ്ഥലം എവിടെയാണ്?', 'Ee sthalam evideyanu?'],
      ja: ['ここへの行き方を教えてください。', 'Koko e no ikikata wo oshiete kudasai.'],
      it: ['Dov\'è questo posto?', 'Doh-veh kweh-stoh poh-stoh?'],
      de: ['Wo ist dieser Ort?', 'Vo ist dee-zer Ort?'],
      fr: ['Où se trouve cet endroit ?', 'Oo suh troov set ahn-drwah?'],
      ar: ['أين يقع هذا المكان؟', 'Ayna yaqa\' hadha al-makan?'],
      es: ['¿Dónde está este lugar?', 'Don-deh es-tah es-teh loo-gar?'],
      en: ['Where is this place?', 'Where is this place?']
    });
    phrases = [
      { id: 'fb-dir-1', category: 'Finding Places', originalPhrase: p1Orig, englishMeaning: 'Where is this place?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Asking for directions.' }
    ];
  }

  // 5. SHOPPING
  else if (sitLower.includes('shopping') || sitLower.includes('price') || sitLower.includes('buy')) {
    culturalTip = `Shopping in ${destination}: Check prices before purchasing and ask politely about available discounts.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['આની કિંમત કેટલી છે?', 'Aani kimat ketli chhe?'],
      hi: ['इसकी कीमत कितनी है?', 'Iski keemat kitni hai?'],
      mr: ['याची किंमत किती आहे?', 'Yachi kimat kiti aahe?'],
      pa: ['ਇਸਦਾ ਮੁੱਲ ਕਿੰਨਾ ਹੈ?', 'Isda mull kinna hai?'],
      bn: ['এটার দাম কত?', 'Etar dam koto?'],
      ta: ['இதன் விலை என்ன?', 'Idhan vilai enna?'],
      te: ['దీని ధర ఎంత?', 'Deeni dhara entha?'],
      kn: ['ಇದರ ಬೆಲೆ ಎಷ್ಟು?', 'Idara bele eshtu?'],
      ml: ['ഇതിന് എത്ര വിലയാണ്?', 'Idhinu ethra vilayaanu?'],
      ja: ['これはいくらですか？', 'Kore wa ikura desu ka?'],
      it: ['Quanto costa questo?', 'Kwahn-toh koh-stah kweh-stoh?'],
      de: ['Wie viel kostet das?', 'Vee feel kos-tet das?'],
      fr: ['Combien ça coûte ?', 'Kohm-byan sah koot?'],
      ar: ['كم سعر هذا؟', 'Kam si\'r hadha?'],
      es: ['¿Cuánto cuesta esto?', 'Kwahn-toh kwes-tah es-toh?'],
      en: ['How much does this cost?', 'How much does this cost?']
    });
    phrases = [
      { id: 'fb-shp-1', category: 'Price & Discounts', originalPhrase: p1Orig, englishMeaning: 'How much does this cost?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Inquiring product price.' }
    ];
  }

  // 6. BUSINESS
  else if (sitLower.includes('business') || sitLower.includes('meeting') || sitLower.includes('work')) {
    culturalTip = `Business etiquette in ${destination}: Offer business cards with respect and maintain professional politeness.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['તમને મળીને આનંદ થયો.', 'Tamne maline anand thayo.'],
      hi: ['आपसे मिलकर खुशी हुई।', 'Aapse milkar khushi hui.'],
      mr: ['आपल्याला भेटून आनंद झाला.', 'Aaplyala bhetun anand jhala.'],
      pa: ['ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ।', 'Tuhanu mil ke khushi hoi.'],
      bn: ['আপনার সাথে দেখা করে আনন্দিত।', 'Apnar sathe dekha kore anondito.'],
      ta: ['உங்களை சந்தித்ததில் மகிழ்ச்சி.', 'Ungalai sandhithadhil magizhchi.'],
      te: ['మిమ్మల్ని కలిసినందుకు సంతోషం.', 'Mimmalni kalisinanduku santhosham.'],
      kn: ['ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದಕ್ಕೆ ಸಂತೋಷವಾಗಿದೆ.', 'Nimmannu bhetiyagiddakke santhoshavagide.'],
      ml: ['കണ്ടുമുട്ടിയതിൽ സന്തോഷം.', 'Kandumuttiyadhil santhosham.'],
      ja: ['お会いできて光栄です。', 'O-ai dekite kouei desu.'],
      it: ['Piacere di conoscerla.', 'Pyah-cheh-reh dee koh-noh-shehr-lah.'],
      de: ['Schön, Sie kennenzulernen.', 'Shern, zee ken-nen-tzoo-ler-nen.'],
      fr: ['Ravi de vous rencontrer.', 'Rah-vee duh voo rahn-kohn-tray.'],
      ar: ['سررت بلقائك.', 'Surirtu bi-liqa\'ik.'],
      es: ['Mucho gusto en conocerle.', 'Moo-choh goos-toh en koh-noh-sehr-leh.'],
      en: ['Pleased to meet you.', 'Pleased to meet you.']
    });
    phrases = [
      { id: 'fb-biz-1', category: 'Greetings & Courtesy', originalPhrase: p1Orig, englishMeaning: 'Pleased to meet you.', pronunciation: p1Pron, formality: 'formal', usageContext: 'Formal professional greeting.' }
    ];
  }

  // 7. MONEY / PAYMENT
  else if (sitLower.includes('money') || sitLower.includes('payment') || sitLower.includes('atm') || sitLower.includes('card')) {
    culturalTip = `Payments in ${destination}: Digital cards & UPI are widely accepted, but carry small cash for local vendors.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['સૌથી નજીકનું ATM ક્યાં છે?', 'Sauthi najiknu ATM kyaan chhe?'],
      hi: ['सबसे नजदीकी ATM कहाँ है?', 'Sabse najdeeki ATM kahan hai?'],
      mr: ['सर्वात जवळचे ATM कुठे आहे?', 'Sarvaat javalche ATM kuthe aahe?'],
      pa: ['ਸਭ ਤੋਂ ਨੇੜਲਾ ATM ਕਿੱਥੇ ਹੈ?', 'Sabh ton nedla ATM kitthe hai?'],
      bn: ['নিকটতম ATM কোথায়?', 'Nikottomo ATM kothay?'],
      ta: ['அருகில் உள்ள ஏடிஎம் எங்கே?', 'Arugil ulla ATM enge?'],
      te: ['దగ్గరలో ఉన్న ATM ఎక్కడ ఉంది?', 'Daggaralo unna ATM ekkada undi?'],
      kn: ['ಹತ್ತಿರದ ಎಟಿಎಂ ಎಲ್ಲಿದೆ?', 'Hattirada ATM ellide?'],
      ml: ['അടുത്തുള്ള എടിഎം എവിടെയാണ്?', 'Aduthulla ATM evideyanu?'],
      ja: ['一番近いATMはどこですか？', 'Ichiban chikai ATM wa doko desu ka?'],
      it: ['Dov\'è il bancomat più vicino?', 'Doh-veh eel bahn-koh-maht pyoo vee-chee-noh?'],
      de: ['Wo ist der nächste Geldautomat?', 'Vo ist der nech-steh Geld-ow-toh-mat?'],
      fr: ['Où est le distributeur le plus proche ?', 'Oo eh luh dees-tree-boo-tur luh ploo prosh?'],
      ar: ['أين أقرب صراف آلي؟', 'Ayna aqrab sarraf ali?'],
      es: ['¿Dónde está el cajero automático más cercano?', 'Don-deh es-tah el kah-heh-roh ow-toh-mah-tee-koh mas sehr-kah-noh?'],
      en: ['Where is the nearest ATM?', 'Where is the nearest ATM?']
    });
    const [p2Orig, p2Pron] = getPhraseForLang({
      gu: ['શું અહીં કાર્ડ અથવા UPI ચાલે છે?', 'Shu ahi card athva UPI chaale chhe?'],
      hi: ['क्या यहाँ कार्ड या UPI चलेगा?', 'Kya yahan card ya UPI chalega?'],
      mr: ['येथे कार्ड किंवा UPI चालेल का?', 'Yethe card kiva UPI chalel ka?'],
      pa: ['ਕੀ ਇੱਥੇ ਕਾਰਡ ਜਾਂ UPI ਚੱਲੇਗਾ?', 'Ki itthe card ja UPI challega?'],
      bn: ['এখানে কি কার্ড বা UPI নেওয় হয়?', 'Ekhane ki card ba UPI newa hoy?'],
      ta: ['இங்கே கார்டு அல்லது UPI ஏற்றுக்கொள்ளப்படுமா?', 'Inge card alladhu UPI aerkappadumaa?'],
      te: ['ఇక్కడ కార్డ్ లేదా UPI తీసుకుంటారా?', 'Ikkada card leda UPI teesukuntara?'],
      kn: ['ಇಲ್ಲಿ ಕಾರ್ಡ್ ಅಥವಾ UPI ಸ್ವೀಕರಿಸುತ್ತೀರಾ?', 'Illi card athava UPI sweekarisutteera?'],
      ml: ['ഇവിടെ കാർഡോ യുപിഐയോ സ്വീകരിക്കുമോ?', 'Ivide cardo UPIyo sveekarikkumo?'],
      ja: ['カードやQRコード決済は使えますか？', 'Kādo ya QR kōdo kessai wa tsukaemasu ka?'],
      it: ['Posso pagare con carta?', 'Pohs-soh pah-gah-reh kohn kahr-tah?'],
      de: ['Kann ich mit Karte zahlen?', 'Kann ich mit Kar-teh tsah-len?'],
      fr: ['Puis-je payer par carte ?', 'Pwee-zhuh pay-yay par kart?'],
      ar: ['هل يمكنني الدفع بالبطاقة؟', 'Hal yumkinuni al-daf\' bi-al-bitaqah?'],
      es: ['¿Puedo pagar con tarjeta?', 'Pweh-doh pah-gar kon tar-heh-tah?'],
      en: ['Can I pay by card or digital payment?', 'Can I pay by card or digital payment?']
    });
    phrases = [
      { id: 'fb-mon-1', category: 'Cash & ATM', originalPhrase: p1Orig, englishMeaning: 'Where is the nearest ATM?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Finding automated teller machine.' },
      { id: 'fb-mon-2', category: 'Card & Digital Payment', originalPhrase: p2Orig, englishMeaning: 'Can I pay by card or digital payment?', pronunciation: p2Pron, formality: 'polite', usageContext: 'Checking accepted payment methods.' }
    ];
  }

  // 8. SOCIAL
  else if (sitLower.includes('social') || sitLower.includes('friend')) {
    culturalTip = `Making friends in ${destination}: friendly small talk and polite questions are well received.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['તમારું નામ શું છે?', 'Tamaru naam shu chhe?'],
      hi: ['आपका नाम क्या है?', 'Aapka naam kya hai?'],
      mr: ['तुमचे नाव काय आहे?', 'Tumche naav kay aahe?'],
      pa: ['ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?', 'Tuhada naam ki hai?'],
      bn: ['আপনার নাম কি?', 'Apnar naam ki?'],
      ta: ['உங்கள் பெயர் என்ன?', 'Ungal peyar enna?'],
      te: ['మీ పేరు ఏమిటి?', 'Mee peru emiti?'],
      kn: ['ನಿಮ್ಮ ಹೆಸರೇನು?', 'Nimma hesarenu?'],
      ml: ['നിങ്ങളുടെ പേരെന്താണ്?', 'Ningalude perenthaanu?'],
      ja: ['お名前は何ですか？', 'O-namae wa nan desu ka?'],
      it: ['Come ti chiami?', 'Koh-meh tee kyee-ah-mee?'],
      de: ['Wie heißen Sie?', 'Vee hy-sen zee?'],
      fr: ['Comment vous appelez-vous ?', 'Koh-mahn voo zah-play-voo?'],
      ar: ['ما اسمك؟', 'Ma ismuk?'],
      es: ['¿Cómo te llamas?', 'Koh-moh teh yah-mas?'],
      en: ['What is your name?', 'What is your name?']
    });
    phrases = [
      { id: 'fb-soc-1', category: 'Introductions', originalPhrase: p1Orig, englishMeaning: 'What is your name?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Asking someone\'s name.' }
    ];
  }

  // 9. LOCAL TRAVEL
  else if (sitLower.includes('local') || sitLower.includes('tour') || sitLower.includes('sight')) {
    culturalTip = `Exploring ${destination}: check opening hours for landmarks and respect temple/museum dress codes.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['અહીં જોવા જેવી ખાસ જગ્યા કઈ છે?', 'Ahi jova jevi khaas jagya kai chhe?'],
      hi: ['यहाँ घूमने लायक खास जगह कौन सी है?', 'Yahan ghoomne layak khaas jagah kaun si hai?'],
      mr: ['येथे भेट देण्यासारखी कोणती खास जागा आहे?', 'Yethe bhet denyasarkhi konti khaas jaaga aahe?'],
      pa: ['ਇੱਥੇ ਘੁੰਮਣ ਵਾਲੀ ਕਿਹੜੀ ਖਾਸ ਜਗ੍ਹਾ ਹੈ?', 'Itthe ghumman wali kehdi khaas jagha hai?'],
      bn: ['এখানে ঘোরার মতো বিশেষ জায়গা কোনটা?', 'Ekhane ghorar moto bishesh jaaga konta?'],
      ta: ['இங்கே பார்க்க வேண்டிய முக்கிய இடம் எது?', 'Inge paarkka vendiya mukkiya idam edhu?'],
      te: ['ఇక్కడ చూడవలసిన ముఖ్యమైన ప్రదేశం ఏది?', 'Ikkada choodavalasina mukhyamaina pradesam edi?'],
      kn: ['ಇಲ್ಲಿ ನೋಡಬೇಕಾದ ಮುಖ್ಯ ಸ್ಥಳ ಯಾವುದು?', 'Illi nodabekada mukhya sthala yaavudu?'],
      ml: ['ഇവിടെ സന്ദർശിക്കേണ്ട പ്രധാന സ്ഥലം ഏതാണ്?', 'Ivide sandarshikkenda pradhana sthalam edhanu?'],
      ja: ['おすすめの観光スポットはどこですか？', 'O-susume no kankou supotto wa doko desu ka?'],
      it: ['Quali posti dovrei visitare?', 'Kwah-lee poh-stee doh-vray vee-zee-tah-reh?'],
      de: ['Welche Orte sollte ich besuchen?', 'Vel-cheh Or-teh zoll-teh ich beh-zoo-chen?'],
      fr: ['Quels endroits devrais-je visiter ?', 'Kel zahn-drwah duh-vray-zhuh vee-zee-tay?'],
      ar: ['ما هي الأماكن التي ينبغي لي زيارتها؟', 'Ma hiya al-amakin allati yanbaghi li ziyaratuha?'],
      es: ['¿Qué lugares me recomienda visitar?', 'Keh loo-gah-res meh reh-koh-myen-dah vee-see-tar?'],
      en: ['What places should I visit?', 'What places should I visit?']
    });
    phrases = [
      { id: 'fb-lt-1', category: 'Attractions & Sightseeing', originalPhrase: p1Orig, englishMeaning: 'What places should I visit?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Asking for local recommendations.' }
    ];
  }

  // 10. GREETINGS
  else if (sitLower.includes('greeting') || sitLower.includes('hello')) {
    culturalTip = `Greetings in ${destination}: a warm smile and local polite greeting opens doors everywhere.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['નમસ્તે', 'Namaste'],
      hi: ['नमस्ते', 'Namaste'],
      mr: ['नमस्कार', 'Namaskar'],
      pa: ['ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', 'Sat Sri Akal'],
      bn: ['নমস্কার', 'Nomoshkar'],
      ta: ['வணக்கம்', 'Vanakkam'],
      te: ['నమస్తే', 'Namaste'],
      kn: ['ನಮಸ್ಕಾರ', 'Namaskara'],
      ml: ['നമസ്കാരം', 'Namaskaram'],
      ja: ['こんにちは', 'Konnichiwa'],
      it: ['Ciao / Buongiorno', 'Chow / Bwohn-johr-noh'],
      de: ['Hallo / Guten Tag', 'Hah-loh / Goo-ten Tag'],
      fr: ['Bonjour', 'Bohn-zhoor'],
      ar: ['مرحبا', 'Marhaban'],
      es: ['Hola', 'Oh-lah'],
      en: ['Hello', 'Hello']
    });
    const [p2Orig, p2Pron] = getPhraseForLang({
      gu: ['આભાર', 'Aabhar'],
      hi: ['धन्यवाद / शुक्रिया', 'Dhanyawad / Shukriya'],
      mr: ['धन्यवाद', 'Dhanyavaad'],
      pa: ['ਧੰਨਵਾਦ', 'Dhanwaad'],
      bn: ['ধন্যবাদ', 'Dhonnobad'],
      ta: ['நன்றி', 'Nandri'],
      te: ['ధన్యవాదాలు', 'Dhanyavadalu'],
      kn: ['ಧನ್ಯವಾದಗಳು', 'Dhanyavadagalu'],
      ml: ['നന്ദി', 'Nandi'],
      ja: ['ありがとうございます', 'Arigatou gozaimasu'],
      it: ['Grazie mille', 'Grah-tsyeh meel-leh'],
      de: ['Vielen Dank', 'Fee-len Dank'],
      fr: ['Merci beaucoup', 'Mair-see boh-koo'],
      ar: ['شكراً جزيلاً', 'Shukran jazeelan'],
      es: ['Muchas gracias', 'Moo-chas grah-syas'],
      en: ['Thank you very much', 'Thank you very much']
    });
    phrases = [
      { id: 'fb-g-1', category: 'Basic Greetings', originalPhrase: p1Orig, englishMeaning: 'Hello / Greetings', pronunciation: p1Pron, formality: 'polite', usageContext: 'Universal polite greeting.' },
      { id: 'fb-g-2', category: 'Polite Expressions', originalPhrase: p2Orig, englishMeaning: 'Thank you very much', pronunciation: p2Pron, formality: 'polite', usageContext: 'Expressing gratitude.' }
    ];
  }

  // 11. MEDICAL
  else if (sitLower.includes('medical') || sitLower.includes('doctor') || sitLower.includes('pharmacy') || sitLower.includes('health')) {
    culturalTip = `Medical info in ${destination}: carry written details of any chronic conditions or allergies.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['સૌથી નજીકની હોસ્પિટલ ક્યાં છે?', 'Sauthi najikni hospital kyaan chhe?'],
      hi: ['सबसे नजदीकी अस्पताल कहाँ है?', 'Sabse najdeeki hospital kahan hai?'],
      mr: ['सर्वात जवळचे रुग्णालय कुठे आहे?', 'Sarvaat javalche rugnalay kuthe aahe?'],
      pa: ['ਸਭ ਤੋਂ ਨੇੜਲਾ ਹਸਪਤਾਲ ਕਿੱਥੇ ਹੈ?', 'Sabh ton nedla hospital kitthe hai?'],
      bn: ['নিকটতম হাসপাতাল কোথায়?', 'Nikottomo hospital kothay?'],
      ta: ['அருகில் உள்ள மருத்துவமனை எங்கே?', 'Arugil ulla maruthuvamanai enge?'],
      te: ['దగ్గరలో ఉన్న ఆసుపత్రి ఎక్కడ ఉంది?', 'Daggaralo unna aasupatri ekkada undi?'],
      kn: ['ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'Hattirada aaspatre ellide?'],
      ml: ['അടുത്തുള്ള ആശുപത്രി എവിടെയാണ്?', 'Aduthulla aashupathri evideyanu?'],
      ja: ['一番近い病院はどこですか？', 'Ichiban chikai byouin wa doko desu ka?'],
      it: ['Dov\'è l\'ospedale più vicino?', 'Doh-veh loh-speh-dah-leh pyoo vee-chee-noh?'],
      de: ['Wo ist das nächste Krankenhaus?', 'Vo ist das nech-steh Kran-ken-hows?'],
      fr: ['Où est l\'hôpital le plus proche ?', 'Oo eh loh-pee-tahl luh ploo prosh?'],
      ar: ['أين أقرب مستشفى؟', 'Ayna aqrab mustashfa?'],
      es: ['¿Dónde está el hospital más cercano?', 'Don-deh es-tah el hos-pee-tahl mas sehr-kah-noh?'],
      en: ['Where is the nearest hospital?', 'Where is the nearest hospital?']
    });
    phrases = [
      { id: 'fb-m-1', category: 'Finding Medical Help', originalPhrase: p1Orig, englishMeaning: 'Where is the nearest hospital?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Locating hospital during medical need.', priority: 'high' }
    ];
  }

  // 12. RESTAURANT / DINING (default)
  else {
    culturalTip = `Dining in ${destination}: feel free to call servers politely and specify your dietary preferences.`;
    const [p1Orig, p1Pron] = getPhraseForLang({
      gu: ['મેનૂ ક્યાં છે?', 'Menu kyaan chhe?'],
      hi: ['मेनू कहाँ है?', 'Menu kahan hai?'],
      mr: ['मेनू मिळेल का?', 'Menu milel ka?'],
      pa: ['ਮੇਨੂ ਦਿਓ ਜੀ', 'Menu dio ji'],
      bn: ['মেনু দেওয়া যাবে?', 'Menu dewa jabe?'],
      ta: ['மெனு கார்டு தர முடியுமா?', 'Menu card thara mudiyumaa?'],
      te: ['మెనూ ఇవ్వగలరా?', 'Menu ivvagalaraba?'],
      kn: ['ಮೆನು ಕೊಡಿ', 'Menu kodi'],
      ml: ['മെനു തരാമോ?', 'Menu tharamo?'],
      ja: ['メニューを見せていただけますか？', 'Menyū wo misete itadakemasu ka?'],
      it: ['Posso vedere il menu, per favore?', 'Pohs-soh veh-deh-reh eel meh-noo, pehr fah-voh-reh?'],
      de: ['Kann ich bitte die Speisekarte sehen?', 'Kann ich bit-teh dee Shpy-zeh-kar-teh zee-en?'],
      fr: ['Puis-je voir le menu, s\'il vous plaît ?', 'Pwee-zhuh vwahr luh muh-noo, seel voo play?'],
      ar: ['هل يمكنني رؤية قائمة الطعام من فضلك؟', 'Hal yumkinuni ru\'yat qa\'imat al-ta\'am min fadlik?'],
      es: ['¿Puedo ver el menú, por favor?', 'Pweh-doh vehr el meh-noo, por fah-vor?'],
      en: ['Can I see the menu, please?', 'Can I see the menu, please?']
    });
    phrases = [
      { id: 'fb-r-1', category: 'Menu & Ordering', originalPhrase: p1Orig, englishMeaning: 'Can I see the menu, please?', pronunciation: p1Pron, formality: 'polite', usageContext: 'Asking server for menu.' }
    ];
  }

  return {
    destination,
    language,
    languageCode,
    situation,
    culturalTip,
    phrases,
  };
}
