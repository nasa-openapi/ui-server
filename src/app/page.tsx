"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const[data, setData] = useState(null);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

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
        console.log("hello");
        setError(err.message);
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
        <div className="absolute flex flex-col items-center justify-center bg-white/20 p-6 w-[40%] sm:w-[30%] rounded-2xl shadow-lg space-y-4 z-10">
          {/* Static placeholder image */}
          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1080&q=80"
            alt="Placeholder"
            className="w-[20%] sm:w-[60%] md:w-[70%] lg:w-[60%] object-contain"
          />
          <p className="text-red-600 text-center">Thenga</p>
          <button
            onClick={fetchTodaysPic}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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
        transform transition duration-300 hover:scale-105 hover:shadow-10xl hover:shadow-purple-500/40
        grid grid-rows-[1fr_auto]">
        {/* Image */}
        <img
          src={data.url}
          alt="Today's Picture"
          className="w-full h-auto object-cover"
        />
        <div className="flex flex-col">
        <div className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            data.exaplanation
          </p>
        </div>

        {/* Footer pinned naturally at bottom */}
        <div className="bg-white/90 backdrop-blur-md p-4">
          <h1 className="text-lg font-bold text-gray-800">
            {data.title}
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
