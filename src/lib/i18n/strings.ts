/**
 * Translation dictionary for the shell text on the landing page.
 *
 * Three locales: English, Hindi, Kannada. All keys are flat strings
 * (no nesting) so lookups are O(1) and missing keys fail loudly.
 *
 * NOTE: These translations are best-effort. Before this feature is
 * considered "done" for real visitors, a native speaker (or your
 * dad, who speaks the local languages) should review them.
 */

export type Locale = 'en' | 'hi' | 'kn';

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

type Strings = Record<string, string>;

const en: Strings = {
  // Hero
  hero_overline: 'Estates · Live and upcoming',
  hero_headline_1: 'A growing collection',
  hero_headline_2: 'of hand-built estates.',
  hero_subtitle:
    'Each one is its own project— planned, plotted, and built end-to-end. Pick the one closest to you.',
  hero_card_status_available: 'Available',
  hero_card_status_coming_soon: 'Coming soon',
  // Suffix used on the hero estate card: "Karnataka · 86 plots"
  hero_card_plots_suffix: 'plots',

  // Interactive site plan
  map_title: 'Estate Layout',
  map_legend_available: 'Available',
  map_legend_sold: 'Sold',

  // Why trust us section
  why_headline_1: 'Why Trust',
  why_headline_2: 'RuralLand',
  why_subtitle:
    'We bridge the gap between traditional land acquisition and modern investment standards.',
  why_feature_legal_title: 'Legal Security',
  why_feature_legal_desc:
    'Every plot undergoes a 42-point legal audit with 100% clear title guarantee.',
  why_feature_mapping_title: 'Precision Mapping',
  why_feature_mapping_desc:
    'GPS-tagged boundaries with centimeter-accurate digital topographical surveys.',
  why_feature_infra_title: 'Rapid Infrastructure',
  why_feature_infra_desc:
    'Access roads, utilities, and sustainable amenities planned before development.',
  why_feature_vault_title: 'Digital Vault',
  why_feature_vault_desc:
    'Access deeds, surveys, and permits anytime through our secure cloud archive.',

  // Navbar
  contact_us: 'Contact Us',

  // Footer — brand column
  footer_brand_tagline:
    'Premium rural estates — sustainable, secure, and crafted for the modern investor.',

  // Footer — navigate
  footer_navigate: 'Navigate',
  footer_nav_map: 'The Map',
  footer_nav_plans: 'Investment Plans',
  footer_nav_updates: 'Development Updates',
  footer_nav_vision: 'Our Vision',

  // Footer — legal
  footer_legal: 'Legal',
  footer_legal_privacy: 'Privacy Policy',
  footer_legal_terms: 'Terms of Service',
  footer_legal_cookies: 'Cookie Policy',
  footer_legal_security: 'Security Archive',

  // Footer — newsletter
  footer_newsletter: 'Newsletter',
  footer_newsletter_text: 'Exclusive updates on new estate releases.',
  footer_newsletter_placeholder: 'Email address',

  // Footer — bottom
  footer_back_to_top: 'Back to Top',
  footer_copyright: '© 2026 {brand} Estates. All rights reserved.',

  // Share / language picker
  share_link_copied: 'Link copied',
  language: 'Language',
};

