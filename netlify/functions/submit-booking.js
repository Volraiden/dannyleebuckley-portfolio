import { handleSubmitBookingRequest } from './shared.js';

export async function handler(event) {
  return handleSubmitBookingRequest({
    method: event.httpMethod,
    body: event.body,
    env: process.env,
  });
}
