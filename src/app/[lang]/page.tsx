import { prisma } from '@/lib/prisma';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';
import HeroCarousel from '@/components/HeroCarousel';
import Countdown from '@/components/Countdown';
import ThemesPreview from '@/components/ThemesPreview';
import AnnouncementsPreview from '@/components/AnnouncementsPreview';
import SponsorsSection from '@/components/SponsorsSection';
import OrganizerStrip from '@/components/OrganizerStrip';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);
  const t = shell.t;

  const [slides, themes, announcements, tiers, media] = await Promise.all([
    prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.theme.findMany({ orderBy: { order: 'asc' } }),
    prisma.announcement.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.sponsorTier.findMany({
      orderBy: { order: 'asc' },
      include: { sponsors: { orderBy: { order: 'asc' } } },
    }),
    prisma.media.findMany({ where: { tag: { startsWith: 'organizer_' } } }),
  ]);

  const sponsorsEnabled = (shell.settings['sponsors_enabled'] || '0') === '1';
  const countdownEnabled = (shell.settings['countdown_enabled'] || '1') === '1';
  const eventDateIso = shell.settings['event_date_iso'] || '2026-11-04T09:00:00+03:00';

  return (
    <>
      <HeroCarousel slides={slides} lang={lang} />

      {countdownEnabled ? (
        <section className="relative -mt-12 z-10">
          <div className="container-content">
            <Countdown
              targetIso={eventDateIso}
              lang={lang}
              title={t(
                'home.countdownTitle',
                lang === 'tr' ? 'IMEC 2026\'ya kalan süre' : 'Time until IMEC 2026',
              )}
            />
          </div>
        </section>
      ) : null}

      <SponsorsSection
        tiers={tiers}
        lang={lang}
        enabled={sponsorsEnabled}
        heading={t('sponsors.heading', lang === 'tr' ? 'Sponsorlarımız' : 'Our Sponsors')}
      />

      {/* About / intro */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              {t('home.aboutKicker', lang === 'tr' ? 'Etkinlik Hakkında' : 'About the Event')}
            </p>
            <h2 className="h-display text-3xl lg:text-4xl mt-2">
              {t(
                'home.aboutHeading',
                lang === 'tr'
                  ? 'Maden aramada yeni bir dönem, Ankara\'da konuşuluyor.'
                  : 'A new era in mineral exploration, discussed in Ankara.',
              )}
            </h2>
            <p className="mt-4 text-brand-ink/75 leading-relaxed">
              {t(
                'home.aboutBody',
                lang === 'tr'
                  ? 'IMEC 2026, maden aramanın bilimsel, teknik, hukuki, finansal ve sosyal boyutlarını tek bir çatı altında buluşturuyor. Kamu, sanayi, akademi, yatırımcılar ve sivil toplum aynı masada; kritik mineraller, inovasyon, sürdürülebilirlik ve uluslararası iyi uygulamalar gündemde.'
                  : 'IMEC 2026 brings together the scientific, technical, legal, financial and social dimensions of mineral exploration in one venue. Public sector, industry, academia, investors and civil society convene around critical minerals, innovation, sustainability and international best practices.',
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`/${lang}/about`} className="btn-primary">
                {t('home.aboutCta', lang === 'tr' ? 'Daha Fazla Bilgi' : 'Learn More')}
              </a>
              <a href={`/${lang}/register`} className="btn-secondary">
                {t('home.registerCta', lang === 'tr' ? 'Kayıt Ol' : 'Register')}
              </a>
            </div>
          </div>

          <ul className="grid gap-4">
            {[
              {
                k: 'home.fact1',
                d:
                  lang === 'tr'
                    ? '4-6 Kasım 2026 — Ankara, Türkiye'
                    : '4-6 November 2026 — Ankara, Türkiye',
              },
              {
                k: 'home.fact2',
                d:
                  lang === 'tr'
                    ? '8 ana tema grubu, disiplinlerarası program'
                    : '8 main theme groups, interdisciplinary programme',
              },
              {
                k: 'home.fact3',
                d:
                  lang === 'tr'
                    ? 'Kamu kurumları, sanayi, akademi, yatırımcılar ve STK\'ları aynı masada'
                    : 'Public sector, industry, academia, investors and NGOs in one forum',
              },
              {
                k: 'home.fact4',
                d:
                  lang === 'tr'
                    ? 'Kritik mineraller, inovasyon ve sürdürülebilirliğe odak'
                    : 'Focus on critical minerals, innovation and sustainability',
              },
            ].map((f, i) => (
              <li
                key={f.k}
                className="flex items-start gap-3 rounded-xl border border-brand-ink/10 bg-white p-4"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-white text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-brand-ink/80">{t(f.k, f.d)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ThemesPreview
        themes={themes}
        lang={lang}
        heading={t(
          'home.themesHeading',
          lang === 'tr' ? 'Ana Temalar' : 'Main Themes',
        )}
        subheading={t(
          'home.themesSub',
          lang === 'tr'
            ? 'Aramadan üretime, finansmandan toplumsal kabule, sekiz başlıkta kapsamlı bir program.'
            : 'From exploration to production, from financing to social license — a comprehensive program in eight pillars.',
        )}
        viewAllLabel={t('home.themesAll', lang === 'tr' ? 'Tüm Temaları Gör' : 'View All Themes')}
      />

      <AnnouncementsPreview
        items={announcements}
        lang={lang}
        heading={t(
          'home.announcementsHeading',
          lang === 'tr' ? 'Son Duyurular' : 'Latest Announcements',
        )}
        emptyLabel={t(
          'home.announcementsEmpty',
          lang === 'tr' ? 'Henüz duyuru bulunmuyor.' : 'No announcements yet.',
        )}
        viewAllLabel={t(
          'home.announcementsAll',
          lang === 'tr' ? 'Tüm duyurular' : 'All announcements',
        )}
      />

      <OrganizerStrip
        lang={lang}
        organizers={media.map((m) => ({ tag: m.tag, url: m.url, name: m.name }))}
        organizedBy={t(
          'home.organizedBy',
          lang === 'tr' ? 'Düzenleyen' : 'Organized by',
        )}
        underAuspices={t(
          'home.underAuspices',
          lang === 'tr' ? 'Himayesinde' : 'Under the Auspices of',
        )}
        withSupport={t(
          'home.withSupport',
          lang === 'tr' ? 'Desteğiyle' : 'With the Support of',
        )}
      />
    </>
  );
}
