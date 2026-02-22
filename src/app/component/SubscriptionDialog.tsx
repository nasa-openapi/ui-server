import Base64ToArrayBuffer from "../utils/Base64ToArrayBuffer";

const handleSubscription = async(setShowModal: (value: boolean) => void)=>{
    
    const permission = await Notification.requestPermission();
    if (permission === "granted"){
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: Base64ToArrayBuffer("BGmR2oWmH4T2SyXwDmT4qPBfFWvXK86tDjte3ggbb9ufmdAIXFeTPX9NFqQe78dZipxL3TmuDYN13JyJbalyyYE")
      });
      try{
        const userName = (document.getElementById("userName") as HTMLInputElement)?.value || "";
        console.log('Subscribing for user: ', userName);
        const response = await fetch('/api/subscribe', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            subscription,
          name: userName})
        });
        const json = await response.json();
        if(!response.ok){
          console.log("Error while subscribing for notifications!!")
          alert("Subscription failed: "+json.message);
        }else{
          setShowModal(false)
          alert("Subscribed successfully! You will receive daily updates.");
        }
      }catch(err){
        console.log(err);
        alert("Subscription failed: "+(err as {message: string}).message);
      }
    }else{
      alert("Notification permission denied. Please allow notifications to subscribe.");
    }   


  }

export const SubscriptionDialog = ({showModal, setShowModal}: {showModal: boolean, setShowModal: (value: boolean) => void}) => {
    return (
        <>
        {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-black">
            <h2 className="text-xl font-bold">Almost there!</h2>
            <input id="userName" type="text" placeholder="Your Name" className="border p-2 w-full my-4" />
            <div className="flex flex-col gap-2 mt-4">
              <button 
                onClick={() => handleSubscription(setShowModal)} 
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold order-1"
              >
                Subscribe
              </button>
              <button 
                onClick={() => {setShowModal(false);} }
                className="w-full py-2 text-gray-500 text-sm hover:underline order-2"
              >
                No thanks, just show me the stars
              </button>
            </div>
          </div>
        </div>
      )}
        </>
    )
};  