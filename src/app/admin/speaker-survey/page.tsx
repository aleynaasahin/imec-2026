import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';

export const dynamic = 'force-dynamic';

function fd(d: Date) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

function yn(v: string) {
  if (v === 'yes') return 'Evet';
  if (v === 'no') return 'Hayır';
  if (v === 'maybe') return 'Belki';
  if (v === 'undecided') return 'Henüz karar vermedi';
  return v || '—';
}

async function deleteResponse(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.speakerSurveyResponse.delete({ where: { id } });
  revalidatePath('/admin/speaker-survey');
}

export default async function AdminSpeakerSurveyPage() {
  const rows = await prisma.speakerSurveyResponse.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Konuşmacı Anketi</h1>
          <p className="text-sm text-brand-ink/65 mt-1">
            Toplam <strong>{rows.length}</strong> yanıt. Anket linki:{' '}
            <code className="text-xs bg-brand-paper px-1.5 py-0.5 rounded">/tr/speaker-survey</code> /{' '}
            <code className="text-xs bg-brand-paper px-1.5 py-0.5 rounded">/en/speaker-survey</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/api/admin/speaker-survey/export?format=xlsx" className="btn-primary !py-1.5 !px-3 !text-sm">
            Excel İndir (.xlsx)
          </a>
          <a href="/api/admin/speaker-survey/export?format=csv" className="btn-secondary !py-1.5 !px-3 !text-sm">
            CSV İndir
          </a>
        </div>
      </header>

      {rows.length === 0 ? (
        <div className="card text-brand-ink/60">Henüz yanıt yok.</div>
      ) : (
        <div className="grid gap-4">
          {rows.map((r) => (
            <div key={r.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-brand-ink/10 pb-3 mb-3">
                <div>
                  <p className="font-semibold text-brand-ink">{r.fullName || '—'}</p>
                  <p className="text-sm text-brand-ink/60">{r.email}</p>
                  {r.organization ? <p className="text-sm text-brand-ink/60">{r.organization}</p> : null}
                </div>
                <div className="text-right">
                  <p className="text-xs text-brand-ink/50">{fd(r.createdAt)}</p>
                  {r.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.photoUrl} alt={r.fullName} className="mt-1 h-14 w-14 rounded-full object-cover ml-auto" />
                  ) : null}
                </div>
              </div>

              <dl className="grid gap-2.5 md:grid-cols-2 text-sm">
                <div>
                  <dt className="text-brand-ink/50">Kayıt linkinden kayıt oldu mu?</dt>
                  <dd className="text-brand-ink">{yn(r.registered)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">LinkedIn takipçisi mi?</dt>
                  <dd className="text-brand-ink">{yn(r.followsLinkedin)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">Yakınlarına tavsiye eder mi?</dt>
                  <dd className="text-brand-ink">{yn(r.recommendOthers)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">WhatsApp grubuna katılım</dt>
                  <dd className="text-brand-ink">
                    {yn(r.joinWhatsapp)}
                    {r.whatsappPhone ? ` — ${r.whatsappPhone}` : ''}
                  </dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">Tanıtım amaçlı kullanım onayı</dt>
                  <dd className="text-brand-ink">{yn(r.mediaConsent)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">Sunum metni gönderimi (15 Ekim 2026)</dt>
                  <dd className="text-brand-ink">{yn(r.paperSubmission)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">YouTube yayın/kanal onayı</dt>
                  <dd className="text-brand-ink">{yn(r.youtubeConsent)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">Dergide yer alma izni</dt>
                  <dd className="text-brand-ink">{yn(r.journalConsent)}</dd>
                </div>
                <div>
                  <dt className="text-brand-ink/50">Ulaşım/konaklama ihtiyacı</dt>
                  <dd className="text-brand-ink">
                    {yn(r.travelNeeded)}
                    {r.travelDetails ? ` — ${r.travelDetails}` : ''}
                  </dd>
                </div>
                {r.infoCorrection ? (
                  <div className="md:col-span-2">
                    <dt className="text-brand-ink/50">Bilgi düzeltme talebi</dt>
                    <dd className="text-brand-ink whitespace-pre-wrap">{r.infoCorrection}</dd>
                  </div>
                ) : null}
              </dl>

              <form action={deleteResponse} className="mt-3 border-t border-brand-ink/5 pt-3 flex justify-end">
                <input type="hidden" name="id" value={r.id} />
                <button type="submit" className="btn-danger">Sil</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
