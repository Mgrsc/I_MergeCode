import { useState } from 'react';
import { ApiConfig, ErrorResponse } from '@/types';

export interface UseAIMergeReturn {
  mergedCode: string;
  loading: boolean;
  error: ErrorResponse | null;
  applyChanges: () => Promise<void>;
  clearError: () => void;
  clearMergedCode: () => void;
}

export function useAIMerge(
  originalCode: string,
  updateCode: string,
  instruction: string,
  apiConfig: ApiConfig
): UseAIMergeReturn {
  const [mergedCode, setMergedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const applyChanges = async () => {
    if (!originalCode || !updateCode || !apiConfig.apiKey) {
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
          apiKey: apiConfig.apiKey,
          provider: apiConfig.provider,
          model: apiConfig.model,
          customEndpoint: apiConfig.customEndpoint || undefined,
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

  const clearError = () => setError(null);
  const clearMergedCode = () => setMergedCode('');

  return {
    mergedCode,
    loading,
    error,
    applyChanges,
    clearError,
    clearMergedCode,
  };
}
