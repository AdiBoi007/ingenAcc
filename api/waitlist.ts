import nodemailer from "nodemailer";

type WaitlistRequest = {
  method?: string;
  body?: unknown;
};

type WaitlistResponse = {
  status: (code: number) => WaitlistResponse;
  json: (body: unknown) => void;
  end: () => void;
  setHeader: (name: string, value: string | string[]) => void;
};

function getEmailFromBody(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;

  const email = (body as { email?: unknown }).email;
  if (typeof email !== "string") return null;

  const normalized = email.trim();
  return normalized.includes("@") ? normalized : null;
}

export default async function handler(req: WaitlistRequest, res: WaitlistResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Allow", ["POST", "OPTIONS"]);

  if (req.method === "OPTIONS") {
    res.status(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const email = getEmailFromBody(req.body);
  if (!email) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    res.status(500).json({ error: "Email service is not configured." });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    await transporter.sendMail({
      from: `"ingen waitlist" <${gmailUser}>`,
      to: gmailUser,
      subject: `New waitlist signup: ${email}`,
      html: `
        <div style="font-family:monospace;background:#000;color:#fff;padding:32px;border:1px solid #1a1a1a">
          <h2 style="color:#22d3ee;margin:0 0 16px">New ingen waitlist signup</h2>
          <p style="font-size:18px;margin:0"><strong>${email}</strong> just joined the waitlist.</p>
          <p style="color:#666;font-size:12px;margin:16px 0 0">ingen OS · ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</p>
        </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Waitlist email error:", error);
    res.status(500).json({ error: "Failed to send waitlist email." });
  }
}
