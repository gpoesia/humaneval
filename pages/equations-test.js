import React, { useState } from 'react';

import { apiRequest } from '../lib/api';
import useStore from '../lib/state';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const Math = dynamic(() => import('../lib/tex.js'),
                     { ssr: false });
import { Button } from '@material-ui/core';

const Problem = ({ equation, state, setState }) => (
  <div style={{ border: '1px dotted grey', margin: '1em', 'padding': '1em' }}>
    <div style={{ display: "inline-block", "verticalAlign": "top", "marginRight": "2em", "minWidth": "400px" }}>
        <strong>Equation:</strong> <Math tex={equation}/>
    </div>
    <div style={{ display: "inline-block" }}>
      <span>Your solution: </span> <br/>
      <textarea value={state} onChange={e => setState(e.target.value)} rows={5}/>
    </div>
  </div>
)

const problems = ["2 + x = 11",
                  "20 = (x / 4)",
                  "(3x + 2) = 14",
                  "(2x + 3) = (5x - 2)",
                 ];

const EquationsTest = () => {
  const id = useStore(state => state.id);
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [s4, setS4] = useState("");

  const router = useRouter();

  const next = () => router.push('/end');

  const submit = async () => {
    await apiRequest('save-answers',
                     { id,
                       stage: 'equations',
                       answers: [
                         {id: problems[0], solution: s1},
                         {id: problems[1], solution: s2},
                         {id: problems[2], solution: s3},
                         {id: problems[3], solution: s4},
                         ]
                     });
    next();
  }

  return (
    <div className="content">
      <h1>Last step: solving equations</h1>
      <p>
        As a last step, please provide your own solutions to the equations below.
        Feel free to give as much or as little detail about your intermediate steps.
        Make sure to end with a line containing only your final solution, with "x = "
        and your answer (for example, "x = 10" if 10 is your answer).
      </p>

      <Problem equation={problems[0]} state={s1} setState={setS1} />
      <Problem equation={problems[1]} state={s2} setState={setS2} />
      <Problem equation={problems[2]} state={s3} setState={setS3} />
      <Problem equation={problems[3]} state={s4} setState={setS4} />

      <Button onClick={() => submit()} disabled={!(s1 && s2 && s3 && s4)} variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
}
export default EquationsTest;
