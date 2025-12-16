import { useState, useCallback } from 'react';

export interface UseCopyToClipboardReturn {
  copyToClipboard: (text: string) => Promise<boolean>;
  isCopied: boolean;
}

export function useCopyToClipboard(timeout = 3000): UseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (success) {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), timeout);
        }
        return success;
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, [timeout]);

  return { copyToClipboard, isCopied };
}
