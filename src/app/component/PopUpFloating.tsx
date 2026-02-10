export const PopUpFloating =({showToast, setShowToast, setShowModal}: {showToast: boolean, setShowToast: (show: boolean) => void, setShowModal: (show: boolean) => void})=>{
    return (
        <>
        {showToast && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-lg shadow-2xl animate-bounce">
          <p>Want updates for pictures daily?</p>
          <button onClick={() => { setShowToast(false); setShowModal(true); }} className="underline font-bold">
            Yes, notify me!
          </button>
        </div>
      )}
        </>
    )
};