const hi: Strings = {
  // Hero
  hero_overline: 'एस्टेट्स · लाइव और आगामी',
  hero_headline_1: 'एक बढ़ता हुआ संग्रह',
  hero_headline_2: 'हाथ से बनाए गए एस्टेट्स का।',
  hero_subtitle:
    'हर एक अपनी अलग परियोजना है — अपना लेआउट, अपनी जगह, एक ही व्यक्ति द्वारा पूरी तरह से योजना बनाकर बनाया गया। अपने सबसे नज़दीक वाला चुनें।',
  hero_card_status_available: 'उपलब्ध',
  hero_card_status_coming_soon: 'जल्द आ रहा है',
  hero_card_plots_suffix: 'प्लॉट्स',

  // Interactive site plan
  map_title: 'एस्टेट लेआउट',
  map_legend_available: 'उपलब्ध',
  map_legend_sold: 'बिक चुके',

  // Why trust us section
  why_headline_1: 'हम पर भरोसा',
  why_headline_2: 'क्यों',
  why_subtitle:
    'हम पारंपरिक भूमि अधिग्रहण और आधुनिक निवेश मानकों के बीच की दूरी को पाटते हैं।',
  why_feature_legal_title: 'कानूनी सुरक्षा',
  why_feature_legal_desc:
    'हर प्लॉट का 42-बिंदु कानूनी ऑडिट होता है, 100% स्वच्छ हक-पत्र की गारंटी के साथ।',
  why_feature_mapping_title: 'सटीक मानचित्रण',
  why_feature_mapping_desc:
    'GPS-टैग की गई सीमाएँ, सेंटीमीटर-स्तर की सटीक डिजिटल स्थलाकृतिक सर्वेक्षण के साथ।',
  why_feature_infra_title: 'तेज़ अधोसंरचना',
  why_feature_infra_desc:
    'विकास से पहले पहुँच मार्ग, उपयोगिताएँ, और टिकाऊ सुविधाओं की योजना बनाई जाती है।',
  why_feature_vault_title: 'डिजिटल तिजोरी',
  why_feature_vault_desc:
    'कभी भी हमारे सुरक्षित क्लाउड संग्रह से विलेख, सर्वेक्षण और अनुमतियाँ देखें।',

  // Navbar
  contact_us: 'संपर्क करें',

  // Footer — brand
  footer_brand_tagline:
    'प्रीमियम ग्रामीण एस्टेट — टिकाऊ, सुरक्षित, और आधुनिक निवेशक के लिए तैयार।',

  // Footer — navigate
  footer_navigate: 'नेविगेट',
  footer_nav_map: 'नक्शा',
  footer_nav_plans: 'निवेश योजनाएँ',
  footer_nav_updates: 'विकास अपडेट',
  footer_nav_vision: 'हमारा विज़न',

  // Footer — legal
  footer_legal: 'कानूनी',
  footer_legal_privacy: 'गोपनीयता नीति',
  footer_legal_terms: 'सेवा की शर्तें',
  footer_legal_cookies: 'कुकी नीति',
  footer_legal_security: 'सुरक्षा संग्रह',

  // Footer — newsletter
  footer_newsletter: 'न्यूज़लेटर',
  footer_newsletter_text: 'नई एस्टेट रिलीज़ के विशेष अपडेट।',
  footer_newsletter_placeholder: 'ईमेल पता',

  // Footer — bottom
  footer_back_to_top: 'ऊपर जाएँ',
  footer_copyright: '© 2026 {brand} एस्टेट्स. सर्वाधिकार सुरक्षित।',

  // Share / language picker
  share_link_copied: 'लिंक कॉपी हो गया',
  language: 'भाषा',
};

