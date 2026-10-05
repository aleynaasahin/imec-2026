'use client';

import { useEffect, useRef, useState } from 'react';

// Every logo sits in an invisible slot of this size and never exceeds it.
const SLOT_W = 168;
const SLOT_H = 84;
// Target visual area: logos are scaled by aspect ratio so a wide wordmark and a
// square emblem take up roughly the same amount of space instead of the same height.
const TARGET_AREA = 7000;

function fit(ratio: number) {
  let w = Math.sqrt(TARGET_AREA * ratio);
  let h = Math.sqrt(TARGET_AREA / ratio);
  if (w > SLOT_W) {
    w = SLOT_W;
    h = w / ratio;
  }
  if (h > SLOT_H) {
    h = SLOT_H;
    w = h * ratio;
  }
  return { width: Math.round(w), height: Math.round(h) };
}

export default function SponsorLogo({ logo, name }: { logo: string; name: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  const measure = () => {
    const img = imgRef.current;
    if (img && img.naturalWidth && img.naturalHeight) {
      setSize(fit(img.naturalWidth / img.naturalHeight));
    }
  };

  // Cached images can finish loading before hydration, so onLoad never fires.
  useEffect(() => {
    if (imgRef.current?.complete) measure();
  }, []);

  if (!logo) {
    return (
      <div
        className="flex items-center justify-center text-center text-sm font-medium text-brand-ink/60"
        style={{ width: SLOT_W, height: SLOT_H }}
      >
        {name}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center" style={{ width: SLOT_W, height: SLOT_H }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={logo}
        alt={name}
        onLoad={measure}
        loading="lazy"
        className="block object-contain transition-transform duration-200 hover:scale-105"
        style={size ?? { width: SLOT_W, height: SLOT_H }}
      />
    </div>
  );
}
