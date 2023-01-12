import React from "react";
import Math from '../tex';

const Solutions = ({ solutions }) => (
  <div>
    <div style={{ display: "inline-block", border: "1px dotted black", padding: "1em" }}>
      <p style={{ textAlign: "center" }}><strong>Equation:</strong> <Math tex={solutions[0].steps[0]} /></p>
      <div>
        { solutions.map((s, i) => (
          <div index={i} style={{ display: "inline-block",
                                  padding: "1em",
                                  borderLeft: (i ? "1px dotted black" : null),
                                  verticalAlign: "top"
                                }}>
            <strong>Solution #{i+1}: </strong><br/>
            { s.steps.map((step, j) =>
              <span key={j}> <Math tex={step} /> <br/> </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Solutions;
