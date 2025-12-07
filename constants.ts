import { Scheme, Sector, LanguageCode, LanguageConfig } from './types';

export const SCHEMES_DB: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for all landholding farmer families.',
    sector: Sector.AGRICULTURE,
    eligibility: [
      'Farmer families holding cultivable land',
      'Excludes institutional landholders',
      'Excludes high income taxpayers'
    ],
    benefits: '₹6,000 per year in three equal installments.',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage.',
    sector: Sector.AGRICULTURE,
    eligibility: [
      'Farmers including sharecroppers and tenant farmers growing notified crops',
      'Must have insurable interest in the crop'
    ],
    benefits: 'Insurance coverage against natural risks from pre-sowing to post-harvest.',
    link: 'https://pmfby.gov.in/'
  },
  {
    id: 'pm-jay',
    name: 'Ayushman Bharat - PMJAY',
    description: 'World’s largest health insurance/assurance scheme fully financed by the government.',
    sector: Sector.HEALTH,
    eligibility: [
      'Families identified under SECC 2011 data',
      'Deprived rural families and occupational categories of urban workers'
    ],
    benefits: 'Cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
    link: 'https://nha.gov.in/'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    description: 'A small deposit scheme for the girl child launched as a part of the Beti Bachao Beti Padhao campaign.',
    sector: Sector.WOMEN_CHILD,
    eligibility: [
      'Parents or legal guardians can open an account',
      'Girl child must be below 10 years of age'
    ],
    benefits: 'High interest rate (approx 8%) and tax benefits under 80C. Maturity at 21 years.',
    link: 'https://www.nsiindia.gov.in/'
  },
  {
    id: 'post-matric-sc',
    name: 'Post Matric Scholarship for SC Students',
    description: 'Financial assistance to SC students studying at post-matriculation or post-secondary stage.',
    sector: Sector.EDUCATION,
    eligibility: [
      'Student belonging to Scheduled Caste (SC)',
      'Family income should not exceed ₹2.50 Lakh per annum',
      'Pursuing recognized post-matric course'
    ],
    benefits: 'Compulsory non-refundable fees reimbursement and academic allowance.',
    link: 'https://scholarships.gov.in/'
  },
  {
    id: 'pm-awasz-gramin',
    name: 'PMAY Gramin',
    description: 'Housing for All scheme to provide a pucca house with basic amenities.',
    sector: Sector.HOUSING,
    eligibility: [
      'Houseless families',
      'Families living in kutcha/dilapidated houses',
      'Based on SECC 2011 housing deprivation parameters'
    ],
    benefits: 'Financial assistance of ₹1.20 Lakh in plains and ₹1.30 Lakh in hilly areas.',
    link: 'https://pmayg.nic.in/'
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana',
    description: 'A pension scheme for citizens of India, focused on the unorganized sector workers.',
    sector: Sector.SOCIAL_WELFARE,
    eligibility: [
      'Any Indian citizen',
      'Age between 18-40 years',
      'Have a savings bank account'
    ],
    benefits: 'Guaranteed minimum pension of ₹1000-₹5000 per month after age of 60.',
    link: 'https://www.npscra.nsdl.co.in/'
  }
];

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

