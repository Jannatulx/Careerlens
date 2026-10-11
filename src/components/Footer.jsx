import { useState, useEffect, useRef } from 'react';


const Foot=()=><footer><div className="w"><a className="logo" href="#top">CareerLens</a><nav>{["About","Features","Opportunities","Contact","Privacy","Terms"].map(a=><a key={a} href="#top">{a}</a>)}</nav><div className="so">{["in","gh","x"].map(s=><a key={s} href="#top">{s}</a>)}</div></div></footer>;

export default Foot;
