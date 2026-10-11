import { useState, useEffect } from "react";
import { Rv } from "./ui";
import "./How.css";


import profileImg from "../assets/profile.png";
import analysisImg from "../assets/analysis.png";
import jobsImg from "../assets/jobs.png";
import growthImg from "../assets/growth.png";



const STEPS = [

{
title:"Build Your Career Profile",

desc:
"Create your personalized profile with education, skills, projects and career goals.",

image:profileImg,

items:[
"Profile completed ✓",
"Skills: React, JavaScript, MongoDB",
"Goal: Full Stack Developer"
]

},



{
title:"AI Career Analysis",

desc:
"Our AI analyzes your CV and identifies strengths, weaknesses and skill gaps.",

image:analysisImg,

items:[
"Career readiness: 82%",
"Strong: React & Problem Solving",
"Improve: Database & Communication"
]

},



{
title:"Smart Opportunity Matching",

desc:
"Discover internships and jobs ranked according to your skills and interests.",

image:jobsImg,

items:[
"Frontend Intern — 94% match",
"MERN Developer — 87% match",
"Junior Developer — 82% match"
]

},




{
title:"Track Your Career Growth",

desc:
"Manage applications and monitor your professional improvement.",

image:growthImg,

items:[
"Applied → Shortlisted → Interview",
"Interview rate: 25%",
"Career score: 82% ↑ 8%"
]

}

];





export default function HowItWorks(){


const [active,setActive]=useState(0);



useEffect(()=>{


const timer=setInterval(()=>{


setActive(
(prev)=>(prev+1)%STEPS.length
);


},4500);



return()=>clearInterval(timer);


},[]);





const step = STEPS[active];



return(


<section 
className="how-section"
id="how-it-works"
>


<div className="how-container">



<Rv>


<span className="how-tag">

HOW IT WORKS

</span>



<h2>

Your Career Journey
Made Simple.

</h2>



<p>

From building your profile to finding the right opportunity,
CareerLens guides your complete career journey.

</p>


</Rv>






<div className="how-grid">





{/* LEFT STEPS */}


<div className="steps">


{

STEPS.map((item,index)=>(


<button

key={index}

className={
`step-card ${
active===index ? "active": ""
}`
}


onClick={()=>setActive(index)}


>


<div className="step-number">

0{index+1}

</div>




<div>


<h3>
{item.title}
</h3>


<p>
{item.desc}
</p>


</div>



</button>


))


}


</div>







{/* RIGHT PRODUCT PREVIEW */}


<div 
className="career-preview"
key={active}
>



<div className="preview-image">


<img

src={step.image}

alt={step.title}

/>


</div>






<div className="preview-top">


<div>


<span>
CAREER INSIGHT
</span>



<h3>
{step.title}
</h3>


</div>




<div className="live">

LIVE

</div>



</div>





{

step.items.map((item,index)=>(


<div

className="insight-card"

key={index}

>


{item}


</div>


))


}






<div className="progress-area">


<p>
Career Readiness
</p>



<div className="progress-bar">

<span

style={{

width:`${70+(active*7)}%`

}}

/>


</div>



<h4>

{70+(active*7)}%

</h4>


</div>






</div>






</div>



</div>


</section>


)

}