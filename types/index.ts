export interface ApiConfig {
  apiKey: string;
  provider: 'morphllm' | 'relace';
  model: string;
  customEndpoint: string;
}

export interface DiffLine {
  content: string;
  type: 'added' | 'removed' | 'unchanged';
  lineNumber: number | null;
}

export interface DiffStats {
  added: number;
  removed: number;
  unchanged: number;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
}

export interface ApplyRequest {
  originalCode: string;
  updateCode: string;
  instruction: string;
  apiKey: string;
  provider: string;
  model: string;
  customEndpoint?: string;
}

export interface ApplyResponse {
  mergedCode: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
