import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    languageCode: 'ja',
    situationId: 'general',
    englishPrompt: 'How do you say "Thank you very much" politely in Japanese?',
    correctAnswer: 'ありがとうございます (Arigatou gozaimasu)',
    options: [
      'こんにちは (Konnichiwa)',
      'ありがとうございます (Arigatou gozaimasu)',
      'すみません (Sumimasen)',
      'さようなら (Sayounara)'
    ],
    phonetic: 'Arigatou gozaimasu',
    explanation: 'Arigatou gozaimasu is the polite form of thank you in Japanese.'
  },
  {
    id: 'q2',
    languageCode: 'hi',
    situationId: 'general',
    englishPrompt: 'What is the traditional respectful greeting in Hindi accompanied by folded hands?',
    correctAnswer: 'नमस्ते (Namaste)',
    options: [
      'नमस्ते (Namaste)',
      'शुक्रिया (Shukriya)',
      'अलविदा (Alvida)',
      'हाँ (Haan)'
    ],
    phonetic: 'Namaste',
    explanation: 'Namaste is used to greet elders, peers, and guests respectfully across India.'
  },
  {
    id: 'q3',
    languageCode: 'fr',
    situationId: 'dining',
    englishPrompt: 'How do you ask for the bill at a restaurant in France?',
    correctAnswer: 'L\'addition, s\'il vous plaît',
    options: [
      'Bonjour Monsieur',
      'L\'addition, s\'il vous plaît',
      'Merci beaucoup',
      'Au revoir'
    ],
    phonetic: 'Lah-dee-syon, seel voo pleh',
    explanation: 'In French cafes and restaurants, you ask for "L\'addition, s\'il vous plaît".'
  },
  {
    id: 'q4',
    languageCode: 'es',
    situationId: 'emergency',
    englishPrompt: 'Which phrase means "I need urgent help!" in Spanish?',
    correctAnswer: '¡Necesito ayuda urgente!',
    options: [
      '¡Buenas noches!',
      '¡Por favor!',
      '¡Necesito ayuda urgente!',
      '¿Dónde está el baño?'
    ],
    phonetic: 'Neh-seh-see-toh ah-yoo-dah oor-khen-teh!',
    explanation: '¡Necesito ayuda urgente! directly alerts bystanders to an urgent emergency.'
  },
  {
    id: 'q5',
    languageCode: 'ta',
    situationId: 'dining',
    englishPrompt: 'How do you ask for iconic South Indian Filter Coffee in Tamil?',
    correctAnswer: 'ஒரு பில்டர் காபி கொடுங்கள்! (Oru filter coffee kodungal!)',
    options: [
      'ஒரு பில்டர் காபி கொடுங்கள்! (Oru filter coffee kodungal!)',
      'வணக்கம் (Vanakkam)',
      'நன்றி (Nandri)',
      'எங்கே போகிறீர்கள்? (Enge pogireergall?)'
    ],
    phonetic: 'Oru filter coffee kodungal!',
    explanation: 'Filter coffee is an essential morning ritual across Tamil Nadu.'
  },
  {
    id: 'q6',
    languageCode: 'ja',
    situationId: 'emergency',
    englishPrompt: 'What emergency helpline number do you call for an ambulance in Japan?',
    correctAnswer: '119',
    options: ['911', '110', '119', '112'],
    phonetic: 'Hyaku-jyuu-kyuu',
    explanation: 'In Japan, dial 119 for fire & medical emergencies, and 110 for police.'
  }
];
