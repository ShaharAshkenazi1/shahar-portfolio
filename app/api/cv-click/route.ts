import { Resend } from "resend";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date().toLocaleString("en-IL", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "full",
    timeStyle: "short",
  });

  const ua = req.headers.get("user-agent") ?? "Unknown";
  const country = req.headers.get("x-vercel-ip-country") ?? "Unknown";
  const city = req.headers.get("x-vercel-ip-city") ?? "Unknown";
  const region = req.headers.get("x-vercel-ip-region") ?? "";
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "Unknown";
  const referer = req.headers.get("referer") ?? "Direct";

  const location = [city, region, country].filter(Boolean).join(", ");

  // simple device/browser guess from user-agent
  const isMobile = /mobile|android|iphone|ipad/i.test(ua);
  const device = isMobile ? "Mobile" : "Desktop";
  const browser =
    ua.match(/Chrome\/[\d.]+/)?.[0] ??
    ua.match(/Safari\/[\d.]+/)?.[0] ??
    ua.match(/Firefox\/[\d.]+/)?.[0] ??
    ua.match(/Edg\/[\d.]+/)?.[0] ??
    "Unknown";

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "ashkenazi1997@gmail.com",
    subject: `📄 CV Downloaded — ${city}, ${country}`,
    html: `
      <div style="font-family: monospace; background: #f9f9f9; padding: 32px; max-width: 520px; border-radius: 8px;">
        <h2 style="margin: 0 0 24px; font-size: 20px;">📄 Someone downloaded your CV</h2>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #888; width: 110px;">Time</td>
            <td style="padding: 8px 0; color: #222;">${now} (Israel)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Location</td>
            <td style="padding: 8px 0; color: #222;">${location}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">IP</td>
            <td style="padding: 8px 0; color: #222;">${ip}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Device</td>
            <td style="padding: 8px 0; color: #222;">${device}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Browser</td>
            <td style="padding: 8px 0; color: #222;">${browser}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Came from</td>
            <td style="padding: 8px 0; color: #222;">${referer}</td>
          </tr>
        </table>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
