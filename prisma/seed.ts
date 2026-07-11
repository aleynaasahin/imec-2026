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
  { key: 'nav.program', group: 'header', label: 'Menü: Program', tr: 'Program', en: 'Programme' },
  { key: 'nav.themes', group: 'header', label: 'Menü: Temalar', tr: 'Temalar', en: 'Themes' },
  { key: 'nav.speakers', group: 'header', label: 'Menü: Konuşmacılar', tr: 'Konuşmacılar', en: 'Speakers' },
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

  // Sponsors
  { key: 'sponsors.heading', group: 'sponsors', label: 'Sponsorlar başlığı', tr: 'Sponsorlarımız & Destekçilerimiz', en: 'Our Sponsors & Supporters' },

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
    tr: 'Konferans, T.C. Enerji ve Tabii Kaynaklar Bakanlığı ve Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG) himayesinde gerçekleştirilmektedir.',
    en: 'The conference is held under the auspices of the Republic of Türkiye — Ministry of Energy and Natural Resources and the General Directorate of Mining and Petroleum Affairs (MAPEG).' },

  // Program
  { key: 'program.kicker', group: 'program', label: 'Program kicker', tr: 'Program', en: 'Programme' },
  { key: 'program.title', group: 'program', label: 'Program başlık', tr: 'Konferans Programı', en: 'Conference Programme' },
  { key: 'program.subtitle', group: 'program', label: 'Program alt başlık', tr: 'Oturumlar, saatler ve salon bilgileri yakında bu sayfada yayınlanacaktır.', en: 'Sessions, timings and room details will be published on this page soon.' },
  { key: 'program.body', group: 'program', label: 'Program metni', multiline: true, tr: '', en: '' },
  { key: 'program.empty', group: 'program', label: 'Program boş mesajı', tr: 'Detaylı program yakında yayınlanacaktır.', en: 'The detailed programme will be published soon.' },

  // Themes
  { key: 'themes.kicker', group: 'themes', label: 'Temalar kicker', tr: 'Program', en: 'Programme' },
  { key: 'themes.title', group: 'themes', label: 'Temalar başlık', tr: 'Ana Temalar', en: 'Main Themes' },
  { key: 'themes.subtitle', group: 'themes', label: 'Temalar alt başlık', tr: 'Aramadan üretime, finansmandan toplumsal kabule sekiz başlık altında konferansın gündemi.', en: 'The eight pillars of the conference agenda — from exploration to production and from financing to social license.' },

  // Speakers
  { key: 'speakers.kicker', group: 'speakers', label: 'Konuşmacılar kicker', tr: 'Konuşmacılar', en: 'Speakers' },
  { key: 'speakers.title', group: 'speakers', label: 'Konuşmacılar başlık', tr: 'Konuşmacılar', en: 'Speakers' },
  { key: 'speakers.subtitle', group: 'speakers', label: 'Konuşmacılar alt başlık', tr: 'IMEC 2026 kapsamında sahne alacak yurt içi ve yurt dışından uzman konuşmacılar.', en: 'Expert speakers from Türkiye and abroad taking part in IMEC 2026.' },
  { key: 'speakers.empty', group: 'speakers', label: 'Konuşmacılar boş mesajı', tr: 'Konuşmacı listesi yakında yayınlanacaktır.', en: 'The speaker list will be published soon.' },
  { key: 'speakers.topicLabel', group: 'speakers', label: 'Konu etiketi', tr: 'Konu', en: 'Topic' },

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

// Keys whose default content must be corrected even if a row already exists
// with the old (already-seeded) value — e.g. removing a stale MTA mention.
const TEXT_OVERRIDES: { key: string; tr: string; en: string }[] = [
  {
    key: 'about.partnersBody',
    tr: 'Konferans, T.C. Enerji ve Tabii Kaynaklar Bakanlığı ve Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG) himayesinde gerçekleştirilmektedir.',
    en: 'The conference is held under the auspices of the Republic of Türkiye — Ministry of Energy and Natural Resources and the General Directorate of Mining and Petroleum Affairs (MAPEG).',
  },
  { key: 'nav.themes', tr: 'Temalar', en: 'Themes' },
  { key: 'sponsors.heading', tr: 'Sponsorlarımız & Destekçilerimiz', en: 'Our Sponsors & Supporters' },
];