const kn: Strings = {
  // Hero
  hero_overline: 'ಎಸ್ಟೇಟ್‌ಗಳು · ಲೈವ್ ಮತ್ತು ಮುಂಬರುವ',
  hero_headline_1: 'ಒಂದು ಬೆಳೆಯುತ್ತಿರುವ ಸಂಗ್ರಹ',
  hero_headline_2: 'ಕೈಯಿಂದ ನಿರ್ಮಿತ ಎಸ್ಟೇಟ್‌ಗಳ.',
  hero_subtitle:
    'ಪ್ರತಿಯೊಂದೂ ಅದರದೇ ಆದ ಯೋಜನೆ — ಅದರದೇ ಲೇಔಟ್, ಅದರದೇ ಸ್ಥಳ, ಒಬ್ಬನೇ ವ್ಯಕ್ತಿಯಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ಯೋಜಿಸಲ್ಪಟ್ಟು ನಿರ್ಮಿಸಲ್ಪಟ್ಟಿದೆ. ನಿಮಗೆ ಹತ್ತಿರವಿರುವುದನ್ನು ಆರಿಸಿ.',
  hero_card_status_available: 'ಲಭ್ಯವಿದೆ',
  hero_card_status_coming_soon: 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ',
  hero_card_plots_suffix: 'ಪ್ಲಾಟ್‌ಗಳು',

  // Interactive site plan
  map_title: 'ಎಸ್ಟೇಟ್ ಲೇಔಟ್',
  map_legend_available: 'ಲಭ್ಯವಿದೆ',
  map_legend_sold: 'ಮಾರಲಾಗಿದೆ',

  // Why trust us section
  why_headline_1: 'ನಮ್ಮನ್ನು ಏಕೆ',
  why_headline_2: 'ನಂಬಬೇಕು',
  why_subtitle:
    'ಸಾಂಪ್ರದಾಯಿಕ ಭೂಮಿ ಸ್ವಾಧೀನ ಮತ್ತು ಆಧುನಿಕ ಹೂಡಿಕೆ ಮಾನದಂಡಗಳ ನಡುವಿನ ಅಂತರವನ್ನು ನಾವು ತುಂಬುತ್ತೇವೆ.',
  why_feature_legal_title: 'ಕಾನೂನು ಭದ್ರತೆ',
  why_feature_legal_desc:
    'ಪ್ರತಿ ಪ್ಲಾಟ್‌ಗೆ 42-ಅಂಶಗಳ ಕಾನೂನು ತಪಾಸಣೆ, 100% ಸ್ಪಷ್ಟ ಹಕ್ಕು ಖಾತರಿಯೊಂದಿಗೆ.',
  why_feature_mapping_title: 'ನಿಖರವಾದ ಮ್ಯಾಪಿಂಗ್',
  why_feature_mapping_desc:
    'GPS-ಟ್ಯಾಗ್ ಮಾಡಿದ ಗಡಿಗಳು, ಸೆಂಟಿಮೀಟರ್-ನಿಖರವಾದ ಡಿಜಿಟಲ್ ಟೋಪೋಗ್ರಾಫಿಕ್ ಸಮೀಕ್ಷೆಗಳೊಂದಿಗೆ.',
  why_feature_infra_title: 'ವೇಗದ ಮೂಲಸೌಕರ್ಯ',
  why_feature_infra_desc:
    'ಅಭಿವೃದ್ಧಿಗೆ ಮುನ್ನ ಪ್ರವೇಶ ರಸ್ತೆಗಳು, ಉಪಯುಕ್ತತೆಗಳು ಮತ್ತು ಸುಸ್ಥಿರ ಸೌಲಭ್ಯಗಳನ್ನು ಯೋಜಿಸಲಾಗುತ್ತದೆ.',
  why_feature_vault_title: 'ಡಿಜಿಟಲ್ ವಾಲ್ಟ್',
  why_feature_vault_desc:
    'ನಮ್ಮ ಸುರಕ್ಷಿತ ಕ್ಲೌಡ್ ಸಂಗ್ರಹದಿಂದ ಯಾವಾಗಲೂ ಡೀಡ್‌ಗಳು, ಸಮೀಕ್ಷೆಗಳು ಮತ್ತು ಅನುಮತಿಗಳನ್ನು ಪ್ರವೇಶಿಸಿ.',

  // Navbar
  contact_us: 'ಸಂಪರ್ಕಿಸಿ',

  // Footer — brand
  footer_brand_tagline:
    'ಪ್ರೀಮಿಯಂ ಗ್ರಾಮೀಣ ಎಸ್ಟೇಟ್‌ಗಳು — ಸುಸ್ಥಿರ, ಸುರಕ್ಷಿತ, ಮತ್ತು ಆಧುನಿಕ ಹೂಡಿಕೆದಾರರಿಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ.',

  // Footer — navigate
  footer_navigate: 'ನ್ಯಾವಿಗೇಟ್',
  footer_nav_map: 'ನಕ್ಷೆ',
  footer_nav_plans: 'ಹೂಡಿಕೆ ಯೋಜನೆಗಳು',
  footer_nav_updates: 'ಅಭಿವೃದ್ಧಿ ನವೀಕರಣಗಳು',
  footer_nav_vision: 'ನಮ್ಮ ದೃಷ್ಟಿ',

  // Footer — legal
  footer_legal: 'ಕಾನೂನು',
  footer_legal_privacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
  footer_legal_terms: 'ಸೇವಾ ನಿಯಮಗಳು',
  footer_legal_cookies: 'ಕುಕೀ ನೀತಿ',
  footer_legal_security: 'ಭದ್ರತಾ ದಾಖಲೆ',

  // Footer — newsletter
  footer_newsletter: 'ನ್ಯೂಸ್‌ಲೆಟರ್',
  footer_newsletter_text: 'ಹೊಸ ಎಸ್ಟೇಟ್ ಬಿಡುಗಡೆಗಳ ವಿಶೇಷ ನವೀಕರಣಗಳು.',
  footer_newsletter_placeholder: 'ಇಮೇಲ್ ವಿಳಾಸ',

  // Footer — bottom
  footer_back_to_top: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
  footer_copyright: '© 2026 {brand} ಎಸ್ಟೇಟ್‌ಗಳು. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',

  // Share / language picker
  share_link_copied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ',
  language: 'ಭಾಷೆ',
};

const DICTIONARY: Record<Locale, Strings> = { en, hi, kn };

export const getStrings = (locale: Locale): Strings => DICTIONARY[locale];
