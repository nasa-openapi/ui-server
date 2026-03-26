"use client"
import { useEffect, useState } from "react";
import { useCallback } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { ToastFloating } from "./component/ToastFloating";
import { SubscriptionDialog } from "./component/SubscriptionDialog";
import { TodaysPictureErrorCard } from "./component/PictureErrorCard";
import { PicofDay } from "./component/PicOfDay";
import { SearchBox } from "./component/SeachBox";


export interface PicData {
    "title": string;
    "url": string;
    "explanation": string;
    "copyright": string;
  }


export default function Home() {

  

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
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-black bg-no-repeat bg-center bg-cover"
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

      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
        selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
        onSearch={handleSearch} isLoading={loading} />
      {error?(
        <TodaysPictureErrorCard
          error={!!error}
          fetchTodaysPic={() => router.push("/")}
          />):
          (data && <PicofDay data={data}/>)
      }
      {/* Subscription Toast popup*/ }
      <ToastFloating showToast={showToast} setShowToast={setShowToast} setShowModal={setShowModal}/>
      {/* Subscription Modal Dialog*/ }
      <SubscriptionDialog showModal={showModal} setShowModal={setShowModal}/>

      </div>
      
   
  );
}
