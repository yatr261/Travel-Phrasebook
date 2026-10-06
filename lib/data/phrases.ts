import { Phrase } from '../types';

export const PHRASES: Phrase[] = [
  // JAPANESE (ja)
  {
    id: 'ja-gen-1',
    english: 'Hello / Good day',
    targetText: 'こんにちは',
    phonetic: 'Konnichiwa',
    languageCode: 'ja',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Slight head bow adds respectful warmth.',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-gen-2',
    english: 'Thank you very much',
    targetText: 'ありがとうございます',
    phonetic: 'Arigatou gozaimasu',
    languageCode: 'ja',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Use the longer form "gozaimasu" for politeness to strangers.',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-gen-3',
    english: 'Excuse me / Sorry',
    targetText: 'すみません',
    phonetic: 'Sumimasen',
    languageCode: 'ja',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Extremely versatile phrase used to grab attention, say sorry, or express thanks.',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-din-1',
    english: 'Delicious! / Thank you for the meal',
    targetText: 'ごちそうさまでした',
    phonetic: 'Gochisousama deshita',
    languageCode: 'ja',
    situationId: 'dining',
    importance: 'essential',
    culturalNote: 'Say this to the chef or staff when finishing your meal.',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-din-2',
    english: 'Water, please',
    targetText: 'お水をお願いします',
    phonetic: 'Omizu o onegaishimasu',
    languageCode: 'ja',
    situationId: 'dining',
    importance: 'helpful',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-em-1',
    english: 'Help! Please call an ambulance!',
    targetText: '助けて！救急車を呼んでください！',
    phonetic: 'Tasukete! Kyuukyuusha o yonde kudasai!',
    languageCode: 'ja',
    situationId: 'emergency',
    importance: 'emergency',
    culturalNote: 'In Japan, Dial 119 for ambulance and fire emergency.',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-em-2',
    english: 'Where is the hospital?',
    targetText: '病院はどこですか？',
    phonetic: 'Byouin wa doko desu ka?',
    languageCode: 'ja',
    situationId: 'emergency',
    importance: 'emergency',
    audioLangCode: 'ja-JP'
  },
  {
    id: 'ja-tr-1',
    english: 'Where is the train station?',
    targetText: '駅はどこですか？',
    phonetic: 'Eki wa doko desu ka?',
    languageCode: 'ja',
    situationId: 'transit',
    importance: 'essential',
    audioLangCode: 'ja-JP'
  },

  // HINDI (hi)
  {
    id: 'hi-gen-1',
    english: 'Greetings & Respectful Welcome',
    targetText: 'नमस्ते / नमस्कार',
    phonetic: 'Namaste / Namaskar',
    languageCode: 'hi',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Fold palms together near the chest while speaking for traditional greeting.',
    audioLangCode: 'hi-IN'
  },
  {
    id: 'hi-gen-2',
    english: 'Thank you very much',
    targetText: 'बहुत धन्यवाद / शुक्रिया',
    phonetic: 'Bahut dhanyavaad / Shukriya',
    languageCode: 'hi',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Dhanyavaad is formal Hindi; Shukriya is widely understood and colloquial.',
    audioLangCode: 'hi-IN'
  },
  {
    id: 'hi-tr-1',
    english: 'How much for the auto-rickshaw to [destination]?',
    targetText: 'यहाँ से [जगह] का कितना भाड़ा लगेगा?',
    phonetic: 'Yahan se [Jagah] ka kitna bhaada lagega?',
    languageCode: 'hi',
    situationId: 'transit',
    importance: 'essential',
    culturalNote: 'Always ask auto drivers to run the meter or negotiate before getting in.',
    audioLangCode: 'hi-IN'
  },
  {
    id: 'hi-din-1',
    english: 'Please make it less spicy!',
    targetText: 'कृपया मिर्च कम रखना!',
    phonetic: 'Kripya mirch kam rakhna!',
    languageCode: 'hi',
    situationId: 'dining',
    importance: 'essential',
    culturalNote: 'Indian spices can be intense for tourists; use this phrase when ordering.',
    audioLangCode: 'hi-IN'
  },
  {
    id: 'hi-em-1',
    english: 'Help! Please call the police!',
    targetText: 'मदद करो! पुलिस को बुलाओ!',
    phonetic: 'Madad karo! Police ko bulaao!',
    languageCode: 'hi',
    situationId: 'emergency',
    importance: 'emergency',
    culturalNote: 'In India, 112 is the nationwide emergency helpline number.',
    audioLangCode: 'hi-IN'
  },

  // GUJARATI (gu)
  {
    id: 'gu-gen-1',
    english: 'Greetings',
    targetText: 'જય શ્રી કૃષ્ણ / નમસ્તે',
    phonetic: 'Jai Shree Krishna / Namaste',
    languageCode: 'gu',
    situationId: 'general',
    importance: 'essential',
    culturalNote: '"Jai Shree Krishna" is a warm traditional greeting across Gujarat.',
    audioLangCode: 'gu-IN'
  },
  {
    id: 'gu-shop-1',
    english: 'How much does this cost?',
    targetText: 'આના કેટલા રૂપિયા થશે?',
    phonetic: 'Aana ketla rupiya thashe?',
    languageCode: 'gu',
    situationId: 'shopping',
    importance: 'essential',
    culturalNote: 'Gujarat has vibrant handicraft markets in Ahmedabad and Bhuj.',
    audioLangCode: 'gu-IN'
  },

  // MARATHI (mr)
  {
    id: 'mr-gen-1',
    english: 'Hello, how are you?',
    targetText: 'नमस्कार, तुम्ही कसे आहात?',
    phonetic: 'Namaskar, tumhi kase aahat?',
    languageCode: 'mr',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Widely spoken across Mumbai and Maharashtra.',
    audioLangCode: 'mr-IN'
  },
  {
    id: 'mr-tr-1',
    english: 'Where is the Mumbai local train ticket counter?',
    targetText: 'लोकल ट्रेनचे तिकीट खिडकी कुठे आहे?',
    phonetic: 'Local trainche ticket khidki kuthe aahe?',
    languageCode: 'mr',
    situationId: 'transit',
    importance: 'essential',
    audioLangCode: 'mr-IN'
  },

  // BENGALI (bn)
  {
    id: 'bn-gen-1',
    english: 'Greetings',
    targetText: 'নমস্কার / আসসালামু আলাইকুম',
    phonetic: 'Nomoshkar / Assalamu alaikum',
    languageCode: 'bn',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Kolkata is known as the Cultural Capital of India.',
    audioLangCode: 'bn-IN'
  },

  // TAMIL (ta)
  {
    id: 'ta-gen-1',
    english: 'Greetings / Welcome',
    targetText: 'வணக்கம்',
    phonetic: 'Vanakkam',
    languageCode: 'ta',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'A deep classic greeting accompanied by folding hands.',
    audioLangCode: 'ta-IN'
  },
  {
    id: 'ta-din-1',
    english: 'One filter coffee, please!',
    targetText: 'ஒரு பில்டர் காபி கொடுங்கள்!',
    phonetic: 'Oru filter coffee kodungal!',
    languageCode: 'ta',
    situationId: 'dining',
    importance: 'essential',
    culturalNote: 'South Indian Filter Coffee is famous across Tamil Nadu.',
    audioLangCode: 'ta-IN'
  },

  // TELUGU (te)
  {
    id: 'te-gen-1',
    english: 'Greetings',
    targetText: 'நమస్కారం',
    phonetic: 'Namaskaram',
    languageCode: 'te',
    situationId: 'general',
    importance: 'essential',
    audioLangCode: 'te-IN'
  },

  // KANNADA (kn)
  {
    id: 'kn-gen-1',
    english: 'Greetings',
    targetText: 'ನಮಸ್ಕಾರ',
    phonetic: 'Namaskara',
    languageCode: 'kn',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Spoken throughout Bengaluru tech hub and Karnataka.',
    audioLangCode: 'kn-IN'
  },

  // MALAYALAM (ml)
  {
    id: 'ml-gen-1',
    english: 'Greetings / Respectful Hello',
    targetText: 'നമസ്കാരം',
    phonetic: 'Namaskaram',
    languageCode: 'ml',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Kerala is known as "God\'s Own Country".',
    audioLangCode: 'ml-IN'
  },

  // PUNJABI (pa)
  {
    id: 'pa-gen-1',
    english: 'Greetings & Peace',
    targetText: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',
    phonetic: 'Sat Sri Akal',
    languageCode: 'pa',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Heartfelt universal Punjabi greeting.',
    audioLangCode: 'pa-IN'
  },

  // FRENCH (fr)
  {
    id: 'fr-gen-1',
    english: 'Hello / Good morning',
    targetText: 'Bonjour',
    phonetic: 'Bohn-zhoor',
    languageCode: 'fr',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'Always say "Bonjour" when entering any shop or greeting anyone in France.',
    audioLangCode: 'fr-FR'
  },
  {
    id: 'fr-din-1',
    english: 'The bill, please',
    targetText: 'L\'addition, s\'il vous plaît',
    phonetic: 'Lah-dee-syon, seel voo pleh',
    languageCode: 'fr',
    situationId: 'dining',
    importance: 'essential',
    audioLangCode: 'fr-FR'
  },
  {
    id: 'fr-em-1',
    english: 'Help! Call a doctor!',
    targetText: 'Au secours ! Appelez un médecin !',
    phonetic: 'Oh suh-koor! Ah-play uh med-san!',
    languageCode: 'fr',
    situationId: 'emergency',
    importance: 'emergency',
    audioLangCode: 'fr-FR'
  },

  // SPANISH (es)
  {
    id: 'es-gen-1',
    english: 'Hello / Hi',
    targetText: '¡Hola! ¿Cómo estás?',
    phonetic: 'Oh-lah! Koh-moh ehs-tahs?',
    languageCode: 'es',
    situationId: 'general',
    importance: 'essential',
    audioLangCode: 'es-ES'
  },
  {
    id: 'es-tr-1',
    english: 'Where is the bus stop?',
    targetText: '¿Dónde está la parada de autobús?',
    phonetic: 'Dohn-deh ehs-tah lah pah-rah-dah deh ow-toh-boos?',
    languageCode: 'es',
    situationId: 'transit',
    importance: 'essential',
    audioLangCode: 'es-ES'
  },
  {
    id: 'es-em-1',
    english: 'I need urgent help!',
    targetText: '¡Necesito ayuda urgente!',
    phonetic: 'Neh-seh-see-toh ah-yoo-dah oor-khen-teh!',
    languageCode: 'es',
    situationId: 'emergency',
    importance: 'emergency',
    audioLangCode: 'es-ES'
  },

  // ITALIAN (it)
  {
    id: 'it-gen-1',
    english: 'Hello / Goodbye',
    targetText: 'Ciao / Buongiorno',
    phonetic: 'Chow / Bwon-joor-noh',
    languageCode: 'it',
    situationId: 'general',
    importance: 'essential',
    audioLangCode: 'it-IT'
  },

  // THAI (th)
  {
    id: 'th-gen-1',
    english: 'Hello (polite phrase)',
    targetText: 'สวัสดีครับ / สวัสดีค่ะ',
    phonetic: 'Sawatdee khrap / Sawatdee ka',
    languageCode: 'th',
    situationId: 'general',
    importance: 'essential',
    culturalNote: 'End with "khrap" if you are male, or "ka" if female.',
    audioLangCode: 'th-TH'
  },
  {
    id: 'th-din-1',
    english: 'Not spicy, please!',
    targetText: 'ไม่เผ็ดครับ / ไม่เผ็ดค่ะ',
    phonetic: 'Mai phet khrap / Mai phet ka',
    languageCode: 'th',
    situationId: 'dining',
    importance: 'essential',
    culturalNote: 'Thai chillies can be extremely hot for visitors.',
    audioLangCode: 'th-TH'
  }
];
