import { EmergencyPhrase } from '../types';

export const CORE_EMERGENCY_ENGLISH_ITEMS = [
  'I need help.',
  'Call the police.',
  'I need a doctor.',
  'Call an ambulance.',
  'I lost my passport.',
  'I am lost.',
  "I don't understand.",
  'Where is the nearest hospital?',
  'Please help me.',
  'Please call my embassy.'
];

export const OFFLINE_EMERGENCY_DATA: Record<
  string,
  { english: string; translation: string; pronunciation: string }[]
> = {
  // Punjabi (pa)
  pa: [
    { english: 'I need help.', translation: 'ਮੈਨੂੰ ਮਦਦ ਦੀ ਲੋੜ ਹੈ।', pronunciation: 'Mennu madad di lorh hai.' },
    { english: 'Call the police.', translation: 'ਪੁਲਿਸ ਨੂੰ ਬੁਲਾਓ!', pronunciation: 'Police nu bulaao!' },
    { english: 'I need a doctor.', translation: 'ਮੈਨੂੰ ਡਾਕਟਰ ਦੀ ਲੋੜ ਹੈ।', pronunciation: 'Mennu doctor di lorh hai.' },
    { english: 'Call an ambulance.', translation: 'ਐਂਬੂਲੈਂਸ ਨੂੰ ਬੁਲਾਓ!', pronunciation: 'Ambulance nu bulaao!' },
    { english: 'I lost my passport.', translation: 'ਮੇਰਾ ਪਾਸਪੋਰਟ ਗੁਆਚ ਗਿਆ ਹੈ।', pronunciation: 'Mera passport guach gaya hai.' },
    { english: 'I am lost.', translation: 'ਮੈਂ ਗੁਆਚ ਗਿਆ ਹਾਂ।', pronunciation: 'Main guach gaya haan.' },
    { english: "I don't understand.", translation: 'ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆ ਰਹੀ।', pronunciation: 'Mennu samajh nahin aa rahi.' },
    { english: 'Where is the nearest hospital?', translation: 'ਨੇੜਲਾ ਹਸਪਤਾਲ ਕਿੱਥੇ ਹੈ?', pronunciation: 'Nedla haspatal kitthe hai?' },
    { english: 'Please help me.', translation: 'ਕਿਰਪਾ ਕਰਕੇ ਮੇਰੀ ਮਦਦ ਕਰੋ।', pronunciation: 'Kirpa karke meri madad karo.' },
    { english: 'Please call my embassy.', translation: 'ਕਿਰਪਾ ਕਰਕੇ ਮੇਰੀ ਅੰਬੈਸੀ ਨੂੰ ਫੋਨ ਕਰੋ।', pronunciation: 'Kirpa karke meri embassy nu phone karo.' },
  ],

  // Gujarati (gu)
  gu: [
    { english: 'I need help.', translation: 'મને મદદ જોઈએ.', pronunciation: 'Mane madad joie.' },
    { english: 'Call the police.', translation: 'પોલીસને ફોન કરો!', pronunciation: 'Police ne phone karo!' },
    { english: 'I need a doctor.', translation: 'મને ડોક્ટરની જરૂર છે.', pronunciation: 'Mane doctor ni zaroor chhe.' },
    { english: 'Call an ambulance.', translation: 'એમ્બ્યુલન્સ બોલાવો!', pronunciation: 'Ambulance bolaavo!' },
    { english: 'I lost my passport.', translation: 'મારો પાસપોર્ટ ખોવાઈ ગયો છે.', pronunciation: 'Maro passport khovai gayo chhe.' },
    { english: 'I am lost.', translation: 'હું રસ્તો ભૂલી ગયો છું.', pronunciation: 'Hoon rasto bhool gayo chhoon.' },
    { english: "I don't understand.", translation: 'મને સમજ પડતી નથી.', pronunciation: 'Mane samajh padti nathi.' },
    { english: 'Where is the nearest hospital?', translation: 'સૌથી નજીકની હોસ્પિટલ ક્યાં છે?', pronunciation: 'Sauthi najikni hospital kyan chhe?' },
    { english: 'Please help me.', translation: 'કૃપા કરીને મારી મદદ કરો.', pronunciation: 'Krupa karine mari madad karo.' },
    { english: 'Please call my embassy.', translation: 'કૃપા કરીને મારી એમ્બેસીને ફોન કરો.', pronunciation: 'Krupa karine mari embassy ne phone karo.' },
  ],

  // Hindi (hi)
  hi: [
    { english: 'I need help.', translation: 'मुझे मदद चाहिए।', pronunciation: 'Mujhe madad chahiye.' },
    { english: 'Call the police.', translation: 'पुलिस को बुलाओ!', pronunciation: 'Police ko bulaao!' },
    { english: 'I need a doctor.', translation: 'मुझे डॉक्टर की जरूरत है।', pronunciation: 'Mujhe doctor ki zaroorat hai.' },
    { english: 'Call an ambulance.', translation: 'एम्बुलेंस को बुलाओ!', pronunciation: 'Ambulance ko bulaao!' },
    { english: 'I lost my passport.', translation: 'मेरा पासपोर्ट खो गया है।', pronunciation: 'Mera passport kho gaya hai.' },
    { english: 'I am lost.', translation: 'मैं रास्ता भूल गया हूँ।', pronunciation: 'Main raasta bhool gaya hoon.' },
    { english: "I don't understand.", translation: 'मुझे समझ नहीं आ रहा है।', pronunciation: 'Mujhe samajh nahin aa raha hai.' },
    { english: 'Where is the nearest hospital?', translation: 'सबसे पास का अस्पताल कहाँ है?', pronunciation: 'Sabse paas ka hospital kahan hai?' },
    { english: 'Please help me.', translation: 'कृपया मेरी मदद करें।', pronunciation: 'Kripya meri madad karen.' },
    { english: 'Please call my embassy.', translation: 'कृपया मेरे दूतावास को कॉल करें।', pronunciation: 'Kripya mere dootavaas ko call karen.' },
  ],

  // Marathi (mr)
  mr: [
    { english: 'I need help.', translation: 'मला मदत हवी आहे.', pronunciation: 'Mala madad hawi aahe.' },
    { english: 'Call the police.', translation: 'पोलिसांना बोलवा!', pronunciation: 'Polisanna bolwa!' },
    { english: 'I need a doctor.', translation: 'मला डॉक्टरांची गरज आहे.', pronunciation: 'Mala doctoranchi garaj aahe.' },
    { english: 'Call an ambulance.', translation: 'ॲम्ब्युलन्स बोलवा!', pronunciation: 'Ambulance bolwa!' },
    { english: 'I lost my passport.', translation: 'माझा पासपोर्ट हरवला आहे.', pronunciation: 'Majha passport haravla aahe.' },
    { english: 'I am lost.', translation: 'मी रस्ता हरवलो आहे.', pronunciation: 'Mi rasta haravlo aahe.' },
    { english: "I don't understand.", translation: 'मला समजत नाही आहे.', pronunciation: 'Mala samjat nahi aahe.' },
    { english: 'Where is the nearest hospital?', translation: 'जवळचे रुग्णालय कुठे आहे?', pronunciation: 'Jawalche rugnalay kuthe aahe?' },
    { english: 'Please help me.', translation: 'कृपया मला मदत करा.', pronunciation: 'Krupaya mala madad kara.' },
    { english: 'Please call my embassy.', translation: 'कृपया माझ्या दूतावासाला फोन करा.', pronunciation: 'Krupaya majhya dutavasala phone kara.' },
  ],

  // Bengali (bn)
  bn: [
    { english: 'I need help.', translation: 'আমার সাহায্য দরকার।', pronunciation: 'Amar sahajjo dorkar.' },
    { english: 'Call the police.', translation: 'পুলিশকে ডাকুন!', pronunciation: 'Police ke dakun!' },
    { english: 'I need a doctor.', translation: 'আমার একজন ডাক্তার দরকার।', pronunciation: 'Amar ekjon doctor dorkar.' },
    { english: 'Call an ambulance.', translation: 'অ্যাম্বুলেন্স ডাকুন!', pronunciation: 'Ambulance dakun!' },
    { english: 'I lost my passport.', translation: 'আমার পাসপোর্ট হারিয়ে গেছে।', pronunciation: 'Amar passport hariye geche.' },
    { english: 'I am lost.', translation: 'আমি হারিয়ে গেছি।', pronunciation: 'Ami hariye gechi.' },
    { english: "I don't understand.", translation: 'আমি বুঝতে পারছি না।', pronunciation: 'Ami bujhte parchi na.' },
    { english: 'Where is the nearest hospital?', translation: 'নিকটস্থ হাসপাতালটি কোথায়?', pronunciation: 'Nikotostho hospital ti kothay?' },
    { english: 'Please help me.', translation: 'দয়া করে আমাকে সাহায্য করুন।', pronunciation: 'Doya kore amake sahajjo korun.' },
    { english: 'Please call my embassy.', translation: 'দয়া করে আমার এম্বাসিতে ফোন করুন।', pronunciation: 'Doya kore amar embassy te phone korun.' },
  ],

  // Tamil (ta)
  ta: [
    { english: 'I need help.', translation: 'எனக்கு உதவி தேவை.', pronunciation: 'Enakku udhavi thevai.' },
    { english: 'Call the police.', translation: 'போலீஸை கூப்பிடுங்கள்!', pronunciation: 'Police-ai koopidungal!' },
    { english: 'I need a doctor.', translation: 'எனக்கு மருத்துவர் தேவை.', pronunciation: 'Enakku maruthuvar thevai.' },
    { english: 'Call an ambulance.', translation: 'ஆம்புலன்ஸை கூப்பிடுங்கள்!', pronunciation: 'Ambulance-ai koopidungal!' },
    { english: 'I lost my passport.', translation: 'என் பாஸ்போர்ட் தொலைந்துவிட்டது.', pronunciation: 'En passport tholaindhuvittadhu.' },
    { english: 'I am lost.', translation: 'நான் வழியறியாமல் தவிக்கிறேன்.', pronunciation: 'Naan vazhiyariyaamal thavikkirean.' },
    { english: "I don't understand.", translation: 'எனக்கு புரியவில்லை.', pronunciation: 'Enakku puriyavillai.' },
    { english: 'Where is the nearest hospital?', translation: 'அருகிலுள்ள மருத்துவமனை எங்கே இருக்கிறது?', pronunciation: 'Arugilulla maruthuvamanai engge irukkiradhu?' },
    { english: 'Please help me.', translation: 'தயவுசெய்து எனக்கு உதவுங்கள்.', pronunciation: 'Dhayavuseydhu enakku udhavungal.' },
    { english: 'Please call my embassy.', translation: 'தயவுசெய்து என் தூதரகத்தை தொடர்பு கொள்ளுங்கள்.', pronunciation: 'Dhayavuseydhu en thootharagathai thodarbu kollungal.' },
  ],

  // Telugu (te)
  te: [
    { english: 'I need help.', translation: 'నాకు సహాయం కావాలి.', pronunciation: 'Naaku sahaayam kaavali.' },
    { english: 'Call the police.', translation: 'పోలీసులకు ఫోన్ చేయండి!', pronunciation: 'Policulaku phone cheyandi!' },
    { english: 'I need a doctor.', translation: 'నాకు డాక్టర్ కావాలి.', pronunciation: 'Naaku doctor kaavali.' },
    { english: 'Call an ambulance.', translation: 'అంబులెన్స్‌ను పిలవండి!', pronunciation: 'Ambulance nu pilavandi!' },
    { english: 'I lost my passport.', translation: 'నా పాస్‌పోర్ట్ పోయింది.', pronunciation: 'Naa passport poyindi.' },
    { english: 'I am lost.', translation: 'నేను దారి తప్పాను.', pronunciation: 'Nenu daari thappaanu.' },
    { english: "I don't understand.", translation: 'నాకు అర్థం కావడం లేదు.', pronunciation: 'Naaku artham kaavadam ledu.' },
    { english: 'Where is the nearest hospital?', translation: 'సమీపంలోని హాస్పిటల్ ఎక్కడ ఉంది?', pronunciation: 'Sameepanloni hospital ekkada undi?' },
    { english: 'Please help me.', translation: 'దయచేసి నాకు సహాయం చేయండి.', pronunciation: 'Dayachesi naaku sahaayam cheyandi.' },
    { english: 'Please call my embassy.', translation: 'దయచేసి నా ఎంబాసీకి ఫోన్ చేయండి.', pronunciation: 'Dayachesi naa embassy ki phone cheyandi.' },
  ],

  // Kannada (kn)
  kn: [
    { english: 'I need help.', translation: 'ನನಗೆ ಸಹಾಯ ಬೇಕು.', pronunciation: 'Nanage sahaaya beaku.' },
    { english: 'Call the police.', translation: 'ಪೊಲೀಸರಿಗೆ ಕರೆ ಮಾಡಿ!', pronunciation: 'Policerige kare maadi!' },
    { english: 'I need a doctor.', translation: 'ನನಗೆ ವೈದ್ಯರ ಅಗತ್ಯವಿದೆ.', pronunciation: 'Nanage vaidyara agatyavide.' },
    { english: 'Call an ambulance.', translation: 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆ ಮಾಡಿ!', pronunciation: 'Ambulance kare maadi!' },
    { english: 'I lost my passport.', translation: 'ನನ್ನ ಪಾಸ್‌ಪೋರ್ಟ್ ಕಳೆದುಹೋಗಿದೆ.', pronunciation: 'Nanna passport kaleduhogide.' },
    { english: 'I am lost.', translation: 'ನಾವು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ.', pronunciation: 'Naanu daari thappiddeane.' },
    { english: "I don't understand.", translation: 'ನನಗೆ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ.', pronunciation: 'Nanage arthavaaguttilla.' },
    { english: 'Where is the nearest hospital?', translation: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', pronunciation: 'Hattirada aaspatre ellide?' },
    { english: 'Please help me.', translation: 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಿ.', pronunciation: 'Dayavittu nanage sahaaya maadi.' },
    { english: 'Please call my embassy.', translation: 'ದಯವಿಟ್ಟು ನನ್ನ ರಾಯಭಾರ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ.', pronunciation: 'Dayavittu nanna raayabhaara kacheerige kare maadi.' },
  ],

  // Malayalam (ml)
  ml: [
    { english: 'I need help.', translation: 'എനിക്ക് സഹായം വേണം.', pronunciation: 'Enikku sahaayam venam.' },
    { english: 'Call the police.', translation: 'പോലീസിനെ വിളിക്കൂ!', pronunciation: 'Policine vilikku!' },
    { english: 'I need a doctor.', translation: 'എനിക്ക് ഒരു ഡോക്ടറെ വേണം.', pronunciation: 'Enikku oru doctore venam.' },
    { english: 'Call an ambulance.', translation: 'ആംബുലൻസ് വിളിക്കൂ!', pronunciation: 'Ambulance vilikku!' },
    { english: 'I lost my passport.', translation: 'എന്റെ പാസ്‌പോർട്ട് നഷ്ടപ്പെട്ടു.', pronunciation: 'Ente passport nashtappettu.' },
    { english: 'I am lost.', translation: 'ഞാൻ വഴി തെറ്റി.', pronunciation: 'Njaan vazhi thetti.' },
    { english: "I don't understand.", translation: 'എനിക്ക് മനസ്സിലാകുന്നില്ല.', pronunciation: 'Enikku manassilaakunnilla.' },
    { english: 'Where is the nearest hospital?', translation: 'അടുത്തുള്ള ആശുപത്രി എവിടെയാണ്?', pronunciation: 'Aduthulla aashupathri evideyaanu?' },
    { english: 'Please help me.', translation: 'ദയവായി എന്നെ സഹായിക്കൂ.', pronunciation: 'Dayavaayi enne sahaayikku.' },
    { english: 'Please call my embassy.', translation: 'ദയവായി എന്റെ എംബസിയിലേക്ക് വിളിക്കൂ.', pronunciation: 'Dayavaayi ente embassy ilekku vilikku.' },
  ],

  // Japanese (ja)
  ja: [
    { english: 'I need help.', translation: '助けてください。', pronunciation: 'Tasukete kudasai.' },
    { english: 'Call the police.', translation: '警察を呼んでください！', pronunciation: 'Keisatsu o yonde kudasai!' },
    { english: 'I need a doctor.', translation: '医者が必要です。', pronunciation: 'Isha ga hitsuyou desu.' },
    { english: 'Call an ambulance.', translation: '救急車を呼んでください！', pronunciation: 'Kyuukyuusha o yonde kudasai!' },
    { english: 'I lost my passport.', translation: 'パスポートをなくしました。', pronunciation: 'Pasupooto o nakushimashita.' },
    { english: 'I am lost.', translation: '道に迷いました。', pronunciation: 'Michi ni mayoimashita.' },
    { english: "I don't understand.", translation: '分かりません。', pronunciation: 'Wakarimasen.' },
    { english: 'Where is the nearest hospital?', translation: '一番近い病院はどこですか？', pronunciation: 'Ichiban chikai byouin wa doko desu ka?' },
    { english: 'Please help me.', translation: 'どうか助けてください。', pronunciation: 'Douka tasukete kudasai.' },
    { english: 'Please call my embassy.', translation: '大使館に連絡してください。', pronunciation: 'Taishikan ni renraku shite kudasai.' },
  ],

  // French (fr)
  fr: [
    { english: 'I need help.', translation: "J'ai besoin d'aide.", pronunciation: 'Zhay buh-zwan ded.' },
    { english: 'Call the police.', translation: 'Appelez la police !', pronunciation: 'Ah-play lah poh-lees!' },
    { english: 'I need a doctor.', translation: "J'ai besoin d'un médecin.", pronunciation: 'Zhay buh-zwan duh med-san.' },
    { english: 'Call an ambulance.', translation: 'Appelez une ambulance !', pronunciation: 'Ah-play une om-bu-lans!' },
    { english: 'I lost my passport.', translation: "J'ai perdu mon passeport.", pronunciation: 'Zhay pair-doo mohn pass-por.' },
    { english: 'I am lost.', translation: 'Je suis perdu.', pronunciation: 'Zhuh swee pair-doo.' },
    { english: "I don't understand.", translation: 'Je ne comprends pas.', pronunciation: 'Zhuh nuh kohn-prahn pah.' },
    { english: 'Where is the nearest hospital?', translation: "Où est l'hôpital le plus proche ?", pronunciation: 'Oo eh loh-pee-tal luh ploo prosh?' },
    { english: 'Please help me.', translation: "S'il vous plaît, aidez-moi.", pronunciation: 'Seel voo pleh, ay-day mwah.' },
    { english: 'Please call my embassy.', translation: 'Veuillez appeler mon ambassade.', pronunciation: 'Vuh-yay ah-play mohn am-bah-sahd.' },
  ],

  // German (de)
  de: [
    { english: 'I need help.', translation: 'Ich brauche Hilfe.', pronunciation: 'Ikh brow-khe hil-fe.' },
    { english: 'Call the police.', translation: 'Rufen Sie die Polizei!', pronunciation: 'Roo-fen zee dee poh-leet-zay!' },
    { english: 'I need a doctor.', translation: 'Ich brauche einen Arzt.', pronunciation: 'Ikh brow-khe eye-nen artst.' },
    { english: 'Call an ambulance.', translation: 'Rufen Sie einen Krankenwagen!', pronunciation: 'Roo-fen zee eye-nen kran-ken-vah-gen!' },
    { english: 'I lost my passport.', translation: 'Ich habe meinen Pass verloren.', pronunciation: 'Ikh hah-be my-nen pass fer-loh-ren.' },
    { english: 'I am lost.', translation: 'Ich habe mich verlaufen.', pronunciation: 'Ikh hah-be mikh fer-low-fen.' },
    { english: "I don't understand.", translation: 'Ich verstehe nicht.', pronunciation: 'Ikh fer-shtay-he nikht.' },
    { english: 'Where is the nearest hospital?', translation: 'Wo ist das nächste Krankenhaus?', pronunciation: 'Voh ist das naekh-ste kran-ken-hows?' },
    { english: 'Please help me.', translation: 'Bitte helfen Sie mir.', pronunciation: 'Bit-te hel-fen zee meer.' },
    { english: 'Please call my embassy.', translation: 'Bitte rufen Sie meine Botschaft an.', pronunciation: 'Bit-te roo-fen zee my-ne boht-shaft an.' },
  ],

  // Spanish (es)
  es: [
    { english: 'I need help.', translation: 'Necesito ayuda.', pronunciation: 'Neh-seh-see-toh ah-yoo-dah.' },
    { english: 'Call the police.', translation: '¡Llame a la policía!', pronunciation: 'Yah-meh ah lah poh-lee-see-ah!' },
    { english: 'I need a doctor.', translation: 'Necesito un médico.', pronunciation: 'Neh-seh-see-toh oon meh-dee-koh.' },
    { english: 'Call an ambulance.', translation: '¡Llame a una ambulancia!', pronunciation: 'Yah-meh ah oon-ah am-boo-lahn-see-ah!' },
    { english: 'I lost my passport.', translation: 'Perdí mi pasaporte.', pronunciation: 'Pair-dee mee pah-sah-por-teh.' },
    { english: 'I am lost.', translation: 'Estoy perdido.', pronunciation: 'Ehs-toy pair-dee-doh.' },
    { english: "I don't understand.", translation: 'No entiendo.', pronunciation: 'Noh ehn-tyehn-doh.' },
    { english: 'Where is the nearest hospital?', translation: '¿Dónde está el hospital más cercano?', pronunciation: 'Dohn-deh ehs-tah el ohs-pee-tal mahs sair-kah-noh?' },
    { english: 'Please help me.', translation: 'Por favor, ayúdeme.', pronunciation: 'Por fah-vor, ah-yoo-deh-meh.' },
    { english: 'Please call my embassy.', translation: 'Por favor llame a mi embajada.', pronunciation: 'Por fah-vor yah-meh ah mee em-bah-hah-dah.' },
  ],

  // Italian (it)
  it: [
    { english: 'I need help.', translation: 'Ho bisogno di aiuto.', pronunciation: 'Oh bee-zoh-nyoh dee ah-yoo-toh.' },
    { english: 'Call the police.', translation: 'Chiamate la polizia!', pronunciation: 'Kee-ah-mah-teh lah poh-leet-see-ah!' },
    { english: 'I need a doctor.', translation: 'Ho bisogno di un medico.', pronunciation: 'Oh bee-zoh-nyoh dee oon meh-dee-koh.' },
    { english: 'Call an ambulance.', translation: "Chiamate un'ambulanza!", pronunciation: 'Kee-ah-mah-teh oon-am-boo-lant-sah!' },
    { english: 'I lost my passport.', translation: 'Ho perso il mio passaporto.', pronunciation: 'Oh pair-soh eel mee-oh pahs-sah-por-toh.' },
    { english: 'I am lost.', translation: 'Mi sono perso.', pronunciation: 'Mee soh-noh pair-soh.' },
    { english: "I don't understand.", translation: 'Non capisco.', pronunciation: 'Nohn kah-pee-skoh.' },
    { english: 'Where is the nearest hospital?', translation: "Dov'è l'ospedale più vicino?", pronunciation: 'Doh-veh loh-speh-dah-leh pyoo vee-chee-noh?' },
    { english: 'Please help me.', translation: 'Per favore aiutatemi.', pronunciation: 'Pair fah-voh-reh ah-yoo-tah-teh-mee.' },
    { english: 'Please call my embassy.', translation: 'Per favore chiamate la mia ambasciata.', pronunciation: 'Pair fah-voh-reh kee-ah-mah-teh lah mee-ah am-bah-shah-tah.' },
  ],

  // Arabic (ar)
  ar: [
    { english: 'I need help.', translation: 'أحتاج إلى المساعدة.', pronunciation: "Ahtaj ila al-musa'adah." },
    { english: 'Call the police.', translation: 'اتصل بالشرطة!', pronunciation: 'Ittasil bi-shurta!' },
    { english: 'I need a doctor.', translation: 'أحتاج إلى طبيب.', pronunciation: 'Ahtaj ila tabeeb.' },
    { english: 'Call an ambulance.', translation: 'اتصل بسيارة الإسعاف!', pronunciation: "Ittasil bi-sayyarat al-is'af!" },
    { english: 'I lost my passport.', translation: 'لقد فقدت جواز سفري.', pronunciation: 'Laqad faqadtu jawaz safari.' },
    { english: 'I am lost.', translation: 'أنا تائه.', pronunciation: "Ana ta'ih." },
    { english: "I don't understand.", translation: 'أنا لا أفهم.', pronunciation: 'Ana la afham.' },
    { english: 'Where is the nearest hospital?', translation: 'أين أقرب مستشفى؟', pronunciation: 'Ayna aqrab mustashfa?' },
    { english: 'Please help me.', translation: 'رجاءً ساعدني.', pronunciation: "Raja'an sa'idni." },
    { english: 'Please call my embassy.', translation: 'الرجاء الاتصال بالسفارة الخاص بي.', pronunciation: "Al-raja' ittisal bi-safarah al-khas bi." },
  ],

  // English (en)
  en: [
    { english: 'I need help.', translation: 'I need help.', pronunciation: 'I need help.' },
    { english: 'Call the police.', translation: 'Call the police!', pronunciation: 'Call the police!' },
    { english: 'I need a doctor.', translation: 'I need a doctor.', pronunciation: 'I need a doctor.' },
    { english: 'Call an ambulance.', translation: 'Call an ambulance!', pronunciation: 'Call an ambulance!' },
    { english: 'I lost my passport.', translation: 'I lost my passport.', pronunciation: 'I lost my passport.' },
    { english: 'I am lost.', translation: 'I am lost.', pronunciation: 'I am lost.' },
    { english: "I don't understand.", translation: "I don't understand.", pronunciation: "I don't understand." },
    { english: 'Where is the nearest hospital?', translation: 'Where is the nearest hospital?', pronunciation: 'Where is the nearest hospital?' },
    { english: 'Please help me.', translation: 'Please help me.', pronunciation: 'Please help me.' },
    { english: 'Please call my embassy.', translation: 'Please call my embassy.', pronunciation: 'Please call my embassy.' },
  ],
};

export function getOfflineEmergencyPhrases(languageCode: string): EmergencyPhrase[] {
  const code = languageCode.toLowerCase();
  const rawList = OFFLINE_EMERGENCY_DATA[code] || OFFLINE_EMERGENCY_DATA['en'];

  return rawList.map((item, idx) => ({
    id: `em-offline-${code}-${idx + 1}`,
    english: item.english,
    translation: item.translation,
    pronunciation: item.pronunciation,
    languageCode: code,
  }));
}
