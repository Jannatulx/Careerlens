import { useState, useEffect, useRef } from 'react';
import { Count } from './ui';

function Stats(){return <section className="stats"><div className="w">{[[1200,"+","Students"],[350,"+","Opportunities"],[85,"%","Avg. Match Accuracy"],[40,"+","Companies"]].map(([n,s,l])=><div className="st" key={l}><b><Count to={n} suf={s}/></b><span>{l}</span></div>)}</div></section>}

export default Stats;
