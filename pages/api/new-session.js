const { UserSession } = require('../../lib/data');
const uuid = require('uuid');

export default async (req, res) => {
  const newSessionId = uuid.v4();
  const params = JSON.parse(req.query.params || '{}');

  const session = new UserSession({ id: newSessionId });
  const method = params.method || 'compile';
  console.log('Method:', method);

  session.beginTimestamp = new Date();
  session.preTestResponses = [];
  session.exerciseResponses = [];
  session.method = method;
  session.postTestResponses = [];

  await session.save();

  res.send({ id: newSessionId, method });
}
