import Image from "next/image";


export const PicofDay = ({data}: {data: {title: string, url: string, explanation: string, copyright: string}}) => {
    return (
        <>
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
              <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  
                  {/* Left Side: Title & Copyright */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        {data.title}
                      </h3>
                    </div>
                    
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">
                        Copyright / Credits
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                        {data.copyright ? data.copyright.replace(/\n/g, ', ') : "Public Domain"}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Link & API Note */}
                  <div className="flex flex-col md:items-end shrink-0">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Data Source
                    </span>
                    <a 
                      href="https://apod.nasa.gov/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-purple-600 font-bold hover:text-purple-800 transition-colors"
                    >
                      <span>NASA APOD</span>
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    
                    <p className="text-[9px] text-gray-400 mt-4 font-medium italic">
                      Generated via NASA Open API
                    </p>
                  </div>

                </div>
              </div>
            </div>
            </div>

 
            )}
        </>
    )
}