import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
    const subscribeUrl = "/nasa/v1/test/subscribe";
    const serverUrl ="https://nasa-openapi-7db33b5a14d9.herokuapp.com";
    try{
        var subscription = await req.json();
        if(subscription?.endpoint == null || subscription?.keys?.p256dh == null || subscription?.keys?.auth == null){
            return NextResponse.json({message: "Invalid subscription object"}, {status: 400});
        }
        const response = await fetch(serverUrl+subscribeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        });
        const json = await response.json();
    }catch(err){
        console.log(err);
        return NextResponse.json({message: (err as {message: string}).message}, {status: 500});
    }
}