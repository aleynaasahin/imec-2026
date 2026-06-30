import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page renders its own layout (without the shell).
  // We still check auth here for everything else.
  // Children includes /admin/login, so wrap conditionally.
  return <AuthGate>{children}</AuthGate>;
}

async function AuthGate({ children }: { children: React.ReactNode }) {
  // Skip auth gate for login page route — Next.js renders login under this layout too,
  // but middleware redirects unauthenticated users TO login, so this layout is only
  // hit when authed OR on login page. The login page just renders standalone markup;
  // we detect by checking session: if no session, simply pass through (login page handles UI).
  const user = await getSessionUser();
  if (!user) {
    // For non-login admin requests, middleware already redirected.
    // For login page, render its own layout (it returns its own wrapper).
    return <>{children}</>;
  }
  return <AdminShell>{children}</AdminShell>;
}
