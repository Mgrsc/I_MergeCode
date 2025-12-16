import { useMemo } from 'react';
import { calculateDiff, calculateStats } from '@/lib/diff-utils';
import { DiffLine, DiffStats } from '@/types';

export interface UseDiffCalculatorReturn {
  diffLines: DiffLine[];
  stats: DiffStats;
}

export function useDiffCalculator(
  original: string,
  modified: string
): UseDiffCalculatorReturn {
  const diffLines = useMemo(() => {
    if (!original || !modified) return [];
    return calculateDiff(original, modified);
  }, [original, modified]);

  const stats = useMemo(() => {
    return calculateStats(diffLines);
  }, [diffLines]);

  return { diffLines, stats };
}
