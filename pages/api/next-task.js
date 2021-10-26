const Fs = require('fs');
const _ = require('lodash');
const { UserSession } = require('../../lib/data');

const config = require('../../config.json');

export default async (req, res) => {
  const params = JSON.parse(req.query.params || '{}');
  const sessionId = params.id;
  const session = await UserSession.findOne({ id: sessionId });
  const correct = session.responses.length;

  if (correct >= 5) {
    return res.json({ problem: null, progress: 1.0, done: true });
  }

  let chosen;
  const problems = ['Hey', 'Hello', 'Hi', 'Hola', 'Opa'];

  res.json({ task: { id: correct, task: problems[correct]}, progress: correct / 5, done: false });
};
