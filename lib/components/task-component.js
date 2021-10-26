import React, { useState, useEffect, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import styles from '../../styles/task.module.css';
import lodash from 'lodash';

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
      <p>{ task.task }</p>
      <Button color="primary" onClick={() => onSubmit(task.task + ' too!')}>Do it</Button>
    </div>
  );
}
export default TaskComponent;
