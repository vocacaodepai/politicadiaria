import type { NextConfig } from "next";

// Ativado só no build do GitHub Pages (ver .github/workflows/deploy-gh-pages.yml).
// O deploy normal (Vercel) continua com servidor, sem export estático nem basePath.
const isStaticExport = process.env.STATIC_EXPORT === "true";
const repoName = "politicadiaria";

// Domínios que o Google AdSense e o consentimento do Google usam. Sem eles na
// CSP os anúncios quebram em silêncio depois da aprovação.
const googleAds = [
  // Google Analytics 4 (gtag) e Consent Mode
  "https://www.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://*.doubleclick.net",
  "https://*.google.com",
  "https://*.google.com.br",
  "https://www.googletagservices.com",
  "https://adservice.google.com",
  "https://fundingchoicesmessages.google.com",
  "https://*.adtrafficquality.google",
  "https://*.gstatic.com",
];

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  // 'unsafe-inline' é necessário para os scripts de hidratação do Next e para o AdSense.
  `script-src 'self' 'unsafe-inline' ${googleAds.join(" ")}`,
  `style-src 'self' 'unsafe-inline' ${googleAds.join(" ")}`,
  // Capas vêm do Pexels/Pixabay; anúncios servem imagens de muitos CDNs do Google.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // vitals.vercel-insights.com: Vercel Web Analytics (sem cookies).
  `connect-src 'self' https://vitals.vercel-insights.com ${googleAds.join(" ")}`,
  `frame-src ${googleAds.join(" ")}`,
  "media-src 'self' https:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

// CSP_REPORT_ONLY=true (na Vercel) troca para modo de relatório: útil na primeira
// semana com anúncios ligados, se algum host do Google ficar de fora da lista.
const cspHeader =
  process.env.CSP_REPORT_ONLY === "true"
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

const securityHeaders = [
  { key: cspHeader, value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: isStaticExport ? `/${repoName}` : "" },
  poweredByHeader: false,
  images: { unoptimized: true },
  ...(isStaticExport
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            {
              source: "/ads.txt",
              headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
            },
          ];
        },
      }),
};

export default nextConfig;
