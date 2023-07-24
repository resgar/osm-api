import { rest } from 'msw';
import * as fs from 'fs';

const externalApiBaseUrl = 'https://www.openstreetmap.org/api/0.6';

export const handlers = [
  rest.get(`${externalApiBaseUrl}/map`, async (req, res, ctx) => {
    const urlSearchParams = new URLSearchParams(req.url.search);
    const bbox = urlSearchParams.get('bbox');

    const invalidBboxPattern = /invalid/i;
    if (bbox && bbox.match(invalidBboxPattern)) {
      return res(ctx.status(400));
    }

    const largeBboxArea = '-122.4296875,-89.999993,-122.4196875,-89.999999';
    if (bbox === largeBboxArea) {
      return res(ctx.status(400));
    }

    const mockGeoJsonData = fs.readFileSync('src/mocks/features.json', 'utf8');

    return res(ctx.status(200), ctx.json(JSON.parse(mockGeoJsonData)));
  }),
];
