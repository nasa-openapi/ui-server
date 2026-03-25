"use client"
import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { ToastFloating } from "./component/ToastFloating";
import { SubscriptionDialog } from "./component/SubscriptionDialog";
import { TodaysPictureErrorCard } from "./component/TodaysPictureErrorCard";
import { PicofDay } from "./component/PicOfDay";
import { SearchBox } from "./component/SeachBox";


export default function Home() {

  interface PicData {
    "title": string;
    "url": string;
    "explanation": string;
    "publishdate": string;
  }

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
  

  const fetchPic = async(route: string)=>{
    setLoading(true);
    setError(null);
    setData(null);
      try{
        const response = await fetch(route);
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
      catch(err){
        console.log(err);
        setError((err as {message: string}).message);
      }finally{
        setLoading(false);
      }
    };

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
    if(dateFromQuery){
      fetchPic(`/api/nasa/date/${dateFromQuery}`);
    }else{
      fetchPic("/api/nasa");
    }
  },[dateFromQuery]);


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

      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedDate={selectedDate} setSelectedDate={setSelectedDate} onSearch={handleSearch}/>
      {error?(
        <TodaysPictureErrorCard
          error={!!error}
          fetchTodaysPic={() => fetchPic("/api/nasa")}
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
