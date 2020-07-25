import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';
import { getUser } from '../../../../lib/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await getUser(req, req.query.userId);
  res.send({ user });
});

// dumb route, comment out middleware and original route, get 200 in test
handler.get((req, res) => res.send(req.query.userId));

export default handler;
