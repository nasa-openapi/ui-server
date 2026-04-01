"use client"
import { useEffect, useState } from "react";
import { useCallback } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { ToastFloating } from "./ToastFloating";
import { SubscriptionDialog } from "./SubscriptionDialog";
import { TodaysPictureErrorCard } from "./PictureErrorCard";
import { PicofDay } from "./PicOfDay";
import { SearchBox } from "./SeachBox";


export interface PicData {
    "title": string;
    "url": string;
    "explanation": string;
    "copyright": string;
  }


export default function HomePage() {

  

  const router = useRouter();
  const searchParams = useSearchParams();
  const[data, setData] = useState<PicData|null>(null);
  const[loading, setLoading] = useState<boolean>(true);
  const[error, setError] = useState<string|null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const dateFromQuery = searchParams.get("date") || "";
  

  const fetchPic = useCallback(async(route: string, signal: AbortSignal)=>{
    setLoading(true);
    setError(null);
    setData(null);
      try{
        const response = await fetch(route, { signal });
        const json = await response.json();
        if(!response.ok){
          console.log("Error while getting response from backend!!")
          console.log(json);
          console.log(response);
          setError(json.message);
          return response;
        }else{
          console.log(json);
        setData(json);
        }
        
      }
      catch(err: any){
        if (err.name === 'AbortError') return;
        console.log(err);
        setError((err as {message: string}).message || "An unexpected error occurred while fetching the picture.");
      }finally{
        setLoading(false);
      }
    },[]);

  // Register service worker and show subscription toast
  useEffect(()=>{
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

  //redirection based on url query for date search
  useEffect(()=>{
    const controller = new AbortController();
    if(dateFromQuery){
      fetchPic(`/api/nasa/date/${dateFromQuery}`, controller.signal);
    }else{
      fetchPic("/api/nasa", controller.signal);
    }
    return () => controller.abort();
  },[dateFromQuery,fetchPic]);


  const handleSearch = async()=>{
    if(selectedDate){
      router.push(`/?date=${selectedDate}`);
    }else{
      router.push(`/`);

    }
  }

  
  return (
    /* min-h-screen: ensures the page is at least as tall as the device.
       The background is now handled in globals.css on the <html> tag.
    */
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full py-10">
      
      {/* THE BLUR OVERLAY: 
         Changed to 'fixed' so it stays put even when you stretch the page.
      */}
      <div className="fixed inset-0 bg-purple-500/10 blur-3xl pointer-events-none -z-10" />

      {/* LOADING STATE: 
         Used 'fixed' and 'inset-0' to keep it perfectly centered 
         over the background while the data fetches.
      */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-black/60 border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4">
            {/* You could add a Spinner component here too */}
            <p className="text-white text-lg font-medium animate-pulse tracking-wide">
              Exploring the Cosmos...
            </p>
          </div>
        </div>
      )}

      {/* MAIN CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        {!loading && (
          <SearchBox 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            onSearch={handleSearch} 
            isLoading={loading} 
          />
        )}

        {error ? (
          <TodaysPictureErrorCard error={!!error} fetchTodaysPic={() => router.push("/")} />
        ) : (
          data && <PicofDay data={data} />
        )}
      </div>

      <ToastFloating showToast={showToast} setShowToast={setShowToast} setShowModal={setShowModal} />
      <SubscriptionDialog showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
