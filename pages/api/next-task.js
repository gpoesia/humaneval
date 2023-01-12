const Fs = require('fs');
const _ = require('lodash');
const { UserSession } = require('../../lib/data');

const config = require('../../config.json');
const problems = require('../../solution_comparison_dataset.json');

const N_RESPONSES = 10;

export default async (req, res) => {
  const params = JSON.parse(req.query.params || '{}');
  const sessionId = params.id;
  const session = await UserSession.findOne({ id: sessionId });
  const method = session.method;
  const responses = session.responses.length;

  if (responses >= N_RESPONSES) {
    return res.json({ problem: null, progress: 1.0, done: true });
  }

  // Get a random problem that the user hasn't seen yet.
  let problem = _.sample(_.filter(problems, p => !_.find(session.responses, r => r.id === p.id)));
  // Leave just the solutions that this session is supposed to compare.
  problem = _.cloneDeep(problem);
  problem.solutions = _.shuffle(problem.solutions.filter(s => s.id.endsWith(method + '_segmented') ||
                                                              s.id.endsWith(method + '_random')));

  res.json({ task: { id: problem.id,
                     task: problem,
                     progress: responses / N_RESPONSES,
                     done: false
                   } });
};
