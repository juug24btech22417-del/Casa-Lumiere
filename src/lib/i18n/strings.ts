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

  // Plot card (home page — Interactive Explorer)
  plot_status_available: 'Available',
  plot_status_developing: 'Under development',
  plot_status_sold: 'Sold',
  plot_plot_label: 'Plot',
  plot_premium_sector: 'Premium Sector',
  plot_verified: 'Verified',
  plot_viewing_today: 'people viewing today',

  // Banashri Enclave immersive view
  view_back_to_all_plots: 'Back to all plots',
  view_view_on_map: 'View on map',
  view_hide_map: 'Hide map',
  view_live_from_site: 'Live from site',
  view_photo_caption_entry:
    'Entry boulevard — palms & perimeter compound wall',
  view_photo_caption_avenue:
    'Internal 30 ft avenue road with curated tree-line',
  view_photo_caption_horticulture:
    'Horticulture beds & underground utility corridors',
  view_photo_caption_dusk:
    'Dusk view — street-lit avenues coming alive at golden hour',
  view_photo_caption_twilight:
    'Twilight over the development — lit boulevards ready for owners',
  view_premium_sector: 'Premium sector',
  view_sqft_suffix: 'sq.ft.',
  view_directions: 'Directions',
  view_book_site_visit: 'Book Site Visit',
  view_aerial_tour: 'Aerial Tour',
  view_see_from_headline_pre: 'See it from the ',
  view_see_from_headline_accent: 'sky',
  view_drone_subtitle:
    'A drone pass over {name} — roads, lighting, and landscape.',

  // Drone tour page
  drone_aerial_footage: 'Aerial Footage',
  drone_tour_headline_pre: 'Drone',
  drone_tour_headline_accent: 'Tour',
  drone_tour_subtitle: 'Experience the estate from above before you visit.',

  // Drone video player
  drone_capture_badge: 'Drone Capture',
  drone_tap_for_sound: 'Tap for sound',

  // Feature pages (drone-tour, documents, vision, emi-calculator)
  feature_back_to_home: 'Back to Home',

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
  footer_newsletter_signup: 'Subscribe',
  footer_newsletter_success: "You're on the list. We'll be in touch.",
  footer_newsletter_error: 'Something went wrong — please try again.',

  // Footer — bottom
  footer_back_to_top: 'Back to Top',
  footer_copyright: '© 2026 {brand} Estates. All rights reserved.',

  // Share / language picker
  share_link_copied: 'Link copied',
  language: 'Language',

  // Legal documents (footer → Privacy / Terms). Section headings and
  // bullet bodies are kept as parallel keys so the modal can render
  // the policy as a properly formatted document.
  legal_brand_name: 'Banashri Enclave',
  legal_last_updated: 'Last Updated',
  legal_intro: 'Welcome to {brand}. We value your privacy and are committed to protecting your personal information.',

  // Privacy Policy
  privacy_h1: 'Information We Collect',
  privacy_b1: 'When you use our website or book a site visit, we may collect:',
  privacy_b1_items: 'Full Name|Phone Number|Email Address (if provided)|Property Preferences|Budget Range|Preferred Site Visit Date and Time|Any additional information you voluntarily provide',
  privacy_h2: 'How We Use Your Information',
  privacy_b2: 'We use your information to:',
  privacy_b2_items: 'Schedule and manage site visits|Contact you regarding your inquiry|Recommend suitable properties|Improve our services and customer experience|Respond to your questions and support requests',
  privacy_h3: 'Data Storage',
  privacy_b3: 'Your information is securely stored using Supabase and is accessible only to authorized members of our team who require it for business purposes.',
  privacy_h4: 'Sharing of Information',
  privacy_b4_lead: 'We do not sell or rent your personal information.',
  privacy_b4_sub: 'We may share your information only:',
  privacy_b4_items: 'When required by law|With trusted service providers that help us operate our website or business|With your consent',
  privacy_h5: 'Data Security',
  privacy_b5: 'We take reasonable technical and organizational measures to protect your information from unauthorized access, misuse, or disclosure. However, no online service can guarantee complete security.',
  privacy_h6: 'Cookies',
  privacy_b6: 'Our website may use cookies or similar technologies to improve functionality and user experience.',
  privacy_h7: 'Your Rights',
  privacy_b7: 'You may request to:',
  privacy_b7_items: 'Access your personal information|Correct inaccurate information|Request deletion of your data, subject to legal or operational requirements',
  privacy_h8: 'Third-Party Services',
  privacy_b8: 'Our website may use third-party services, including Supabase, for secure data storage and website functionality.',
  privacy_h9: 'Changes to This Policy',
  privacy_b9: 'We may update this Privacy Policy from time to time. The latest version will always be available on this page.',
  privacy_h10: 'Contact Us',
  privacy_b10: 'If you have any questions regarding this Privacy Policy, please contact us through the contact details provided on our website.',

  // Terms of Service
  terms_h1: 'Purpose of the Website',
  terms_b1: 'This website provides information about available real estate properties and allows users to submit inquiries and book site visits.',
  terms_h2: 'User Responsibilities',
  terms_b2: 'You agree to:',
  terms_b2_items: 'Provide accurate and truthful information|Use the website only for lawful purposes|Not misuse, disrupt, or attempt unauthorized access to the website',
  terms_h3: 'Site Visit Requests',
  terms_b3: 'Submitting a site visit request does not guarantee property availability or reservation. Site visits are subject to confirmation by our team.',
  terms_h4: 'Property Information',
  terms_b4: 'While we strive to keep all property details accurate and up to date, availability, pricing, specifications, and other information may change without prior notice.',
  terms_h5: 'Intellectual Property',
  terms_b5_lead: 'All content on this website, including text, images, logos, graphics, and design, is the property of {brand} unless otherwise stated. Unauthorized copying or reproduction is prohibited.',
  terms_h6: 'Limitation of Liability',
  terms_b6: 'We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use of this website or reliance on its content.',
  terms_h7: 'Privacy',
  terms_b7: 'Your use of this website is also governed by our Privacy Policy.',
  terms_h8: 'Changes to These Terms',
  terms_b8: 'We reserve the right to modify these Terms of Service at any time. Continued use of the website after updates constitutes acceptance of the revised terms.',
  terms_h9: 'Governing Law',
  terms_b9: 'These Terms shall be governed by and interpreted in accordance with the laws of India.',
  terms_h10: 'Contact',
  terms_b10: 'For any questions regarding these Terms of Service, please contact us using the contact details available on our website.',

  // Security document (footer → Security Archive). Four sections; only
  // the first two have bullet lists. Keys are numbered 1..4 to match
  // the same section-builder logic privacy/terms use.
  security_intro: 'At {brand}, we take the security of your personal information seriously. We implement reasonable technical and organizational measures to help protect the information you share with us.',
  security_h1: 'How We Protect Your Data',
  security_b1_items: 'All communication with our website is encrypted using HTTPS|Customer information is stored securely using Supabase|Access to customer data is restricted to authorized personnel only|We regularly monitor our systems to help prevent unauthorized access|We follow industry-standard security practices to safeguard your information',
  security_h2: 'Your Responsibility',
  security_b2_intro: 'To help keep your information secure, please:',
  security_b2_items: 'Provide accurate contact details|Notify us if you believe your information has been used without your permission|Avoid sharing sensitive personal or financial information through forms unless specifically requested',
  security_h3: 'Data Breach Response',
  security_b3: 'If we become aware of a security incident affecting your personal information, we will investigate promptly and take appropriate steps to contain the issue. Where required by applicable law, affected users will be notified.',
  security_h4: 'Contact',
  security_b4: 'If you have any questions or concerns about our security practices, please contact us using the details provided on our website.',
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

  // Plot card
  plot_status_available: 'उपलब्ध',
  plot_status_developing: 'विकासाधीन',
  plot_status_sold: 'बिक चुका',
  plot_plot_label: 'प्लॉट',
  plot_premium_sector: 'प्रीमियम सेक्टर',
  plot_verified: 'सत्यापित',
  plot_viewing_today: 'लोग आज देख रहे हैं',

  // Banashri Enclave immersive view
  view_back_to_all_plots: 'सभी प्लॉट्स पर वापस',
  view_view_on_map: 'नक्शे पर देखें',
  view_hide_map: 'नक्शा छिपाएँ',
  view_live_from_site: 'साइट से लाइव',
  view_photo_caption_entry: 'प्रवेश मार्ग — ताड़ और परिधि की दीवार',
  view_photo_caption_avenue: 'आंतरिक 30 फीट चौड़ी सड़क, संवर्धित वृक्ष-रेखा के साथ',
  view_photo_caption_horticulture: 'बागवानी क्यारियाँ और भूमिगत उपयोगिता मार्ग',
  view_photo_caption_dusk: 'संध्या दृश्य — सुनहरे समय में रोशन सड़कें',
  view_photo_caption_twilight: 'विकास पर संध्या — मालिकों के लिए तैयार रोशन बुलेवार्ड',
  view_premium_sector: 'प्रीमियम सेक्टर',
  view_sqft_suffix: 'वर्ग फीट',
  view_directions: 'दिशा-निर्देश',
  view_book_site_visit: 'साइट विज़िट बुक करें',
  view_aerial_tour: 'हवाई मार्ग',
  view_see_from_headline_pre: 'इसे ',
  view_see_from_headline_accent: 'आसमान',
  view_drone_subtitle: '{name} पर ड्रोन पास — सड़कें, रोशनी, और परिदृश्य।',

  // Drone tour page
  drone_aerial_footage: 'हवाई फुटेज',
  drone_tour_headline_pre: 'ड्रोन',
  drone_tour_headline_accent: 'मार्ग',
  drone_tour_subtitle: 'आने से पहले एस्टेट को ऊपर से देखें।',

  // Drone video player
  drone_capture_badge: 'ड्रोन कैप्चर',
  drone_tap_for_sound: 'ध्वनि के लिए टैप करें',

  // Feature pages
  feature_back_to_home: 'होम पर वापस',

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
  footer_newsletter_signup: 'सदस्यता लें',
  footer_newsletter_success: 'आप सूची में हैं। हम जल्द ही संपर्क करेंगे।',
  footer_newsletter_error: 'कुछ गड़बड़ हो गई — कृपया फिर से कोशिश करें।',

  // Footer — bottom
  footer_back_to_top: 'ऊपर जाएँ',
  footer_copyright: '© 2026 {brand} एस्टेट्स. सर्वाधिकार सुरक्षित।',

  // Share / language picker
  share_link_copied: 'लिंक कॉपी हो गया',
  language: 'भाषा',

  // Legal documents
  legal_brand_name: 'बनश्री एनक्लेव',
  legal_last_updated: 'अंतिम अद्यतन',
  legal_intro: '{brand} में आपका स्वागत है। हम आपकी गोपनीयता का सम्मान करते हैं और आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं।',

  // Privacy Policy
  privacy_h1: 'हम कौन सी जानकारी एकत्र करते हैं',
  privacy_b1: 'जब आप हमारी वेबसाइट का उपयोग करते हैं या साइट विज़िट बुक करते हैं, तो हम यह एकत्र कर सकते हैं:',
  privacy_b1_items: 'पूरा नाम|फ़ोन नंबर|ईमेल पता (यदि दिया गया हो)|संपत्ति वरीयताएँ|बजट सीमा|पसंदीदा साइट विज़िट की तिथि और समय|कोई भी अतिरिक्त जानकारी जो आप स्वेच्छा से प्रदान करें',
  privacy_h2: 'हम आपकी जानकारी का उपयोग कैसे करते हैं',
  privacy_b2: 'हम आपकी जानकारी का उपयोग इसके लिए करते हैं:',
  privacy_b2_items: 'साइट विज़िट शेड्यूल और प्रबंधित करना|आपकी पूछताछ के संबंध में आपसे संपर्क करना|उपयुक्त संपत्तियाँ सुझाना|हमारी सेवाओं और ग्राहक अनुभव को बेहतर बनाना|आपके प्रश्नों और सहायता अनुरोधों का उत्तर देना',
  privacy_h3: 'डेटा भंडारण',
  privacy_b3: 'आपकी जानकारी सुरक्षित रूप से Supabase पर संग्रहीत की जाती है और केवल हमारी टीम के अधिकृत सदस्यों के लिए सुलभ है जिन्हें व्यावसायिक उद्देश्यों के लिए इसकी आवश्यकता है।',
  privacy_h4: 'जानकारी का साझा करना',
  privacy_b4_lead: 'हम आपकी व्यक्तिगत जानकारी न तो बेचते हैं और न ही किराए पर देते हैं।',
  privacy_b4_sub: 'हम आपकी जानकारी केवल तब साझा कर सकते हैं:',
  privacy_b4_items: 'कानून द्वारा आवश्यक होने पर|विश्वसनीय सेवा प्रदाताओं के साथ जो हमारी वेबसाइट या व्यवसाय संचालित करने में मदद करते हैं|आपकी सहमति से',
  privacy_h5: 'डेटा सुरक्षा',
  privacy_b5: 'हम आपकी जानकारी को अनधिकृत पहुँच, दुरुपयोग या खुलासे से बचाने के लिए उचित तकनीकी और संगठनात्मक उपाय करते हैं। हालाँकि, कोई भी ऑनलाइन सेवा पूर्ण सुरक्षा की गारंटी नहीं दे सकती।',
  privacy_h6: 'कुकीज़',
  privacy_b6: 'हमारी वेबसाइट कार्यक्षमता और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए कुकीज़ या इसी तरह की तकनीकों का उपयोग कर सकती है।',
  privacy_h7: 'आपके अधिकार',
  privacy_b7: 'आप अनुरोध कर सकते हैं:',
  privacy_b7_items: 'अपनी व्यक्तिगत जानकारी तक पहुँच|गलत जानकारी को सही करना|कानूनी या परिचालन आवश्यकताओं के अधीन, अपने डेटा को हटाने का अनुरोध',
  privacy_h8: 'तृतीय-पक्ष सेवाएँ',
  privacy_b8: 'हमारी वेबसाइट सुरक्षित डेटा भंडारण और वेबसाइट कार्यक्षमता के लिए Supabase सहित तृतीय-पक्ष सेवाओं का उपयोग कर सकती है।',
  privacy_h9: 'इस नीति में परिवर्तन',
  privacy_b9: 'हम इस गोपनीयता नीति को समय-समय पर अद्यतन कर सकते हैं। नवीनतम संस्करण हमेशा इस पृष्ठ पर उपलब्ध रहेगा।',
  privacy_h10: 'हमसे संपर्क करें',
  privacy_b10: 'यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमारी वेबसाइट पर दिए गए संपर्क विवरण के माध्यम से हमसे संपर्क करें।',

  // Terms of Service
  terms_h1: 'वेबसाइट का उद्देश्य',
  terms_b1: 'यह वेबसाइट उपलब्ध रियल एस्टेट संपत्तियों के बारे में जानकारी प्रदान करती है और उपयोगकर्ताओं को पूछताछ जमा करने और साइट विज़िट बुक करने की अनुमति देती है।',
  terms_h2: 'उपयोगकर्ता की ज़िम्मेदारियाँ',
  terms_b2: 'आप सहमत हैं:',
  terms_b2_items: 'सटीक और सच्ची जानकारी प्रदान करना|वेबसाइट का उपयोग केवल वैध उद्देश्यों के लिए करना|वेबसाइट का दुरुपयोग, बाधित न करना या अनधिकृत पहुँच का प्रयास न करना',
  terms_h3: 'साइट विज़िट अनुरोध',
  terms_b3: 'साइट विज़िट अनुरोध जमा करने से संपत्ति की उपलब्धता या आरक्षण की गारंटी नहीं मिलती। साइट विज़िट हमारी टीम की पुष्टि के अधीन हैं।',
  terms_h4: 'संपत्ति की जानकारी',
  terms_b4: 'हालाँकि हम सभी संपत्ति विवरणों को सटीक और अद्यतन रखने का प्रयास करते हैं, उपलब्धता, मूल्य निर्धारण, विशिष्टताएँ और अन्य जानकारी बिना पूर्व सूचना के बदल सकती है।',
  terms_h5: 'बौद्धिक संपदा',
  terms_b5_lead: 'इस वेबसाइट की सभी सामग्री, जिसमें पाठ, चित्र, लोगो, ग्राफिक्स और डिज़ाइन शामिल हैं, {brand} की संपत्ति है जब तक कि अन्यथा न कहा गया हो। अनधिकृत प्रतिलिपि या पुनरुत्पादन प्रतिबंधित है।',
  terms_h6: 'दायित्व की सीमा',
  terms_b6: 'हम इस वेबसाइट के उपयोग या इसकी सामग्री पर निर्भरता के परिणामस्वरूप किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक या परिणामी क्षति के लिए उत्तरदायी नहीं हैं।',
  terms_h7: 'गोपनीयता',
  terms_b7: 'इस वेबसाइट का आपका उपयोग हमारी गोपनीयता नीति द्वारा भी नियंत्रित होता है।',
  terms_h8: 'इन शर्तों में परिवर्तन',
  terms_b8: 'हम किसी भी समय इन सेवा शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। अद्यतन के बाद वेबसाइट का निरंतर उपयोग संशोधित शर्तों की स्वीकृति माना जाता है।',
  terms_h9: 'शासी कानून',
  terms_b9: 'ये शर्तें भारत के कानूनों के अनुसार शासित और व्याख्यायित होंगी।',
  terms_h10: 'संपर्क',
  terms_b10: 'इन सेवा शर्तों के बारे में किसी भी प्रश्न के लिए, कृपया हमारी वेबसाइट पर उपलब्ध संपर्क विवरण का उपयोग करके हमसे संपर्क करें।',

  // Security document
  security_intro: '{brand} में, हम आपकी व्यक्तिगत जानकारी की सुरक्षा को गंभीरता से लेते हैं। हम आपके द्वारा साझा की गई जानकारी की सुरक्षा के लिए उचित तकनीकी और संगठनात्मक उपाय लागू करते हैं।',
  security_h1: 'हम आपके डेटा की सुरक्षा कैसे करते हैं',
  security_b1_items: 'हमारी वेबसाइट के साथ सभी संचार HTTPS का उपयोग करके एन्क्रिप्ट किए जाते हैं|ग्राहक जानकारी Supabase का उपयोग करके सुरक्षित रूप से संग्रहीत की जाती है|ग्राहक डेटा तक पहुँच केवल अधिकृत कर्मियों तक सीमित है|हम अनधिकृत पहुँच को रोकने के लिए नियमित रूप से अपने सिस्टम की निगरानी करते हैं|हम आपकी जानकारी की सुरक्षा के लिए उद्योग-मानक सुरक्षा प्रथाओं का पालन करते हैं',
  security_h2: 'आपकी ज़िम्मेदारी',
  security_b2_intro: 'अपनी जानकारी को सुरक्षित रखने में मदद के लिए, कृपया:',
  security_b2_items: 'सटीक संपर्क विवरण प्रदान करें|यदि आपको लगता है कि आपकी जानकारी का उपयोग आपकी अनुमति के बिना किया गया है तो हमें सूचित करें|विशेष रूप से अनुरोध किए जाने तक फॉर्म के माध्यम से संवेदनशील व्यक्तिगत या वित्तीय जानकारी साझा करने से बचें',
  security_h3: 'डेटा उल्लंघन प्रतिक्रिया',
  security_b3: 'यदि हमें आपकी व्यक्तिगत जानकारी को प्रभावित करने वाली किसी सुरक्षा घटना की जानकारी मिलती है, तो हम तुरंत जाँच करेंगे और मुद्दे को रोकने के लिए उचित कदम उठाएँगे। जहाँ लागू कानून द्वारा आवश्यक हो, प्रभावित उपयोगकर्ताओं को सूचित किया जाएगा।',
  security_h4: 'संपर्क',
  security_b4: 'यदि हमारी सुरक्षा प्रथाओं के बारे में आपके कोई प्रश्न या चिंताएँ हैं, तो कृपया हमारी वेबसाइट पर दिए गए विवरण का उपयोग करके हमसे संपर्क करें।',
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

  // Plot card
  plot_status_available: 'ಲಭ್ಯವಿದೆ',
  plot_status_developing: 'ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ',
  plot_status_sold: 'ಮಾರಲಾಗಿದೆ',
  plot_plot_label: 'ಪ್ಲಾಟ್',
  plot_premium_sector: 'ಪ್ರೀಮಿಯಂ ಸೆಕ್ಟರ್',
  plot_verified: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
  plot_viewing_today: 'ಜನರು ಇಂದು ನೋಡುತ್ತಿದ್ದಾರೆ',

  // Banashri Enclave immersive view
  view_back_to_all_plots: 'ಎಲ್ಲಾ ಪ್ಲಾಟ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
  view_view_on_map: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ',
  view_hide_map: 'ನಕ್ಷೆ ಮರೆಮಾಡಿ',
  view_live_from_site: 'ಸೈಟ್‌ನಿಂದ ನೇರ',
  view_photo_caption_entry: 'ಪ್ರವೇಶ ರಸ್ತೆ — ತಾಡಿ ಮರಗಳು ಮತ್ತು ಸುತ್ತುಗೋಡೆ',
  view_photo_caption_avenue: 'ಒಳಗಿನ 30 ಅಡಿ ರಸ್ತೆ, ಆಯ್ಕೆಮಾಡಿದ ಮರ-ಸಾಲಿನೊಂದಿಗೆ',
  view_photo_caption_horticulture: 'ತೋಟಗಾರಿಕೆ ಬೆಡ್‌ಗಳು ಮತ್ತು ಭೂಗತ ಉಪಯುಕ್ತತೆ ಮಾರ್ಗಗಳು',
  view_photo_caption_dusk: 'ಸಂಜೆ ನೋಟ — ಚಿನ್ನದ ಸಮಯದಲ್ಲಿ ರಸ್ತೆದೀಪಗಳ ಸಾಲು',
  view_photo_caption_twilight: 'ಅಭಿವೃದ್ಧಿಯ ಮೇಲೆ ಸಂಧ್ಯಾಕಾಲ — ಮಾಲೀಕರಿಗಾಗಿ ಸಿದ್ಧವಾದ ರಸ್ತೆಗಳು',
  view_premium_sector: 'ಪ್ರೀಮಿಯಂ ಸೆಕ್ಟರ್',
  view_sqft_suffix: 'ಚ.ಅ.',
  view_directions: 'ದಿಕ್ಕುಗಳು',
  view_book_site_visit: 'ಸೈಟ್ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ',
  view_aerial_tour: 'ವೈಮಾನಿಕ ಮಾರ್ಗ',
  view_see_from_headline_pre: 'ಇದನ್ನು ',
  view_see_from_headline_accent: 'ಆಕಾಶದಿಂದ',
  view_drone_subtitle: '{name} ಮೇಲೆ ಡ್ರೋನ್ ಪಾಸ್ — ರಸ್ತೆಗಳು, ಬೆಳಕು, ಮತ್ತು ಭೂದೃಶ್ಯ.',

  // Drone tour page
  drone_aerial_footage: 'ವೈಮಾನಿಕ ದೃಶ್ಯ',
  drone_tour_headline_pre: 'ಡ್ರೋನ್',
  drone_tour_headline_accent: 'ಮಾರ್ಗ',
  drone_tour_subtitle: 'ಭೇಟಿ ನೀಡುವ ಮೊದಲು ಎಸ್ಟೇಟ್ ಅನ್ನು ಮೇಲಿನಿಂದ ಅನುಭವಿಸಿ.',

  // Drone video player
  drone_capture_badge: 'ಡ್ರೋನ್ ಕ್ಯಾಪ್ಚರ್',
  drone_tap_for_sound: 'ಧ್ವನಿಗಾಗಿ ಟ್ಯಾಪ್ ಮಾಡಿ',

  // Feature pages
  feature_back_to_home: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',

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
  footer_newsletter_signup: 'ಚಂದಾದಾರರಾಗಿ',
  footer_newsletter_success: 'ನೀವು ಪಟ್ಟಿಯಲ್ಲಿದ್ದೀರಿ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕದಲ್ಲಿರುತ್ತೇವೆ.',
  footer_newsletter_error: 'ಏನೋ ತಪ್ಪಾಗಿದೆ — ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',

  // Footer — bottom
  footer_back_to_top: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
  footer_copyright: '© 2026 {brand} ಎಸ್ಟೇಟ್‌ಗಳು. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',

  // Share / language picker
  share_link_copied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ',
  language: 'ಭಾಷೆ',

  // Legal documents
  legal_brand_name: 'ಬನಶ್ರೀ ಎನ್ಕ್ಲೇವ್',
  legal_last_updated: 'ಕೊನೆಯ ಬಾರಿ ನವೀಕರಿಸಲಾಗಿದೆ',
  legal_intro: '{brand} ಗೆ ಸ್ವಾಗತ. ನಾವು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತೇವೆ ಮತ್ತು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ರಕ್ಷಿಸಲು ಬದ್ಧರಾಗಿದ್ದೇವೆ.',

  // Privacy Policy
  privacy_h1: 'ನಾವು ಯಾವ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ',
  privacy_b1: 'ನೀವು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಬಳಸಿದಾಗ ಅಥವಾ ಸೈಟ್ ಭೇಟಿ ಬುಕ್ ಮಾಡಿದಾಗ, ನಾವು ಇವುಗಳನ್ನು ಸಂಗ್ರಹಿಸಬಹುದು:',
  privacy_b1_items: 'ಪೂರ್ಣ ಹೆಸರು|ಫೋನ್ ಸಂಖ್ಯೆ|ಇಮೇಲ್ ವಿಳಾಸ (ಒದಗಿಸಿದ್ದರೆ)|ಆಸ್ತಿ ಆದ್ಯತೆಗಳು|ಬಜೆಟ್ ವ್ಯಾಪ್ತಿ|ಆದ್ಯತೆಯ ಸೈಟ್ ಭೇಟಿಯ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ|ನೀವು ಸ್ವಯಂ ಪ್ರಾರಂಭದಿಂದ ಒದಗಿಸುವ ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ',
  privacy_h2: 'ನಾವು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ಬಳಸುತ್ತೇವೆ',
  privacy_b2: 'ನಾವು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಇದಕ್ಕಾಗಿ ಬಳಸುತ್ತೇವೆ:',
  privacy_b2_items: 'ಸೈಟ್ ಭೇಟಿಗಳನ್ನು ನಿಗದಿಪಡಿಸಿ ನಿರ್ವಹಿಸಿ|ನಿಮ್ಮ ವಿಚಾರಣೆಯ ಕುರಿತು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ|ಸೂಕ್ತ ಆಸ್ತಿಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಿ|ನಮ್ಮ ಸೇವೆಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಅನುಭವವನ್ನು ಸುಧಾರಿಸಿ|ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ಮತ್ತು ಬೆಂಬಲ ವಿನಂತಿಗಳಿಗೆ ಸ್ಪಂದಿಸಿ',
  privacy_h3: 'ಡೇಟಾ ಸಂಗ್ರಹಣೆ',
  privacy_b3: 'ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು Supabase ಬಳಸಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ಮತ್ತು ವ್ಯಾಪಾರ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಅಗತ್ಯವಿರುವ ನಮ್ಮ ತಂಡದ ಅಧಿಕೃತ ಸದಸ್ಯರಿಗೆ ಮಾತ್ರ ಪ್ರವೇಶ ಸಾಧ್ಯ.',
  privacy_h4: 'ಮಾಹಿತಿಯ ಹಂಚಿಕೆ',
  privacy_b4_lead: 'ನಾವು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಮಾರುವುದಿಲ್ಲ ಅಥವಾ ಬಾಡಿಗೆಗೆ ಕೊಡುವುದಿಲ್ಲ.',
  privacy_b4_sub: 'ನಾವು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಈ ಸಂದರ್ಭಗಳಲ್ಲಿ ಮಾತ್ರ ಹಂಚಿಕೊಳ್ಳಬಹುದು:',
  privacy_b4_items: 'ಕಾನೂನಿನ ಅಗತ್ಯವಿದ್ದಾಗ|ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಅಥವಾ ವ್ಯಾಪಾರವನ್ನು ನಡೆಸಲು ಸಹಾಯ ಮಾಡುವ ವಿಶ್ವಾಸಾರ್ಹ ಸೇವಾ ಪೂರೈಕೆದಾರರೊಂದಿಗೆ|ನಿಮ್ಮ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ',
  privacy_h5: 'ಡೇಟಾ ಸುರಕ್ಷತೆ',
  privacy_b5: 'ಅನಧಿಕೃತ ಪ್ರವೇಶ, ದುರುಪಯೋಗ ಅಥವಾ ಬಹಿರಂಗಪಡಿಸುವಿಕೆಯಿಂದ ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ರಕ್ಷಿಸಲು ನಾವು ಸಮಂಜಸವಾದ ತಾಂತ್ರಿಕ ಮತ್ತು ಸಂಘಟನಾತ್ಮಕ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೇವೆ. ಆದಾಗ್ಯೂ, ಯಾವುದೇ ಆನ್‌ಲೈನ್ ಸೇವೆಯು ಸಂಪೂರ್ಣ ಸುರಕ್ಷತೆಯನ್ನು ಖಾತರಿಪಡಿಸಲಾಗದು.',
  privacy_h6: 'ಕುಕೀಗಳು',
  privacy_b6: 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಕಾರ್ಯನಿರ್ವಹಣೆ ಮತ್ತು ಬಳಕೆದಾರ ಅನುಭವವನ್ನು ಸುಧಾರಿಸಲು ಕುಕೀಗಳು ಅಥವಾ ಇದೇ ರೀತಿಯ ತಂತ್ರಜ್ಞಾನಗಳನ್ನು ಬಳಸಬಹುದು.',
  privacy_h7: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳು',
  privacy_b7: 'ನೀವು ವಿನಂತಿಸಬಹುದು:',
  privacy_b7_items: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಗೆ ಪ್ರವೇಶ|ತಪ್ಪಾದ ಮಾಹಿತಿಯನ್ನು ಸರಿಪಡಿಸಿ|ಕಾನೂನು ಅಥವಾ ಕಾರ್ಯಾಚರಣೆಯ ಅಗತ್ಯಗಳಿಗೆ ಒಳಪಟ್ಟು, ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಅಳಿಸುವಂತೆ ವಿನಂತಿಸಿ',
  privacy_h8: 'ತೃತೀಯ ಪಕ್ಷದ ಸೇವೆಗಳು',
  privacy_b8: 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಸುರಕ್ಷಿತ ಡೇಟಾ ಸಂಗ್ರಹಣೆ ಮತ್ತು ವೆಬ್‌ಸೈಟ್ ಕಾರ್ಯನಿರ್ವಹಣೆಗಾಗಿ Supabase ಸೇರಿದಂತೆ ತೃತೀಯ ಪಕ್ಷದ ಸೇವೆಗಳನ್ನು ಬಳಸಬಹುದು.',
  privacy_h9: 'ಈ ನೀತಿಯಲ್ಲಿ ಬದಲಾವಣೆಗಳು',
  privacy_b9: 'ನಾವು ಈ ಗೌಪ್ಯತಾ ನೀತಿಯನ್ನು ಸಮಯ ಸಮಯಕ್ಕೆ ನವೀಕರಿಸಬಹುದು. ಇತ್ತೀಚಿನ ಆವೃತ್ತಿಯು ಯಾವಾಗಲೂ ಈ ಪುಟದಲ್ಲಿ ಲಭ್ಯವಿರುತ್ತದೆ.',
  privacy_h10: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
  privacy_b10: 'ಈ ಗೌಪ್ಯತಾ ನೀತಿಯ ಕುರಿತು ನಿಮಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಒದಗಿಸಲಾದ ಸಂಪರ್ಕ ವಿವರಗಳ ಮೂಲಕ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',

  // Terms of Service
  terms_h1: 'ವೆಬ್‌ಸೈಟ್‌ನ ಉದ್ದೇಶ',
  terms_b1: 'ಈ ವೆಬ್‌ಸೈಟ್ ಲಭ್ಯವಿರುವ ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಆಸ್ತಿಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ಬಳಕೆದಾರರಿಗೆ ವಿಚಾರಣೆಗಳನ್ನು ಸಲ್ಲಿಸಲು ಮತ್ತು ಸೈಟ್ ಭೇಟಿಗಳನ್ನು ಬುಕ್ ಮಾಡಲು ಅನುಮತಿಸುತ್ತದೆ.',
  terms_h2: 'ಬಳಕೆದಾರರ ಜವಾಬ್ದಾರಿಗಳು',
  terms_b2: 'ನೀವು ಒಪ್ಪುತ್ತೀರಿ:',
  terms_b2_items: 'ನಿಖರವಾದ ಮತ್ತು ಸತ್ಯಸಂಗತ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಿ|ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಕಾನೂನು ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ ಬಳಸಿ|ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ದುರುಪಯೋಗ ಮಾಡಬೇಡಿ, ಅಡ್ಡಿಪಡಿಸಬೇಡಿ ಅಥವಾ ಅನಧಿಕೃತ ಪ್ರವೇಶಕ್ಕೆ ಪ್ರಯತ್ನಿಸಬೇಡಿ',
  terms_h3: 'ಸೈಟ್ ಭೇಟಿ ವಿನಂತಿಗಳು',
  terms_b3: 'ಸೈಟ್ ಭೇಟಿ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸುವುದರಿಂದ ಆಸ್ತಿಯ ಲಭ್ಯತೆ ಅಥವಾ ಕಾಯ್ದಿರಿಸುವಿಕೆಯ ಖಾತರಿ ಸಿಗುವುದಿಲ್ಲ. ಸೈಟ್ ಭೇಟಿಗಳು ನಮ್ಮ ತಂಡದ ದೃಢೀಕರಣಕ್ಕೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.',
  terms_h4: 'ಆಸ್ತಿ ಮಾಹಿತಿ',
  terms_b4: 'ಎಲ್ಲಾ ಆಸ್ತಿ ವಿವರಗಳನ್ನು ನಿಖರವಾಗಿ ಮತ್ತು ನವೀಕೃತವಾಗಿ ಇಡಲು ನಾವು ಶ್ರಮಿಸುತ್ತಿದ್ದರೂ, ಲಭ್ಯತೆ, ಬೆಲೆ, ವಿಶೇಷಣಗಳು ಮತ್ತು ಇತರ ಮಾಹಿತಿ ಮುಂಚಿತವಾಗಿ ಸೂಚನೆ ಇಲ್ಲದೆ ಬದಲಾಗಬಹುದು.',
  terms_h5: 'ಬೌದ್ಧಿಕ ಆಸ್ತಿ',
  terms_b5_lead: 'ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿನ ಎಲ್ಲಾ ವಿಷಯ, ಪಠ್ಯ, ಚಿತ್ರಗಳು, ಲೋಗೋಗಳು, ಗ್ರಾಫಿಕ್ಸ್ ಮತ್ತು ವಿನ್ಯಾಸವು {brand} ನ ಆಸ್ತಿಯಾಗಿದೆ, ಬೇರೆ ಹೇಳಿಲ್ಲದಿದ್ದರೆ. ಅನಧಿಕೃತ ನಕಲು ಅಥವಾ ಪುನರುತ್ಪಾದನೆ ನಿಷೇಧಿಸಲಾಗಿದೆ.',
  terms_h6: 'ಹೊಣೆಗಾರಿಕೆಯ ಮಿತಿ',
  terms_b6: 'ಈ ವೆಬ್‌ಸೈಟ್ ಬಳಕೆ ಅಥವಾ ಅದರ ವಿಷಯದ ಮೇಲಿನ ಅವಲಂಬನೆಯ ಪರಿಣಾಮವಾಗಿ ಉಂಟಾಗುವ ಯಾವುದೇ ನೇರ, ಪರೋಕ್ಷ, ಆಕಸ್ಮಿಕ ಅಥವಾ ಪರಿಣಾಮಕಾರಿ ಹಾನಿಗಳಿಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.',
  terms_h7: 'ಗೌಪ್ಯತೆ',
  terms_b7: 'ಈ ವೆಬ್‌ಸೈಟ್ ನಿಮ್ಮ ಬಳಕೆಯನ್ನು ನಮ್ಮ ಗೌಪ್ಯತಾ ನೀತಿಯು ಸಹ ನಿಯಂತ್ರಿಸುತ್ತದೆ.',
  terms_h8: 'ಈ ನಿಯಮಗಳಲ್ಲಿ ಬದಲಾವಣೆಗಳು',
  terms_b8: 'ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಈ ಸೇವಾ ನಿಯಮಗಳನ್ನು ಮಾರ್ಪಡಿಸುವ ಹಕ್ಕನ್ನು ನಾವು ಕಾಯ್ದಿರಿಸಿಕೊಂಡಿದ್ದೇವೆ. ನವೀಕರಣಗಳ ನಂತರ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಮುಂದುವರಿಸಿ ಬಳಸುವುದು ಪರಿಷ್ಕೃತ ನಿಯಮಗಳ ಸ್ವೀಕಾರವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.',
  terms_h9: 'ಆಡಳಿತಾತ್ಮಕ ಕಾನೂನು',
  terms_b9: 'ಈ ನಿಯಮಗಳು ಭಾರತದ ಕಾನೂನುಗಳ ಪ್ರಕಾರ ನಿಯಂತ್ರಿಸಲ್ಪಡುತ್ತವೆ ಮತ್ತು ವ್ಯಾಖ್ಯಾನಿಸಲ್ಪಡುತ್ತವೆ.',
  terms_h10: 'ಸಂಪರ್ಕ',
  terms_b10: 'ಈ ಸೇವಾ ನಿಯಮಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',

  // Security document
  security_intro: '{brand} ನಲ್ಲಿ, ನಾವು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯ ಸುರಕ್ಷತೆಯನ್ನು ಗಂಭೀರವಾಗಿ ತೆಗೆದುಕೊಳ್ಳುತ್ತೇವೆ. ನೀವು ಹಂಚಿಕೊಳ್ಳುವ ಮಾಹಿತಿಯನ್ನು ರಕ್ಷಿಸಲು ನಾವು ಸಮಂಜಸವಾದ ತಾಂತ್ರಿಕ ಮತ್ತು ಸಂಘಟನಾತ್ಮಕ ಕ್ರಮಗಳನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತೇವೆ.',
  security_h1: 'ನಾವು ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಹೇಗೆ ರಕ್ಷಿಸುತ್ತೇವೆ',
  security_b1_items: 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನೊಂದಿಗೆ ಎಲ್ಲಾ ಸಂವಹನವನ್ನು HTTPS ಬಳಸಿ ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ|ಗ್ರಾಹಕ ಮಾಹಿತಿಯನ್ನು Supabase ಬಳಸಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ|ಗ್ರಾಹಕ ಡೇಟಾಕ್ಕೆ ಪ್ರವೇಶವನ್ನು ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿಗೆ ಮಾತ್ರ ಸೀಮಿತಗೊಳಿಸಲಾಗಿದೆ|ಅನಧಿಕೃತ ಪ್ರವೇಶವನ್ನು ತಡೆಯಲು ನಾವು ನಮ್ಮ ಸಿಸ್ಟಂಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತೇವೆ|ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ರಕ್ಷಿಸಲು ನಾವು ಉದ್ಯಮ-ಮಾನಕ ಭದ್ರತಾ ಅಭ್ಯಾಸಗಳನ್ನು ಅನುಸರಿಸುತ್ತೇವೆ',
  security_h2: 'ನಿಮ್ಮ ಜವಾಬ್ದಾರಿ',
  security_b2_intro: 'ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಇಡಲು ಸಹಾಯ ಮಾಡಲು, ದಯವಿಟ್ಟು:',
  security_b2_items: 'ನಿಖರವಾದ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ|ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ಅನುಮತಿಯಿಲ್ಲದೆ ಬಳಸಲಾಗಿದೆ ಎಂದು ನೀವು ನಂಬಿದರೆ ನಮಗೆ ತಿಳಿಸಿ|ನಿರ್ದಿಷ್ಟವಾಗಿ ಕೇಳದಿದ್ದರೆ ಫಾರ್ಮ್‌ಗಳ ಮೂಲಕ ಸೂಕ್ಷ್ಮ ವೈಯಕ್ತಿಕ ಅಥವಾ ಹಣಕಾಸಿನ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದನ್ನು ತಪ್ಪಿಸಿ',
  security_h3: 'ಡೇಟಾ ಉಲ್ಲಂಘನೆ ಪ್ರತಿಕ್ರಿಯೆ',
  security_b3: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಪರಿಣಾಮ ಬೀರುವ ಯಾವುದೇ ಭದ್ರತಾ ಘಟನೆಯ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿದಾಗ, ನಾವು ತಕ್ಷಣ ತನಿಖೆ ನಡೆಸುತ್ತೇವೆ ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ತಡೆಯಲು ಸೂಕ್ತ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತೇವೆ. ಅನ್ವಯವಾಗುವ ಕಾನೂನಿನ ಅಗತ್ಯವಿದ್ದಲ್ಲಿ, ಪರಿಣಾಮ ಬೀರಿದ ಬಳಕೆದಾರರಿಗೆ ತಿಳಿಸಲಾಗುತ್ತದೆ.',
  security_h4: 'ಸಂಪರ್ಕ',
  security_b4: 'ನಮ್ಮ ಭದ್ರತಾ ಅಭ್ಯಾಸಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಕಾಳಜಿಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಒದಗಿಸಲಾದ ವಿವರಗಳನ್ನು ಬಳಸಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',
};

const DICTIONARY: Record<Locale, Strings> = { en, hi, kn };

export const getStrings = (locale: Locale): Strings => DICTIONARY[locale];