// Keys that no longer exist in the site (superseded by nav.program / nav.themes / nav.speakers)
const TEXT_KEYS_TO_REMOVE = ['home.withSupport'];

const SPEAKER_GROUPS: {
  nameTr: string;
  nameEn: string;
  order: number;
  speakers: {
    fullName: string;
    titleTr: string;
    organization: string;
    topicTr: string;
    bioTr: string;
    order: number;
  }[];
}[] = [
  {
    nameTr: 'Yurt Dışından Konuşmacılar',
    nameEn: 'International Speakers',
    order: 1,
    speakers: [
      { fullName: 'Dr. Hakan Kahraman', titleTr: 'Türkiye Müdürü', organization: 'DMT GRUP', topicTr: '', bioTr: "Dr. Hakan Arden Kahraman, maden ve endüstriyel projelerin teknik due diligence (TDD), yatırımcı raporlaması ve kredi veren kuruluşlar için bağımsız mühendislik hizmetleri konularında uzmanlaşmıştır. Bu kapsamda özellikle uluslararası finans kuruluşları ve yatırımcılar için maden projelerinin fizibilite, risk ve teknik uygunluk değerlendirmelerinde görev almaktadır. Profesyonel kariyerinde DMT Group Türkiye bünyesinde Teknik Müdür olarak görev yapmakta, burada maden ve altyapı projelerine yönelik bağımsız mühendislik, proje değerlendirme ve yatırım doğrulama süreçlerinde çalışmaktadır. İTÜ Jeoloji Mühendisliği bölümü mezunudur.", order: 1 },
      { fullName: 'Sodhie Naicker', titleTr: 'Genel Müdür', organization: 'DMT-S Africa', topicTr: '', bioTr: "Sodhiesiven (Sodhie) B. Naicker, Afrika ve uluslararası pazarlarda maden değer zincirinin tamamında 30 yılı aşkın deneyime sahip bir yer bilimci ve üst düzey madencilik yöneticisidir. DMT Kai Batla'nın kurucu ortağı ve genel müdürüdür. Arama, madencilik operasyonları, proje değerlendirme ve teknik inceleme, maden ekonomisi ve politika geliştirme alanlarında teknik ve stratejik danışmanlık sağlamasıyla tanınmaktadır. Mintek'teki üst düzey görevi sırasında maden ekonomisi ve strateji çalışmalarına liderlik etmiş, ulusal ve emtia bazlı planlamaya katkı sağlamış ve kamu-sanayi iş birliğini güçlendirmiştir. Daha sonra DMT Kai Batla'yı jeolojik danışmanlık şirketinden, Sahra Altı Afrika genelinde faaliyet gösteren çok disiplinli bir danışmanlık kuruluşuna dönüştürmüştür. Aynı zamanda DMT Birleşik Krallık'ta bağımsız yönetim kurulu üyesi ve AusIMM Güney Afrika Uluslararası Temsilcisi olarak görev yapmaktadır.", order: 2 },
      { fullName: 'Kai Hoffman', titleTr: 'Sahip ve CEO', organization: 'Soar Financial Group', topicTr: '', bioTr: "Kai Hoffman, 2008 yılından bu yana junior madencilik sektöründe faaliyet göstermekte ve sektörün olumlu ve olumsuz tüm yönlerini deneyimlemiştir. Yayıncılık, kurumsal iletişim, önde gelen yatırım konferanslarının organizasyonu, finansal danışmanlık ve veri analizi alanlarında faaliyet gösteren Soar Financial Group'un sahibi ve CEO'sudur. Ayrıca Labrador Gold Corp. (TSX-V: LAB) şirketinde bağımsız yönetim kurulu üyesi olarak görev yapmaktadır.", order: 3 },
      { fullName: 'Christian Masurenko', titleTr: 'Avrupa Jeologlar Federasyonu Başkan Yardımcısı', organization: 'ECTerra', topicTr: '', bioTr: "Christian Masurenko, Avrupa Jeoloğu (EurGeol) unvanına sahip olup arama, madencilik, ESG ve sorumlu kaynak yönetimi alanlarında 25 yılı aşkın uluslararası deneyime sahip kıdemli jeolog ve madencilik yöneticisidir. Afrika, Avrupa ve Güney Amerika'da milyarlarca ABD doları değerindeki madencilik ve altyapı projelerinde CEO, proje yöneticisi ve stratejik danışman olarak görev almıştır. Uzmanlık alanları kritik hammaddeler, fizibilite çalışmaları, çevresel ve sosyal yönetişim, toplum ilişkileri ve sürdürülebilir tedarik zincirleridir. JORC, NI 43-101 ve PERC standartlarına göre Yetkin Kişi olarak görev yapma yeterliliğine sahiptir.", order: 4 },
      { fullName: 'Stephan Pueschel', titleTr: 'Metaller ve Madencilik Eş Başkanı', organization: 'KfW IPEX-Bank', topicTr: '', bioTr: "Stephan Pueschel, KfW IPEX-Bank'ta Metaller ve Madencilik Ekibi Eş Başkanı olarak görev yapmakta olup madencilikten işleme, metal üretimi ve geri dönüşüme kadar tüm değer zincirinin finansmanına odaklanmaktadır. KfW Grubu bünyesinde 20 yılı aşkın süredir farklı departmanlarda görev almış ve uluslararası proje finansmanı ile varlık temelli finansman alanlarında geniş deneyim kazanmıştır.", order: 5 },
      { fullName: 'John Pereira', titleTr: 'Arama Müdürü', organization: 'Savannah Resources', topicTr: '', bioTr: "Madencilik ve metaller sektöründe arama projeleri ve ülke yönetimi alanlarında 25 yıllık deneyime sahip kıdemli jeologdur. Birçok halka açık şirkette arama ve madencilik projelerinde görev almıştır. Maden aramacılığı, yer bilimleri, madencilik, mühendislik jeolojisi, mineraller, proje değerlendirme ve teknik inceleme (due diligence) konularında uzmanlaşmıştır.", order: 6 },
      { fullName: 'Maria Alejandra Delgado', titleTr: 'Hukuk, Dış İlişkiler ve Sürdürülebilirlik Uzmanı', organization: 'Bağımsız Danışman', topicTr: '', bioTr: "Lima, Londra, Florida ve Latin Amerika ülkelerinde kapsamlı ulusal ve uluslararası deneyime sahip bir madencilik yöneticisidir. Hukukçu olup genel yönetim ve proje yönetimi, hukuk ve uyum danışmanlığı, iletişim, kurumsal yönetişim, dış ilişkiler ve halkla ilişkiler, kapsayıcılık ve çeşitlilik, kurumsal işler ve sürdürülebilirlik alanlarında uzmanlaşmıştır.", order: 7 },
    ],
  },
  {
    nameTr: "Türkiye'den Uzmanlar",
    nameEn: 'Experts from Türkiye',
    order: 2,
    speakers: [
      { fullName: 'Dr. Yusuf Ziya Özkan', titleTr: 'Jeoloji Mühendisi', organization: 'DAMA MÜHENDİSLİK', topicTr: 'Maden arama maliyet analizi - Aramanın Ekonomisi', bioTr: "Dr. Yusuf Ziya Özkan, ekonomik jeoloji ve maden arama alanlarında uzmanlaşmış bir jeoloji mühendisidir. Maden arama projelerinin tasarımı, maden kaynak ve rezerv tahmini, jeoistatistik, sondaj optimizasyonu ve maden potansiyeli değerlendirmesi konularında uzun yıllara dayanan deneyime sahiptir. Maden kaynak ve rezerv tahmini konusunda Türkiye'deki öncü isimler arasında gösterilmektedir.", order: 1 },
      { fullName: 'Prof. Dr. İlkay Kuşcu', titleTr: 'Jeoloji Mühendisi', organization: '', topicTr: "Türkiye'de derinlerdeki cevher yataklarının araştırılması için mineral sistem yaklaşımı: Bir paradigma değişikliğine ihtiyaç var.", bioTr: "Prof. Dr. İlkay Kuşcu, maden yatakları ve ekonomik jeoloji alanlarında uzmanlaşmış bir jeoloji mühendisidir. Uzun yıllar Muğla Sıtkı Koçman Üniversitesi Jeoloji Mühendisliği Bölümü Maden Yatakları Anabilim Dalı'nda öğretim üyeliği yapmış, fakülte dekanlığı görevini yürütmüştür. Araştırmaları; porfiri bakır yatakları, maden arama jeolojisi, hidrotermal alterasyon ve Türkiye metalojenisi üzerine yoğunlaşmaktadır.", order: 2 },
      { fullName: 'Doç. Dr. Okay Çimen', titleTr: 'Jeoloji Mühendisi', organization: 'MUNZUR ÜNİVERSİTESİ', topicTr: 'Kritik Hammaddeler - Jeolojik keşifler, tedarik zinciri hassasiyetleri ve yeşil enerji için gerekli mineraller (lityum, kobalt, NTE, bakır)', bioTr: "Ankara Üniversitesi Jeoloji Mühendisliği Bölümü'nde lisans ve yüksek lisansını, ODTÜ Jeoloji Mühendisliği Anabilim Dalı'nda 2016 yılında doktorasını tamamlamıştır. Nadir Toprak Elementleri'nin (NTE) jeolojik oluşum ortamları üzerine çalışmalar yürütmektedir. 2019-2023 yılları arasında Munzur Üniversitesi Nadir Toprak Elementleri Uygulama ve Araştırma Merkezi (MUNTEAM) kurucu müdürlüğü görevini üstlenmiştir.", order: 3 },
      { fullName: 'Dr. İbrahim Kürşat Tuna', titleTr: 'Uluslararası İlişkiler Uzmanı', organization: 'SÜTUN ENERJİ', topicTr: 'Uluslararası İlişkiler Bağlamında Kritik Madenlerin Jeopolitiği ve Maden Aramacılığına Etkileri', bioTr: 'Ankara Üniversitesi Siyasal Bilgiler Fakültesi Uluslararası İlişkiler Bölümü mezunudur. Kritik madenlerin ulusal ve uluslararası güvenliğe etkileri üzerine çalışmalar yapmış, 2024 yılında doktor unvanı almıştır. Halihazırda TOBB Madencilik Sektör Meclisi üyesidir.', order: 4 },
      { fullName: 'Mert Köksal', titleTr: 'Jeofizik Mühendisi', organization: 'Matrix GT', topicTr: 'Maden Aramacılığında Jeofiziğin Rolü ve Yeni Nesil Teknolojiler', bioTr: "18 yılı aşkın süredir metalik maden aramacılığı alanında faaliyet göstermektedir. Kariyeri boyunca Türkiye, Kuzey Amerika, Balkanlar, Asya ve Afrika'da çok sayıda arama projesinde görev almış; saha operasyonları, jeofizik çalışmalar ve proje yönetimi konularında sorumluluk üstlenmiştir.", order: 5 },
      { fullName: 'Abdullah Buhur', titleTr: 'Laboratuvarlar Müdürü', organization: 'ARGETEST', topicTr: 'Maden Döngüsü İçinde Laboratuvarların Rolü ve Entegre Kalite Kontrol Uygulamaları', bioTr: "Abdullah Buhur, 2012 yılında ARGETEST'in kurucu ortakları arasında yer almış olup, madencilik sektörüne yönelik analiz ve laboratuvar hizmetleri alanında uzun yıllara dayanan deneyime sahiptir. Türkiye'de ve yurt dışında kurduğu laboratuvarların yönetimini sürdürmektedir.", order: 6 },
      { fullName: 'Dr. Melik Zafer Yıldız', titleTr: 'Endüstri Sosyoloğu', organization: 'ÇAYELİ BAKIR A.Ş.', topicTr: 'Maden Arama döneminde sosyal rızanın ve sosyal kabulün inşası ve dinamikleri', bioTr: "Yıldız, madencilik, enerji ve inşaat sektörlerinde sosyolog olarak 25 yılı aşkın sosyal, endüstriyel ve organizasyonel uygulama, geliştirme ve yönetim tecrübesine sahiptir. T.C. Başbakanlık GAP İdaresi, Flokser Holding, Tepe İnşaat ve Çayeli Bakır İşletmeleri'nde yönetici görevlerde bulunmuştur.", order: 7 },
      { fullName: 'Dr. Özgür Dirim Özkan', titleTr: 'Sosyolog', organization: 'VADAR DANIŞMANLIK', topicTr: 'İlk Karşılaşma, İlk İzlenim, İlk Risk: Maden Arama Aşamasında Sosyal Kabulün Önemi', bioTr: 'Özkan, sosyal antropoloji alanında uzmanlaşmış bir araştırmacı ve danışmandır. Enerji, madencilik, altyapı ve sosyal kalkınma projelerinde saha araştırması, sosyal etki analizi, paydaş katılımı ve topluluk ilişkileri çalışmalarında görev almıştır.', order: 8 },
      { fullName: 'Sezai Aydın', titleTr: 'Maden Mühendisi', organization: '', topicTr: 'Arama etkinliklerinin kamuya ve özel sektöre ilişkin hukuksal niteliği - Kamu Faaliyeti mi? Ticari Faaliyet mi?', bioTr: 'Meslek hayatına ETİKROM A.Ş.\'de başlamış, MTA Genel Müdürlüğünde cevher hazırlama biriminde ve Maden İşleri Genel Müdürlüğünde mühendis, şube müdürü ve daire başkanı olarak görev yapmıştır. UMREK yetkin kişisidir.', order: 9 },
      { fullName: 'Şahin Özdemir', titleTr: 'Maden Mühendisi', organization: 'MİTTO', topicTr: 'Maden Arama Faaliyetlerinin Çevreye Etkisi / Sosyal İletişim', bioTr: '', order: 10 },
      { fullName: 'Dr. Uğur Dağ & Halim Özatay', titleTr: 'Arkeolog', organization: 'REGIO', topicTr: 'Maden Aramalarında Kültürel Mirasın Yönetilmesine Yönelik Yasal Süreçler ve Uygulamada Karşılaşılan Eksiklikler', bioTr: "Dr. Haydar Uğur Dağ, Hacettepe Üniversitesi Arkeoloji Anabilim Dalı mezunudur ve arkeolojik miras etki değerlendirme çalışmaları üzerine doktorasını tamamlamıştır. Halim Özatay, REGİO bünyesinde 25 yılı aşkın süredir arkeolojik yüzey araştırmaları ve kültürel miras yönetimi alanında uzman olarak çalışmaktadır. İkisi de REGİO Kültürel Miras Yönetim Danışmanlık'ın kurucularındandır.", order: 11 },
      { fullName: 'Bişar Sercan Değirmenci', titleTr: 'Avukat', organization: 'DİMİN', topicTr: 'Arama Döneminde İzin Süreçleri ve Uyuşmazlıklar', bioTr: "Hukuk ve Uluslararası İlişkiler lisans mezunudur. Madencilik sektöründe faaliyet gösteren bir şirketler grubunda yaklaşık on iki yıldan beri Hukuk Müşavirliği görevini yürütmektedir. World Association of Mining Lawyers katılımcısıdır.", order: 12 },
      { fullName: 'Cem Boz', titleTr: 'Avukat, LL.M.', organization: 'BOZ&BOZ LEGAL', topicTr: '', bioTr: "Cem Boz, Maden ve Doğal Kaynaklar Hukuku, Uluslararası Ticaret Hukuku alanlarında 18 yılı aşkın uluslararası deneyime sahip hukukçu ve akademisyendir. İstanbul Teknik Üniversitesi Maden Fakültesi eski öğretim görevlisidir. GEMAD Yönetim Kurulu üyesidir.", order: 13 },
    ],
  },
];

