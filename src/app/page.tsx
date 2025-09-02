export default function Home() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-black bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url('https://apod.nasa.gov/apod/image/2509/OrionHorseHead_Stern_1080.jpg')"
      }}
    >
      {/* Dark translucent overlay */}
      <div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-xl"/>

      {/* Card content */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl 
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-xl 
        max-h-[80vh] overflow-y-auto 
        transform transition duration-300 hover:scale-105 hover:shadow-10xl hover:shadow-purple-500/40
        grid grid-rows-[1fr_auto]">
        {/* Image */}
        <img
          src="https://apod.nasa.gov/apod/image/2509/OrionHorseHead_Stern_1080.jpg"
          alt="Today's Picture"
          className="w-full h-auto object-cover"
        />
        <div className="flex flex-col">
        <div className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            This illustration captures the beauty of the Leonids meteor shower. 
            Known for producing bright meteors, the Leonids are one of the most 
            spectacular meteor showers of the year.
          </p>
        </div>

        {/* Footer pinned naturally at bottom */}
        <div className="bg-white/90 backdrop-blur-md p-4">
          <h1 className="text-lg font-bold text-gray-800">
            Leonids Meteor Shower
          </h1>
          <div className="text-sm text-gray-600 flex justify-between">
            <span><strong>Date:</strong> Dec 2, 2024</span>
            <span><strong>Source:</strong> NASA APOD</span>
          </div>
        </div>
      </div>
        
        </div>
      </div>
   
  );
}
