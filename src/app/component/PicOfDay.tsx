import Image from "next/image";


export const PicofDay = ({data}: {data: {title: string, url: string, explanation: string, publishdate: string}}) => {
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
        </>
    )
}