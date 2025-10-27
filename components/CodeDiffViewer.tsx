'use client';

import { useMemo } from 'react';
import * as Diff from 'diff';

interface CodeDiffViewerProps {
  original: string;
  modified: string;
  onCopySuccess?: () => void;
}

interface DiffLine {
  content: string;
  type: 'added' | 'removed' | 'unchanged';
  lineNumber: number | null;
}

export default function CodeDiffViewer({ original, modified, onCopySuccess }: CodeDiffViewerProps) {
  const diffLines = useMemo(() => {
    const diffResult = Diff.diffLines(original, modified);
    const lines: DiffLine[] = [];
    let currentLineNumber = 1;

    diffResult.forEach((part) => {
      const partLines = part.value.split('\n').filter((line, idx, arr) => {
        if (idx === arr.length - 1 && line === '') return false;
        return true;
      });

      partLines.forEach((line) => {
        if (part.removed) {
          lines.push({
            content: line,
            type: 'removed',
            lineNumber: null,
          });
        } else {
          lines.push({
            content: line,
            type: part.added ? 'added' : 'unchanged',
            lineNumber: currentLineNumber++,
          });
        }
      });
    });

    return lines;
  }, [original, modified]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(modified);
        onCopySuccess?.();
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = modified;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        onCopySuccess?.();
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="diff-viewer">
      <div className="diff-header">
        <span>Merged Result</span>
        <button onClick={handleCopy} className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '12px' }}>
          Copy Code
        </button>
      </div>
      <div className="diff-content">
        {diffLines.map((line, index) => {
          const className = `diff-line ${line.type}`;
          const displayLineNumber = line.lineNumber !== null ? line.lineNumber.toString() : '';
          const prefix = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : '';

          return (
            <div key={index} className={className}>
              <span className="diff-line-number" data-line-number={displayLineNumber}>
                {displayLineNumber}
              </span>
              <span className="diff-prefix">{prefix}</span>
              <span className="diff-code-content">{line.content || ' '}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
