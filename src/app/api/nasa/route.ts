import { NextResponse } from "next/server";
export async function GET(){
    const todaysPicUrl = "/nasa/v1/picOfDay/getTodaysPic";
    const serverUrl = process.env.HEROKU_ENDPOINT;
    try{
        const response = await fetch(serverUrl+todaysPicUrl);
        
        if(!response.ok){
          const errorBody = await response.json().catch(() => ({})); // safely parse error body
            return NextResponse.json(
                { message: errorBody.message },
                { status: response.status }
            );
        }
        
        const json = await response.json();
        return NextResponse.json(json);
    }catch(err){
        return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
    }
}