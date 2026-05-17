export default function Confirmation({ data, onBookAgain }) {
  const shortId = data.appointment_id.slice(0, 8).toUpperCase();

  return (
    <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8 text-center">

      {/* Success icon */}
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
        ✓
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-1">Appointment Confirmed!</h1>
      <p className="text-sm text-gray-400 mb-6">Your booking has been successfully registered.</p>

      {/* Claude AI message */}
      <div className="bg-blue-50 border-l-4 border-blue-700 rounded-lg px-5 py-4 text-left mb-6">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
          Message from the clinic
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.confirmation_message}
        </p>
      </div>

      {/* Booking ID */}
      <div className="bg-gray-50 rounded-xl px-5 py-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Appointment ID</span>
          <span className="font-bold text-gray-800 tracking-wider">#{shortId}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Please arrive 10 minutes early and bring a valid photo ID.
          </p>
        </div>
      </div>

      <button
        onClick={onBookAgain}
        className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-semibold rounded-xl transition-all duration-150"
      >
        Book Another Appointment
      </button>

    </div>
  );
}