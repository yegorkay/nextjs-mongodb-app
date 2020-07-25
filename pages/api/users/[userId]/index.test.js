import http from 'http';
import axios from 'axios';
import listen from 'test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '.';

const USER_ID = 'SOME_ID'; // to be an actual id once 500 is resolved

describe(`/users/${USER_ID}`, () => {
  test('responds 200', async () => {
    const requestHandler = (req, res) => apiResolver(req, res, undefined, handler);
    const server = http.createServer(requestHandler);
    const url = await listen(server);

    const response = await axios.get(url, { params: { userId: USER_ID } });
    expect(response.status).toBe(200); // though it's 500 with middleware?
    return server.close();
  });
});
