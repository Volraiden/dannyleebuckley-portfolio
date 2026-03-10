import { handleChatRequest } from './shared.js';

export async function handler(event) {
  return handleChatRequest({
    method: event.httpMethod,
    body: event.body,
    env: process.env,
  });
}
