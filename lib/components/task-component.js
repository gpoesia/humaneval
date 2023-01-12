import React, { useState, useEffect, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import styles from '../../styles/task.module.css';
import lodash from 'lodash';
import Solutions from './solutions';
import Options from './options';

const TaskComponent = ({ task, onSubmit }) => {
  if (task === undefined) {
    return (
      <div className={styles.taskContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.taskContainer}>
      <Solutions solutions={task.task.solutions} />
      <Options solutions={task.task.solutions} onSelect={t => onSubmit(t)} />
    </div>
  );
}
export default TaskComponent;
