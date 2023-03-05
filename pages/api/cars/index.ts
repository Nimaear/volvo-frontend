import { NextApiRequest, NextApiResponse } from 'next';

import cars from '../../../public/api/cars.json';

const FAKE_ERROR_AND_DELAY_IN_DEVELOPMENT: boolean = true;
const FAKE_ERROR_RATE = 0.1;
const FAKE_RESPONSE_TIME = 2000;

const wait = async (milliSeconds: number) => new Promise(function (resolve) {
  setTimeout(resolve, milliSeconds);
});

// This is a helper function to fake a slow response and errors in development mode
const maybeFake = async (res: NextApiResponse, callback: () => void) => {
  if (FAKE_ERROR_AND_DELAY_IN_DEVELOPMENT) {
    await wait(FAKE_RESPONSE_TIME);
    // Fake a 50% chance of an error
    if (Math.random() < FAKE_ERROR_RATE) {
      res.status(500).json({ error: 'Something went wrong with loading the cars...' });
      return;
    }
    callback();
  }
};

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fake a slow response in development mode to test the loading indicator
    // This check is here for dead code elimination in production
    if (process.env.NODE_ENV === 'development') {
      return maybeFake(res, () => {
        res.status(200).json(cars);
      });
    }
    res.status(200).json(cars);
  }
}
