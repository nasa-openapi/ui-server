import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  const dateEndPoint = `/nasa/v1/picOfDay/getPicForDay?date=${(await params).date}`;
  const serverUrl = process.env.HEROKU_ENDPOINT;
  try {
    console.log(serverUrl + dateEndPoint);
    const response = await fetch(serverUrl + dateEndPoint);
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Error fetching picture by date' },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching picture by date:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}