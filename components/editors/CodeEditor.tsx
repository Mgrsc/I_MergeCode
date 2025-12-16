interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  required?: boolean;
  onCopy?: () => void;
}

export default function CodeEditor({
  value,
  onChange,
  label,
  placeholder,
  required = false,
  onCopy,
}: CodeEditorProps) {
  return (
    <div className="bg-white border border-[#e3dacc] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:border-[#d97757]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="bg-[#fcfbf9] px-5 py-3 flex justify-between items-center text-[13px] font-bold text-[#5c4b43] border-b border-[#e3dacc]">
        <span className="flex items-center gap-2">
          {label} {required && <span className="text-[#d97757]">*</span>}
        </span>
        {onCopy && value && (
          <button
            onClick={onCopy}
            type="button"
            className="group flex items-center gap-1.5 bg-white hover:bg-[#d97757] text-[#d97757] hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border border-[#d97757]/20 hover:border-[#d97757] shadow-sm active:scale-95"
          >
            <span>Copy</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="p-0">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[400px] bg-white border-none px-5 py-5 text-[#4a3b32] font-mono text-[13px] leading-relaxed resize-y outline-none transition-all duration-300 focus:bg-[#fafafa] scrollbar-orange placeholder-[#a89b93]"
        />
      </div>
    </div>
  );
}
