import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

const apiURL = import.meta.env['VITE_CONVERTER_API_URL']

const mockServer = setupServer(
	http.get(`${apiURL}/currencies`, ({request}) => {
		return HttpResponse.json({ foo: 'bar' });
	}),
);

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());
