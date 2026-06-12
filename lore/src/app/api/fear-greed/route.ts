import { NextResponse } from 'next/server';

const ALTERNATIVE_API = 'https://api.alternative.me/fng/';

export async function GET() {
  try {
    const res = await fetch(ALTERNATIVE_API, { next: { revalidate: 300 } }); // Cache 5 min

    if (!res.ok) {
      return NextResponse.json({ error: 'Fear & Greed API error' }, { status: 500 });
    }

    const data = await res.json();

    if (data.data && data.data[0]) {
      return NextResponse.json({
        score: parseInt(data.data[0].value, 10),
        label: data.data[0].value_classification,
        timestamp: data.data[0].timestamp,
      });
    }

    return NextResponse.json({ error: 'Invalid response' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
