'use client';

import { useCodeEditor } from '@/hooks/useCodeEditor';
import { useApiConfig } from '@/hooks/useApiConfig';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useDiffCalculator } from '@/hooks/useDiffCalculator';
import { useAIMerge } from '@/hooks/useAIMerge';
import Header from '@/components/layout/Header';
import ConfigPanel from '@/components/config/ConfigPanel';
import EditorPair from '@/components/editors/EditorPair';
import DiffViewer from '@/components/diff/DiffViewer';
import ErrorDialog from '@/components/ui/ErrorDialog';
import Toast from '@/components/ui/Toast';

export default function Home() {
  const { originalCode, updateCode, instruction, setOriginalCode, setUpdateCode, setInstruction } = useCodeEditor();
  const apiConfig = useApiConfig();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const { mergedCode, loading, error, applyChanges, clearError } = useAIMerge(
    originalCode,
    updateCode,
    instruction,
    apiConfig
  );

  const diffTarget = mergedCode || updateCode;
  const showDiff = originalCode && diffTarget;
  const diffTitle = mergedCode ? 'AI Merged Result' : 'Real-time Diff Preview';

  const { diffLines, stats } = useDiffCalculator(originalCode, diffTarget);

  const handleCopyOriginal = () => {
    if (originalCode) copyToClipboard(originalCode);
  };
  const handleCopyUpdate = () => {
    if (updateCode) copyToClipboard(updateCode);
  };
  const handleCopyDiff = () => {
    if (diffTarget) copyToClipboard(diffTarget);
  };

  return (
    <div className="min-h-screen bg-[#f0eee6] flex items-center justify-center py-16 px-12">
      <div className="max-w-[1400px] w-full bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.1)] border border-[#e3dacc]">
        <Header />

        <ConfigPanel
          apiKey={apiConfig.apiKey}
          provider={apiConfig.provider}
          model={apiConfig.model}
          customEndpoint={apiConfig.customEndpoint}
          onApiKeyChange={apiConfig.setApiKey}
          onProviderChange={apiConfig.setProvider}
          onModelChange={apiConfig.setModel}
          onCustomEndpointChange={apiConfig.setCustomEndpoint}
        />

        <div className="mb-8">
          <label className="block text-[14px] font-bold text-[#5c4b43] tracking-[0.2px] mb-2 px-1">
            Instruction <span className="text-[#a89b93] font-normal">(Optional)</span>
          </label>
          <div className="relative group">
            <input
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g., Add error handling and async/await support"
              className="w-full bg-white border border-[#e3dacc] rounded-xl px-4 py-3 text-[14px] text-[#4a3b32] outline-none transition-all duration-200 hover:border-[#d97757]/50 focus:border-[#d97757] focus:ring-4 focus:ring-[#d97757]/10 shadow-sm placeholder-[#a89b93]"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <svg className="w-5 h-5 text-[#d97757]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
          </div>
        </div>

        <EditorPair
          originalCode={originalCode}
          updateCode={updateCode}
          onOriginalChange={setOriginalCode}
          onUpdateChange={setUpdateCode}
          onCopyOriginal={handleCopyOriginal}
          onCopyUpdate={handleCopyUpdate}
        />

        <div className="flex justify-center gap-4 my-8">
          <button
            onClick={applyChanges}
            disabled={loading}
            className="group relative px-8 py-3 bg-gradient-to-r from-[#d97757] to-[#c86647] text-white text-[15px] font-bold rounded-xl tracking-[0.5px] shadow-[0_4px_12px_rgba(217,119,87,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(217,119,87,0.4)] active:translate-y-0 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                 <>
                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Merging...
                 </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  Apply AI Merge
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e08e6d] to-[#d97757] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {showDiff && (
          <DiffViewer
            diffLines={diffLines}
            title={diffTitle}
            stats={stats}
            onCopy={handleCopyDiff}
          />
        )}

        <ErrorDialog error={error} onClose={clearError} />
        <Toast message="Copied successfully!" show={isCopied} />
      </div>
    </div>
  );
}
