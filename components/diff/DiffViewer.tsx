import { DiffLine, DiffStats } from '@/types';

interface DiffViewerProps {
  diffLines: DiffLine[];
  title: string;
  stats?: DiffStats;
  onCopy?: () => void;
}

export default function DiffViewer({ diffLines, title, stats, onCopy }: DiffViewerProps) {
  if (diffLines.length === 0) return null;

  return (
    <div className="bg-white border border-[#e3dacc] rounded-xl overflow-hidden shadow-sm mt-8">
      <div className="bg-[#fcfbf9] px-5 py-3 flex justify-between items-center text-[13px] font-bold text-[#5c4b43] border-b border-[#e3dacc]">
        <div className="flex items-center gap-5">
          <span>{title}</span>
          {stats && (
            <div className="flex gap-3 text-xs bg-white px-3 py-1 rounded-lg border border-[#e3dacc] shadow-sm">
              <span className="text-green-600 font-bold">+{stats.added}</span>
              <span className="text-red-500 font-bold">-{stats.removed}</span>
              <span className="text-gray-400 font-medium">{stats.unchanged} unchanged</span>
            </div>
          )}
        </div>
        {onCopy && (
          <button
            onClick={onCopy}
            type="button"
            className="group flex items-center gap-1.5 bg-white hover:bg-[#d97757] text-[#d97757] hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border border-[#d97757]/20 hover:border-[#d97757] shadow-sm active:scale-95"
          >
            <span>Copy Code</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        )}
      </div>

      <div className="p-0 max-h-[600px] overflow-y-auto bg-white scrollbar-orange font-mono text-[13px]">
        {diffLines.map((line, index) => {
          const bgColor =
            line.type === 'added'
              ? 'bg-[#f0fdf4]'
              : line.type === 'removed'
              ? 'bg-[#fef2f2]'
              : '';
          const borderColor =
            line.type === 'added'
              ? 'border-l-[3px] border-green-500'
              : line.type === 'removed'
              ? 'border-l-[3px] border-red-500'
              : 'border-l-[3px] border-transparent';
          const textColor = line.type === 'removed' ? 'line-through opacity-60' : 'text-[#4a3b32]';
          const prefix = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ';
          const prefixColor =
            line.type === 'added'
              ? 'text-green-600'
              : line.type === 'removed'
              ? 'text-red-500'
              : 'text-[#a89b93]';

          return (
            <div
              key={index}
              className={`leading-6 py-1 px-4 flex items-start hover:bg-black/[0.01] border-b border-[#fcfbf9] ${bgColor} ${borderColor}`}
            >
              <span className="inline-block min-w-[32px] text-right pr-3 text-[#a89b93] select-none font-mono text-[11px] pt-0.5">
                {line.lineNumber || ''}
              </span>
              <span className={`inline-block w-4 text-center select-none font-bold ${prefixColor} mr-2 pt-0.5`}>
                {prefix}
              </span>
              <span className={`flex-1 break-all ${textColor}`}>{line.content || ' '}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
