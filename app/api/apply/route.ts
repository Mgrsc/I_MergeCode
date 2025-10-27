import { NextRequest, NextResponse } from 'next/server';
import { applyCodeChanges } from '@/lib/morphllm';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalCode, updateCode, instruction, apiKey, provider, model, customEndpoint, enableRateLimit, maxRequests } = body;

    if (!originalCode || !updateCode || !apiKey || !provider || !model) {
      return NextResponse.json(
        { error: 'Missing required fields', code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    if (enableRateLimit && maxRequests) {
      const forwarded = request.headers.get('x-forwarded-for');
      const identifier = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'anonymous';
      const result = checkRateLimit(identifier, {
        maxRequests: parseInt(maxRequests),
        windowMs: 30 * 24 * 60 * 60 * 1000,
      });

      if (!result.allowed) {
        const resetDate = new Date(result.resetTime);
        return NextResponse.json(
          {
            error: `Rate limit exceeded. Limit resets on ${resetDate.toLocaleDateString()}`,
            code: 'RATE_LIMIT_EXCEEDED',
            details: `Remaining requests: ${result.remaining}`,
          },
          { status: 429 }
        );
      }
    }

    const response = await applyCodeChanges({
      originalCode,
      updateCode,
      instruction: instruction || 'Apply the code changes',
      apiKey,
      provider,
      model,
      customEndpoint,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API Error:', error);

    if (error.error) {
      return NextResponse.json(
        {
          error: error.error,
          code: error.code || 'API_ERROR',
          details: error.details,
        },
        { status: parseInt(error.code) || 500 }
      );
    }

    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}
