interface ConfigPanelProps {
  apiKey: string;
  provider: string;
  model: string;
  customEndpoint: string;
  onApiKeyChange: (key: string) => void;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  onCustomEndpointChange: (endpoint: string) => void;
}

export default function ConfigPanel({
  apiKey,
  provider,
  model,
  customEndpoint,
  onApiKeyChange,
  onProviderChange,
  onModelChange,
  onCustomEndpointChange,
}: ConfigPanelProps) {
  return (
    <div className="bg-[#f0eee6] border border-[#e3dacc] rounded-xl p-5 mb-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <label className="text-[13px] font-bold text-[#5c4b43] tracking-[0.2px] whitespace-nowrap overflow-hidden text-ellipsis px-1">
            API Key <span className="text-[#d97757]">*</span>
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Enter your API key"
            className="w-full bg-white border border-[#e3dacc] rounded-lg px-3 py-2.5 text-[14px] text-[#4a3b32] outline-none transition-all duration-200 hover:border-[#d97757]/50 focus:border-[#d97757] focus:ring-4 focus:ring-[#d97757]/10 shadow-sm placeholder-[#a89b93]"
          />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <label className="text-[13px] font-bold text-[#5c4b43] tracking-[0.2px] whitespace-nowrap overflow-hidden text-ellipsis px-1">
            Provider
          </label>
          <select
            value={provider}
            onChange={(e) => onProviderChange(e.target.value)}
            className="w-full bg-white border border-[#e3dacc] rounded-lg px-3 py-2.5 text-[14px] text-[#4a3b32] outline-none transition-all duration-200 hover:border-[#d97757]/50 focus:border-[#d97757] focus:ring-4 focus:ring-[#d97757]/10 shadow-sm appearance-none cursor-pointer"
          >
            <option value="morphllm">MorphLLM</option>
            <option value="relace">Relace</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <label className="text-[13px] font-bold text-[#5c4b43] tracking-[0.2px] whitespace-nowrap overflow-hidden text-ellipsis px-1">
            Model
          </label>
          {provider === 'relace' ? (
            <select
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full bg-white border border-[#e3dacc] rounded-lg px-3 py-2.5 text-[14px] text-[#4a3b32] outline-none transition-all duration-200 hover:border-[#d97757]/50 focus:border-[#d97757] focus:ring-4 focus:ring-[#d97757]/10 shadow-sm appearance-none cursor-pointer"
            >
              <option value="auto">auto (recommended)</option>
              <option value="relace-apply-2.5-lite">relace-apply-2.5-lite</option>
              <option value="relace-apply-2">relace-apply-2</option>
            </select>
          ) : (
            <select
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-full bg-white border border-[#e3dacc] rounded-lg px-3 py-2.5 text-[14px] text-[#4a3b32] outline-none transition-all duration-200 hover:border-[#d97757]/50 focus:border-[#d97757] focus:ring-4 focus:ring-[#d97757]/10 shadow-sm appearance-none cursor-pointer"
            >
              <option value="morph-v3-fast">morph-v3-fast (10,500 tok/s)</option>
              <option value="morph-v3-large">morph-v3-large (2,500 tok/s)</option>
              <option value="auto">auto</option>
            </select>
          )}
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <label className="text-[13px] font-bold text-[#5c4b43] tracking-[0.2px] whitespace-nowrap overflow-hidden text-ellipsis px-1">
            Custom API Endpoint (Optional)
          </label>
          <input
            type="text"
            value={customEndpoint}
            onChange={(e) => onCustomEndpointChange(e.target.value)}
            placeholder="https://openai.com/v1/chat/completions"
            className="w-full bg-white border border-[#e3dacc] rounded-lg px-3 py-2.5 text-[14px] text-[#4a3b32] outline-none transition-all duration-200 hover:border-[#d97757]/50 focus:border-[#d97757] focus:ring-4 focus:ring-[#d97757]/10 shadow-sm placeholder-[#a89b93]"
          />
        </div>
      </div>
    </div>
  );
}
