import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const targetUrl = "https://parcexotique.sn/fr/";
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 NobtechPreviewBot/1.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return new NextResponse(
        `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px;background:#020617;color:white;"><h3>Impossible de charger le direct (${res.status})</h3><a href="${targetUrl}" target="_blank" style="color:#00D4FF;">Ouvrir le site officiel dans un nouvel onglet &rarr;</a></body></html>`,
        {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Content-Security-Policy": "frame-ancestors 'self'",
          },
        }
      );
    }

    let html = await res.text();

    // Inject base tag so all relative assets (css, js, media, fonts) resolve to parcexotique.sn
    const baseTag = '<base href="https://parcexotique.sn/" target="_blank">';

    // Remove any meta tags that might enforce CSP or X-Frame-Options inside the HTML
    html = html.replace(/<meta[^>]*http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, "");
    html = html.replace(/<meta[^>]*http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, "");

    // Inject helper script to ensure all link clicks open safely in a new tab
    const helperScript = `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('a').forEach(function(a) {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
          });
        });
      </script>
    `;

    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/<head[^>]*>/i, (match) => `${match}\n${baseTag}\n${helperScript}`);
    } else {
      html = `${baseTag}\n${helperScript}\n${html}`;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        // Allow framing on same origin (nobtech website)
        "Content-Security-Policy": "frame-ancestors 'self'",
      },
    });
  } catch (error) {
    console.error("Preview proxy error:", error);
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px;background:#020617;color:white;"><h3>Chargement du direct...</h3><p style="color:#94a3b8;font-size:14px;">Le site officiel est accessible en direct :</p><a href="https://parcexotique.sn/fr/" target="_blank" style="display:inline-block;margin-top:10px;padding:10px 20px;background:#00D4FF;color:#020617;font-weight:bold;text-decoration:none;border-radius:8px;">Ouvrir parcexotique.sn &rarr;</a></body></html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Security-Policy": "frame-ancestors 'self'",
        },
      }
    );
  }
}
