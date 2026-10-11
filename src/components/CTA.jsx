import { useState, useEffect, useRef } from 'react';
import { Ic, Rv } from './ui';

const CTA=()=><section id="cta"><div className="w"><Rv><div className="ct"><span className="eyebrow" style={{background:"rgba(255,255,255,.12)",color:"#C7D2FF"}}>Students · Recruiters</span><h2>Ready to discover where your skills can take you?</h2><a className="btn p" href="#top">Get Started <Ic n="arrow"/></a></div></Rv></div></section>;

export default CTA;