// English translations for seeded speakers, matched by fullName and force-applied
// on every seed run (safe to rerun; keeps EN copy in sync with the source data).
const SPEAKER_TRANSLATIONS: {
  fullName: string;
  titleEn: string;
  topicEn: string;
  bioEn: string;
}[] = [
  {
    fullName: 'Dr. Hakan Kahraman',
    titleEn: 'Country Manager, Türkiye',
    topicEn: '',
    bioEn: "Dr. Hakan Arden Kahraman specialises in technical due diligence (TDD) for mining and industrial projects, investor reporting, and independent engineering services for lending institutions. In this capacity he advises international financial institutions and investors on the feasibility, risk and technical soundness of mining projects. He currently serves as Technical Manager at DMT Group Türkiye, where he works on independent engineering, project evaluation and investment verification for mining and infrastructure projects. He is a graduate of the Geological Engineering programme at Istanbul Technical University (ITU).",
  },
  {
    fullName: 'Sodhie Naicker',
    titleEn: 'Managing Director',
    topicEn: '',
    bioEn: "Sodhiesiven (Sodhie) B. Naicker is a geoscientist and senior mining executive with more than 30 years of experience across the full mining value chain in Africa and international markets. He is a founding partner and Managing Director of DMT Kai Batla. He is recognised for providing technical and strategic advisory services in exploration, mining operations, project evaluation and technical due diligence, mining economics and policy development. During his senior tenure at Mintek he led mining economics and strategy work, contributed to national and commodity-based planning, and strengthened public-industry collaboration. He subsequently transformed DMT Kai Batla from a geological consultancy into a multidisciplinary advisory firm operating across Sub-Saharan Africa. He also serves as an independent board member of DMT United Kingdom and as AusIMM's International Representative for Southern Africa.",
  },
  {
    fullName: 'Kai Hoffman',
    titleEn: 'Owner and CEO',
    topicEn: '',
    bioEn: "Kai Hoffman has been active in the junior mining sector since 2008 and has experienced both the highs and lows of the industry. He is the owner and CEO of Soar Financial Group, which operates in publishing, corporate communications, the organisation of leading investment conferences, financial advisory and data analytics. He also serves as an independent board member of Labrador Gold Corp. (TSX-V: LAB).",
  },
  {
    fullName: 'Christian Masurenko',
    titleEn: 'Vice-President, European Federation of Geologists',
    topicEn: '',
    bioEn: "Christian Masurenko holds the title of European Geologist (EurGeol) and is a senior geologist and mining executive with more than 25 years of international experience in exploration, mining, ESG and responsible resource management. He has served as CEO, project manager and strategic advisor on mining and infrastructure projects worth billions of US dollars across Africa, Europe and South America. His areas of expertise include critical raw materials, feasibility studies, environmental and social governance, community relations and sustainable supply chains. He is qualified to act as a Competent Person under the JORC, NI 43-101 and PERC reporting codes.",
  },
  {
    fullName: 'Stephan Pueschel',
    titleEn: 'Co-Head of Metals and Mining',
    topicEn: '',
    bioEn: "Stephan Pueschel is Co-Head of the Metals and Mining team at KfW IPEX-Bank, focusing on financing the full value chain from mining and processing to metal production and recycling. He has worked across various departments within the KfW Group for more than 20 years, gaining extensive experience in international project finance and asset-based financing.",
  },
  {
    fullName: 'John Pereira',
    titleEn: 'Exploration Manager',
    topicEn: '',
    bioEn: "A senior geologist with 25 years of experience in exploration projects and country management within the mining and metals sector. He has worked on exploration and mining projects for numerous publicly listed companies and specialises in mineral exploration, geosciences, mining, engineering geology, minerals, project evaluation and technical due diligence.",
  },
  {
    fullName: 'Maria Alejandra Delgado',
    titleEn: 'Legal, External Affairs and Sustainability Expert',
    topicEn: '',
    bioEn: "A mining executive with extensive national and international experience in Lima, London, Florida and across Latin America. A qualified lawyer, she specialises in general and project management, legal and compliance advisory, communications, corporate governance, external and public relations, inclusion and diversity, corporate affairs and sustainability.",
  },
  {
    fullName: 'Dr. Yusuf Ziya Özkan',
    titleEn: 'Geological Engineer',
    topicEn: 'Cost Analysis in Mineral Exploration — The Economics of Exploration',
    bioEn: "Dr. Yusuf Ziya Özkan is a geological engineer specialising in economic geology and mineral exploration. He has many years of experience in the design of exploration projects, mineral resource and reserve estimation, geostatistics, drilling optimisation and assessment of mineral potential. He is regarded as one of Türkiye's leading names in mineral resource and reserve estimation.",
  },
  {
    fullName: 'Prof. Dr. İlkay Kuşcu',
    titleEn: 'Geological Engineer',
    topicEn: 'A Mineral Systems Approach to Exploring Deep-Seated Ore Deposits in Türkiye: The Need for a Paradigm Shift',
    bioEn: "Prof. Dr. İlkay Kuşcu is a geological engineer specialising in ore deposits and economic geology. He served for many years as a faculty member in the Department of Mineral Deposits at Muğla Sıtkı Koçman University's Department of Geological Engineering, and also held the position of Dean. His research focuses on porphyry copper deposits, exploration geology, hydrothermal alteration and the metallogeny of Türkiye.",
  },
  {
    fullName: 'Doç. Dr. Okay Çimen',
    titleEn: 'Geological Engineer',
    topicEn: 'Critical Raw Materials — Geological Discoveries, Supply Chain Vulnerabilities and Minerals Required for Green Energy (Lithium, Cobalt, REE, Copper)',
    bioEn: "He completed his undergraduate and master's degrees at Ankara University's Department of Geological Engineering, and his PhD in 2016 at the Department of Geological Engineering of Middle East Technical University (METU). His research focuses on the geological formation environments of Rare Earth Elements (REE). Between 2019 and 2023 he served as founding director of Munzur University's Rare Earth Elements Application and Research Centre (MUNTEAM).",
  },
  {
    fullName: 'Dr. İbrahim Kürşat Tuna',
    titleEn: 'International Relations Expert',
    topicEn: 'The Geopolitics of Critical Minerals in the Context of International Relations and Its Impact on Mineral Exploration',
    bioEn: "A graduate of the Department of International Relations at Ankara University's Faculty of Political Science, he has conducted research on the impact of critical minerals on national and international security and received his doctorate in 2024. He currently serves as a member of the TOBB Mining Sector Assembly.",
  },
  {
    fullName: 'Mert Köksal',
    titleEn: 'Geophysical Engineer',
    topicEn: 'The Role of Geophysics in Mineral Exploration and Next-Generation Technologies',
    bioEn: "He has been active in metallic mineral exploration for more than 18 years. Throughout his career he has worked on numerous exploration projects in Türkiye, North America, the Balkans, Asia and Africa, taking responsibility for field operations, geophysical surveys and project management.",
  },
  {
    fullName: 'Abdullah Buhur',
    titleEn: 'Laboratories Director',
    topicEn: 'The Role of Laboratories in the Mining Cycle and Integrated Quality Control Practices',
    bioEn: "Abdullah Buhur was one of the founding partners of ARGETEST in 2012 and has many years of experience in analytical and laboratory services for the mining sector. He continues to manage laboratories he has established in Türkiye and abroad.",
  },
  {
    fullName: 'Dr. Melik Zafer Yıldız',
    titleEn: 'Industrial Sociologist',
    topicEn: 'Building Social Consent and Social Acceptance During the Exploration Phase, and Its Dynamics',
    bioEn: "Yıldız has more than 25 years of experience as a sociologist in social, industrial and organisational practice, development and management within the mining, energy and construction sectors. He has held management positions at the Republic of Türkiye Prime Ministry's GAP Administration, Flokser Holding, Tepe İnşaat and Çayeli Bakır İşletmeleri.",
  },
  {
    fullName: 'Dr. Özgür Dirim Özkan',
    titleEn: 'Sociologist',
    topicEn: 'First Encounter, First Impression, First Risk: The Importance of Social Acceptance During the Exploration Stage',
    bioEn: "Özkan is a researcher and consultant specialising in social anthropology. He has worked on field research, social impact assessment, stakeholder engagement and community relations for energy, mining, infrastructure and social development projects.",
  },
  {
    fullName: 'Sezai Aydın',
    titleEn: 'Mining Engineer',
    topicEn: 'The Legal Nature of Exploration Activities in the Public and Private Sectors — A Public Function or a Commercial Activity?',
    bioEn: "He began his career at ETİKROM A.Ş. and went on to work in the ore-processing unit of the General Directorate of Mineral Research and Exploration (MTA) and as an engineer, division manager and department head at the General Directorate of Mining Affairs. He is a UMREK Competent Person.",
  },
  {
    fullName: 'Şahin Özdemir',
    titleEn: 'Mining Engineer',
    topicEn: 'The Environmental Impact of Mineral Exploration Activities / Social Communication',
    bioEn: '',
  },
  {
    fullName: 'Dr. Uğur Dağ & Halim Özatay',
    titleEn: 'Archaeologists',
    topicEn: 'Legal Processes for the Management of Cultural Heritage in Mineral Exploration and Shortcomings Encountered in Practice',
    bioEn: "Dr. Haydar Uğur Dağ is a graduate of the Department of Archaeology at Hacettepe University and completed his doctorate on archaeological heritage impact assessment studies. Halim Özatay has worked for more than 25 years at REGİO as a specialist in archaeological surface surveys and cultural heritage management. Both are among the founders of REGİO Cultural Heritage Management Consultancy.",
  },
  {
    fullName: 'Bişar Sercan Değirmenci',
    titleEn: 'Lawyer',
    topicEn: 'Permitting Processes and Disputes During the Exploration Period',
    bioEn: "He holds an undergraduate degree in Law and International Relations. He has served as Legal Counsel for a group of companies operating in the mining sector for approximately twelve years, and is a participant in the World Association of Mining Lawyers.",
  },
  {
    fullName: 'Cem Boz',
    titleEn: 'Lawyer, LL.M.',
    topicEn: '',
    bioEn: "Cem Boz is a lawyer and academic with more than 18 years of international experience in Mining and Natural Resources Law and International Trade Law. He is a former lecturer at Istanbul Technical University's Faculty of Mines and serves as a member of the GEMAD Board of Directors.",
  },
];

