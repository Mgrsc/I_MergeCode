import { useState } from 'react';

export interface UseCodeEditorReturn {
  originalCode: string;
  updateCode: string;
  instruction: string;
  setOriginalCode: (code: string) => void;
  setUpdateCode: (code: string) => void;
  setInstruction: (instruction: string) => void;
  clearAll: () => void;
}

export function useCodeEditor(): UseCodeEditorReturn {
  const [originalCode, setOriginalCode] = useState('');
  const [updateCode, setUpdateCode] = useState('');
  const [instruction, setInstruction] = useState('');

  const clearAll = () => {
    setOriginalCode('');
    setUpdateCode('');
    setInstruction('');
  };

  return {
    originalCode,
    updateCode,
    instruction,
    setOriginalCode,
    setUpdateCode,
    setInstruction,
    clearAll,
  };
}
