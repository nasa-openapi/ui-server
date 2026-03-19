export const SearchBox =({searchQuery, setSearchQuery, selectedDate, setSelectedDate}:
     {searchQuery: string; setSearchQuery: (query: string) => void; selectedDate: string; setSelectedDate: (date: string) => void}) => {
    return (
        <>
        {
            <div className="z-20 w-full max-w-md mb-8">
        <div className="relative group">
          {/* The Text Input */}
          <input
            type="text"
            placeholder="Search keywords or pick a date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-6 pr-12 py-3 bg-white/90 border border-gray-200 rounded-full 
                    text-black placeholder-gray-500 outline-none ring-2 ring-transparent 
                    focus:ring-purple-500/30 transition-all duration-300 shadow-lg"
          />

          {/* The Date Picker Icon Overlay */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Hidden native date input triggered by the icon */}
            <input 
              type="date"
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSearchQuery(e.target.value); // Syncs the text box with the date
              }}
            />
            <button className="p-2 text-gray-500 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

        }
        </>
    )
}