import { useState, useEffect } from 'react';
import { ApiConfig } from '@/types';

const getStoredValue = (key: string, defaultValue: string) => {
  if (typeof window === 'undefined') return defaultValue;
  return localStorage.getItem(key) || defaultValue;
};

export interface UseApiConfigReturn extends ApiConfig {
  setApiKey: (key: string) => void;
  setProvider: (provider: string) => void;
  setModel: (model: string) => void;
  setCustomEndpoint: (endpoint: string) => void;
}

export function useApiConfig(): UseApiConfigReturn {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'morphllm' | 'relace'>('morphllm');
  const [model, setModel] = useState('morph-v3-fast');
  const [customEndpoint, setCustomEndpoint] = useState('');

  useEffect(() => {
    setApiKey(getStoredValue('apiKey', process.env.NEXT_PUBLIC_DEFAULT_API_KEY || ''));
    setProvider(getStoredValue('provider', process.env.NEXT_PUBLIC_DEFAULT_PROVIDER || 'morphllm') as any);
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

  const handleSetProvider = (newProvider: string) => {
    setProvider(newProvider as any);
    if (newProvider === 'relace') {
      setModel('auto');
    } else if (newProvider === 'morphllm') {
      setModel('morph-v3-fast');
    }
  };

  return {
    apiKey,
    provider,
    model,
    customEndpoint,
    setApiKey,
    setProvider: handleSetProvider,
    setModel,
    setCustomEndpoint,
  };
}
