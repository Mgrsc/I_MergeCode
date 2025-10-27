export interface RelaceRequest {
  model: string;
  initial_code: string;
  edit_snippet: string;
  instruction?: string;
  stream?: boolean;
}

export interface RelaceResponse {
  mergedCode: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function applyCodeWithRelace(
  originalCode: string,
  updateCode: string,
  instruction: string,
  apiKey: string,
  model: string = 'auto'
): Promise<RelaceResponse> {
  const endpoint = 'https://instantapply.endpoint.relace.run/v1/code/apply';

  const requestBody: RelaceRequest = {
    model,
    initial_code: originalCode,
    edit_snippet: updateCode,
    stream: false,
  };

  if (instruction) {
    requestBody.instruction = instruction;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      error: errorData.error || 'Relace API request failed',
      code: response.status.toString(),
      details: JSON.stringify(errorData, null, 2),
    };
  }

  const data = await response.json();

  return {
    mergedCode: data.mergedCode || '',
    usage: data.usage,
  };
}
