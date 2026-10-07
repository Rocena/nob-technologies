"use client";

interface ClientLogoImgProps {
  src: string;
  alt: string;
  className?: string;
}

export function ClientLogoImg({ src, alt, className }: ClientLogoImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // e.currentTarget.style.opacity = '0.2';
      }}
    />
  );
}
