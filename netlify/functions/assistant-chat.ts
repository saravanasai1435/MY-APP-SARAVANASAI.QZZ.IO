import { generateAssistantReply } from '../../server/assistant';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = (await req.json()) as { message?: unknown };
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const reply = await generateAssistantReply(message.slice(0, 2000));
    return Response.json({ reply });
  } catch (error: unknown) {
    console.error('Error handling assistant request:', error);
    return Response.json({ error: 'Failed to process AI assistant request' }, { status: 500 });
  }
};
