import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const r = await axios.post('http://66.45.237.70/api.php', req.body);
  console.log(r);
  res.status(200).json({ name: 'John Doe' });
}
