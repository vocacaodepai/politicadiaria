"use client";

import { openConsentDialog } from "@/lib/consent";

export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentDialog} className={className}>
      Preferências de cookies
    </button>
  );
}
