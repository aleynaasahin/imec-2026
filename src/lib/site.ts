import { loadTexts, getSettings } from './content';
import { Lang } from './i18n';

export type SiteShellData = {
  lang: Lang;
  t: (key: string, fallback?: string) => string;
  settings: Record<string, string>;
  brand: string;
  navItems: { href: string; label: string }[];
  cta: string;
  contactEmail: string;
  contactPhone: string;
  social: { name: string; href: string; icon: 'instagram' | 'youtube' | 'linkedin' | 'x' | 'facebook' }[];
  footerAbout: string;
  organizerNote: string;
  bottomNote: string;
};

export async function loadShell(lang: Lang): Promise<SiteShellData> {
  const t = await loadTexts(lang);
  const settings = await getSettings();

  const navItems = [
    { href: `/${lang}`, label: t('nav.home', lang === 'tr' ? 'Anasayfa' : 'Home') },
    { href: `/${lang}/about`, label: t('nav.about', lang === 'tr' ? 'Hakkımızda' : 'About') },
    { href: `/${lang}/themes`, label: t('nav.themes', lang === 'tr' ? 'Program / Temalar' : 'Program / Themes') },
    { href: `/${lang}/committees`, label: t('nav.committees', lang === 'tr' ? 'Komiteler' : 'Committees') },
    { href: `/${lang}/announcements`, label: t('nav.announcements', lang === 'tr' ? 'Duyurular' : 'Announcements') },
    { href: `/${lang}/contact`, label: t('nav.contact', lang === 'tr' ? 'İletişim' : 'Contact') },
  ];

  return {
    lang,
    t,
    settings,
    brand: t('brand.full', 'IMEC 2026'),
    navItems,
    cta: t('nav.register', lang === 'tr' ? 'Kayıt Ol' : 'Register'),
    contactEmail: settings['contact_email'] || '',
    contactPhone: settings['contact_phone'] || '',
    footerAbout: t(
      'footer.about',
      lang === 'tr'
        ? 'IMEC 2026 — Uluslararası Maden Arama Konferansı, 4-6 Kasım 2026 tarihlerinde Ankara\'da gerçekleştirilecektir.'
        : 'IMEC 2026 — International Mineral Exploration Conference, 4-6 November 2026, Ankara.',
    ),
    organizerNote: t(
      'footer.organizerNote',
      lang === 'tr'
        ? 'MAYEM tarafından düzenlenmektedir.'
        : 'Organized by MAYEM.',
    ),
    bottomNote: t(
      'footer.bottomNote',
      lang === 'tr' ? '© 2026 IMEC. Tüm hakları saklıdır.' : '© 2026 IMEC. All rights reserved.',
    ),
    social: [
      { name: 'Instagram', icon: 'instagram', href: settings['social_instagram'] || '' },
      { name: 'YouTube', icon: 'youtube', href: settings['social_youtube'] || '' },
      { name: 'LinkedIn', icon: 'linkedin', href: settings['social_linkedin'] || '' },
      { name: 'X', icon: 'x', href: settings['social_x'] || '' },
      { name: 'Facebook', icon: 'facebook', href: settings['social_facebook'] || '' },
    ],
  };
}
