import { IndianLanguageDetail } from '../types';

export const INDIAN_LANGUAGES: IndianLanguageDetail[] = [
  {
    id: 'hi',
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    statesSpoken: ['Delhi', 'Uttar Pradesh', 'Rajasthan', 'Himachal Pradesh', 'Madhya Pradesh'],
    speakers: '600 Million+',
    samplePhrase: {
      english: 'Where is the nearest railway station?',
      native: 'सबसे पास का रेलवे स्टेशन कहाँ है?',
      phonetic: 'Sabse paas ka railway station kahan hai?'
    },
    gradient: 'from-amber-500 to-rose-500',
    ttsLangCode: 'hi-IN'
  },
  {
    id: 'gu',
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    statesSpoken: ['Gujarat', 'Daman & Diu', 'Dadra & Nagar Haveli'],
    speakers: '60 Million+',
    samplePhrase: {
      english: 'How much does this cost?',
      native: 'આના કેટલા રૂપિયા થશે?',
      phonetic: 'Aana ketla rupiya thashe?'
    },
    gradient: 'from-orange-500 to-amber-600',
    ttsLangCode: 'gu-IN'
  },
  {
    id: 'mr',
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    statesSpoken: ['Maharashtra', 'Goa (coastal)', 'Mumbai Metro'],
    speakers: '83 Million+',
    samplePhrase: {
      english: 'Hello, how are you?',
      native: 'नमस्कार, तुम्ही कसे आहात?',
      phonetic: 'Namaskar, tumhi kase aahat?'
    },
    gradient: 'from-red-500 to-orange-500',
    ttsLangCode: 'mr-IN'
  },
  {
    id: 'bn',
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    statesSpoken: ['West Bengal', 'Tripura', 'Kolkata'],
    speakers: '300 Million+ (Global)',
    samplePhrase: {
      english: 'This food is very delicious!',
      native: 'এই খাবারটা খুব সুস্বাদু!',
      phonetic: 'Ei khabarta khub shushwadu!'
    },
    gradient: 'from-rose-600 to-pink-500',
    ttsLangCode: 'bn-IN'
  },
  {
    id: 'ta',
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    statesSpoken: ['Tamil Nadu', 'Puducherry', 'Chennai'],
    speakers: '78 Million+',
    samplePhrase: {
      english: 'Thank you very much!',
      native: 'மிக்க நன்றி!',
      phonetic: 'Mikka nandri!'
    },
    gradient: 'from-indigo-600 to-purple-600',
    ttsLangCode: 'ta-IN'
  },
  {
    id: 'te',
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    statesSpoken: ['Telangana', 'Andhra Pradesh', 'Hyderabad'],
    speakers: '82 Million+',
    samplePhrase: {
      english: 'Where can I find a taxi?',
      native: 'టాక్సీ ఎక్కడ దొరుకుతుంది?',
      phonetic: 'Taxi ekkada dorukuthundi?'
    },
    gradient: 'from-cyan-600 to-blue-600',
    ttsLangCode: 'te-IN'
  },
  {
    id: 'kn',
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    statesSpoken: ['Karnataka', 'Bengaluru', 'Mysuru'],
    speakers: '50 Million+',
    samplePhrase: {
      english: 'Please take me to Bengaluru Airport.',
      native: 'ದಯವಿಟ್ಟು ನನ್ನನ್ನು ಬೆಂಗಳೂರು ವಿಮಾನ ನಿಲ್ದಾಣಕ್ಕೆ ಕರೆದೊಯ್ಯಿರಿ.',
      phonetic: 'Dayavittu nannannu Bengaluru vimana nildanakke karedoyyiri.'
    },
    gradient: 'from-yellow-500 to-red-600',
    ttsLangCode: 'kn-IN'
  },
  {
    id: 'ml',
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    statesSpoken: ['Kerala', 'Lakshadweep', 'Kochi', 'Trivandrum'],
    speakers: '38 Million+',
    samplePhrase: {
      english: 'Welcome to Kerala!',
      native: 'കേരളത്തിലേക്ക് സ്വാഗതം!',
      phonetic: 'Keralathilekku swagatham!'
    },
    gradient: 'from-emerald-600 to-teal-600',
    ttsLangCode: 'ml-IN'
  },
  {
    id: 'pa',
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    statesSpoken: ['Punjab', 'Chandigarh', 'Delhi NCR'],
    speakers: '113 Million+ (Global)',
    samplePhrase: {
      english: 'Greetings & peace to you!',
      native: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ!',
      phonetic: 'Sat Sri Akal!'
    },
    gradient: 'from-amber-500 to-yellow-600',
    ttsLangCode: 'pa-IN'
  },
];
