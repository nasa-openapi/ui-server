export async function GET(){
    const todaysPicUrl = "/nasa/v1/picOfDay/getTodaysPic";
    const serverUrl ="https://nasa-openapi-7db33b5a14d9.herokuapp.com";
    try{
        const response = await fetch(serverUrl+todaysPicUrl);
        
        if(!response.ok){
          const errorBody = await response.json().catch(() => ({})); // safely parse error body
            return Response.json(
                { message: errorBody.message },
                { status: response.status }
            );
        }
        
        const json = await response.json();
        return Response.json(json);
    }catch(err){
        return Response.json({error: err.message},{status:500});
    }
}