import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { isLang } from '@/lib/i18n';
import { loadShell } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const shell = await loadShell(lang);

  return (
    <>
      <Header lang={lang} brand={shell.brand} items={shell.navItems} ctaLabel={shell.cta} />
      <main>{children}</main>
      <Footer
        lang={lang}
        about={shell.footerAbout}
        contactEmail={shell.contactEmail}
        contactPhone={shell.contactPhone}
        organizerNote={shell.organizerNote}
        bottomNote={shell.bottomNote}
        social={shell.social}
        navTitle={shell.t('footer.nav', lang === 'tr' ? 'Menü' : 'Navigation')}
        contactTitle={shell.t('footer.contact', lang === 'tr' ? 'İletişim' : 'Contact')}
        followTitle={shell.t('footer.follow', lang === 'tr' ? 'Bizi Takip Edin' : 'Follow Us')}
        navItems={shell.navItems}
      />
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}
