export default function AdminFooter({ isExpanded }) {
  return (
    <footer
      className={`
        fixed bottom-0 right-0 h-14 bg-white text-gray-800
        flex items-center justify-between px-8 text-sm z-[900]
        transition-all duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
        border-t-2 border-green-100
        ${isExpanded ? "lg:left-64" : "lg:left-20"}
      `}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
        <span className="font-semibold text-gray-700">© 2025 Autism ABA Partners</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600 font-medium">Admin Area</span>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Secured
        </div>
      </div>
    </footer>
  );
}