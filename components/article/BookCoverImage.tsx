"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProductImage } from "@/lib/types";

/**
 * Capa do livro em miniatura (cartões e listas). Só referencia a imagem do CDN da Amazon, sem baixar.
 * Se a imagem falhar, mostra `fallback` (a capa por imageQuery ou o gradiente).
 */
export function BookCoverImage({
  image,
  alt,
  fallback,
  priority = false,
  sizes,
  className = "",
}: {
  image: ProductImage;
  alt: string;
  fallback: ReactNode;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    <div className={`flex items-center justify-center bg-white ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={image.url}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
