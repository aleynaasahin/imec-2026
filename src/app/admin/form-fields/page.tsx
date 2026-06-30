import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';

export const dynamic = 'force-dynamic';

const TYPES = [
  { value: 'text', label: 'Metin' },
  { value: 'email', label: 'E-posta' },
  { value: 'phone', label: 'Telefon' },
  { value: 'textarea', label: 'Metin Alanı' },
  { value: 'select', label: 'Açılır Liste' },
  { value: 'checkbox', label: 'Onay Kutusu' },
];

async function createField() {
  'use server';
  await requireAdminAction();
  const max = await prisma.formField.aggregate({ _max: { order: true } });
  const ts = Date.now().toString(36);
  await prisma.formField.create({
    data: {
      key: `field_${ts}`,
      labelTr: 'Yeni Alan',
      labelEn: 'New Field',
      type: 'text',
      order: (max._max.order ?? 0) + 1,
      enabled: true,
    },
  });
  revalidatePath('/admin/form-fields');
}

async function saveField(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  const newKey = String(formData.get('key') || '').trim();
  if (!newKey) return;
  // Avoid key collision
  const existing = await prisma.formField.findFirst({ where: { key: newKey, NOT: { id } } });
  if (existing) return;
  await prisma.formField.update({
    where: { id },
    data: {
      key: newKey,
      labelTr: String(formData.get('labelTr') || ''),
      labelEn: String(formData.get('labelEn') || ''),
      type: String(formData.get('type') || 'text'),
      required: formData.get('required') === 'on',
      enabled: formData.get('enabled') === 'on',
      options: String(formData.get('options') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/form-fields');
  revalidatePath('/', 'layout');
}

async function deleteField(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.formField.delete({ where: { id } });
  revalidatePath('/admin/form-fields');
  revalidatePath('/', 'layout');
}

export default async function AdminFormFieldsPage() {
  const fields = await prisma.formField.findMany({ orderBy: { order: 'asc' } });
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Kayıt Formu Alanları</h1>
          <p className="text-sm text-brand-ink/65 mt-1">
            Katılımcıların görüp dolduracağı kayıt formu alanlarını yönetin.
            <span className="block mt-1 text-xs">
              <strong>Açılır liste seçenekleri formatı:</strong> her seçenek &quot;TR|EN&quot; ve seçenekler &quot;;;&quot; ile ayrılır.
              Örnek: <code>Akademisyen|Academic;;Sektör|Industry;;Kamu|Public</code>
            </span>
          </p>
        </div>
        <form action={createField}>
          <button className="btn-primary" type="submit">+ Yeni Alan</button>
        </form>
      </header>

      <div className="grid gap-4">
        {fields.map((f) => (
          <div key={f.id} className="card">
            <form action={saveField} className="grid gap-3">
              <input type="hidden" name="id" value={f.id} />
              <div className="grid gap-3 md:grid-cols-[1fr_180px_120px]">
                <div>
                  <label className="label">Anahtar (key)</label>
                  <input className="input" name="key" defaultValue={f.key} />
                </div>
                <div>
                  <label className="label">Tip</label>
                  <select className="input" name="type" defaultValue={f.type}>
                    {TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Sıra</label>
                  <input className="input" type="number" name="order" defaultValue={f.order} />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="label">Etiket (TR)</label>
                  <input className="input" name="labelTr" defaultValue={f.labelTr} />
                </div>
                <div>
                  <label className="label">Label (EN)</label>
                  <input className="input" name="labelEn" defaultValue={f.labelEn} />
                </div>
              </div>
              <div>
                <label className="label">
                  Seçenekler <span className="text-brand-ink/50 text-xs">(yalnızca &quot;Açılır Liste&quot; tipinde)</span>
                </label>
                <input
                  className="input"
                  name="options"
                  defaultValue={f.options}
                  placeholder="Akademisyen|Academic;;Sektör|Industry;;Kamu|Public;;Öğrenci|Student;;Diğer|Other"
                />
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" name="required" defaultChecked={f.required} /> Zorunlu
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" name="enabled" defaultChecked={f.enabled} /> Aktif
                </label>
                <button type="submit" className="btn-primary !py-1.5 !px-3 !text-sm ml-auto">Kaydet</button>
              </div>
            </form>
            <form action={deleteField} className="mt-3 border-t border-brand-ink/5 pt-3 flex justify-end">
              <input type="hidden" name="id" value={f.id} />
              <button type="submit" className="btn-danger">Sil</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
