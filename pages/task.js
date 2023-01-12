import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import useStore from '../lib/state';
import { useRouter } from 'next/router';
import { apiRequest } from '../lib/api';
import _ from 'lodash';
import LinearProgress from '@material-ui/core/LinearProgress';

const TaskComponent = dynamic(() => import('../lib/components/task-component.js'),
                  { ssr: false });

const Task = () => {
  const id = useStore(state => state.id);
  const router = useRouter();
  const [task, setTask] = useState(undefined);
  const [progress, setProgress] = useState(0);

  // Fetch a new task or move to the survey.
  useEffect(async () => {
    if (task === undefined) {
      const { task, progress, done } = await apiRequest('next-task', { id });

      if (done) {
        // Go to equations test.
        router.push('/equations-test');
      } else {
        setTask(task);
        console.log('Progress:', progress);
        setProgress(task.progress);
      }
    }
  });

  console.log('Task solutions:', task &&  task.solutions);

  const next = async (response) => {
    console.log('ID:', task.id, 'Response:', response);
    await apiRequest('save-answers',
                     { id,
                       stage: 'task',
                       answers: [{ id: task.id, response }],
                     });

    setTask(undefined);
  };

  return (
    <div className="content">
      <h1>Task</h1>
      <LinearProgress value={progress * 100} variant="determinate" />
      <TaskComponent
        task={task}
        onSubmit={(response) => next(response)}
      />
    </div>
  );
};
export default Task;
