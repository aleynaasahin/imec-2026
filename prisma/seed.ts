import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TextSeed = {
  key: string;
  group: string;
  label: string;
  tr: string;
  en: string;
  multiline?: boolean;
};

const TEXTS: TextSeed[] = [
  // Brand / nav
  { key: 'brand.full', group: 'header', label: 'Marka adı', tr: 'IMEC 2026', en: 'IMEC 2026' },
  { key: 'nav.home', group: 'header', label: 'Menü: Anasayfa', tr: 'Anasayfa', en: 'Home' },
  { key: 'nav.about', group: 'header', label: 'Menü: Hakkımızda', tr: 'Hakkımızda', en: 'About' },
  { key: 'nav.themes', group: 'header', label: 'Menü: Program / Temalar', tr: 'Program / Temalar', en: 'Program / Themes' },
  { key: 'nav.committees', group: 'header', label: 'Menü: Komiteler', tr: 'Komiteler', en: 'Committees' },
  { key: 'nav.announcements', group: 'header', label: 'Menü: Duyurular', tr: 'Duyurular', en: 'Announcements' },
  { key: 'nav.contact', group: 'header', label: 'Menü: İletişim', tr: 'İletişim', en: 'Contact' },
  { key: 'nav.register', group: 'header', label: 'Buton: Kayıt Ol', tr: 'Kayıt Ol', en: 'Register' },

  // Home
  { key: 'home.countdownTitle', group: 'home', label: 'Geri sayım başlığı', tr: "IMEC 2026'ya kalan süre", en: 'Time until IMEC 2026' },
  { key: 'home.aboutKicker', group: 'home', label: 'Etkinlik hakkında kicker', tr: 'Etkinlik Hakkında', en: 'About the Event' },
  { key: 'home.aboutHeading', group: 'home', label: 'Etkinlik hakkında başlık', tr: "Maden aramada yeni bir dönem, Ankara'da konuşuluyor.", en: 'A new era in mineral exploration, discussed in Ankara.' },
  { key: 'home.aboutBody', group: 'home', label: 'Etkinlik hakkında metin', multiline: true,
    tr: 'IMEC 2026, maden aramanın bilimsel, teknik, hukuki, finansal ve sosyal boyutlarını tek bir çatı altında buluşturuyor. Kamu, sanayi, akademi, yatırımcılar ve sivil toplum aynı masada; kritik mineraller, inovasyon, sürdürülebilirlik ve uluslararası iyi uygulamalar gündemde.',
    en: 'IMEC 2026 brings together the scientific, technical, legal, financial and social dimensions of mineral exploration in one venue. Public sector, industry, academia, investors and civil society convene around critical minerals, innovation, sustainability and international best practices.' },
  { key: 'home.aboutCta', group: 'home', label: 'Buton: Daha fazla bilgi', tr: 'Daha Fazla Bilgi', en: 'Learn More' },
  { key: 'home.registerCta', group: 'home', label: 'Buton: Kayıt ol', tr: 'Kayıt Ol', en: 'Register' },
  { key: 'home.fact1', group: 'home', label: 'Olgu 1', tr: '4-6 Kasım 2026 — Ankara, Türkiye', en: '4-6 November 2026 — Ankara, Türkiye' },
  { key: 'home.fact2', group: 'home', label: 'Olgu 2', tr: '8 ana tema grubu, disiplinlerarası program', en: '8 main theme groups, interdisciplinary programme' },
  { key: 'home.fact3', group: 'home', label: 'Olgu 3', tr: "Kamu kurumları, sanayi, akademi, yatırımcılar ve STK'ları aynı masada", en: 'Public sector, industry, academia, investors and NGOs in one forum' },
  { key: 'home.fact4', group: 'home', label: 'Olgu 4', tr: 'Kritik mineraller, inovasyon ve sürdürülebilirliğe odak', en: 'Focus on critical minerals, innovation and sustainability' },
  { key: 'home.themesHeading', group: 'home', label: 'Temalar başlığı', tr: 'Ana Temalar', en: 'Main Themes' },
  { key: 'home.themesSub', group: 'home', label: 'Temalar alt başlık', multiline: true,
    tr: 'Aramadan üretime, finansmandan toplumsal kabule, sekiz başlıkta kapsamlı bir program.',
    en: 'From exploration to production, from financing to social license — a comprehensive program in eight pillars.' },
  { key: 'home.themesAll', group: 'home', label: 'Buton: Tüm temalar', tr: 'Tüm Temaları Gör', en: 'View All Themes' },
  { key: 'home.announcementsHeading', group: 'home', label: 'Duyurular başlığı', tr: 'Son Duyurular', en: 'Latest Announcements' },
  { key: 'home.announcementsEmpty', group: 'home', label: 'Duyurular boş', tr: 'Henüz duyuru bulunmuyor.', en: 'No announcements yet.' },
  { key: 'home.announcementsAll', group: 'home', label: 'Tüm duyurular linki', tr: 'Tüm duyurular', en: 'All announcements' },
  { key: 'home.organizedBy', group: 'home', label: 'Düzenleyen başlığı', tr: 'Düzenleyen', en: 'Organized by' },
  { key: 'home.underAuspices', group: 'home', label: 'Himayesinde başlığı', tr: 'Himayesinde', en: 'Under the Auspices of' },
  { key: 'home.withSupport', group: 'home', label: 'Desteğiyle başlığı', tr: 'Desteğiyle', en: 'With the Support of' },

  // Sponsors
  { key: 'sponsors.heading', group: 'sponsors', label: 'Sponsorlar başlığı', tr: 'Sponsorlarımız', en: 'Our Sponsors' },

  // About
  { key: 'about.kicker', group: 'about', label: 'Hakkımızda kicker', tr: 'Hakkımızda', en: 'About' },
  { key: 'about.title', group: 'about', label: 'Hakkımızda başlık', tr: 'IMEC 2026 Hakkında', en: 'About IMEC 2026' },
  { key: 'about.subtitle', group: 'about', label: 'Hakkımızda alt başlık', tr: 'Uluslararası Maden Arama Konferansı, 4-6 Kasım 2026, Ankara.', en: 'International Mineral Exploration Conference, 4-6 November 2026, Ankara.' },
  { key: 'about.purposeHeading', group: 'about', label: 'Amaç başlığı', tr: 'Etkinliğin Amacı', en: 'Purpose of the Conference' },
  { key: 'about.purposeBody', group: 'about', label: 'Amaç metni', multiline: true,
    tr: "IMEC 2026, maden aramanın kamusal ve ekonomik değerinin ortaya konulması; aramanın yüksek riskli ve yüksek maliyetli bir Ar-Ge faaliyeti olarak tanınması; aramadan üretime geçişin desteklenmesi; teknik, çevresel, sosyal, hukuki ve finansal boyutların disiplinlerarası ele alınması amacıyla düzenlenmektedir. Düzenleyici çerçeveler ve izin süreçleri konusunda kurumlar arası diyaloğa zemin hazırlanırken; kamu, sanayi, akademi, yatırımcılar ve sivil toplumun birlikte çalıştığı bir ortam oluşturulması hedeflenmektedir. Türkiye'nin maden arama uzmanlığı ve yatırımı için bölgesel bir merkez konumunu güçlendirmek konferansın temel hedefleri arasındadır.",
    en: "IMEC 2026 aims to highlight the public and economic value of mineral exploration; to recognise exploration as a high-risk, high-cost R&D activity; to support the transition from exploration to production; and to address the technical, environmental, social, legal and financial dimensions of the field through an interdisciplinary lens. The conference fosters dialogue on regulatory frameworks and permitting processes among institutions and creates a collaborative space where public sector, industry, academia, investors and civil society work together. Strengthening Türkiye's position as a regional hub for mineral exploration expertise and investment is among the conference's core objectives." },
  { key: 'about.audienceHeading', group: 'about', label: 'Hedef kitle başlığı', tr: 'Kimleri Bekliyoruz?', en: 'Who Should Attend?' },
  { key: 'about.audienceBody', group: 'about', label: 'Hedef kitle metni', multiline: true,
    tr: "Kamu kurumları, maden ve arama şirketleri, sondaj müteahhitleri, mühendislik ve danışmanlık firmaları, yer bilimciler, yatırımcılar, finans kuruluşları, borsa temsilcileri, üniversiteler, araştırma kuruluşları, STK'lar, uluslararası raporlama kuruluşları ve medya, IMEC 2026'da bir araya geliyor.",
    en: 'Public institutions, mining and exploration companies, drilling contractors, engineering and consultancy firms, geoscientists, investors, financial institutions, stock exchange representatives, universities, research institutes, NGOs, international reporting organisations and media converge at IMEC 2026.' },
  { key: 'about.mayemHeading', group: 'about', label: 'MAYEM başlığı', tr: 'MAYEM Hakkında', en: 'About MAYEM' },
  { key: 'about.mayemBody', group: 'about', label: 'MAYEM metni', multiline: true,
    tr: 'Maden ve Yerbilimleri Profesyonelleri Mesleki Gelişim Derneği (MAYEM), maden ve yer bilimleri alanında çalışan profesyonellerin mesleki gelişimini desteklemek, sektörler arası bilgi paylaşımını güçlendirmek ve kamu yararına etkinlikler düzenlemek amacıyla kurulmuştur.',
    en: 'The Professional Development Association of Mining and Geoscience Professionals (MAYEM) was founded to support the professional development of mining and geoscience experts, strengthen inter-sectoral knowledge sharing and organise public-interest events.' },
  { key: 'about.partnersHeading', group: 'about', label: 'Resmi kurumlar başlığı', tr: 'Resmî Kurumlar', en: 'Official Institutions' },
  { key: 'about.partnersBody', group: 'about', label: 'Resmi kurumlar metni', multiline: true,
    tr: 'Konferans, T.C. Enerji ve Tabii Kaynaklar Bakanlığı ve Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG) himayesinde, Maden Tetkik ve Arama Genel Müdürlüğü (MTA) desteğiyle gerçekleştirilmektedir.',
    en: 'The conference is held under the auspices of the Republic of Türkiye — Ministry of Energy and Natural Resources and the General Directorate of Mining and Petroleum Affairs (MAPEG), with the support of the General Directorate of Mineral Research and Exploration (MTA).' },

  // Themes
  { key: 'themes.kicker', group: 'themes', label: 'Temalar kicker', tr: 'Program', en: 'Programme' },
  { key: 'themes.title', group: 'themes', label: 'Temalar başlık', tr: 'Ana Temalar', en: 'Main Themes' },
  { key: 'themes.subtitle', group: 'themes', label: 'Temalar alt başlık', tr: 'Aramadan üretime, finansmandan toplumsal kabule sekiz başlık altında konferansın gündemi.', en: 'The eight pillars of the conference agenda — from exploration to production and from financing to social license.' },

  // Committees
  { key: 'committees.kicker', group: 'committees', label: 'Komiteler kicker', tr: 'Ekip', en: 'Team' },
  { key: 'committees.title', group: 'committees', label: 'Komiteler başlık', tr: 'Komiteler', en: 'Committees' },
  { key: 'committees.subtitle', group: 'committees', label: 'Komiteler alt başlık', tr: 'Konferansın koordinasyon ve düzenleme komitelerinde görev alan üyeler.', en: 'Members of the coordination and organizing committees of the conference.' },

  // Announcements
  { key: 'ann.kicker', group: 'announcements', label: 'Duyurular kicker', tr: 'Güncel', en: 'Updates' },
  { key: 'ann.title', group: 'announcements', label: 'Duyurular başlık', tr: 'Duyurular', en: 'Announcements' },
  { key: 'ann.subtitle', group: 'announcements', label: 'Duyurular alt başlık', tr: 'Etkinlikten son haberler, program değişiklikleri ve önemli açıklamalar.', en: 'Latest news, programme updates and important announcements about the conference.' },

  // Contact
  { key: 'contact.kicker', group: 'contact', label: 'İletişim kicker', tr: 'Bize Ulaşın', en: 'Get in Touch' },
  { key: 'contact.title', group: 'contact', label: 'İletişim başlık', tr: 'İletişim', en: 'Contact' },
  { key: 'contact.subtitle', group: 'contact', label: 'İletişim alt başlık', tr: 'Sorularınız, sponsor talepleri ve iş birlikleri için bizimle iletişime geçebilirsiniz.', en: 'Reach out for questions, sponsorship enquiries and collaboration opportunities.' },
  { key: 'contact.emailHeading', group: 'contact', label: 'E-posta başlığı', tr: 'E-posta', en: 'Email' },
  { key: 'contact.phoneHeading', group: 'contact', label: 'Telefon başlığı', tr: 'Telefon', en: 'Phone' },
  { key: 'contact.locationHeading', group: 'contact', label: 'Konum başlığı', tr: 'Konum', en: 'Location' },
  { key: 'contact.formHeading', group: 'contact', label: 'Form başlığı', tr: 'Mesaj Gönderin', en: 'Send a Message' },
  { key: 'contact.formNote', group: 'contact', label: 'Form notu', tr: 'Mesajınızı doğrudan e-posta uygulamanız üzerinden ileteceğiz.', en: 'Your message will be opened in your email client.' },
  { key: 'contact.f.name', group: 'contact', label: 'Form: Ad', tr: 'Ad Soyad', en: 'Full Name' },
  { key: 'contact.f.email', group: 'contact', label: 'Form: E-posta', tr: 'E-posta', en: 'Email' },
  { key: 'contact.f.subject', group: 'contact', label: 'Form: Konu', tr: 'Konu', en: 'Subject' },
  { key: 'contact.f.message', group: 'contact', label: 'Form: Mesaj', tr: 'Mesajınız', en: 'Your Message' },
  { key: 'contact.f.send', group: 'contact', label: 'Form: Gönder', tr: 'Gönder', en: 'Send' },

  // Register
  { key: 'register.kicker', group: 'register', label: 'Kayıt kicker', tr: 'Kayıt', en: 'Registration' },
  { key: 'register.title', group: 'register', label: 'Kayıt başlık', tr: 'IMEC 2026 Kayıt Formu', en: 'IMEC 2026 Registration' },
  { key: 'register.subtitle', group: 'register', label: 'Kayıt alt başlık', tr: 'Konferansa katılmak için aşağıdaki formu doldurunuz. Kaydınız ekibimize ulaşacaktır.', en: 'Fill in the form below to attend the conference. Your registration will reach our team.' },
  { key: 'register.dateHeading', group: 'register', label: 'Tarih başlığı', tr: 'Etkinlik Tarihi', en: 'Event Date' },
  { key: 'register.locationHeading', group: 'register', label: 'Yer başlığı', tr: 'Yer', en: 'Venue' },
  { key: 'register.contactHeading', group: 'register', label: 'İletişim başlığı', tr: 'Sorularınız için', en: 'For questions' },
  { key: 'register.submit', group: 'register', label: 'Buton: Gönder', tr: 'Kaydı Tamamla', en: 'Submit Registration' },
  { key: 'register.submitting', group: 'register', label: 'Buton: Gönderiliyor', tr: 'Gönderiliyor…', en: 'Submitting…' },
  { key: 'register.success', group: 'register', label: 'Başarı mesajı', tr: 'Kaydınız alındı. Teşekkür ederiz!', en: 'Your registration has been received. Thank you!' },
  { key: 'register.errorGeneric', group: 'register', label: 'Genel hata mesajı', tr: 'Lütfen tüm zorunlu alanları doğru şekilde doldurun.', en: 'Please fill in all required fields correctly.' },
  { key: 'register.requiredHint', group: 'register', label: 'Zorunlu alan ipucu', tr: 'Bu alan zorunludur', en: 'This field is required' },

  // Footer
  { key: 'footer.about', group: 'footer', label: 'Footer açıklama', multiline: true,
    tr: "IMEC 2026 — Uluslararası Maden Arama Konferansı, 4-6 Kasım 2026 tarihlerinde Ankara'da gerçekleştirilecektir.",
    en: 'IMEC 2026 — International Mineral Exploration Conference, 4-6 November 2026, Ankara.' },
  { key: 'footer.nav', group: 'footer', label: 'Footer menü başlığı', tr: 'Menü', en: 'Navigation' },
  { key: 'footer.contact', group: 'footer', label: 'Footer iletişim başlığı', tr: 'İletişim', en: 'Contact' },
  { key: 'footer.follow', group: 'footer', label: 'Footer takip et başlığı', tr: 'Bizi Takip Edin', en: 'Follow Us' },
  { key: 'footer.organizerNote', group: 'footer', label: 'Footer düzenleyen notu', tr: 'MAYEM tarafından düzenlenmektedir.', en: 'Organized by MAYEM.' },
  { key: 'footer.bottomNote', group: 'footer', label: 'Footer alt not', tr: '© 2026 IMEC. Tüm hakları saklıdır.', en: '© 2026 IMEC. All rights reserved.' },
];

