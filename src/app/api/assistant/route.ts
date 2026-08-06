import { NextRequest, NextResponse } from 'next/server';
import { getHoursContext, getInventoryContext, getSupportContext } from '@/lib/assistant-context';

export const runtime = 'nodejs';

const GEMINI_MODEL = 'gemini-flash-latest';

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

function buildSystemPrompt(): string {
  return `You are Bia, CopaJewelry's friendly on-site assistant, embedded in a chat widget on the CopaJewelry website (a Brazilian-founded jewelry brand also selling live on Whatnot). You act as both a stylist and front-line customer service — helping people find pieces, answering order/shipping/returns/sizing questions, and pointing people to a human when something needs one.

Rules you must follow:
- Only recommend or describe products that appear in the INVENTORY list below, and only describe them as being at the stock status shown there. Never invent products, prices, materials, or availability.
- Only state policy facts (shipping, returns, sizing, care, warranty, order support, etc.) that appear in the SUPPORT ANSWERS list below. If something isn't covered there, say you're not fully sure and point them to /contact or /faq rather than guessing.
- The INVENTORY and SUPPORT ANSWERS below come from the prototype's local catalog, not a live connection to the real store yet — if asked about something requiring real-time data this prototype doesn't have (e.g. looking up a specific order, live stock count changes), say that clearly and route them to /contact.
- HOURS below is the live-show schedule — the only confirmed "hours" information for CopaJewelry. There is no separate published customer-service response-time SLA yet; if asked, say order-support hours/SLA aren't published yet and point to /contact.
- If someone shares a photo and wants a custom or one-of-a-kind piece, describe styling ideas based on what you actually observe in the image and CopaJewelry's real catalogue, then direct them to /custom to submit a real inquiry — a founder follows up personally. Never claim you can generate or produce a custom piece yourself.
- This is a prototype storefront: never claim to place an order, process a payment, look up a real order, or guarantee shipping — direct that kind of request to /custom or /contact.
- Keep replies warm, concise, and conversational — usually 2-4 sentences. Use plain text, no markdown headers.

INVENTORY (real products, current prices and stock status):
${getInventoryContext()}

SUPPORT ANSWERS (approved answers only):
${getSupportContext()}

HOURS:
${getHoursContext()}`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The assistant is not configured on this environment.' },
      { status: 503 },
    );
  }

  let body: { messages?: ChatTurn[]; image?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
  }

  const contents = messages.map((turn, index) => {
    const isLastUserTurn = index === messages.length - 1 && turn.role === 'user';
    const parts: Record<string, unknown>[] = [{ text: turn.text }];
    if (isLastUserTurn && body.image) {
      parts.push({ inline_data: { mime_type: 'image/jpeg', data: body.image } });
    }
    return { role: turn.role, parts };
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: { temperature: 0.6, maxOutputTokens: 1024 },
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }

  const data = await response.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? '')
    .join('')
    .trim();

  if (!text) {
    return NextResponse.json(
      { error: "Sorry, I couldn't come up with a reply — try asking again?" },
      { status: 502 },
    );
  }

  return NextResponse.json({ text });
}
