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

  
  useEffect(()=>{
    fetchTodaysPic();
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
      </div>
      
   
  );
}