const THEMES = [
  {
    numberLabel: '01',
    titleTr: 'Maden Aramada Yeni Bir Dönem',
    titleEn: 'A New Era in Mineral Exploration',
    descriptionTr: 'Derin yerleşimli kaynaklar ve artan arama zorlukları; arama ekonomisi ve ulusal kalkınma; teşvik ve destek mekanizmaları.',
    descriptionEn: 'Deep-seated resources and growing exploration challenges; the economics of exploration and national development; incentive and support mechanisms.',
  },
  {
    numberLabel: '02',
    titleTr: 'Kritik Mineraller ve Stratejik Hammaddeler',
    titleEn: 'Critical Minerals and Strategic Raw Materials',
    descriptionTr: 'Jeolojik keşifler ve gelecekteki arz; lityum, kobalt, nadir toprak elementleri, bakır vb.; hammadde jeopolitiği ve tedarik zinciri güvenliği.',
    descriptionEn: 'Geological discoveries and future supply; lithium, cobalt, rare earth elements, copper, etc.; raw-material geopolitics and supply-chain security.',
  },
  {
    numberLabel: '03',
    titleTr: 'Aramada İnovasyon',
    titleEn: 'Innovation in Exploration',
    descriptionTr: 'Yapay zekâ ve makine öğrenmesi; büyük veri analitiği ve otomatik loglama; sensörler, IoT ve dijital arama araçları; uzaktan algılama, dronlar ve uydu tabanlı arama.',
    descriptionEn: 'Artificial intelligence and machine learning; big-data analytics and automated logging; sensors, IoT and digital exploration tools; remote sensing, drones and satellite-based exploration.',
  },
  {
    numberLabel: '04',
    titleTr: 'Uluslararası Arama Deneyimi',
    titleEn: 'International Exploration Experience',
    descriptionTr: 'Yurt dışı arama projeleri; başarı hikâyeleri, çıkarılan dersler ve risk yönetimi.',
    descriptionEn: 'International exploration projects; success stories, lessons learned and risk management.',
  },
  {
    numberLabel: '05',
    titleTr: 'Sermaye, Yatırım ve Finansman',
    titleEn: 'Capital, Investment and Financing',
    descriptionTr: 'Risk sermayesi ve yenilikçi finansman modelleri; arama projesi finansmanı; kamu teşvikleri ve Ar-Ge destekleri; maliyet analizi; kamu-özel ortaklıkları.',
    descriptionEn: 'Venture capital and innovative financing models; exploration project finance; public incentives and R&D support; cost analysis; public-private partnerships.',
  },
  {
    numberLabel: '06',
    titleTr: 'Hukuki ve Düzenleyici Çerçeveler',
    titleEn: 'Legal and Regulatory Frameworks',
    descriptionTr: 'Karşılaştırmalı uluslararası arama mevzuatı; çevre, orman ve arazi kullanımı düzenlemeleri; sorumluluk ve tazminat; kamusal-ticari nitelik.',
    descriptionEn: 'Comparative international exploration legislation; environmental, forestry and land-use regulations; liability and compensation; public-commercial character.',
  },
  {
    numberLabel: '07',
    titleTr: 'Yönetişim ve Paydaş Katılımı',
    titleEn: 'Governance and Stakeholder Engagement',
    descriptionTr: 'Mevzuata uyum ve izin süreçleri; kamu kurumları ile özel sektör iş birliği.',
    descriptionEn: 'Regulatory compliance and permitting processes; cooperation between public institutions and the private sector.',
  },
  {
    numberLabel: '08',
    titleTr: 'Toplum, Sürdürülebilirlik ve Çevresel Sorumluluk',
    titleEn: 'Society, Sustainability and Environmental Stewardship',
    descriptionTr: 'Sosyal Faaliyet İzni (SLO); toplumla etkileşim ve fayda paylaşımı; düşük etkili arama yöntemleri; saha rehabilitasyonu ve net-sıfır madencilik.',
    descriptionEn: 'Social License to Operate (SLO); community engagement and benefit sharing; low-impact exploration methods; site rehabilitation and net-zero mining.',
  },
];

