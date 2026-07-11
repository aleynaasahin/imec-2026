import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  const sections = [
    {
      kicker:
        lang === 'tr'
          ? 'Amaç ve Hedefler'
          : 'Purpose and Objectives',
      heading: t(
        'about.purposeHeading',
        lang === 'tr' ? 'Etkinliğin Amacı' : 'Purpose of the Conference',
      ),
      body: t(
        'about.purposeBody',
        lang === 'tr'
          ? 'IMEC 2026, maden aramanın kamusal ve ekonomik değerinin ortaya konulması; aramanın yüksek riskli ve yüksek maliyetli bir Ar-Ge faaliyeti olarak tanınması; aramadan üretime geçişin desteklenmesi; teknik, çevresel, sosyal, hukuki ve finansal boyutların disiplinlerarası ele alınması amacıyla düzenlenmektedir. Düzenleyici çerçeveler ve izin süreçleri konusunda kurumlar arası diyaloğa zemin hazırlanırken; kamu, sanayi, akademi, yatırımcılar ve sivil toplumun birlikte çalıştığı bir ortam oluşturulması hedeflenmektedir. Türkiye\'nin maden arama uzmanlığı ve yatırımı için bölgesel bir merkez konumunu güçlendirmek konferansın temel hedefleri arasındadır.'
          : 'IMEC 2026 aims to highlight the public and economic value of mineral exploration; to recognise exploration as a high-risk, high-cost R&D activity; to support the transition from exploration to production; and to address the technical, environmental, social, legal and financial dimensions of the field through an interdisciplinary lens. The conference fosters dialogue on regulatory frameworks and permitting processes among institutions and creates a collaborative space where public sector, industry, academia, investors and civil society work together. Strengthening Türkiye\'s position as a regional hub for mineral exploration expertise and investment is among the conference\'s core objectives.',
      ),
    },
    {
      kicker: lang === 'tr' ? 'Hedef Kitle' : 'Target Audience',
      heading: t(
        'about.audienceHeading',
        lang === 'tr' ? 'Kimleri Bekliyoruz?' : 'Who Should Attend?',
      ),
      body: t(
        'about.audienceBody',
        lang === 'tr'
          ? 'Kamu kurumları, maden ve arama şirketleri, sondaj müteahhitleri, mühendislik ve danışmanlık firmaları, yer bilimciler, yatırımcılar, finans kuruluşları, borsa temsilcileri, üniversiteler, araştırma kuruluşları, STK\'lar, uluslararası raporlama kuruluşları ve medya, IMEC 2026\'da bir araya geliyor.'
          : 'Public institutions, mining and exploration companies, drilling contractors, engineering and consultancy firms, geoscientists, investors, financial institutions, stock exchange representatives, universities, research institutes, NGOs, international reporting organisations and media converge at IMEC 2026.',
      ),
    },
    {
      kicker: lang === 'tr' ? 'Düzenleyen' : 'Organizer',
      heading: t(
        'about.mayemHeading',
        lang === 'tr'
          ? 'MAYEM Hakkında'
          : 'About MAYEM',
      ),
      body: t(
        'about.mayemBody',
        lang === 'tr'
          ? 'Maden ve Yerbilimleri Profesyonelleri Mesleki Gelişim Derneği (MAYEM), maden ve yer bilimleri alanında çalışan profesyonellerin mesleki gelişimini desteklemek, sektörler arası bilgi paylaşımını güçlendirmek ve kamu yararına etkinlikler düzenlemek amacıyla kurulmuştur.'
          : 'The Professional Development Association of Mining and Geoscience Professionals (MAYEM) was founded to support the professional development of mining and geoscience experts, strengthen inter-sectoral knowledge sharing and organise public-interest events.',
      ),
    },
    {
      kicker: lang === 'tr' ? 'Himaye' : 'Auspices',
      heading: t(
        'about.partnersHeading',
        lang === 'tr' ? 'Resmî Kurumlar' : 'Official Institutions',
      ),
      body: t(
        'about.partnersBody',
        lang === 'tr'
          ? 'Konferans, T.C. Enerji ve Tabii Kaynaklar Bakanlığı ve Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG) himayesinde gerçekleştirilmektedir.'
          : 'The conference is held under the auspices of the Republic of Türkiye — Ministry of Energy and Natural Resources and the General Directorate of Mining and Petroleum Affairs (MAPEG).',
      ),
    },
  ];

  return (
    <>
      <PageHeader
        kicker={t('about.kicker', lang === 'tr' ? 'Hakkımızda' : 'About')}
        title={t('about.title', lang === 'tr' ? 'IMEC 2026 Hakkında' : 'About IMEC 2026')}
        subtitle={t(
          'about.subtitle',
          lang === 'tr'
            ? 'Uluslararası Maden Arama Konferansı, 4-6 Kasım 2026, Ankara.'
            : 'International Mineral Exploration Conference, 4-6 November 2026, Ankara.',
        )}
      />
      <div className="container-content section grid gap-10">
        {sections.map((s) => (
          <article key={s.heading} className="grid gap-3 lg:grid-cols-[260px_1fr] lg:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">{s.kicker}</p>
              <h2 className="h-display text-2xl mt-2">{s.heading}</h2>
            </div>
            <p className="text-brand-ink/80 leading-relaxed whitespace-pre-line">{s.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
