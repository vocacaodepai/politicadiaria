"use client";

import { useSyncExternalStore } from "react";

/** Consentimento de cookies (LGPD). Guardado no localStorage do visitante. */
export const CONSENT_KEY = "pd-consent";
export const CONSENT_EVENT = "pd:consent";
export const CONSENT_OPEN_EVENT = "pd:consent-open";
export const CONSENT_VERSION = 1;

export type Consent = {
  version: number;
  /** Aceitou cookies de publicidade personalizada (Google AdSense). */
  ads: boolean;
  ts: number;
};

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed.version !== CONSENT_VERSION || typeof parsed.ads !== "boolean") return null;
    return { version: CONSENT_VERSION, ads: parsed.ads, ts: Number(parsed.ts) || 0 };
  } catch {
    return null;
  }
}

export function writeConsent(ads: boolean): Consent {
  const consent: Consent = { version: CONSENT_VERSION, ads, ts: Date.now() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // modo privado ou storage bloqueado: segue sem persistir
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function openConsentDialog() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

let snapshotRaw: string | null | undefined;
let snapshot: Consent | null = null;

function getSnapshot(): Consent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    raw = null;
  }
  if (raw !== snapshotRaw) {
    snapshotRaw = raw;
    snapshot = readConsent();
  }
  return snapshot;
}

/** Consentimento atual (null no servidor e enquanto o visitante não escolheu). */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