const COMMITTEES = [
  {
    nameTr: 'Koordinasyon',
    nameEn: 'Coordination',
    order: 1,
    members: [
      { fullName: 'Halim Demirkan', titleTr: 'Koordinatör', titleEn: 'Coordinator', affiliation: 'MAYEM', order: 1 },
      { fullName: 'Ahmet İbuk', titleTr: 'Koordinatör', titleEn: 'Coordinator', affiliation: 'MAYEM', order: 2 },
    ],
  },
  {
    nameTr: 'Düzenleme Kurulu',
    nameEn: 'Organizing Committee',
    order: 2,
    members: [
      { fullName: 'Dr. Behzat Gökçen', titleTr: 'Üye', titleEn: 'Member', affiliation: 'MAPEG', order: 1 },
      { fullName: 'Dr. Hakan Kahraman', titleTr: 'Üye', titleEn: 'Member', affiliation: 'DMT', order: 2 },
      { fullName: 'Dr. Serdar Keskin', titleTr: 'Üye', titleEn: 'Member', affiliation: 'MTA', order: 3 },
      { fullName: 'Beyzade Kaygısız', titleTr: 'Üye', titleEn: 'Member', affiliation: 'MAYEM', order: 4 },
      { fullName: 'Sevginur Sağ', titleTr: 'Üye', titleEn: 'Member', affiliation: 'MAYEM', order: 5 },
    ],
  },
];

