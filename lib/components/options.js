import React from "react";
import { Button } from "@material-ui/core";

const Options = ({ solutions, onSelect }) => (
  <div>
    <div style={{ display: "inline-block", padding: "1em" }}>
      How would you judge these solutions?
      <ul style={{listStyle: "none"}}>
        <li>
           <Button onClick={() => onSelect("all")} variant="outlined">
            All solutions would be equally helpful for a student
          </Button>
        </li>
        {
          solutions.map((s, i) =>
            <li key={i}>
              <Button onClick={() => onSelect(s.id)} variant="outlined">
                Solution {i+1} would be most helpful for a student
              </Button>
            </li>
          )
        }
        <li>
          <Button onClick={() => onSelect("none")} variant="outlined">
            None of these solutions would be helpful for a student
          </Button>
        </li>
      </ul>
    </div>
  </div>
)

export default Options;
