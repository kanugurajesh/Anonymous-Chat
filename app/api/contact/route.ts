import { NextRequest, NextResponse } from "next/server";
import { ContactEmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, message } = body;

  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  try {
    // @ts-ignore
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: process.env.PERSONAL_EMAIL as string,
      subject: "Message from Anonymous Chat",
      react: ContactEmailTemplate({
        name: name,
        email: email,
        message: message,
      }),
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
}
