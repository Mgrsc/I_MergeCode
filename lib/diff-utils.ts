import * as Diff from 'diff';
import { DiffLine, DiffStats } from '@/types';

export function calculateDiff(original: string, modified: string): DiffLine[] {
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
}

export function calculateStats(diffLines: DiffLine[]): DiffStats {
  return diffLines.reduce(
    (acc, line) => {
      acc[line.type]++;
      return acc;
    },
    { added: 0, removed: 0, unchanged: 0 }
  );
}
