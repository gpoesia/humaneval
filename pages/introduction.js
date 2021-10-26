import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import useStore from '../lib/state';
import { useRouter } from 'next/router';
import { apiRequest } from '../lib/api';
import _ from 'lodash';

import { Button } from '@material-ui/core';

const Instructions = () => {
  const router = useRouter();
  const next = () => router.push('/task');

  return (
    <div className="content">
      <h1>Introduction and task instructions</h1>
      <p>
        Now describe exactly what is the task.
      </p>
      <p>
        You can put one more attention check here.
      </p>
      <Button onClick={() => next()}>Submit</Button>
    </div>
  );
};

export default Instructions;
