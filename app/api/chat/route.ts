import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/app/util/openai';
import { NextApiResponse } from 'next';
export async function POST(request: Request){
  openai.apiKey = request.headers.get('apiKey') || '';
  if (!openai.apiKey) {
    // return Response.json({
    //   Error: '11111'
    // })
  }
  
  const { messages } = await request.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-4', //'gpt-3.5-turbo',
    stream: true,
    messages: [...messages]
  });
  const stream = await OpenAIStream(response);
  return new StreamingTextResponse(stream);
}