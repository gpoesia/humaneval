import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Instructions = () => {
  const [consent, setConsent] = useState(false);

  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);
  const [q4, setQ4] = useState(false);

  const router = useRouter();

  const next = () => {
    if (!(q1 && !q2 && q3 && q4)) {
      alert('Please carefully read the instructions to answer the questions correctly!');
      return;
    }
    router.push('/introduction');
  };

  return (
    <div className="content">
      <h1>Human evaluation</h1>
      <p>
        Shortly describe what the experiment is about (more specific instructions in /intro).
      </p>

      <p>
        By following the instructions, you are participating in a study being performed by
        ... in the ...
        If you have questions about this research, please contact ...
      </p>

      <h2>Consent</h2>

      <ul>
        <li>You must be at least 18 years old to participate.</li>
        <li>Your participation in this research is voluntary.</li>
        <li>You may decline to answer any or all of the following questions.</li>
        <li>You may decline further participation, at any time, without adverse consequences.</li>
        <li>Your anonymity is assured; the researchers who have requested your participation will not receive any personally identifying information.</li>
      </ul>

      <p>
        <input type="checkbox" value={consent} onChange={() => setConsent(!consent)} />
        <span>I have read and agree with the above.</span>
      </p>

      <h2>Checking your understanding</h2>

      <p>To start the experiment, please check only the options that are true:</p>

      <ul className="invisible-list">
        <li><input type="checkbox" value={q1} onChange={() => setQ1(!q1)} /><span>Some questions for attention check.</span></li>
        <li><input type="checkbox" value={q2} onChange={() => setQ2(!q2)} /><span>These are important.</span></li>
        <li><input type="checkbox" value={q3} onChange={() => setQ3(!q3)} /><span>Answers are in the if statement above.</span></li>
        <li><input type="checkbox" value={q4} onChange={() => setQ4(!q4)} /><span>4-5 is a good number</span></li>
      </ul>

      <button disabled={!consent} onClick={next}>Continue</button>
    </div>
  );
};
export default Instructions;
