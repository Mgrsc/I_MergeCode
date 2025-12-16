import { applyCodeWithRelace } from './relace';

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

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
}

const PROVIDER_ENDPOINTS: Record<string, string> = {
  morphllm: 'https://api.morphllm.com/v1/chat/completions',
};

async function applyWithMorphLLM(request: ApplyRequest): Promise<ApplyResponse> {
  const endpoint = request.customEndpoint || PROVIDER_ENDPOINTS.morphllm;

  const content = `<instruction>${request.instruction}</instruction>
<code>${request.originalCode}</code>
<update>${request.updateCode}</update>`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${request.apiKey}`,
    },
    body: JSON.stringify({
      model: request.model,
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      error: errorData.error?.message || 'API request failed',
      code: response.status.toString(),
      details: JSON.stringify(errorData, null, 2),
    };
  }

  const data = await response.json();

  return {
    mergedCode: data.choices[0]?.message?.content || '',
    usage: data.usage,
  };
}

export async function applyCodeChanges(request: ApplyRequest): Promise<ApplyResponse> {
  switch (request.provider) {
    case 'morphllm':
      return applyWithMorphLLM(request);

    case 'relace':
      return applyCodeWithRelace(
        request.originalCode,
        request.updateCode,
        request.instruction,
        request.apiKey,
        request.model
      );

    default:
      throw new Error(`Unsupported provider: ${request.provider}`);
  }
}
