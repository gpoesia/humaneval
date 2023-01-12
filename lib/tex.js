import { MathComponent } from 'mathjax-react';

export const makeTex = (eq) => {
  eq = eq.replace(/\[([-\d]+)\/(\d+)\]/, '\\frac{$1}{$2}');
  eq = eq.replace(/^\(([^=]*)\) =/, '$1 =');
  eq = eq.replace(/= \(([^=]*)\)$/, '= $1');
  eq = eq.replace(/\*/, '\\times');
  return eq;
}

const Math = ({ tex }) => (
  <MathComponent display={false} tex={makeTex(tex)} />
);
export default Math;