const FORM_FIELDS = [
  { key: 'full_name', labelTr: 'Ad Soyad', labelEn: 'Full Name', type: 'text', required: true, order: 1 },
  { key: 'email', labelTr: 'E-posta', labelEn: 'Email', type: 'email', required: true, order: 2 },
  { key: 'phone', labelTr: 'Telefon', labelEn: 'Phone', type: 'phone', required: false, order: 3 },
  { key: 'organization', labelTr: 'Kurum / Şirket', labelEn: 'Organization / Company', type: 'text', required: false, order: 4 },
  { key: 'position', labelTr: 'Ünvan', labelEn: 'Position', type: 'text', required: false, order: 5 },
  {
    key: 'participant_type',
    labelTr: 'Katılımcı Türü',
    labelEn: 'Participant Type',
    type: 'select',
    required: true,
    options: 'Akademisyen|Academic;;Sektör|Industry;;Kamu|Public Sector;;Öğrenci|Student;;Diğer|Other',
    order: 6,
  },
  { key: 'notes', labelTr: 'Notlar', labelEn: 'Notes', type: 'textarea', required: false, order: 7 },
];

const SETTINGS = [
  { key: 'contact_email', value: 'info@imec.com.tr' },
  { key: 'contact_phone', value: '' },
  { key: 'event_date_iso', value: '2026-11-04T09:00:00+03:00' },
  { key: 'countdown_enabled', value: '1' },
  { key: 'sponsors_enabled', value: '0' },
  { key: 'social_instagram', value: 'https://www.instagram.com/mayem_21' },
  { key: 'social_youtube', value: 'https://www.youtube.com/@mayem_21' },
  { key: 'social_linkedin', value: 'https://www.linkedin.com/company/mayem21' },
  { key: 'social_x', value: 'https://x.com/madendernegi' },
  { key: 'social_facebook', value: 'https://www.facebook.com/mayem21' },
];

