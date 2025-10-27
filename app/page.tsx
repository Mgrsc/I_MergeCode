'use client';

import { useState, useEffect } from 'react';
import CodeDiffViewer from '@/components/CodeDiffViewer';
import ErrorDialog from '@/components/ErrorDialog';

const getStoredValue = (key: string, defaultValue: string) => {
  if (typeof window === 'undefined') return defaultValue;
  return localStorage.getItem(key) || defaultValue;
};

export default function Home() {
  const [originalCode, setOriginalCode] = useState('');
  const [updateCode, setUpdateCode] = useState('');
  const [instruction, setInstruction] = useState('');
  const [mergedCode, setMergedCode] = useState('');

  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('morphllm');
  const [model, setModel] = useState('morph-v3-fast');
  const [customEndpoint, setCustomEndpoint] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setApiKey(getStoredValue('apiKey', process.env.NEXT_PUBLIC_DEFAULT_API_KEY || ''));
    setProvider(getStoredValue('provider', process.env.NEXT_PUBLIC_DEFAULT_PROVIDER || 'morphllm'));
    setModel(getStoredValue('model', process.env.NEXT_PUBLIC_DEFAULT_MODEL || 'morph-v3-fast'));
    setCustomEndpoint(getStoredValue('customEndpoint', process.env.NEXT_PUBLIC_CUSTOM_ENDPOINT || ''));
  }, []);

  useEffect(() => {
    if (apiKey) localStorage.setItem('apiKey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('provider', provider);
  }, [provider]);

  useEffect(() => {
    localStorage.setItem('model', model);
  }, [model]);

  useEffect(() => {
    localStorage.setItem('customEndpoint', customEndpoint);
  }, [customEndpoint]);

  const handleApply = async () => {
    if (!originalCode || !updateCode || !apiKey) {
      setError({
        error: 'Please fill in all required fields: Original Code, Update Code, and API Key',
        code: 'VALIDATION_ERROR',
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalCode,
          updateCode,
          instruction,
          apiKey,
          provider,
          model,
          customEndpoint: customEndpoint || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
      } else {
        setMergedCode(data.mergedCode);
      }
    } catch (err: any) {
      setError({
        error: err.message || 'Failed to connect to server',
        code: 'NETWORK_ERROR',
      });
    } finally {
      setLoading(false);
    }
  };

  const showCopyToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyOriginal = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(originalCode);
        showCopyToast();
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = originalCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyToast();
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyUpdate = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(updateCode);
        showCopyToast();
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = updateCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyToast();
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>I_MergeCode</h1>
        <p>Intelligently merge AI-generated code changes with your original code</p>
      </div>

      <div className="config-panel">
        <div className="config-grid">
          <div className="input-group">
            <label>API Key *</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
          </div>

          <div className="input-group">
            <label>Provider</label>
            <select value={provider} onChange={(e) => {
              setProvider(e.target.value);
              // Set default model based on provider
              if (e.target.value === 'relace') {
                setModel('auto');
              } else if (e.target.value === 'morphllm') {
                setModel('morph-v3-fast');
              }
            }}>
              <option value="morphllm">MorphLLM</option>
              <option value="relace">Relace</option>
            </select>
          </div>

          <div className="input-group">
            <label>Model</label>
            {provider === 'relace' ? (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="auto">auto (recommended)</option>
                <option value="relace-apply-2.5-lite">relace-apply-2.5-lite</option>
                <option value="relace-apply-2">relace-apply-2</option>
              </select>
            ) : (
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="morph-v3-fast">morph-v3-fast (10,500 tok/s)</option>
                <option value="morph-v3-large">morph-v3-large (2,500 tok/s)</option>
                <option value="auto">auto</option>
              </select>
            )}
          </div>

          <div className="input-group">
            <label>Custom API Endpoint (Optional)</label>
            <input
              type="text"
              value={customEndpoint}
              onChange={(e) => setCustomEndpoint(e.target.value)}
              placeholder="https://your-api.com/v1/chat/completions"
            />
          </div>
        </div>
      </div>

      <div className="input-group" style={{ marginBottom: '20px' }}>
        <label>Instruction (Optional)</label>
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g., I will add error handling and async/await support"
        />
      </div>

      <div className="editor-container">
        <div className="editor-panel">
          <div className="editor-header">
            <span>Original Code *</span>
            <button onClick={handleCopyOriginal}>Copy</button>
          </div>
          <div className="editor-content">
            <textarea
              value={originalCode}
              onChange={(e) => setOriginalCode(e.target.value)}
              placeholder="Paste your original code here..."
            />
          </div>
        </div>

        <div className="editor-panel">
          <div className="editor-header">
            <span>Update Code *</span>
            <button onClick={handleCopyUpdate}>Copy</button>
          </div>
          <div className="editor-content">
            <textarea
              value={updateCode}
              onChange={(e) => setUpdateCode(e.target.value)}
              placeholder="Paste the AI-generated update code here (use // ... existing code ... for unchanged parts)..."
            />
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button
          className="btn btn-primary"
          onClick={handleApply}
          disabled={loading}
        >
          {loading && <span className="loading"></span>}
          {loading ? 'Merging...' : 'Apply Changes'}
        </button>
      </div>

      {mergedCode && (
        <CodeDiffViewer
          original={originalCode}
          modified={mergedCode}
          onCopySuccess={showCopyToast}
        />
      )}

      <ErrorDialog error={error} onClose={() => setError(null)} />

      {showToast && (
        <div className="toast">
          ✓ 复制成功！
        </div>
      )}
    </div>
  );
}
