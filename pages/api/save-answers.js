const { UserSession } = require('../../lib/data');
const _ = require('lodash');

// This takes an array of answers and saves them to the database.
export default async (req, res) => {
  const params = JSON.parse(req.query.params || '{}');
  const sessionId = params.id;
  const stage = params.stage;
  const timestamp = _.now();
  const answers = params.answers.map(a => ({ ...a, timestamp }));

  if (!(sessionId && stage)) {
    return res.json({ "error": "Need a session ID and a stage." });
  }

  const session = await UserSession.findOne({ id: sessionId });

  if (stage === "survey") {
    session.survey = answers;
  } else if (stage === "intro") {
    console.log("Saving intro responses:", answers);
    session.introResponse = answers;
  } else if (stage === "task") {
    session.responses = _.concat(session.responses, answers);
  } else if (stage === "equations") {
    session.equationsTest = answers;
  } else {
    return res.json({ "error": "Invalid stage " + stage });
  }

  await session.save();
  res.json({});
};