async function seed() {
  console.log('Seeding texts…');
  for (const t of TEXTS) {
    await prisma.text.upsert({
      where: { key: t.key },
      create: {
        key: t.key,
        group: t.group,
        label: t.label,
        tr: t.tr,
        en: t.en,
        multiline: t.multiline ?? false,
      },
      update: {
        group: t.group,
        label: t.label,
        multiline: t.multiline ?? false,
        // Keep existing tr/en if already edited; only fill if empty.
        tr: undefined,
        en: undefined,
      },
    });
    // For new rows the create branch sets tr/en. For existing rows, fill empty fields only.
    const row = await prisma.text.findUnique({ where: { key: t.key } });
    if (row) {
      const patch: { tr?: string; en?: string } = {};
      if (!row.tr) patch.tr = t.tr;
      if (!row.en) patch.en = t.en;
      if (Object.keys(patch).length) {
        await prisma.text.update({ where: { id: row.id }, data: patch });
      }
    }
  }

  console.log('Seeding themes…');
  for (let i = 0; i < THEMES.length; i++) {
    const th = THEMES[i];
    const existing = await prisma.theme.findFirst({ where: { numberLabel: th.numberLabel } });
    if (!existing) {
      await prisma.theme.create({
        data: { ...th, order: i + 1 },
      });
    }
  }

  console.log('Seeding committees…');
  for (const g of COMMITTEES) {
    let grp = await prisma.committeeGroup.findFirst({ where: { nameTr: g.nameTr } });
    if (!grp) {
      grp = await prisma.committeeGroup.create({
        data: { nameTr: g.nameTr, nameEn: g.nameEn, order: g.order },
      });
    }
    for (const m of g.members) {
      const exists = await prisma.committeeMember.findFirst({
        where: { groupId: grp.id, fullName: m.fullName },
      });
      if (!exists) {
        await prisma.committeeMember.create({
          data: { ...m, groupId: grp.id },
        });
      }
    }
  }

  console.log('Seeding form fields…');
  for (const f of FORM_FIELDS) {
    await prisma.formField.upsert({
      where: { key: f.key },
      create: { ...f, options: f.options ?? '', enabled: true },
      update: {},
    });
  }

  console.log('Seeding settings…');
  for (const s of SETTINGS) {
    await prisma.setting.upsert({
      where: { key: s.key },
      create: { key: s.key, value: s.value },
      update: {},
    });
  }

  console.log('Seeding default hero slide…');
  const slideCount = await prisma.heroSlide.count();
  if (slideCount === 0) {
    await prisma.heroSlide.create({
      data: {
        order: 1,
        active: true,
        titleTr: 'Uluslararası Maden Arama Konferansı',
        titleEn: 'International Mineral Exploration Conference',
        subtitleTr: 'Ankara · 4-6 Kasım 2026 — Maden aramada yeni bir dönem.',
        subtitleEn: 'Ankara · 4-6 November 2026 — A new era in mineral exploration.',
        buttonTextTr: 'Kayıt Ol',
        buttonTextEn: 'Register',
        buttonUrl: '/tr/register',
      },
    });
  }

  console.log('Done.');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
