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
            body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    keys:{
                        p256dh: subscription.keys.p256dh,
                        auth: subscription.keys.auth,
                    },
                    name: name
            })

        });
        const responseText = await response.text();
        if(!response.ok){
            console.log("Error while sending subscription to backend!!")
            console.log(response);
            return NextResponse.json({message: responseText}, {status: response.status});
        }else{
            console.log(responseText);
            return NextResponse.json({message: "Subscription successful"}, {status: 200});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: (err as {message: string}).message}, {status: 500});
    }
}