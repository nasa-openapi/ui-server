import Image from "next/image";

export const TodaysPictureErrorCard = ({error, fetchTodaysPic}: {error: boolean, fetchTodaysPic: () => void})=>{
    return (
        <>
        {error && (
        <div className="relative z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 rounded-[2rem] px-8 py-4 sm:px-12 sm:py-6 shadow-2xl max-w-[95%] w-[600px] mx-auto overflow-hidden">
           
           {/* 1. The Container for the Placeholder Image */}
           <div className="relative w-48 h-32 sm:w-64 sm:h-44 -mt-8 sm:-mt-12 mb-4">
             <Image
               src="/PicOfDayNotFound.png"
               alt="Picture Not Found"
               fill sizes="(max-width: 768px) 100vw, 240px"
               className="object-cover transition-transform duration-500 hover:scale-115" 
             />
           </div>
 
           {/* 2. Error Message - Bold, White, and Centered */}
           <h2 className="text-indigo-50 font-extrabold text-center text-2xl sm:text-3xl leading-tight px-2 tracking-tight drop-shadow-md">
             Houston, we have a (minor) problem.
           </h2>
         {/* 4. Soft Orange Subtext */}
         <p className="text-orange-200/80 font-bold text-center text-sm sm:text-base mt-4 max-w-[320px] sm:max-w-md mx-auto leading-relaxed drop-shadow-sm">
           Today&apos;s image is currently hiding in a black hole.
           <br className="hidden sm:block" /> 
           We&apos;ve sent a search party, but space is big. Really big.
         </p>
 
           {/* 3. Retry Button */}
           <button
             onClick={fetchTodaysPic}
             className="mt-8 px-10 py-3 bg-purple-600 text-white font-black rounded-2xl transition-all 
                       hover:bg-purple-500 hover:scale-105 active:scale-95
                       shadow-[0_6px_0_rgb(107,33,168)] hover:shadow-[0_4px_0_rgb(107,33,168)] 
                       active:shadow-none active:translate-y-[4px]"
           >
             VIEW CATELGOUE
           </button>
         </div>
        )}
        </>
    )
}
    