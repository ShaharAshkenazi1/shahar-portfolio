import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const now = new Date().toLocaleString("en-IL", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "full",
    timeStyle: "short",
  });

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "ashkenazi1997@gmail.com",
    subject: "Someone downloaded your CV",
    html: `
      <div style="font-family: monospace; padding: 24px; max-width: 480px;">
        <h2 style="margin: 0 0 16px;">📄 CV Download</h2>
        <p style="color: #555;">Someone just downloaded your CV from <strong>shahar-ashkenazi.com</strong></p>
        <p style="color: #888; font-size: 13px;">${now} (Israel time)</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
