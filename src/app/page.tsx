"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {

  interface PicData {
    "title": string;
    "url": string;
    "explanation": string;
    "publishdate": string;
  }
  const[data, setData] = useState<PicData|null>(null);
  const[loading, setLoading] = useState<boolean>(true);
  const[error, setError] = useState<string|null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  function urlBase64ToArrayBuffer(base64String: string): ArrayBuffer {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = atob(base64);
    const buffer = new ArrayBuffer(rawData.length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < rawData.length; i++) {
      view[i] = rawData.charCodeAt(i);
    }

  return buffer;
}

  const fetchTodaysPic = async()=>{
      try{
        const response = await fetch('/api/nasa');
        const json = await response.json();
        if(!response.ok){
          
          console.log("Error while getting response from backend!!")
          
          setError(json.message);
          return response;
        }else{
          console.log(json);
        setData(json);
        }
        
      }
      catch(err){
        console.log(err);
        setError((err as {message: string}).message);
      }finally{
        setLoading(false);
      }
    };

  const handleSubscription = async()=>{
    
    const permission = await Notification.requestPermission();
    if (permission === "granted"){
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToArrayBuffer("BGmR2oWmH4T2SyXwDmT4qPBfFWvXK86tDjte3ggbb9ufmdAIXFeTPX9NFqQe78dZipxL3TmuDYN13JyJbalyyYE")
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

  
  useEffect(()=>{
    fetchTodaysPic();
    //register service worker for push notifications
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log("Service Worker registered:", registration);
        })
        .catch(error => {
          console.log("Service Worker registration failed:", error);
        });
    }
    // Show subscription toast after 3 seconds if permission is not granted or denied
    const timer = setTimeout(() => {
      if ('Notification' in window && Notification.permission === "default") {
        setShowToast(true);
      }
    }, 3000);
    return () => clearTimeout(timer); 
  },[]);

  
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-black bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url('https://apod.nasa.gov/apod/image/2509/OrionHorseHead_Stern_1080.jpg')"
      }}
    >
      {/* Dark translucent overlay */}
      <div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-xl"/>

      {loading && (
        <div className="absolute flex flex-col items-center justify-center bg-black/50 p-6 rounded-2xl space-y-4">
          <p className="text-white text-lg animate-pulse">Loading NASA Picture of the Day...</p>
        </div>
      )}

      {error && (
        <div className="absolute flex flex-col items-center justify-center bg-white/20 backdrop-blur-md p-6 w-[90%] sm:w-[40%] rounded-2xl shadow-lg space-y-4 z-10 border border-white/30">
          
          {/* 1. The Container for the Placeholder Image */}
          <div className="relative w-32 h-32 sm:w-48 sm:h-48">
            <Image
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
              alt="Error Placeholder"
              fill
              className="object-contain" 
            />
          </div>

          {/* 2. Error Message with the Apostrophe fix */}
          <p className="text-red-400 font-semibold text-center">
            {"Oops! Could not load Today's Picture."}
          </p>

          {/* 3. Retry Button */}
          <button
            onClick={fetchTodaysPic}
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            Retry
          </button>
        </div>
      )}
      {/* Card content */}
      {data && (
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl 
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-xl 
        max-h-[80vh] overflow-y-auto 
        transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40
        grid grid-rows-[auto_1fr]">
        
        {/* Image Container: Keeps the aspect ratio and houses the optimized Image */}
        <div className="relative w-full min-h-[300px] sm:min-h-[400px]">
          <Image
            src={data.url}
            alt={data.title|| 'Todays NASA Picture'}
            fill
            priority
            className="object-cover rounded-t-2xl"
          />
        </div>

        <div className="flex flex-col">
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {data.explanation}
            </p>
          </div>

          {/* Footer */}
          <div className="bg-white/90 backdrop-blur-md p-4 mt-auto border-t border-gray-100">
            <h1 className="text-lg font-bold text-gray-800">
              {data.title|| 'Today\'s NASA Picture'}
            </h1>
            <div className="text-sm text-gray-600 flex justify-between">
              <span><strong>Date:</strong> {data.publishdate}</span>
              <span><strong>Source:</strong> NASA APOD</span>
            </div>
          </div>
        </div>
      </div>
      )}
{/* Subscription popup*/ }
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-lg shadow-2xl animate-bounce">
          <p>Want updates for pictures daily?</p>
          <button onClick={() => { setShowToast(false); setShowModal(true); }} className="underline font-bold">
            Yes, notify me!
          </button>
        </div>
      )}
 
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-black">
            <h2 className="text-xl font-bold">Almost there!</h2>
            <input id="userName" type="text" placeholder="Your Name" className="border p-2 w-full my-4" />
            <div className="flex flex-col gap-2 mt-4">
              <button 
                onClick={handleSubscription} 
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold order-1"
              >
                Subscribe
              </button>
              <button 
                onClick={() => {setShowModal(false); setShowToast(false);} }
                className="w-full py-2 text-gray-500 text-sm hover:underline order-2"
              >
                No thanks, just show me the stars
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      
   
  );
}
