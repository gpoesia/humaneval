import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { apiRequest } from '../lib/api';
import useStore from '../lib/state';

export default function App() {
  const router = useRouter();

  const sessionId = useStore(state => state.id);
  const setID = useStore(state => state.setID);
  const setMethod = useStore(state => state.setMethod);

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const method = urlParams.get('method');

    if (!sessionId) {
      const { id, m } = await apiRequest('new-session', { method });
      setID(id);
      setMethod(m);
    }

    router.push('/instructions');
  });

  return (
    <div>
      <p>Starting your session...</p>
      <CircularProgress />
    </div>
  );
}
