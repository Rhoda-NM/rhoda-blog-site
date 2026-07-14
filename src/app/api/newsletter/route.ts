import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Newsletter signup is being configured. Please try again soon." },
      { status: 503 },
    );
  }

  const payload = (await request.json()) as { email?: string; source?: string };
  const email = payload.email?.trim().toLowerCase();
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const response = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      "X-Buttondown-Collision-Behavior": "add",
    },
    body: JSON.stringify({
      email_address: email,
      referrer_url: payload.source,
      tags: ["engineering-notes"],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "We could not add that address right now. Please try again." },
      { status: response.status >= 500 ? 502 : 400 },
    );
  }

  return NextResponse.json({ message: "Confirm your subscription from the email we just sent." });
}
