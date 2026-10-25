"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProductImage as ProductImageData } from "@/lib/types";

/**
 * Foto real do livro, só referenciada (hotlink) e sempre dentro de um link de afiliado.
 * O espaço é reservado pela proporção real da imagem (sem salto de layout). Se a imagem
 * do CDN falhar (URL mudou, rede, bloqueio), mostra `fallback` (a capa por imageQuery/
 * gradiente) ou, sem fallback, não mostra nada: nunca um bloco quebrado.
 */
export function ProductImage({
  image,
  href,
  fallback = null,
  priority = false,
  sizes,
  className = "",
}: {
  image: ProductImageData;
  href: string;
  fallback?: ReactNode;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // O erro pode ocorrer antes da hidratação: confere o estado do <img> ao montar.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`block overflow-hidden rounded-lg border border-border bg-surface-2 shadow-sm transition hover:opacity-90 ${className}`}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </a>
  );
}
