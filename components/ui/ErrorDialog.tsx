import { ErrorResponse } from '@/types';

interface ErrorDialogProps {
  error: ErrorResponse | null;
  onClose: () => void;
}

export default function ErrorDialog({ error, onClose }: ErrorDialogProps) {
  if (!error) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-lg w-11/12 border border-gray-200 shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
             <div className="bg-red-50 p-2 rounded-full text-red-500">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <h2 className="text-lg font-bold text-gray-800">Error Occurred</h2>
          </div>
          <button
            className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 text-[#444] leading-relaxed">
          <p className="text-[14px]">{error.error}</p>
          {error.code && (
            <div className="mt-4 bg-red-50/50 border border-red-100 rounded-lg p-3 font-mono text-xs text-red-600">
              <span className="font-bold select-none opacity-50 block text-[10px] mb-1">ERROR CODE</span>
              {error.code}
            </div>
          )}
          {error.details && (
            <details className="mt-4 group">
              <summary className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors font-semibold text-xs flex items-center gap-2 select-none">
                <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                View Technical Details
              </summary>
              <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto max-h-[200px] scrollbar-thin">
                {error.details}
              </div>
            </details>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-gradient-to-br from-[#d97757] to-[#c86647] text-white text-sm font-bold rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
