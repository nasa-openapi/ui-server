import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
    const subscribeUrl = "/nasa/v1/test/subscribe";
    const serverUrl ="https://nasa-openapi-7db33b5a14d9.herokuapp.com";
    try{
        var body = await req.json();
        const subscription = body.subscription;
        const name = body.name;
        console.log("Received subscription:", subscription);
        if(subscription?.endpoint == null || subscription?.keys?.p256dh == null || subscription?.keys?.auth == null){
            return NextResponse.json({message: "Invalid subscription object"}, {status: 400});
        }
        const response = await fetch(serverUrl+subscribeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        if(!response.ok){
            console.log("Error while sending subscription to backend!!")
            return NextResponse.json({message: json.message}, {status: response.status});
        }else{
            console.log(json);
            return NextResponse.json({message: "Subscription successful"}, {status: 200});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: (err as {message: string}).message}, {status: 500});
    }
}