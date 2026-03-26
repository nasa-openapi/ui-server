import React, {useRef} from "react";

export const SearchBox =({searchQuery, setSearchQuery, selectedDate, setSelectedDate, onSearch, isLoading}:
     {searchQuery: string; setSearchQuery: (query: string) => void; selectedDate: string; 
        setSelectedDate: (date: string) => void; onSearch: () => void; isLoading: boolean}) => {

        const dateInputRef = useRef<HTMLInputElement>(null);
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSearch();
        }


        const clearDate = () => {
            setSelectedDate("");
            if(dateInputRef.current){
                dateInputRef.current.value = "";
            }
        }
    return (
        <form onSubmit={handleSubmit} className="z-20 w-full max-w-md mb-8">
            <div className = "relative flex items-center group">
                <div className="relative flex-grow flex items-center bg-white/90 border border-gray-200 rounded-full px-4 py-1.5 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/30">
                    {/* 1. THE TEXT INPUT (First) */}
                    <input
                        type="text"
                        placeholder={selectedDate ? "" : "Search keywords or pick a date..."}
                        value={selectedDate ? "Date Filter Active" : searchQuery} 
                        disabled={!!selectedDate}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`flex-grow bg-transparent py-1.5 text-black placeholder-gray-500 outline-none ${selectedDate ? 'text-gray-400 font-medium cursor-default' : ''}`}
                    />
                    {/* 2. THE DATE PILL (Second - nested before the icon) */}
                    {selectedDate && (
                        <div className="flex items-center gap-1 mx-2 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full animate-in slide-in-from-right-2 duration-200">
                            <span className="whitespace-nowrap">{selectedDate}</span>
                            <button 
                                type="button" 
                                onClick={clearDate}
                                className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* 3. DATE PICKER ICON */}
                    <div className="flex items-center border-l border-gray-200 ml-1 pl-1">
                        <input 
                            type="date"
                            ref={dateInputRef}
                            value={selectedDate}
                            className="absolute opacity-0 pointer-events-none w-0"
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSearchQuery(""); // Clear keywords when date is picked
                            }}
                        />
                        <button 
                            type="button"
                            onClick={() => dateInputRef.current?.showPicker()}
                            className={`p-2 transition-colors ${selectedDate ? 'text-purple-600' : 'text-gray-400 hover:text-black'}`}
                            title="Pick a date"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`ml-2 p-4 text-white rounded-full shadow-lg transition-all flex items-center justify-center
                    ${isLoading 
                        ? "bg-gray-400 cursor-not-allowed opacity-70" // 2. Styles for loading state
                        : "bg-purple-600 hover:bg-purple-700 active:scale-95" // 3. Normal styles
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        </form>
    )
}