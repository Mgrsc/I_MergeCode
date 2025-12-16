interface ToastProps {
  message: string;
  show: boolean;
  duration?: number;
}

export default function Toast({ message, show, duration = 3000 }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-green-600/95 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold shadow-lg z-50 animate-slide-up flex items-center gap-3 border border-white/20 text-sm">
      <span className="bg-white/20 rounded-full p-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {message}
    </div>
  );
}
