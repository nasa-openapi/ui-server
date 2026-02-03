import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const subscription = await req.json();

  if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
  }

  try {
    // Forward subscription to your Java backend
    const resp =await fetch(`http://localhost:8080/nasa/v1/test/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
    console.log("Response from Java backend: "+resp.statusText);
    return NextResponse.json({ message: 'Subscription stored' }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to store subscription' }, { status: 500 });
  }
}