export const UI_TRANSLATIONS: Record<LanguageCode, {
  title: string;
  subtitle: string;
  placeholder: string;
  sendButton: string;
  loading: string;
  disclaimer: string;
  initialMessage: string;
  suggestions: string[];
  recommendedSchemes: string;
  checking: string;
}> = {
  en: {
    title: "JanSeva AI",
    subtitle: "Citizen Welfare Assistant",
    placeholder: "Type your query...",
    sendButton: "Send",
    loading: "Analyzing your profile...",
    disclaimer: "AI can make mistakes. Please verify scheme details on official portals.",
    initialMessage: "Namaste! I am JanSeva AI. Tell me about yourself (e.g., 'I am a farmer' or 'I am a student') to find eligible schemes.",
    suggestions: ["I am a farmer with 2 acres", "Scholarships for SC students", "Health insurance for poor", "Housing scheme for rural"],
    recommendedSchemes: "Recommended Schemes",
    checking: "Checking eligibility database..."
  },
  hi: {
    title: "जनसेवा AI",
    subtitle: "नागरिक कल्याण सहायक",
    placeholder: "अपना प्रश्न टाइप करें (जैसे, 'मैं 2 एकड़ जमीन वाला किसान हूं')...",
    sendButton: "भेजें",
    loading: "आपकी प्रोफ़ाइल का विश्लेषण कर रहा हूँ...",
    disclaimer: "AI गलतियाँ कर सकता है। कृपया आधिकारिक पोर्टल पर विवरण सत्यापित करें।",
    initialMessage: "नमस्ते! मैं जनसेवा AI हूँ। मुझे अपने बारे में बताएं (जैसे, 'मैं एक किसान हूँ' या 'मैं एक छात्र हूँ') ताकि मैं आपके लिए उपयुक्त योजनाएं खोज सकूँ।",
    suggestions: ["मैं 2 एकड़ जमीन वाला किसान हूं", "SC छात्रों के लिए छात्रवृत्ति", "गरीब परिवारों के लिए स्वास्थ्य बीमा", "ग्रामीण आवास योजना"],
    recommendedSchemes: "सुझाई गई योजनाएं",
    checking: "पात्रता डेटाबेस की जाँच हो रही है..."
  },
  mr: {
    title: "जनसेवा AI",
    subtitle: "नागरिक कल्याण सहाय्यक",
    placeholder: "आपला प्रश्न टाईप करा (उदा. 'मी २ एकर जमीन असलेला शेतकरी आहे')...",
    sendButton: "पाठवा",
    loading: "आपल्या माहितीचे विश्लेषण करत आहे...",
    disclaimer: "AI चुका करू शकते. कृपया अधिकृत पोर्टलवर योजनांच्या तपशीलाची पडताळणी करा.",
    initialMessage: "नमस्कार! मी जनसेवा AI आहे. आपल्याबद्दल सांगा (उदा. 'मी शेतकरी आहे' किंवा 'मी विद्यार्थी आहे') जेणेकरून मी आपल्यासाठी पात्र योजना शोधू शकेन.",
    suggestions: ["मी २ एकर जमीन असलेला शेतकरी आहे", "SC विद्यार्थ्यांसाठी शिष्यवृत्ती", "गरीब कुटुंबांसाठी आरोग्य विमा", "ग्रामीण भागासाठी घरकुल योजना"],
    recommendedSchemes: "शिफारस केलेल्या योजना",
    checking: "पात्रता डेटाबेस तपासत आहे..."
  },
  kn: {
    title: "ಜನಸೇವಾ AI",
    subtitle: "ನಾಗರಿಕ ಕಲ್ಯಾಣ ಸಹಾಯಕ",
    placeholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ (ಉದಾ, 'ನಾನು 2 ಎಕರೆ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ')...",
    sendButton: "ಕಳುಹಿಸಿ",
    loading: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    disclaimer: "AI ತಪ್ಪುಗಳನ್ನು ಮಾಡಬಹುದು. ದಯವಿಟ್ಟು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳಲ್ಲಿ ಯೋಜನೆಯ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    initialMessage: "ನಮಸ್ಕಾರ! ನಾನು ಜನಸೇವಾ AI. ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ (ಉದಾಹರಣೆಗೆ, 'ನಾನು ರೈತ' ಅಥವಾ 'ನಾನು ವಿದ್ಯಾರ್ಥಿ') ಇದರಿಂದ ನಾನು ನಿಮಗೆ ಸೂಕ್ತವಾದ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಬಲ್ಲೆ.",
    suggestions: ["ನಾನು 2 ಎಕರೆ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ", "SC ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ", "ಬಡ ಕುಟುಂಬಗಳಿಗೆ ಆರೋಗ್ಯ ವಿಮೆ", "ಗ್ರಾಮೀಣ ವಸತಿ ಯೋಜನೆ"],
    recommendedSchemes: "ಶಿಫಾರಸು ಮಾಡಿದ ಯೋಜನೆಗಳು",
    checking: "ಅರ್ಹತಾ ಡೇಟಾಬೇಸ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..."
  },
  bn: {
    title: "জনসেবা AI",
    subtitle: "নাগরিক কল্যাণ সহকারী",
    placeholder: "আপনার প্রশ্ন টাইপ করুন (যেমন, 'আমি ২ একর জমির মালিক একজন কৃষক')...",
    sendButton: "পাঠান",
    loading: "আপনার প্রোফাইল বিশ্লেষণ করা হচ্ছে...",
    disclaimer: "AI ভুল করতে পারে। দয়া করে অফিসিয়াল পোর্টালে বিস্তারিত যাচাই করুন।",
    initialMessage: "নমস্কার! আমি জনসেবা AI। আপনার জন্য উপযুক্ত স্কিমগুলি খুঁজে পেতে আমাকে আপনার সম্পর্কে বলুন (যেমন, 'আমি একজন কৃষক' বা 'আমি একজন ছাত্র')।",
    suggestions: ["আমি ২ একর জমির কৃষক", "SC ছাত্রদের জন্য বৃত্তি", "গরীবদের জন্য স্বাস্থ্য বীমা", "গ্রামীণ আবাসন যোজনা"],
    recommendedSchemes: "সুপারিশকৃত প্রকল্পসমূহ",
    checking: "যোগ্যতা যাচাই করা হচ্ছে..."
  },
  te: {
    title: "జనసేవ AI",
    subtitle: "పౌర సంక్షేమ సహాయకుడు",
    placeholder: "మీ ప్రశ్నను టైప్ చేయండి (ఉదా. 'నేను 2 ఎకరాల భూమి ఉన్న రైతును')...",
    sendButton: "పంపండి",
    loading: "మీ వివరాలను విశ్లేషిస్తోంది...",
    disclaimer: "AI తప్పులు చేయవచ్చు. దయచేసి అధికారిక పోర్టల్‌లలో వివరాలను సరిచూసుకోండి.",
    initialMessage: "నమస్కారం! నేను జనసేవ AI. మీకు తగిన పథకాలను కనుగొనడానికి మీ గురించి చెప్పండి (ఉదా. 'నేను రైతును' లేదా 'నేను విద్యార్థిని').",
    suggestions: ["నేను 2 ఎకరాల భూమి ఉన్న రైతును", "SC విద్యార్థులకు ఉపకార వేతనాలు", "పేదలకు ఆరోగ్య బీమా", "గ్రామీణ గృహనిర్మాణ పథకం"],
    recommendedSchemes: "సిఫార్సు చేసిన పథకాలు",
    checking: "అర్హతలను తనిఖీ చేస్తోంది..."
  },
  ta: {
    title: "ஜன்சேவா AI",
    subtitle: "குடிமக்கள் நல உதவியாளர்",
    placeholder: "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும் (எ.கா. 'நான் 2 ஏக்கர் நிலம் வைத்துள்ள விவசாயி')...",
    sendButton: "அனுப்பு",
    loading: "உங்கள் சுயவிவரத்தை பகுப்பாய்வு செய்கிறது...",
    disclaimer: "AI தவறுகளைச் செய்யலாம். அதிகாரப்பூர்வ இணையதளங்களில் விவரங்களைச் சரிபார்க்கவும்.",
    initialMessage: "வணக்கம்! நான் ஜன்சேவா AI. தகுதியான திட்டங்களைக் கண்டறிய உங்களைப் பற்றி என்னிடம் கூறுங்கள் (எ.கா., 'நான் ஒரு விவசாயி' அல்லது 'நான் ஒரு மாணவன்').",
    suggestions: ["நான் 2 ஏக்கர் நிலம் உள்ள விவசாயி", "SC மாணவர்களுக்கான உதவித்தொகை", "ஏழைகளுக்கான மருத்துவ காப்பீடு", "கிராமப்புற வீட்டு வசதி திட்டம்"],
    recommendedSchemes: "பரிந்துரைக்கப்பட்ட திட்டங்கள்",
    checking: "தகுதியை சரிபார்க்கிறது..."
  },
  gu: {
    title: "જનસેવા AI",
    subtitle: "નાગરિક કલ્યાણ સહાયક",
    placeholder: "તમારો પ્રશ્ન લખો (દા.ત., 'હું 2 એકર જમીન ધરાવતો ખેડૂત છું')...",
    sendButton: "મોકલો",
    loading: "તમારી પ્રોફાઇલનું વિશ્લેષણ થઈ રહ્યું છે...",
    disclaimer: "AI ભૂલો કરી શકે છે. કૃપા કરીને સત્તાવાર પોર્ટલ પર વિગતો ચકાસો.",
    initialMessage: "નમસ્તે! હું જનસેવા AI છું. યોગ્ય યોજનાઓ શોધવા માટે મને તમારા વિશે કહો (દા.ત., 'હું ખેડૂત છું' અથવા 'હું વિદ્યાર્થી છું').",
    suggestions: ["હું 2 એકર જમીન ધરાવતો ખેડૂત છું", "SC વિદ્યાર્થીઓ માટે શિષ્યવૃત્તિ", "ગરીબ પરિવારો માટે આરોગ્ય વીમો", "ગ્રામીણ આવાસ યોજના"],
    recommendedSchemes: "ભલામણ કરેલ યોજનાઓ",
    checking: "પાત્રતા ડેટાબેઝ તપાસી રહ્યું છે..."
  }
};