const SPONSOR_TIERS: {
  nameTr: string;
  nameEn: string;
  order: number;
  sponsors: { name: string; order: number }[];
}[] = [
  {
    nameTr: 'Destekçiler',
    nameEn: 'Supporters',
    order: 1,
    sponsors: [
      { name: 'İMİB', order: 1 },
      { name: 'GEMAD', order: 2 },
      { name: 'DMKTMK', order: 3 },
    ],
  },
  {
    nameTr: 'Sektör Medya Destekçisi',
    nameEn: 'Sector Media Partner',
    order: 2,
    sponsors: [{ name: 'Madencilik ve Sonrası', order: 1 }],
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

  console.log('Applying content overrides…');
  for (const o of TEXT_OVERRIDES) {
    await prisma.text.updateMany({ where: { key: o.key }, data: { tr: o.tr, en: o.en } });
  }
  await prisma.text.deleteMany({ where: { key: { in: TEXT_KEYS_TO_REMOVE } } });

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

  console.log('Seeding speakers…');
  for (const g of SPEAKER_GROUPS) {
    let grp = await prisma.speakerGroup.findFirst({ where: { nameTr: g.nameTr } });
    if (!grp) {
      grp = await prisma.speakerGroup.create({
        data: { nameTr: g.nameTr, nameEn: g.nameEn, order: g.order },
      });
    }
    for (const s of g.speakers) {
      const exists = await prisma.speaker.findFirst({
        where: { groupId: grp.id, fullName: s.fullName },
      });
      if (!exists) {
        await prisma.speaker.create({
          data: { ...s, groupId: grp.id, published: true },
        });
      }
    }
  }

  console.log('Applying speaker English translations…');
  for (const tr of SPEAKER_TRANSLATIONS) {
    await prisma.speaker.updateMany({
      where: { fullName: tr.fullName },
      data: { titleEn: tr.titleEn, topicEn: tr.topicEn, bioEn: tr.bioEn },
    });
  }

  console.log('Seeding sponsor tiers…');
  for (const tier of SPONSOR_TIERS) {
    let t2 = await prisma.sponsorTier.findFirst({ where: { nameTr: tier.nameTr } });
    if (!t2) {
      t2 = await prisma.sponsorTier.create({
        data: { nameTr: tier.nameTr, nameEn: tier.nameEn, order: tier.order },
      });
    }
    for (const s of tier.sponsors) {
      const exists = await prisma.sponsor.findFirst({ where: { tierId: t2.id, name: s.name } });
      if (!exists) {
        await prisma.sponsor.create({ data: { tierId: t2.id, name: s.name, order: s.order } });
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
