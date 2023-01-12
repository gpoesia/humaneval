import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import useStore from '../lib/state';
import { useRouter } from 'next/router';
import { apiRequest } from '../lib/api';
import _ from 'lodash';

import { Button } from '@material-ui/core';
const MathComponent = dynamic(() => import('mathjax-react').MathComponent, { ssr: false });

const Solutions = dynamic(() => import('../lib/components/solutions.js'),
                  { ssr: false });
const Options = dynamic(() => import('../lib/components/options.js'),
                  { ssr: false });
const Math = dynamic(() => import('../lib/tex.js'),
                     { ssr: false });


const Instructions = () => {
  const id = useStore(state => state.id);
  const router = useRouter();

  const next = async (response) => {
    await apiRequest('save-answers',
                     { id,
                       stage: 'intro',
                       answers: [{ id: 'test-run', response }],
                     });

    router.push('/task');
  };

  const problem = "2x + 1 = 10";
  const solutions = [
    { id: 'test1', steps: [problem, "((2x + 1) - 1) = (10 - 1)", "(2x + (1 - 1)) = (10 - 1)", "x = [9/2]"] },
    { id: 'test2', steps: [problem, "2x = 9", "x = [9/2]"] },
  ];

  return (
    <div className="content">
      <h1>Equations: Choosing the most pedagogical solution</h1>
      <p>
        Help us select the most helpful solutions! You will see an algebra equation with two <em>correct</em> solutions.
        Your task is to help future students by choosing the solution that is the easiest to understand, in your own evaluation.
      </p>
      <p>
        One example is shown below. Here, the equation is <Math tex="2x + 1 = 10" />.
        Two solutions are then shown side-by-side:
      </p>

      <Solutions problem={problem} solutions={solutions} />

      <p>
        After studying the solutions you will be asked to choose the clearest one.
        Before answering, please look at the solutions carefully from the perspective of a math student!
        Below is just a practice run. Choose one of the options to proceed to the actual experiment.
      </p>

      <Options solutions={solutions} onSelect={(r) => next(r)} />

    </div>
  );
};

export default Instructions;
