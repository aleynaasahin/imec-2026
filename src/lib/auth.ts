import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'imec_admin';
const ONE_WEEK = 60 * 60 * 24 * 7;

function secret(): string {
  return process.env.AUTH_SECRET || 'fallback-dev-secret-please-change';
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

function makeToken(username: string): string {
  const issuedAt = Date.now().toString();
  const body = `${username}.${issuedAt}`;
  return `${body}.${sign(body)}`;
}

function verifyToken(token: string): { username: string } | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [username, issuedAt, signature] = parts;
  const body = `${username}.${issuedAt}`;
  const expected = sign(body);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const age = (Date.now() - Number(issuedAt)) / 1000;
  if (!Number.isFinite(age) || age < 0 || age > ONE_WEEK) return null;
  return { username };
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'ChangeMe!2026';
  if (username !== expectedUser) return false;
  // Hash on the fly so we still benefit from constant-ish time compare
  // (passwords from env are plaintext; this is a single-admin scenario).
  const hash = await bcrypt.hash(expectedPass, 10);
  return bcrypt.compare(password, hash);
}

export async function createSession(username: string) {
  const token = makeToken(username);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_WEEK,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSessionUser(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.username ?? null;
}

export function getSessionCookieName(): string {
  return COOKIE_NAME;
}
